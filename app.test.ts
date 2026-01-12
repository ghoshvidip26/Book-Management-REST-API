import { app } from "./app.js";
import { dbConnect } from "./model/mongo.js";
import request from "supertest";

beforeAll(async () => {
  await dbConnect();
});

describe("GET /api/books", () => {
  it("should fetch all books", async () => {
    const res = await request(app).get("/api/books");
    console.log("Status:", res.status);
    console.log("Body:", res.body);

    expect(res.status).toEqual(200);
    expect(Array.isArray(res.body.books)).toBe(true);
  });
});

describe("GET /api/books/:id", () => {
  it("get any specific book", async () => {
    const res = await request(app).get(
      "/api/books/09dbeda7-d353-4bc4-943a-8b7b946686db"
    );
    console.log("Status:", res.status);
    console.log("Body:", res.body);

    expect(res.status).toEqual(200);
    expect(!Array.isArray(res.body)).toBe(true);
  });
});

describe("POST /api/books", () => {
  it("should add a new book", async () => {
    const newBook = {
      title: "Nobel laureate, Gitanjali",
      author: "Rabindranath Tagore",
      publishedYear: 1910,
    };
    const response = await request(app).post("/api/books").send(newBook);
    console.log("Status:", response.status);
    console.log("Body:", response.body);
    const expectedResponse = {
      author: response.body.author,
      publishedYear: response.body.publishedYear,
      title: response.body.title,
    };
    expect(response.status).toBe(201);
    expect(expectedResponse).toEqual(newBook);
  });
});

describe("DELETE /api/books/:id", () => {
  it("it should delete book by id", async () => {
    const res = await request(app).delete(
      "/api/books/09dbeda7-d353-4bc4-943a-8b7b946686db"
    );
    console.log("Status:", res.status);
    console.log("Body:", res.body);
    expect(res.status).toEqual(200);
    expect(!Array.isArray(res.body)).toBe(true);
  });
});
