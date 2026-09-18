import express from "express"
import { addBook, deleteBook, getAllBooks, getOneBook, searchSortPaginationBooks, updateBook, uploadBookImage } from "../controllers/bookController.js"
import { hashToken } from "../middleware/hashToken.js"
import { isAdmin } from "../middleware/isAdmin.js"
import { bookValidate, updateValidation, validateBook, validateUpdate } from "../validates/bookValidate.js"
import upload from "../middleware/upload.js"

const bookRoute = express.Router()

bookRoute.post("/addbook", hashToken, isAdmin, validateBook(bookValidate), addBook)
bookRoute.post("/upload-image", hashToken, isAdmin, upload.single("image"), uploadBookImage)
bookRoute.get("/getallbook", getAllBooks)
bookRoute.get("/manage", searchSortPaginationBooks)
bookRoute.get("/getonebook/:id", hashToken, getOneBook)
bookRoute.delete("/delete/:id", hashToken, isAdmin, deleteBook)
bookRoute.put("/update/:id", hashToken, isAdmin, validateUpdate(updateValidation), updateBook)


export default bookRoute