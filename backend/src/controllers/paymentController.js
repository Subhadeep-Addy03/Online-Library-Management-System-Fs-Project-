
// import Razorpay from "razorpay";
import borrowSchema from "../models/borrowSchema.js";
import dotenv from "dotenv/config";
import paymentSchema from "../models/paymentSchema.js";



// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET
// })

export const paymentOrder = async (req, res) => {
    try {
        const { borrowId } = req.params;
        const borrowExist = await borrowSchema.findById(borrowId);
        if (!borrowExist) {
            return res.status(404).json({
                success: false,
                message: "No Borrow Record Found"
            })
        }
        // Check whether this borrow belongs to logged-in student
        if (borrowExist.userId.toString() !== req.userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You cannot pay This Borrow Record"
            })
        }
        // Check whether book is overdue
        if (!borrowExist.status === "overdue") {
            return res.status(400).json({
                success: false,
                message: "This Book Is Not Overdue"
            })
        }
        // Check fine amount
        if (!borrowExist.fineAmmount || borrowExist.fineAmmount <= 0) {
            return res.status(400).json({
                success: false,
                message: "No FineAmmount Found"
            })
        }
        // Check whether fine is already paid
        if (borrowExist.finePaid) {
            return res.status(400).json({
                success: false,
                message: "You Already Paid The FineAmmount"
            })
        }
        // Razorpay amount is in paise
        const options = {
            ammount: borrowExist.fineAmmount * 100,
            currency: "INR",
            receipt: `fine_${borrowId}`
        };
        const oreder = await razorpay.oredrs.create(options);

        return res.status(200).json({
            success: true,
            message: "Razorpay Order Created Successfully",
            data: {
                orederId: orders.id,
                ammount: orders.ammount,
                currency: orders.currency,
                key: process.env.RAZORPAY_KEY_ID
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//For Razorpay successful payment-database record logic

export const createPaymentRecord = async (req, res) => {
    try {
        const { borrowId } = req.params;
        const borrowExist = await borrowSchema.findById(borrowId);
        if (!borrowExist) {
            return res.status(404).json({
                success: false,
                message: "No Borrow Record Found"
            })
        }
        // Check whether this borrow belongs to logged-in student
        if (borrowExist.userId.toString() !== req.userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You Cannot Pay This Borrow Record"
            })
        }
        // Check whether book is overdue
        if (!borrowExist.status === "overdue") {
            return res.status(400).json({
                success: false,
                message: "This Book Is Not Overdue"
            })
        }
        // Check fine amount
        if (!borrowExist.fineAmmount || borrowExist.fineAmmount <= 0) {
            return res.status(400).json({
                success: false,
                message: "No FineAmmount Found"
            })
        }
        // Check whether payment already exists
        const paymentExist = await paymentSchema.findOne({ borrowId: borrowId, status: "success" });
        if (paymentExist) {
            return res.status(400).json({
                success: false,
                message: "Fine Already Paid"
            })
        }
        //Create Payment Record
        const payment = await paymentSchema.create({
            userId: borrowExist.userId,
            borrowId: borrowExist._id,
            ammount: borrowExist.fineAmmount,
            status: "pending"
        })
        return res.status(201).json({
            success: true,
            message: "Payment Record Created",
            data: payment
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//Get all my Payment History(Student Only)

export const getMyPaymentHistory = async (req, res) => {
    try {
        const paymentHistory = await borrowSchema.find({ userId: req.userId }).populate("borrowId").sort({ createdAt: -1 })
        if (paymentHistory.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Payments History Found Of This User"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Payments History Fetched Successfully",
            data: paymentHistory
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//All Payment History (ADMIN ONLY)
export const getAllPaymentHistory = async (req, res) => {
    try {
        const paymentHistory = await borrowSchema.find().populate("borrowId").sort({ createdAt: -1 })
        if (paymentHistory.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Payments History Found Of Users"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Payments History Fetched Successfully",
            data: paymentHistory
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


//Payment Verify and Database Update
export const verifyPayment = async (req, res) => {
    try {
        const { paymentId } = req.params;
        const paymentExist = await paymentSchema.findById(paymentId);
        if (!paymentExist) {
            return res.status(404).json({
                success: false,
                message: "Payment Record Not Found"
            })
        }
        // Check whether payment belongs to logged-in student

        if (paymentExist.userId.toString() !== req.userId.toString()) {
            return res.status(400).json({
                success: false,
                message: "You Cannot Verify This Payment"
            })
        }
        // Check whether payment is already successful
        if (paymentExist.success === "success") {
            return res.status(400).josn({
                success: false,
                message: "You Already Verified This Payment"
            })
        }
        // Find related borrow record
        const borrowExist = await borrowSchema.findById(paymentExist.borrowId);
        if (!borrowExist) {
            return res.status(404).json({
                success: false,
                message: "No Borrow Record Found"
            })
        }
        // Check whether fine is already paid
        if (borrowExist.finePaid === true) {
            return res.status(400).json({
                success: false,
                message: "You Already Paid Your Fine"
            })
        }
        // Temporary payment verification
        paymentExist.status = "success";
        paymentExist.paymentId = `Test_${Date.now()}`;
        paymentExist.paymentDate = new Date();

        borrowExist.finePaid = true;
        // DataBase Update
        await paymentExist.save();
        await borrowExist.save();

        return res.status(200).json({
            success: true,
            message: "Payment Verified Successfully",
            data: {
                payment: paymentExist,
                borrow: borrowExist
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}