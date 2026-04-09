import cron from "node-cron";
import Appointment from "../models/Appointment.js";
import { sendAppointmentReminderEmail } from "./emailService.js";

const sentReminders = new Set();
const warnedOrphans = new Set();

export const startReminderScheduler = () => {
    cron.schedule("* * * * *", async () => {
        try {
            const now = new Date();
            const in15mins = new Date(now.getTime() + 15 * 60 * 1000);
            const in16mins = new Date(now.getTime() + 16 * 60 * 1000);

            const appointments = await Appointment.find({ status: "confirmed" })
                .populate("user", "fullName email")
                .populate("slot", "startTime endTime");

            for (const appt of appointments) {
                const id = appt._id.toString();

                if (!appt.slot || !appt.user) {
                    if (!warnedOrphans.has(id)) {
                        warnedOrphans.add(id);
                    }
                    continue;
                }

                if (!appt.jitsiLink) continue;

                const startTime = new Date(appt.slot.startTime);
                if (startTime >= in15mins && startTime < in16mins) {
                    if (sentReminders.has(id)) continue;
                    sentReminders.add(id);
                    sendAppointmentReminderEmail({
                        to: appt.user.email,
                        clientName: appt.user.fullName,
                        appointmentTime: appt.slot.startTime,
                        jitsiLink: appt.jitsiLink,
                    }).catch(err => console.error("[Scheduler] Reminder failed:", err.message));
                }
            }
        } catch (err) {
            console.error(`[Scheduler] ❌ Cron error: ${err.message}`);
        }
    });
};