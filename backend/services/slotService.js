import { HttpError } from "../exception/HttpError.js";
import Slot from "../models/Slot.js";
import Appointment from "../models/Appointment.js";

// ─────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────
const SLOT_DURATION_HOURS = 1;          // 1-hour slots
const DAY_START_HOUR     = 9;           // 9 AM EST
const DAY_END_HOUR       = 21;          // 9 PM EST  (slots up to 20:00–21:00)
const WORK_DAYS          = [1, 2, 3, 4, 5, 6]; // Mon–Sat (0 = Sun, 6 = Sat)
const TZ_OFFSET_HOURS    = -5;          // EST = UTC-5  (no DST handling; adjust to -4 for EDT if needed)

/**
 * Convert a UTC Date to "EST wall-clock" Date object
 * so we can check day-of-week and hour in EST.
 */
const toEST = (utcDate) => {
    const ms = utcDate.getTime() + TZ_OFFSET_HOURS * 60 * 60 * 1000;
    return new Date(ms);
};

/**
 * Build slot start times for a given date in EST.
 * Returns an array of UTC ISO strings for each slot start.
 */
const buildSlotsForDate = (targetDate) => {
    // targetDate may be any timezone — normalise to UTC midnight of that calendar date
    const d = new Date(targetDate);
    // Use UTC fields of the provided date (callers already pass UTC-noon dates)
    const year  = d.getUTCFullYear();
    const month = d.getUTCMonth();
    const day   = d.getUTCDate();

    const slots = [];
    for (let h = DAY_START_HOUR; h < DAY_END_HOUR; h += SLOT_DURATION_HOURS) {
        // Build the UTC timestamp for h:00 EST on that calendar date
        // EST = UTC - 5, so EST h:00 = UTC (h+5):00
        const startUTC = new Date(Date.UTC(year, month, day, h - TZ_OFFSET_HOURS, 0, 0, 0));
        const endUTC   = new Date(Date.UTC(year, month, day, h - TZ_OFFSET_HOURS + SLOT_DURATION_HOURS, 0, 0, 0));
        slots.push({ startUTC, endUTC });
    }
    return slots;
};

/**
 * Check whether a given UTC date falls on a working day (Mon–Sat) in EST.
 */
const isWorkDay = (utcDate) => {
    const est = toEST(utcDate);
    return WORK_DAYS.includes(est.getDay());
};

// ─────────────────────────────────────────────
// Service: Get all slots for a specific date
// Auto-generates 9AM–9PM EST slots; checks DB for booked ones.
// ─────────────────────────────────────────────
export const getSlotsByDate = async (date, user) => {
    const targetDate = new Date(date);
    const now        = new Date();

    // UTC midnight of today
    const todayUTC = new Date(Date.UTC(
        now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0
    ));

    // UTC midnight of requested date
    const requestedDayUTC = new Date(Date.UTC(
        targetDate.getUTCFullYear(), targetDate.getUTCMonth(), targetDate.getUTCDate(), 0, 0, 0, 0
    ));

    if (requestedDayUTC < todayUTC) {
        throw new HttpError("Please enter a future date", 400);
    }

    // Build virtual slots for this date
    const virtualSlots = buildSlotsForDate(targetDate);

    // Check if requested date is a working day in EST
    const estDay = toEST(requestedDayUTC).getDay();
    if (!WORK_DAYS.includes(estDay)) {
        // Return empty — Sunday is off
        if (user.role === "admin") {
            return [];          // admin sees nothing to manage on off days
        }
        return [];
    }

    // Fetch any DB slots (booked) that fall on this day
    const startOfDay = new Date(Date.UTC(
        targetDate.getUTCFullYear(), targetDate.getUTCMonth(), targetDate.getUTCDate(), 0, 0, 0, 0
    ));
    const endOfDay = new Date(Date.UTC(
        targetDate.getUTCFullYear(), targetDate.getUTCMonth(), targetDate.getUTCDate(), 23, 59, 59, 999
    ));

    const dbSlots = await Slot.find({
        startTime: { $gte: startOfDay, $lte: endOfDay }
    });

    // Map booked start times for quick lookup (ISO string → Slot doc)
    const bookedMap = new Map();
    for (const s of dbSlots) {
        bookedMap.set(s.startTime.toISOString(), s);
    }

    // Merge virtual + DB state
    const merged = [];
    for (const vs of virtualSlots) {
        // Skip slots whose endTime has fully passed
        if (vs.endUTC <= now) continue;

        const key    = vs.startUTC.toISOString();
        const dbSlot = bookedMap.get(key);

        if (dbSlot) {
            // Slot exists in DB — fetch appointment info
            const appointment = await Appointment.findOne({ slot: dbSlot._id })
                .select("_id status user jitsiLink")
                .populate("user", "fullName email");

            const slotObj = dbSlot.toObject();
            slotObj.appointment = appointment || null;
            merged.push(slotObj);
        } else {
            // Virtual slot — not in DB yet, so definitely available
            merged.push({
                _id:         null,         // no DB id yet
                startTime:   vs.startUTC,
                endTime:     vs.endUTC,
                isBooked:    false,
                appointment: null,
                __virtual:   true,         // flag so client knows
            });
        }
    }

    // Non-admin: only return available slots
    if (user.role !== "admin") {
        return merged.filter(s => !s.isBooked);
    }

    return merged;
};

