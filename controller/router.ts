import express from "express";
import "dotenv/config";
import Book from "../model/schema.js";
const router = express.Router();

router.post("/books", async (req, res) => {
    try {    
        const { title, author, publishedYear } = req.body;
        const isExists = await Book.find({ title });
        console.log("Book exists: ", isExists);
        console.log("Request body: ", req.body);

        if (isExists) {
            return res.status(400).json({
                success: false,
                msg: 'Book already exists'
            });
        }

        const book = new Book({
            title,
            author,
            publishedYear,
        });
        
        const bookData = await book.save();
        console.log("Book ID: ",bookData._id);
        return res.status(200).json({
            success: true,
            msg: 'Book added successfully!',
            bookData
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error 
        });
    }
});

router.get("/books", async (req, res) => {
    try {
        const books = await Book.find();
        return res.status(200).json({
            success: true,
            msg: 'Books fetched successfully!',
            books
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error  
        });
    }
});

router.get("/books/:id", (req, res) => {
    const { id } = req.params;
    const book = Book.findById(id);
    return res.status(200).json({
        success: true,
        msg: 'Book fetched successfully!',
        book
    });
});

router.put("/books/:id", (req, res) => {
    const { id } = req.params;
    const book = Book.findById(id);
    const update = Book.findByIdAndUpdate(id, req.body);
    return res.status(200).json({
        success: true,
        msg: 'Book updated successfully!',
        update
    });
});

router.delete("/books/:id", (req, res) => {
    const { id } = req.params;
    const book = Book.findByIdAndDelete(id);
    return res.status(200).json({
        success: true,
        msg: 'Book deleted successfully!',
        book
    });
});

export default router;
