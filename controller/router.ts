import express from "express";
import "dotenv/config";
import Book from "../model/schema.js";
const router = express.Router();
import multer from 'multer';
import path from 'path';
import { readFile } from 'fs/promises';
import Papa from 'papaparse';

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize upload middleware and add file size limit
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 } // 1MB file size limit
}).single('myFile'); 

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

router.get("/books/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.status(200).json({
            success: true,
            msg: 'Book fetched successfully!',
            book
        });
    } catch (error) {
        return res.status(400).json({ success: false, msg: error });
    }
});

router.put("/books/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const update = await Book.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json({
            success: true,
            msg: 'Book updated successfully!',
            update
        });
    } catch (error) {
        return res.status(400).json({ success: false, msg: error });
    }
});

router.delete("/books/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            msg: 'Book deleted successfully!',
            book
        });
    } catch (error) {
        return res.status(400).json({ success: false, msg: error });
    }
});

router.post("/books/import", upload, async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Please upload a CSV file' });
        }
        const fileContent = await readFile(req.file.path, 'utf8');
        const csvData = Papa.parse(fileContent, {
    header: true,         // First row contains headers
    skipEmptyLines: true, // Skip blank lines
    dynamicTyping: true   // Convert numbers and booleans
  });
  console.log(`Headers: ${csvData.meta.fields}`);
  console.log(`Data: ${csvData.data}`);

        // Parsing logic would go here
        return res.status(200).json({data: csvData.data, success: true, msg: 'File uploaded successfully!' });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
});

export default router;
