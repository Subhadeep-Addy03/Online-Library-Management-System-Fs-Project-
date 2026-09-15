import express from "express"
import { borrowBook, getAllBorrowedBooks, getMyBorrowBooks, overDue } from "../controllers/borrowBookController.js"
import { hashToken } from "../middleware/hashToken.js";
import { isStudent } from "../middleware/isStudent.js";
import { returnBook } from "../controllers/returnBookContoller.js";
import { isAdmin } from "../middleware/isAdmin.js";

const borrowBookRoute = express.Router();

borrowBookRoute.post("/borrow-book/:bookId", hashToken, isStudent, borrowBook);
borrowBookRoute.put("/return-book/:borrowId", hashToken, isStudent, returnBook);
borrowBookRoute.get("/my-borrowed-books", hashToken, isStudent, getMyBorrowBooks);
borrowBookRoute.get("/all-borrowed-books", hashToken, isAdmin, getAllBorrowedBooks)
borrowBookRoute.get("/overdue", hashToken, isAdmin, overDue)






export default borrowBookRoute