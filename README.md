# 📚 Book Management API

A Node.js + TypeScript backend for managing books with full CRUD support, CSV import, MongoDB persistence, request logging, and API tests.

---

## 🚀 Features

- Create, Read, Update, Delete books  
- Bulk import books from CSV  
- UUID-based book IDs  
- MongoDB + Mongoose  
- CSV parsing & manual validation  
- API testing with Jest & Supertest  
- Request logging with Morgan  

---

## 🛠 Tech Stack

- Node.js  
- Express  
- TypeScript  
- MongoDB + Mongoose  
- Multer (file uploads)  
- PapaParse (CSV parsing)  
- Jest + Supertest (testing)  
- Morgan (HTTP logging)

---

## 📦 Setup Instructions

### 1️⃣ Clone the repo
```bash
git clone <your-repo-url>
cd book-management-app
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Configure environment variables
Create a .env file in the root:
```bash
MONGO_URI=
PORT=
```

### 4️⃣ Run the server
```bash
npm start
```

## 🧪 Running Tests
Runs Jest + Supertest API tests.
```bash
npm test
```

## 📂 CSV Import
Endpoint:
```bash
POST /books/import
```

Format table: 
| Key  | Type | Value     |
| ---- | ---- | --------- |
| file | File | books.csv |

CSV format:
```bash
title,author,publishedYear
1984,George Orwell,1949
The Hobbit,J.R.R. Tolkien,1937
```

## 📡 API Endpoints
| Method | Route         | Description          |
| ------ | ------------- | -------------------- |
| GET    | /books        | Get all books        |
| POST   | /books/import | Import books via CSV |
| PUT    | /books/:id    | Update a book        |
| DELETE | /books/:id    | Delete a book        |

## 📝 Example Book Object
```bash
{
  "id": "c9c9cbd0-4f42-4f02-aeb3-71c9d3b02d2a",
  "title": "1984",
  "author": "George Orwell",
  "publishedYear": 1949
}
```

## 🧠 Notes

- MongoDB _id is hidden from API consumers; UUID id is used instead.
- CSV import uses manual validation for maximum data safety.
- Morgan logs every API request.
