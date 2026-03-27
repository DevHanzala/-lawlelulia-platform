export function createSubject(type, fullname) {
    if (type === "VERIFY") {
        return `Verify your account, ${fullname}`;
    }
    if (type === "RESET") {
        return `Reset your password, ${fullname}`;
    }
    return "Cocolaw Notification";
}

export function createEmailContent(type, fullname, otpcode) {

    if (type === "VERIFY") {
        return `
        <h2>Cocolaw Signup Verification</h2>
        <p>Hello, ${fullname}</p>
        <p>Thank you for signing up! Cocolaw wants to verify your email address.</p>
        <p>Your OTP code is: <b>${otpcode}</b></p>
        <p>If you did not sign up, you can ignore this email.</p>
        <br>
        <p>— The Cocolaw Team</p>
        `;
    }

    if (type === "RESET") {
        return `
        <h2>Cocolaw Password Reset</h2>
        <p>Hello, ${fullname}</p>
        <p>You requested to reset your password.</p>
        <p>Your OTP code is: <b>${otpcode}</b></p>
        <p>If you did not request this, please ignore this email.</p>
        <br>
        <p>— The Cocolaw Team</p>
        `;
    }

    return `
    <p>Hello, ${fullname}</p>
    <p>This is a notification from Cocolaw.</p>
    `;
}