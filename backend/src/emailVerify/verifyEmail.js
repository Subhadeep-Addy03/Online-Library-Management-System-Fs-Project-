import dotenv from "dotenv/config";

// Send email via Brevo Transactional Email REST API



const sendBrevoEmail = async ({ to, subject, html }) => {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
            "accept": "application/json",
            "api-key": process.env.BREVO_API_KEY,
            "content-type": "application/json",
        },
        body: JSON.stringify({
            sender: {
                name: "Online Library",
                email: process.env.BREVO_FROM_EMAIL,
            },
            to: [{ email: to }],
            subject,
            htmlContent: html,
        }),
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(`Brevo API error: ${JSON.stringify(err)}`);
    }

    return response.json();
};

// const sendBrevoEmail = async ({ to, subject, html }) => {
//     const response = await fetch("https://api.brevo.com/v3/smtp/email", {
//         method: "POST",
//         headers: {
//             "accept": "application/json",
//             "api-key": process.env.BREVO_API_KEY,
//             "content-type": "application/json",
//         },
//         body: JSON.stringify({
//             sender: {
//                 name: "Online Library",
//                 email: process.env.BREVO_FROM_EMAIL,
//             },
//             to: [{ email: to }],
//             subject,
//             htmlContent: html,
//         }),
//     });

//     if (!response.ok) {
//         const err = await response.json();
//         throw new Error(`Brevo API error: ${JSON.stringify(err)}`);
//     }

//     return response.json();
// };

// export const verifyEmail = async (token, email) => {
//     const verificationLink = `${process.env.FRONTEND_URL}/verify/${token}`;

//     try {
//         await sendBrevoEmail({
//             to: email,
//             subject: "Email Verification For Registration",
//             html: `
//                 <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto;">
//                     <h2 style="color: #2563eb;">Welcome to Online Library 📚</h2>
//                     <p>Thank you for registering with our Online Library.</p>
//                     <p>Please click the button below to verify your email address.</p>
//                     <a
//                         href="${verificationLink}"
//                         style="
//                             display: inline-block;
//                             padding: 12px 20px;
//                             background-color: #2563eb;
//                             color: white;
//                             text-decoration: none;
//                             border-radius: 8px;
//                             margin: 16px 0;
//                         "
//                     >
//                         Verify Email
//                     </a>
//                     <p style="margin-top: 20px; color: #6b7280; font-size: 14px;">
//                         This verification link will expire in 5 minutes.
//                     </p>
//                 </div>
//             `,
//         });
//         console.log("Verification email sent successfully to:", email);
//     } catch (error) {
//         console.error("Error sending verification email:", error);
//     }
// };


export const sendVerificationOtp = async (otp, email) => {
    try {
        await sendBrevoEmail({
            to: email,
            subject: "Email Verification OTP - Online Library",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto;">
                    <h2 style="color: #2563eb;">Welcome to Online Library 📚</h2>

                    <p>Thank you for registering with our Online Library.</p>

                    <p>Your email verification OTP is:</p>

                    <div style="
                        font-size: 32px;
                        font-weight: bold;
                        letter-spacing: 8px;
                        color: #2563eb;
                        background-color: #eff6ff;
                        padding: 16px;
                        text-align: center;
                        border-radius: 8px;
                        margin: 20px 0;
                    ">
                        ${otp}
                    </div>

                    <p>Please enter this OTP on the verification page to verify your email address.</p>

                    <p style="margin-top: 20px; color: #6b7280; font-size: 14px;">
                        This OTP will expire in 10 minutes.
                    </p>

                    <p style="color: #6b7280; font-size: 14px;">
                        If you did not create an account, you can safely ignore this email.
                    </p>
                </div>
            `,
        });

        console.log("Verification OTP email sent successfully to:", email);

    } catch (error) {
        console.error("Error sending verification OTP email:", error);
    }
};