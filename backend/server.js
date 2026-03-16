import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import errorHandler from "./middlewares/errorHandlingMiddleware.js";
import cors from "cors";
const port = process.env.PORT || 3000;

connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.get("/cloud-test", async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(
      "https://res.cloudinary.com/demo/image/upload/sample.jpg"
    );
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log("app is listening on the port 3000");
});
