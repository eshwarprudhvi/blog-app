import mongoose from "mongoose";
import blogTags from "../utils/blogTags.js";
const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      enum: blogTags,
      default: [],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
