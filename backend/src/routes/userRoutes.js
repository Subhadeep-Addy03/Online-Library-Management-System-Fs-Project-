import express from "express"
import { changePassword, forgetPassword, getAllUsers, getDashboardStats, login, logOut, resetPassword, userRegistration } from "../controllers/userController.js"
import { userValidate, validateUser } from "../validates/userValidate.js"
import { hashToken } from "../middleware/hashToken.js";
import { changePasswordValidate, validateChangePassword } from "../validates/changePasswordValidate.js";
import { forgetPasswordValidate, validateForgetPassword } from "../validates/forgetPasswordValidate.js";
import { resetPasswordValidate, validateResetPassword } from "../validates/resetPasswordValidate.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { resendOtp, verifyOtp } from "../middleware/verifyOtp.js";

const userRoute = express.Router()

userRoute.post("/register", validateUser(userValidate), userRegistration);
userRoute.post("/verify-otp", verifyOtp)
userRoute.post("/resend-otp", resendOtp)
userRoute.post("/login", login)
userRoute.delete("/logout", hashToken, logOut)
userRoute.get("/getallusers", hashToken, isAdmin, getAllUsers)
userRoute.put("/change-password", hashToken, validateChangePassword(changePasswordValidate), changePassword)
userRoute.post("/forgot-password", validateForgetPassword(forgetPasswordValidate), forgetPassword)
userRoute.post("/reset-password/:token", validateResetPassword(resetPasswordValidate), resetPassword)
userRoute.get("/stats", hashToken, isAdmin, getDashboardStats)

export default userRoute