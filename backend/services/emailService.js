import { transporter } from "../config/mailer.js";
import { createEmailContent, createSubject } from "../utils/email.js";

export async function sendEmail(to, fullname, otpcode, type = "VERIFY") {
    const subject = createSubject(type);
    const html = createEmailContent(type, fullname, otpcode);
    const info = await transporter.sendMail({
        from: `"${process.env.APP_NAME}" <${process.env.EMAIL_USER}>`,
        to, subject, html,
    });
    return info;
}

// Email 1: Sent IMMEDIATELY on booking — just confirms booking was received
export const sendBookingConfirmationEmail = async ({ to, clientName, appointmentTime, jitsiLink }) => {
    const formattedTime = new Date(appointmentTime).toLocaleString("en-US", {
        timeZone: "America/Los_Angeles",
        dateStyle: "full",
        timeStyle: "short",
    });

    await transporter.sendMail({
        from: `"CoCoLaw.ai" <${process.env.EMAIL_USER}>`,
        to,
        subject: "✅ Your CoCoLaw.ai Appointment is Confirmed",
        html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px;">
                <h2 style="color:#0A0F1C;">Appointment Confirmed!</h2>
                <p>Dear <strong>${clientName}</strong>,</p>
                <p>Your legal consultation has been <strong>confirmed</strong> by our team.</p>
                <table style="width:100%;margin:16px 0;border-collapse:collapse;">
                    <tr style="background:#f9fafb;">
                        <td style="padding:8px;color:#6b7280;">Date & Time</td>
                        <td style="padding:8px;font-weight:bold;">${formattedTime}</td>
                    </tr>
                  
                </table>
                <p style="color:#6b7280;font-size:14px;">
                    You will receive a reminder email with the join link <strong>15 minutes before</strong> your appointment.
                </p>
                <p style="color:#9ca3af;font-size:12px;margin-top:24px;">— The CoCoLaw.ai Team</p>
            </div>
        `,
    });
};

// Email 2: Sent 15 MINUTES BEFORE appointment — contains Jitsi link
export const sendAppointmentReminderEmail = async ({ to, clientName, appointmentTime, jitsiLink }) => {
    const formattedTime = new Date(appointmentTime).toLocaleString("en-US", {
        timeZone: "America/Los_Angeles",
        dateStyle: "full",
        timeStyle: "short",
    });

    const mailOptions = {
        from: `"CoCoLaw.ai" <${process.env.EMAIL_USER}>`,
        to,
        subject: "⏰ Your CoCoLaw.ai Meeting Starts in 15 Minutes",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px;">
                <h2 style="color: #0A0F1C;">Your Meeting Starts Soon!</h2>
                <p>Dear <strong>${clientName}</strong>,</p>
                <p>Your legal consultation starts in <strong>15 minutes.</strong></p>
                <table style="width:100%; margin: 16px 0; border-collapse: collapse;">
                    <tr style="background:#f9fafb;">
                        <td style="padding: 8px; color: #6b7280;">Date & Time</td>
                        <td style="padding: 8px; font-weight: bold;">${formattedTime}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; color: #6b7280;">Meeting Link</td>
                        <td style="padding: 8px;">
                            <a href="${jitsiLink}" style="color: #0A0F1C; font-weight: bold;">${jitsiLink}</a>
                        </td>
                    </tr>
                </table>
                <a href="${jitsiLink}" style="display:inline-block; background:#0A0F1C; color:#fff; padding:14px 28px; border-radius:8px; text-decoration:none; font-weight:bold; margin-top:8px; font-size:16px;">
                    🎥 Join Meeting Now
                </a>
                <p style="margin-top:24px; color:#9ca3af; font-size:12px;">
                    Please join 2-3 minutes early. The room opens automatically.
                </p>
                <p style="color:#9ca3af; font-size:12px;"> The CoCoLaw.ai Team</p>
            </div>
        `,
    };

    const result = await transporter.sendMail(mailOptions);
    return result;
};

export const sendCancellationEmail = async ({ to, clientName, appointmentTime }) => {
    const formattedTime = new Date(appointmentTime).toLocaleString("en-US", {
        timeZone: "America/Los_Angeles",
        dateStyle: "full",
        timeStyle: "short",
    });

    await transporter.sendMail({
        from: `"CoCoLaw.ai" <${process.env.EMAIL_USER}>`,
        to,
        subject: "❌ Your CoCoLaw.ai Appointment Has Been Cancelled",
        html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px;">
                <h2 style="color:#0A0F1C;">Appointment Cancelled</h2>
                <p>Dear <strong>${clientName}</strong>,</p>
                <p>Unfortunately your appointment scheduled for <strong>${formattedTime}</strong> has been cancelled.</p>
                <p>Please visit CoCoLaw.ai to book a new appointment at a convenient time.</p>
                <p style="color:#9ca3af;font-size:12px;margin-top:24px;">— The CoCoLaw.ai Team</p>
            </div>
        `,
    });
};

// Scheduler: fires reminder email exactly 15 mins before appointment
// NOTE: For production, replace with node-cron (already set up in schedulerService.js)
export const scheduleReminderEmail = ({ to, clientName, appointmentTime, jitsiLink }) => {
    const appointmentMs = new Date(appointmentTime).getTime();
    const reminderMs = appointmentMs - (15 * 60 * 1000); // 15 mins before
    const now = Date.now();
    const delay = reminderMs - now;

    if (delay <= 0) {
        sendAppointmentReminderEmail({ to, clientName, appointmentTime, jitsiLink })
            .catch(err => console.error("[EmailService] Immediate reminder failed:", err.message));
        return;
    }

    const timer = setTimeout(async () => {
        try {
            await sendAppointmentReminderEmail({ to, clientName, appointmentTime, jitsiLink });
        } catch (err) {
            console.error("[EmailService] Scheduled reminder failed:", err.message);
        }
    }, delay);

};