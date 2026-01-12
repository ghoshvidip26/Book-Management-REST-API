import express from "express";
import "dotenv/config";
import Book from "../model/schema.js";
const router = express.Router();
import multer from "multer";
import { readFile } from "fs/promises";
import Papa from "papaparse";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

router.post("/books", async (req, res) => {
  try {
    const { title, author, publishedYear } = req.body;
    const isExists = await Book.findOne({ title });
    console.log("Book exists: ", isExists);
    console.log("Request body: ", req.body);

    if (isExists) {
      return res.status(400).json({
        success: false,
        msg: "Book already exists",
      });
    }

    const book = new Book({
      title,
      author,
      publishedYear,
    });

    const bookData = await book.save();
    console.log("Book ID: ", bookData._id);
    return res.status(200).json({
      success: true,
      msg: "Book added successfully!",
      bookData,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error,
    });
  }
});

router.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json({
      success: true,
      msg: "Books fetched successfully!",
      books,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error,
    });
  }
});

router.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const book = await Book.findOne({ id });
    console.log(book);
    return res.status(200).json({
      success: true,
      msg: "Book fetched successfully!",
      book,
    });
  } catch (error) {
    return res.status(400).json({ success: false, msg: error });
  }
});

router.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const update = await Book.findOneAndUpdate(
      { id }, // find by your UUID field
      req.body, // what to update
      {
        new: true, // return updated document
        runValidators: true,
      }
    );

    console.log("Update: ", update);
    return res.status(200).json({
      success: true,
      msg: "Book updated successfully!",
      update,
    });
  } catch (error) {
    return res.status(400).json({ success: false, msg: error });
  }
});

router.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findOneAndDelete({ id });

    if (!book) {
      return res.status(404).json({
        success: false,
        msg: "Book not found",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Book deleted successfully!",
      book,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error,
    });
  }
});

const upload = multer({ dest: "uploads/" });
router.post("/books/import", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;

    const fileContent = await readFile(filePath, "utf8");

    const csvData = Papa.parse(fileContent, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
    });
    const books = csvData.data.map((f: any) => ({
      title: f.title,
      author: f.author,
      publishedYear: f.publishedYear,
    }));

    await Book.insertMany(books);

    return res.json({
      success: true,
      data: csvData.data,
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

export default router;
