import express from "express";
import cors from "cors";
import "dotenv/config";
import router from "./controller/router.js";
import { dbConnect } from "./model/mongo.js";
import { errorHandler } from "./middleware/errorHandler.js";
export const app = express();
const port = process.env.PORT;

const connect = async () => {
  await dbConnect();
};
connect();
app.use(cors());
app.use(express.json());
app.use("/api", router);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server listening on port no ${port}`);
});
