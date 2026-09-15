import mongoose from "mongoose";
import bookSchema from "../models/bookSchema.js";

//ADD BOOK BY ADMIN ONLY : 

export const addBook = async (req, res) => {
    try {
        const { title, author, category, bookNo, quantity, publishYear, image, description } = req.body;
        const existingBook = await bookSchema.findOne({ bookNo });
        if (existingBook) {
            return res.status(400).json({
                success: false,
                message: "Book is Already Present of this BookNo"

            })
        }
        const newBook = await bookSchema.create({ title, author, category, bookNo, quantity, publishYear, availableCopies: quantity, image, description, addedBy: req.userId })

        return res.status(201).json({
            success: true,
            message: "Book Added Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//GET ALL BOOK (USER/ADMIN) :

export const getAllBooks = async (req, res) => {
    try {
        const readAll = await bookSchema.find();
        return res.status(200).json({
            success: true,
            message: "All Book Fetched",
            data: readAll
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//GET ONE BOOK(USER/ADMIN) :

export const getOneBook = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Inavlid Book Id,Check Again !!"
            })
        }
        const bookExist = await bookSchema.findById({ _id: id })
        if (!bookExist) {
            return res.status(404).json({
                success: false,
                message: "Book Not Found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "One Book Fetched",
            data: bookExist
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// UPDATE BOOK BY ADMIN ONLY :

export const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Inavlid Book Id,Check Again !!"
            })
        }
        const { title, author, category, publishYear, quantity, description, image } = req.body;
        const bookExist = await bookSchema.findById({ _id: id })
        if (!bookExist) {
            return res.status(404).json({
                success: false,
                message: "Book Not Found"
            })
        }
        bookExist.title = title;
        bookExist.author = author;
        bookExist.category = category;
        bookExist.publishYear = publishYear;
        bookExist.quantity = quantity;
        bookExist.description = description;
        bookExist.image = image;

        if (quantity) {
            bookExist.quantity = quantity;
            bookExist.availableCopies = quantity;
        }

        await bookExist.save();
        return res.status(200).json({
            success: true,
            message: "Book Updated Successfully",
            data: bookExist
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//DELETE BOOK BY ADMIN :

export const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Inavlid Book Id Check Again !!"
            })
        }
        const bookExist = await bookSchema.findById({ _id: id });
        if (!bookExist) {
            return res.status(404).json({
                success: false,
                message: "Book Not Found Or Already Deleted"
            })
        }
        await bookSchema.findOneAndDelete({ _id: id })
        return res.status(200).json({
            success: true,
            message: "Book Deleted Successflly"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// SEARCHING & PAGGINATION & SORTING :

export const searchSortPaginationBooks = async (req, res) => {
    try {

        const {
            search = "",
            page = 1,
            limit = 10,
            sort = "createdAt"
        } = req.query;

        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        const query = {};

        // Search
        if (search.trim() !== "") {
            query.$or = [
                {
                    title: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    author: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    category: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ];
        }

        // Pagination
        const skip = (pageNumber - 1) * limitNumber;

        // Total Books
        const totalBooks = await bookSchema.countDocuments(query);

        // Books
        const books = await bookSchema
            .find(query)
            .sort(sort)
            .skip(skip)
            .limit(limitNumber);

        return res.status(200).json({
            success: true,
            currentPage: page,
            totalPages: Math.ceil(totalBooks / limitNumber),
            totalBooks,
            data: books
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
}