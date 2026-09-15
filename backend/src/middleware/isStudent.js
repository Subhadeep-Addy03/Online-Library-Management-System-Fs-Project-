
import userSchema from "../models/userSchema.js";

export const isStudent = async (req, res, next) => {
    try {

        const user = await userSchema.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }

        if (req.userRole !== "student") {
            return res.status(403).json({
                success: false,
                message: "Only Student Can Borrow Book"
            });
        }

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}