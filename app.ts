import express from "express";
import cors from "cors";
import "dotenv/config";
import router from "./controller/router.js";
import { dbConnect } from "./model/mongo.js";
const app = express();
const port = process.env.PORT;

dbConnect()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log(e);
  });
app.use(cors());
app.use(express.json());
app.use("/api", router);
app.listen(port, () => {
  console.log(`Server listening on port no ${port}`);
});
