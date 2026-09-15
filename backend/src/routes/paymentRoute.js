import express from "express"
import { createPaymentRecord, getAllPaymentHistory, getMyPaymentHistory, paymentOrder, verifyPayment } from "../controllers/paymentController.js";
import { hashToken } from "../middleware/hashToken.js";
import { isStudent } from "../middleware/isStudent.js";
import { isAdmin } from "../middleware/isAdmin.js";

const paymentRoute = express.Router();

paymentRoute.post("/payment-order/:borrowId", hashToken, isStudent, paymentOrder)
paymentRoute.post("/create-payment/:borrowId", hashToken, isStudent, createPaymentRecord)
paymentRoute.get("/payment-history", hashToken, isStudent, getMyPaymentHistory)
paymentRoute.get("/payment-history-admin", hashToken, isAdmin, getAllPaymentHistory)
paymentRoute.put("/payment-verify/:paymentId", hashToken, isStudent, verifyPayment)





export default paymentRoute