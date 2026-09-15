// import nodemailer from "nodemailer";
// import dotenv from "dotenv/config";

// export const verifyEmail = async (token, email) => {
//     const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//             user: process.env.EMAIL,
//             pass: process.env.PASSWORD,
//         },
//     });

//     const mailConfigurations = {
//         from: process.env.EMAIL,
//         to: email,
//         subject: "Email Verification For Registration",
//         text: `VerifyMail Token : ${token}`

//     };

//     transporter.sendMail(mailConfigurations, function (error, info) {
//         if (error) {
//             console.error("Error sending email:", error);
//             throw new Error(error);
//         }
//         console.log("Email Sent Successfully");
//         console.log(info);
//     });
// };

import nodemailer from "nodemailer";
import dotenv from "dotenv/config";

export const verifyEmail = async (token, email) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    const verificationLink =
        `http://localhost:5173/verify/${token}`;

    const mailConfigurations = {
        from: process.env.EMAIL,
        to: email,
        subject: "Email Verification For Registration",

        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">

                <h2>Welcome to Online Library 📚</h2>

                <p>
                    Thank you for registering with our Online Library.
                </p>

                <p>
                    Please click the button below to verify your email address.
                </p>

                <a
                    href="${verificationLink}"
                    style="
                        display: inline-block;
                        padding: 12px 20px;
                        background-color: #2563eb;
                        color: white;
                        text-decoration: none;
                        border-radius: 8px;
                    "
                >
                    Verify Email
                </a>

                <p style="margin-top: 20px;">
                    This verification link will expire in 5 minutes.
                </p>

            </div>
        `
    };

    try {
        const info = await transporter.sendMail(mailConfigurations);

        console.log("Email Sent Successfully");
        console.log(info);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};