import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "book",
        required: true
    },
    borrowDate: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date,
        required: true
    },
    returnDate: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        enum: ["borrowed", "returned", "overdue"],
        default: "borrowed"
    },
    fineAmmount: {
        type: Number,
        default: 0
    },
    finePaid: {
        type: Boolean,
        default: false
    },
    paymentId: {
        type: String,
        default: null
    }
}, { timestamps: true })

export default mongoose.model("borrow", borrowSchema)