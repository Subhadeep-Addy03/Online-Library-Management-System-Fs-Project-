import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isLogIn: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ["admin", "student"],
        default: "student",
    },
    token: {
        type: String,
        default: null,
    },
}, { timestamps: true })

export default mongoose.model("user", userSchema);