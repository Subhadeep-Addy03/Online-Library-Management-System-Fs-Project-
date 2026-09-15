import nodemailer from "nodemailer"
import dotenv from "dotenv/config"


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

export const resetPasswordEmail = async (token, email) => {

    const resetLink = `http://localhost:5173/reset-password/${token}`;
    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Reset Password",
        html: `
            <h2>Reset Your Password</h2>

            <p>Click the button below to reset your password.</p>

            <a href="${resetLink}">Reset Password</a>

            <p>This link will expire in 10 minutes.</p>
        `
    });

};