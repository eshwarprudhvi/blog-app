import { Router } from "express";
import {
  createBlog,
  deleteBlogById,
  getAllBlogs,
  getBlogById,
  getBlogsByAuthor,
  updateBlogById,
} from "../controllers/blog.js";
import protect from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = Router();

router.post("/", protect, upload.single("image"), createBlog);
router.put("/:id", protect, upload.single("image"), updateBlogById);
router.delete("/:id", protect, deleteBlogById);
//get all blogs
router.get("/", getAllBlogs);
router.get("/author/:id", getBlogsByAuthor);
router.get("/:id", getBlogById);

export default router;
