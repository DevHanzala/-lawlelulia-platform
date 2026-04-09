import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground" // redirect URI used when generating refresh token
);

oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
});

const calendar = google.calendar({ version: "v3", auth: oauth2Client });

export const createCalendarEvent = async ({ clientName, clientEmail, appointmentTime, jitsiLink }) => {
    const startTime = new Date(appointmentTime);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 1 hour duration

    const event = {
        summary: `Law Consultation with ${clientName}`,
        description: `Meeting Link: ${jitsiLink}`,
        location: jitsiLink,
        start: {
            dateTime: startTime.toISOString(),
            timeZone: "Asia/Karachi",
        },
        end: {
            dateTime: endTime.toISOString(),
            timeZone: "Asia/Karachi",
        },
        attendees: [{ email: clientEmail }],
        reminders: {
            useDefault: false,
            overrides: [
                { method: "popup", minutes: 15 },
                { method: "email", minutes: 15 },
            ],
        },
    };

    try {
        const response = await calendar.events.insert({
            calendarId: "primary",
            sendUpdates: "all", // sends email to attendees
            resource: event,
        });
        return response.data;
    } catch (err) {
        console.error("[CalendarService] Failed to create event:", err.message);
        throw err;
    }
};