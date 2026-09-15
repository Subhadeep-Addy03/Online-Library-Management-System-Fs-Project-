
import dotenv from "dotenv/config";
import jwt from "jsonwebtoken";
import userSchema from "../models/userSchema.js";
import sessionSchema from "../models/sessionSchema.js";

export const hashToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authorization Failed"
            })
        }
        else {
            const token = authHeader.split(" ")[1];
            jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
                if (err) {
                    if (err.name === "TokenExpiredError") {
                        return res.status(401).json({
                            success: false,
                            message: "Token Expired"
                        })
                    }
                    return res.status(401).json({
                        success: false,
                        message: "Token Inavlid,Try Again"
                    })
                }
                else {
                    const { id } = decoded;
                    const userExist = await userSchema.findById(id)
                    if (!userExist) {
                        return res.status(404).json({
                            success: false,
                            message: "User Not Found"
                        })
                    }
                    const sessionExist = await sessionSchema.findOne({ userId: id })
                    if (sessionExist) {
                        req.userId = id;
                        req.userRole = userExist.role;
                        next()
                    }
                    else {
                        return res.status(400).json({
                            success: false,
                            message: "User Had No Session"
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