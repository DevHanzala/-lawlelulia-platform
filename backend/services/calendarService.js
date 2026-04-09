import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const getOAuth2Client = () => {
    const client = new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
    );
    client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
    return client;
};

export const createCalendarEvent = async ({ clientName, clientEmail, appointmentTime, jitsiLink }) => {
    const auth = getOAuth2Client();
    const calendar = google.calendar({ version: "v3", auth });

    const startTime = new Date(appointmentTime);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

    const event = {
        summary: `CoCoLaw Consultation with ${clientName}`,
        // FIXED: No location field — description only
        description: `Your legal consultation meeting.\n\nJoin via Jitsi: ${jitsiLink}\n\nClick the link above to join your video call.`,
        start: { dateTime: startTime.toISOString(), timeZone: "America/Los_Angeles" },
        end: { dateTime: endTime.toISOString(), timeZone: "America/Los_Angeles" },
        attendees: [{ email: clientEmail }],
        reminders: {
            useDefault: false,
            overrides: [
                { method: "popup", minutes: 15 },
                { method: "email", minutes: 30 },
            ],
        },
    };

    try {
        const response = await calendar.events.insert({
            calendarId: "primary",
            sendUpdates: "all",
            resource: event,
        });
        return response.data;
    } catch (err) {
        console.error("[CalendarService] ❌ Failed:", err.message);
        throw err;
    }
};