import mongoose from "mongoose";


const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    bookNo: {
        type: String,
        required: true
    },
    publishYear: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    availableCopies: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
}, { timestamps: true })

export default mongoose.model("book", bookSchema)