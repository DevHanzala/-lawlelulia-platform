import { transporter } from "../config/mailer.js";
import { createEmailContent, createSubject } from "../utils/email.js";


export async function sendEmail(to, fullname, otpcode, type = "VERIFY") {

    const subject = createSubject(type);
    const html = createEmailContent(type, fullname, otpcode);

    const info = await transporter.sendMail({
        from: `"${process.env.APP_NAME}" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
    });

    console.log(`${type} email sent:`, info.messageId);
    return info;
}