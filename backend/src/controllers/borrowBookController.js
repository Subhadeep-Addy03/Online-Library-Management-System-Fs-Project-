import borrowSchema from "../models/borrowSchema.js";
import bookSchema from "../models/bookSchema.js";
import userSchema from "../models/userSchema.js";
import { bookBorrowedEmail } from "../emailVerify/resetPasswordEmail.js";



// export const borrowBook = async (req, res) => {
//     try {

//         const { bookId } = req.params;
//         //Book Check
//         const bookexist = await bookSchema.findById(bookId);
//         if (!bookexist) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Book Not Found Or No Book Found"
//             })
//         }
//         //Book Availability 
//         if (bookexist.availableCopies <= 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Book Not Available Right Now."
//             })
//         }
//         ///check if te user already borrowed the same book
//         const alreadyBorrowed = await borrowSchema.findOne({
//             userId: req.userId,
//             bookId: bookId,
//             status: "borrowed"
//         });
//         if (alreadyBorrowed) {
//             return res.status(400).json({
//                 success: false,
//                 message: "You Have Already Borrowed This Book."
//             })
//         }
//         //calculate due date
//         const borrowDate = new Date();
//         const dueDate = new Date(borrowDate);
//         dueDate.setDate(dueDate.getDate() + 3);

//         //create new borrow record
//         const borrow = await borrowSchema.create({
//             userId: req.userId,
//             bookId: bookId,
//             borrowDate: borrowDate,
//             dueDate: dueDate,
//             status: "borrowed"
//         })

//         bookexist.availableCopies -= 1;
//         await bookexist.save();
//         return res.status(200).json({
//             success: true,
//             message: "Book Borrowed Successfully",
//             data: borrow
//         })
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }


export const borrowBook = async (req, res) => {
    try {

        const { bookId } = req.params;

        const bookexist = await bookSchema.findById(bookId);

        if (!bookexist) {
            return res.status(404).json({
                success: false,
                message: "Book Not Found Or No Book Found"
            })
        }

        if (bookexist.availableCopies <= 0) {
            return res.status(400).json({
                success: false,
                message: "Book Not Available Right Now."
            })
        }

        const alreadyBorrowed = await borrowSchema.findOne({
            userId: req.userId,
            bookId: bookId,
            status: "borrowed"
        });

        if (alreadyBorrowed) {
            return res.status(400).json({
                success: false,
                message: "You Have Already Borrowed This Book."
            })
        }

        const borrowDate = new Date();

        const dueDate = new Date(borrowDate);
        dueDate.setDate(dueDate.getDate() + 1);

        const borrow = await borrowSchema.create({
            userId: req.userId,
            bookId: bookId,
            borrowDate: borrowDate,
            dueDate: dueDate,
            status: "borrowed"
        })

        bookexist.availableCopies -= 1;
        await bookexist.save();

        const userExist = await userSchema.findById(req.userId);

        if (userExist) {
            await bookBorrowedEmail(
                userExist.email,
                userExist.userName,
                bookexist.title,
                borrowDate,
                dueDate
            );
        }

        return res.status(200).json({
            success: true,
            message: "Book Borrowed Successfully",
            data: borrow
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


//Get my borrowed books 

export const getMyBorrowBooks = async (req, res) => {
    try {
        const borrowBooks = await borrowSchema.find({ userId: req.userId }).populate("bookId")
        return res.status(200).json({
            success: true,
            message: "Borrowed Books Fetched Successfully",
            data: borrowBooks
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//Get All Borrow Books Of Users By Admin : 

export const getAllBorrowedBooks = async (req, res) => {
    try {
        const borrowedBooks = await borrowSchema.find().populate("userId").populate("bookId");
        return res.status(200).json({
            success: true,
            message: "All Borrowed Records Fetched Successfully",
            data: borrowedBooks
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//Overdue handling by admin 

export const overDue = async (req, res) => {
    try {
        const today = new Date();
        const overDueBook = await borrowSchema.find({
            status: "borrowed",
            dueDate: { $lt: today }
        }).populate("userId").populate("bookId")
        if (overDueBook) {
            return res.status(200).json({
                success: true,
                message: "No Overdue Book Record Found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Overdue Book Fetched Successfully",
            data: overDueBook
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message
        })
    }
}