import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    // borrowId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "borrowbooks",
    //     required: true
    // },
    borrowId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "borrow",
        required: true
    },
    ammount: {
        type: Number,
        required: true
    },
    orderId: {
        type: String,
        default: null
    },
    paymentId: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ["pending", "success", "failed"],
        default: "pending"
    },
    paymentDate: {
        type: Date,
        default: null
    }

}, { timestamps: true })

export default mongoose.model("payment", paymentSchema)