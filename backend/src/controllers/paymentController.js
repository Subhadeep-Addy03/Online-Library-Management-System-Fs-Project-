
// // import Razorpay from "razorpay";
// import borrowSchema from "../models/borrowSchema.js";
// import dotenv from "dotenv/config";
// import paymentSchema from "../models/paymentSchema.js";



// // const razorpay = new Razorpay({
// //     key_id: process.env.RAZORPAY_KEY_ID,
// //     key_secret: process.env.RAZORPAY_KEY_SECRET
// // })

// export const paymentOrder = async (req, res) => {
//     try {
//         const { borrowId } = req.params;
//         const borrowExist = await borrowSchema.findById(borrowId);
//         if (!borrowExist) {
//             return res.status(404).json({
//                 success: false,
//                 message: "No Borrow Record Found"
//             })
//         }
//         // Check whether this borrow belongs to logged-in student
//         if (borrowExist.userId.toString() !== req.userId.toString()) {
//             return res.status(403).json({
//                 success: false,
//                 message: "You cannot pay This Borrow Record"
//             })
//         }
//         // Check whether book is overdue
//         if (!borrowExist.status === "overdue") {
//             return res.status(400).json({
//                 success: false,
//                 message: "This Book Is Not Overdue"
//             })
//         }
//         // Check fine amount
//         if (!borrowExist.fineAmmount || borrowExist.fineAmmount <= 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: "No FineAmmount Found"
//             })
//         }
//         // Check whether fine is already paid
//         if (borrowExist.finePaid) {
//             return res.status(400).json({
//                 success: false,
//                 message: "You Already Paid The FineAmmount"
//             })
//         }
//         // Razorpay amount is in paise
//         const options = {
//             ammount: borrowExist.fineAmmount * 100,
//             currency: "INR",
//             receipt: `fine_${borrowId}`
//         };
//         const oreder = await razorpay.oredrs.create(options);

//         return res.status(200).json({
//             success: true,
//             message: "Razorpay Order Created Successfully",
//             data: {
//                 orederId: orders.id,
//                 ammount: orders.ammount,
//                 currency: orders.currency,
//                 key: process.env.RAZORPAY_KEY_ID
//             }
//         })
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

// //For Razorpay successful payment-database record logic

// export const createPaymentRecord = async (req, res) => {
//     try {
//         const { borrowId } = req.params;
//         const borrowExist = await borrowSchema.findById(borrowId);
//         if (!borrowExist) {
//             return res.status(404).json({
//                 success: false,
//                 message: "No Borrow Record Found"
//             })
//         }
//         // Check whether this borrow belongs to logged-in student
//         if (borrowExist.userId.toString() !== req.userId.toString()) {
//             return res.status(403).json({
//                 success: false,
//                 message: "You Cannot Pay This Borrow Record"
//             })
//         }
//         // Check whether book is overdue
//         if (!borrowExist.status === "overdue") {
//             return res.status(400).json({
//                 success: false,
//                 message: "This Book Is Not Overdue"
//             })
//         }
//         // Check fine amount
//         if (!borrowExist.fineAmmount || borrowExist.fineAmmount <= 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: "No FineAmmount Found"
//             })
//         }
//         // Check whether payment already exists
//         const paymentExist = await paymentSchema.findOne({ borrowId: borrowId, status: "success" });
//         if (paymentExist) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Fine Already Paid"
//             })
//         }
//         //Create Payment Record
//         const payment = await paymentSchema.create({
//             userId: borrowExist.userId,
//             borrowId: borrowExist._id,
//             ammount: borrowExist.fineAmmount,
//             status: "pending"
//         })
//         return res.status(201).json({
//             success: true,
//             message: "Payment Record Created",
//             data: payment
//         })

//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

// //Get all my Payment History(Student Only)

// export const getMyPaymentHistory = async (req, res) => {
//     try {
//         const paymentHistory = await borrowSchema.find({ userId: req.userId }).populate("borrowId").sort({ createdAt: -1 })
//         if (paymentHistory.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: "No Payments History Found Of This User"
//             })
//         }
//         return res.status(200).json({
//             success: true,
//             message: "Payments History Fetched Successfully",
//             data: paymentHistory
//         })

//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

// //All Payment History (ADMIN ONLY)
// export const getAllPaymentHistory = async (req, res) => {
//     try {
//         const paymentHistory = await borrowSchema.find().populate("borrowId").sort({ createdAt: -1 })
//         if (paymentHistory.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: "No Payments History Found Of Users"
//             })
//         }
//         return res.status(200).json({
//             success: true,
//             message: "Payments History Fetched Successfully",
//             data: paymentHistory
//         })

//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }


// //Payment Verify and Database Update
// export const verifyPayment = async (req, res) => {
//     try {
//         const { paymentId } = req.params;
//         const paymentExist = await paymentSchema.findById(paymentId);
//         if (!paymentExist) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Payment Record Not Found"
//             })
//         }
//         // Check whether payment belongs to logged-in student

