// import jwt from "jsonwebtoken";
// import dotenv from "dotenv/config";
// import userSchema from "../models/userSchema.js";

import { sendVerificationOtp } from "../emailVerify/verifyEmail.js";
import userSchema from "../models/userSchema.js";
import crypto from "crypto";

// export const verifyToken = async (req, res) => {
//     try {
//         const authHeader = req.headers.authorization;
//         if (!authHeader || !authHeader.startsWith("Bearer")) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Authorizaton Failed,Or Not Found"
//             })
//         }
//         else {
//             const token = authHeader.split(" ")[1];
//             jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
//                 if (err) {
//                     if (err.name === "TokenExpiredError") {
//                         return res.status(401).json({
//                             success: false,
//                             message: "Token Expired !! Try Again"
//                         })
//                     }
//                     return res.status(404).json({
//                         success: false,
//                         message: "Token Invalid !!"
//                     })
//                 }
//                 else {
//                     const { id } = decoded;
//                     const userExist = await userSchema.findById(id)
//                     if (!userExist) {
//                         return res.status(400).json({
//                             success: false,
//                             message: "No User Found"
//                         })
//                     }
//                     else {
//                         userExist.token = null;
//                         userExist.isVerified = true;
//                         await userExist.save();
//                         return res.status(200).json({
//                             success: true,
//                             message: "User Verify Successfully"
//                         })
//                     }
//                 }
//             })
//         }
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }



export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const userExist = await userSchema.findOne({ email });

        if (!userExist) {
            return res.status(404).json({
                success: false,
                message: "No User Found"
            });
        }

        if (userExist.isVerified === true) {
            return res.status(400).json({
                success: false,
                message: "Email Already Verified"
            });
        }

        if (!userExist.verificationOtp || !userExist.verificationOtpExpires) {
            return res.status(400).json({
                success: false,
                message: "OTP Not Found. Please Request A New OTP."
            });
        }

        if (new Date() > userExist.verificationOtpExpires) {
            return res.status(400).json({
                success: false,
                message: "OTP Expired. Please Request A New OTP."
            });
        }

        if (userExist.verificationOtp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        userExist.isVerified = true;
        userExist.verificationOtp = null;
        userExist.verificationOtpExpires = null;

        await userExist.save();

        return res.status(200).json({
            success: true,
            message: "Email Verified Successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



export const resendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        const userExist = await userSchema.findOne({ email });

        if (!userExist) {
            return res.status(404).json({
                success: false,
                message: "No User Found"
            });
        }

        if (userExist.isVerified === true) {
            return res.status(400).json({
                success: false,
                message: "Email Already Verified"
            });
        }

        const verificationOtp = crypto.randomInt(100000, 1000000).toString();

        const verificationOtpExpires = new Date(
            Date.now() + 10 * 60 * 1000
        );

        userExist.verificationOtp = verificationOtp;
        userExist.verificationOtpExpires = verificationOtpExpires;

        await userExist.save();

        await sendVerificationOtp(verificationOtp, email);

        return res.status(200).json({
            success: true,
            message: "New OTP Sent Successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};