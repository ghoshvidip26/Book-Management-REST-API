import mongoose, { Schema, Document } from "mongoose";
export interface IBook extends Document {
  id: string;
  title: string;
  author: string;
  publishedYear: number;
}

const bookSchema = new Schema<IBook>(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishedYear: { type: Number, required: true }
  },
  { timestamps: true }
);

const Book =
  mongoose.models.Book || mongoose.model<IBook>("Book", bookSchema);

export default Book;