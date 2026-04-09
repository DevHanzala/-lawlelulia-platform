import crypto from "crypto";

export const generateJitsiLink = () => {
    const randomId = crypto.randomBytes(6).toString("hex").toUpperCase();
    const roomName = `CocoLaw-${randomId}`;
    const link = `https://meet.jit.si/${roomName}`;
    return { roomName, link };
};