// ─────────────────────────────────────────────
// Service: Find-or-create a slot by startTime,
// then atomically mark it booked.
// Used by appointmentService when booking.
// ─────────────────────────────────────────────
export const findOrCreateSlotAndBook = async (startTimeISO) => {
    const startTime = new Date(startTimeISO);
    const endTime   = new Date(startTime.getTime() + SLOT_DURATION_HOURS * 60 * 60 * 1000);
    const now       = new Date();

    // Validate it's in the future
    if (startTime <= now) {
        throw new HttpError("Cannot book a slot in the past", 400);
    }

    // Validate it's a working day in EST
    if (!isWorkDay(startTime)) {
        throw new HttpError("Appointments are only available Monday–Saturday", 400);
    }

    // Validate hour is within 9AM–9PM EST
    const estHour = toEST(startTime).getHours();
    if (estHour < DAY_START_HOUR || estHour >= DAY_END_HOUR) {
        throw new HttpError(`Appointments are only available ${DAY_START_HOUR}AM–${DAY_END_HOUR - 12}PM EST`, 400);
    }

    // Validate on the hour (no arbitrary times)
    if (startTime.getUTCMinutes() !== 0 || startTime.getUTCSeconds() !== 0) {
        throw new HttpError("Slot start time must be on the hour", 400);
    }

    // Atomic find-or-create + book
    const slot = await Slot.findOneAndUpdate(
        { startTime, isBooked: false },          // must exist and be free
        { $setOnInsert: { startTime, endTime, isBooked: true } },
        { upsert: false, new: true }             // try to claim existing free slot
    );

    if (slot) return slot; // successfully claimed existing slot

    // Slot not in DB yet — try to insert it (it's virtual & free)
    try {
        const newSlot = await Slot.create({ startTime, endTime, isBooked: true });
        return newSlot;
    } catch (err) {
        // Duplicate key = race condition: another request just created & booked it
        if (err.code === 11000) {
            throw new HttpError("This time slot was just taken. Please choose another.", 409);
        }
        throw err;
    }
};

// ─────────────────────────────────────────────
// Service: Find slot by ID and update isBooked status
// (still used by appointment status updates: confirm/cancel)
// ─────────────────────────────────────────────
export const findSlotByIdAndUpdateBookedStatus = async (slotId, currentIsBooked, newIsBooked) => {
    return await Slot.findOneAndUpdate(
        { _id: slotId, isBooked: currentIsBooked },
        { $set: { isBooked: newIsBooked } },
        { new: true }
    );
};

