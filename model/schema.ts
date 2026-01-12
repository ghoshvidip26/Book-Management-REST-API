import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IBook extends Document {
  id: string;
  title: string;
  author: string;
  publishedYear: number;
}

const bookSchema = new Schema<IBook>(
  {
    id: { type: String, required: true, default: uuidv4 },
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishedYear: { type: Number, required: true },
  },
  { timestamps: true }
);

const Book =
  (mongoose.models.Book as mongoose.Model<IBook>) ||
  mongoose.model<IBook>("Book", bookSchema);

export default Book;