//         if (paymentExist.userId.toString() !== req.userId.toString()) {
//             return res.status(400).json({
//                 success: false,
//                 message: "You Cannot Verify This Payment"
//             })
//         }
//         // Check whether payment is already successful
//         if (paymentExist.success === "success") {
//             return res.status(400).josn({
//                 success: false,
//                 message: "You Already Verified This Payment"
//             })
//         }
//         // Find related borrow record
//         const borrowExist = await borrowSchema.findById(paymentExist.borrowId);
//         if (!borrowExist) {
//             return res.status(404).json({
//                 success: false,
//                 message: "No Borrow Record Found"
//             })
//         }
//         // Check whether fine is already paid
//         if (borrowExist.finePaid === true) {
//             return res.status(400).json({
//                 success: false,
//                 message: "You Already Paid Your Fine"
//             })
//         }
//         // Temporary payment verification
//         paymentExist.status = "success";
//         paymentExist.paymentId = `Test_${Date.now()}`;
//         paymentExist.paymentDate = new Date();

//         borrowExist.finePaid = true;
//         // DataBase Update
//         await paymentExist.save();
//         await borrowExist.save();

//         return res.status(200).json({
//             success: true,
//             message: "Payment Verified Successfully",
//             data: {
//                 payment: paymentExist,
//                 borrow: borrowExist
//             }
//         })
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }





import crypto from "crypto";
import razorpay from "../config/razorpay.js";
import borrowSchema from "../models/borrowSchema.js";
import paymentSchema from "../models/paymentSchema.js";

export const paymentOrder = async (req, res) => {
    try {
        const { borrowId } = req.params;

        const borrowExist = await borrowSchema.findById(borrowId);

        if (!borrowExist) {
            return res.status(404).json({
                success: false,
                message: "No Borrow Record Found"
            });
        }

        if (borrowExist.userId.toString() !== req.userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You Cannot Pay This Borrow Record"
            });
        }

        if (borrowExist.status !== "overdue") {
            return res.status(400).json({
                success: false,
                message: "This Book Is Not Overdue"
            });
        }

        if (borrowExist.finePaid) {
            return res.status(400).json({
                success: false,
                message: "Fine Already Paid"
            });
        }

        if (!borrowExist.fineAmmount || borrowExist.fineAmmount <= 0) {
            return res.status(400).json({
                success: false,
                message: "No Fine Amount Found"
            });
        }

        const amountInPaise = Math.round(borrowExist.fineAmmount * 100);

        const order = await razorpay.orders.create({
            amount: amountInPaise,
            currency: "INR",
            receipt: `fine_${borrowId}_${Date.now()}`
        });

        const payment = await paymentSchema.create({
            userId: req.userId,
            borrowId: borrowExist._id,
            ammount: borrowExist.fineAmmount,
            orderId: order.id,
            status: "pending"
        });

        return res.status(201).json({
            success: true,
            message: "Razorpay Order Created Successfully",
            data: {
                orderId: order.id,
                amount: order.amount,
                currency: order.currency,
                keyId: process.env.RAZORPAY_KEY_ID,
                paymentId: payment._id
            }
        });

    } catch (error) {
        console.log("PAYMENT ORDER ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getMyPaymentHistory = async (req, res) => {
    try {
        const paymentHistory = await paymentSchema
            .find({ userId: req.userId })
            .populate("borrowId")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Payment History Fetched Successfully",
            data: paymentHistory
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getAllPaymentHistory = async (req, res) => {
    try {
        const paymentHistory = await paymentSchema
            .find()
            .populate("borrowId")
            .populate("userId", "userName email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "All Payment History Fetched Successfully",
            data: paymentHistory
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const verifyPayment = async (req, res) => {
    try {
        const { paymentId, razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

        if (!paymentId || !razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Payment Details Missing"
            });
        }

        const paymentExist = await paymentSchema.findById(paymentId);

        if (!paymentExist) {
            return res.status(404).json({
                success: false,
                message: "Payment Record Not Found"
            });
        }

        if (paymentExist.userId.toString() !== req.userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You Cannot Verify This Payment"
            });
        }

        if (paymentExist.status === "success") {
            return res.status(400).json({
                success: false,
                message: "Payment Already Verified"
            });
        }

        if (paymentExist.orderId !== razorpay_order_id) {
            return res.status(400).json({
                success: false,
                message: "Invalid Order ID"
            });
        }

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        const signatureBuffer = Buffer.from(razorpay_signature);
        const expectedBuffer = Buffer.from(expectedSignature);

        if (
            signatureBuffer.length !== expectedBuffer.length ||
            !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
        ) {
            return res.status(400).json({
                success: false,
                message: "Payment Signature Verification Failed"
            });
        }

        const borrowExist = await borrowSchema.findById(paymentExist.borrowId);

        if (!borrowExist) {
            return res.status(404).json({
                success: false,
                message: "Borrow Record Not Found"
            });
        }

        if (borrowExist.userId.toString() !== req.userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "Invalid Borrow Record"
            });
        }

        if (borrowExist.finePaid) {
            return res.status(400).json({
                success: false,
                message: "Fine Already Paid"
            });
        }

        paymentExist.status = "success";
        paymentExist.paymentId = razorpay_payment_id;
        paymentExist.paymentDate = new Date();

        borrowExist.finePaid = true;
        borrowExist.paymentId = razorpay_payment_id;

        await paymentExist.save();
        await borrowExist.save();

        return res.status(200).json({
            success: true,
            message: "Payment Verified Successfully",
            data: {
                payment: paymentExist,
                borrow: borrowExist
            }
        });

    } catch (error) {
        console.log("PAYMENT VERIFY ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};