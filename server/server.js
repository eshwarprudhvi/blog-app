import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();
const port = process.env.PORT;

connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log("app is listening on the port 3000");
});
