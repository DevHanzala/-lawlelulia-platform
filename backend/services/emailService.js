import { transporter } from "../config/mailer.js";

// Service:  send verification email to users
export async function sendVerificationEmail(to, fullname, otpcode) {
    const subject = "Cocolaw Email Verification";
    const html = `
    <h2>Cocolaw Signup Verification</h2>
    <p>Hello, ${fullname}</p>
    <p>Thank you for signing up! Cocolaw wants to verify your email address.</p>
    <p>Following is our otp code: ${otpcode}</p>
    <p>If you did not sign up, you can ignore this email.</p>
    <br>
    <p>— The Cocolaw Team</p>
  `;

    const info = await transporter.sendMail({
        from: `"${process.env.APP_NAME}" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
    });

    console.log('Verification email sent:', info.messageId);
    return info;
}