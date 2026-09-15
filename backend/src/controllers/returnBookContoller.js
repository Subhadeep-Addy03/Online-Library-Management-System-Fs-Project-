import bookSchema from "../models/bookSchema.js";
import borrowSchema from "../models/borrowSchema.js";


export const returnBook = async (req, res) => {
    try {
        const { borrowId } = req.params;

        //Find borrow record
        const borrowExist = await borrowSchema.findById(borrowId)
        if (!borrowExist) {
            return res.status(404).json({
                success: false,
                message: "Borrow Record Not Found"
            })
        }

        //Check whether this borrow belongs to logged-in student
        if (borrowExist.userId.toString() !== req.userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You cannot return this book"
            });
        }

        //Check whether book is already returned
        if (borrowExist.status === "returned") {
            return res.status(400).json({
                success: false,
                message: "You Already Returned This Book"
            })
        }

        //Find Book
        const bookExist = await bookSchema.findById(borrowExist.bookId);
        if (!bookExist) {
            return res.status(404).json({
                success: false,
                message: "No Book Found"
            })
        }

        //Update borrow record
        borrowExist.returnDate = new Date();
        borrowExist.status = "returned";

        await borrowExist.save();

        //Increases available copies
        bookExist.availableCopies += 1;

        await bookExist.save();
        return res.status(200).json({
            success: true,
            message: "Book Returned Successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}