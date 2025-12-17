import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();
const port = process.env.PORT;

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.listen(port, () => {
  console.log("app is listening on the port 3000");
});
