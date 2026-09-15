import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";
import userSchema from "../models/userSchema.js";

export const verifyToken = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({
                success: false,
                message: "Authorizaton Failed,Or Not Found"
            })
        }
        else {
            const token = authHeader.split(" ")[1];
            jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
                if (err) {
                    if (err.name === "TokenExpiredError") {
                        return res.status(401).json({
                            success: false,
                            message: "Token Expired !! Try Again"
                        })
                    }
                    return res.status(404).json({
                        success: false,
                        message: "Token Invalid !!"
                    })
                }
                else {
                    const { id } = decoded;
                    const userExist = await userSchema.findById(id)
                    if (!userExist) {
                        return res.status(400).json({
                            success: false,
                            message: "No User Found"
                        })
                    }
                    else {
                        userExist.token = null;
                        userExist.isVerified = true;
                        await userExist.save();
                        return res.status(200).json({
                            success: true,
                            message: "User Verify Successfully"
                        })
                    }
                }
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}