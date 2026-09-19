import userSchema from "../models/userSchema.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv/config";
import jwt from "jsonwebtoken"
// import { sendVerificationOtp } from "../emailVerify/verifyEmail.js";
import sessionSchema from "../models/sessionSchema.js";
import { resetPasswordEmail } from "../emailVerify/resetPasswordEmail.js";
import bookSchema from "../models/bookSchema.js";
import borrowSchema from "../models/borrowSchema.js";
import crypto from "crypto";
import { sendVerificationOtp } from "../emailVerify/verifyEmail.js";


//USER REGISTRATION :

export const userRegistration = async (req, res) => {
    try {
        const { userName, email, password, role } = req.body;

        const userExist = await userSchema.findOne({ email });

        if (userExist) {
            return res.status(400).json({
                success: false,
                message: "User already exist"
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const verificationOtp = crypto.randomInt(100000, 1000000).toString();

        const verificationOtpExpires = new Date(
            Date.now() + 10 * 60 * 1000
        );

        const newUser = await userSchema.create({
            userName,
            email,
            password: hashPassword,
            role,
            verificationOtp,
            verificationOtpExpires
        });
        await sendVerificationOtp(verificationOtp, email)
        return res.status(201).json({
            success: true,
            message: "Registration successful. OTP sent to your email.",
            user: {
                id: newUser._id,
                userName: newUser.userName,
                email: newUser.email,
                role: newUser.role
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// export const userRegistration = async (req, res) => {
//     try {
//         const { userName, email, password, role } = req.body;
//         const userExist = await userSchema.findOne({ email });
//         if (userExist) {
//             return res.status(400).json({
//                 success: false,
//                 message: "User already exist"
//             })
//         }
//         // // Validate role
//         // if (!["buyer", "seller"].includes(role)) {
//         //     return res.status(400).json({
//         //         success: false,
//         //         message: "Invalid role",
//         //     });
//         // }

//         const hashPassword = await bcrypt.hash(password, 10);
//         const newUser = await userSchema.create({ userName, email, password: hashPassword, role })
//         const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.SECRET_KEY, { expiresIn: "5m" })
//         newUser.token = token;
//         await newUser.save()
//         verifyEmail(token, email)
//         return res.status(201).json({
//             success: true,
//             message: `${role} Register Successfully`,
//             token,
//             // data: newUser
//             user: {
//                 id: newUser._id,
//                 userName: newUser.userName,
//                 email: newUser.email,
//                 role: newUser.role,
//             }
//         })


//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

//USER LOGIN :

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await userSchema.findOne({ email });
        if (!userExist) {
            return res.status(404).json({
                success: false,
                message: "No User Found"
            })
        }
        const passwordCheck = await bcrypt.compare(password, userExist.password);
        if (passwordCheck && userExist.isVerified === true) {
            await sessionSchema.findOneAndDelete({ userId: userExist._id })
            await sessionSchema.create({ userId: userExist._id })

            const accessToken = jwt.sign({ id: userExist._id }, process.env.SECRET_KEY, { expiresIn: "10days" })
            const refreshToken = jwt.sign({ id: userExist._id }, process.env.SECRET_KEY, { expiresIn: "30days" })

            userExist.isLogIn = true;
            await userExist.save();
            return res.status(200).json({
                success: true,
                message: "User Login Successfully",
                user: {
                    id: userExist._id,
                    userName: userExist.userName,
                    email: userExist.email,
                    role: userExist.role
                },
                accessToken: accessToken,
                refreshToken: refreshToken
            })
        }
        else if (!passwordCheck) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials !"
            })
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Please Verify First !! Then Come To Login"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//USER LOGGED OUT :

export const logOut = async (req, res) => {
    try {
        const userExist = await userSchema.findById({ _id: req.userId })
        if (!userExist) {
            return res.status(404).json({
                success: false,
                message: "No User Found"
            })
        }

        const userSession = await sessionSchema.findOne({ userId: req.userId })

        if (userSession) {
            await sessionSchema.findOneAndDelete({ userId: req.userId })
            userExist.isLogIn = false;
            await userExist.save();
            return res.status(200).json({
                success: true,
                message: "User Logged Out Successfully."
            })
        }
        else {
            return res.status(404).json({
                success: false,
                message: "User had No Session"
            })
        }


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}



// GET ALL USERS
export const getAllUsers = async (req, res) => {

    try {

        const users = await userSchema
            .find()
            .select("-password");

        return res.status(200).json({

            success: true,
            message: "Users fetched successfully",
            totalUsers: users.length,
            data: users

        });

    } catch (error) {

        return res.status(500).json({

            success: false,
            message: error.message

        });

    }

}


//CHANGE USER PASSWORD :

export const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const userExist = await userSchema.findById(req.userId);
        if (!userExist) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            })
        }
        const passwordCheck = await bcrypt.compare(oldPassword, userExist.password);
        if (!passwordCheck) {
            return res.status(400).json({
                success: false,
                message: "Old Password is Incorrect"
            })
        }
        if (oldPassword === newPassword) {
            return res.status(400).json({
                success: false,
                message: "New Password cannot be same as te Old Password !"
            })
        }

        const hashPassword = await bcrypt.hash(newPassword, 10);
        userExist.password = hashPassword;
        await userExist.save();
        return res.status(200).json({
            success: true,
            message: "Password Changed Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//FORGET USER PASSWORD :

export const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const userExist = await userSchema.findOne({ email });
        if (!userExist) {
            return res.status(404).json({
                success: false,
                message: "No User Found"
            })
        }

        const token = await jwt.sign({ id: userExist._id }, process.env.SECRET_KEY, { expiresIn: "10m" })
        await resetPasswordEmail(token, email);
        return res.status(200).json({
            success: true,
            message: "Password Reset Link Sent Successfully.",
            token
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//RESET PASSWORD :

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;
        if (!newPassword) {
            return res.status(400).json({
                success: false,
                message: "Newpassword is Required"
            })
        }

        jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return res.status(401).json({
                        success: false,
                        message: "Reset Link Expired"
                    })
                }
                return res.status(401).json({
                    success: false,
                    message: "Reset Link Invalid"
                })
            }
            else {
                const { id } = decoded;
                const userExist = await userSchema.findById(id);
                if (!userExist) {
                    return res.status(404).json({
                        success: false,
                        message: "User Not Found"
                    })
                }
                const hashPassword = await bcrypt.hash(newPassword, 10);
                userExist.password = hashPassword;
                await userExist.save();
                return res.status(200).json({
                    success: true,
                    message: "Reset Password Successfully"
                })
            }
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getDashboardStats = async (req, res) => {

    try {

        // Total books
        const totalBooks = await bookSchema.countDocuments();


        // Total students
        const totalStudents = await userSchema.countDocuments({
            role: "student"
        });


        // Total admins
        const totalAdmins = await userSchema.countDocuments({
            role: "admin"
        });


        // Currently borrowed books
        const borrowedBooks = await borrowSchema.countDocuments({
            status: "borrowed"
        });


        // Overdue books
        const overdueBooks = await borrowSchema.countDocuments({
            status: "overdue"
        });


        // Available copies
        const books = await bookSchema.find({}, "availableCopies");

        const availableBooks = books.reduce(
            (total, book) => total + book.availableCopies,
            0
        );


        return res.status(200).json({

            success: true,

            message: "Dashboard Statistics Fetched Successfully",

            data: {

                totalBooks,
                availableBooks,
                borrowedBooks,
                overdueBooks,
                totalStudents,
                totalAdmins

            }

        });

    } catch (error) {

        return res.status(500).json({

            success: false,
            message: error.message

        });

    }

}