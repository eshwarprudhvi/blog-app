import { Router } from "express";
import {
  createBlog,
  deleteBlogById,
  getAllBlogs,
  getBlogById,
  updateBlogById,
} from "../controllers/blog.js";
import protect from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", protect, createBlog);
router.put("/:id", protect, updateBlogById);
router.delete("/:id", protect, deleteBlogById);
//get all blogs
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);

export default router;
