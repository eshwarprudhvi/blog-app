import Blog from "../models/blog.js";
import cloudinary from "../config/cloudinary.js";
const createBlog = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }
    let finalTags = [];
    let imageUrl = "";
    let imagePublicId = "";
    try {
      if (req.file) {
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
          folder: "blogs",
        });
        imageUrl = uploadResult.secure_url;
        imagePublicId = uploadResult.public_id;
      }
    } catch (err) {
      console.log(err);
    }

    const blog = new Blog({
      title: title,
      description: description,
      tags: tags,
      author: req.user.id,
      image: imageUrl,
      imagePublicId: imagePublicId,
    });
    await blog.save();
    return res.status(201).json(blog);
  } catch (error) {
    return res.status(500).json({
      message: "Unable to create blog",
      error: error.message,
    });
  }
};

const getAllBlogs = async (req, res) => {
  //pagination
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 9;
    //no of docs to be skippped
    const skip = (page - 1) * limit;

    //serach
    const search = req.query.search || "";
    //search filter
    const searchFilter = {};

    if (search) {
      searchFilter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    //filter tags
    const tag = req.query.tag;

    if (tag) {
      searchFilter.tags = { $in: tag.split(",") };
    }

    //total blogs count
    const totalBlogsCount = await Blog.countDocuments(searchFilter);

    const allBlogs = await Blog.find(searchFilter)
      .populate("author", "username email profileImage")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    return res.status(200).json({
      page: page,
      blogs: allBlogs,

      pages: Math.ceil(totalBlogsCount / limit),
      totalBlogs: totalBlogsCount,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to fetch blogs",
    });
  }
};

//get blogs by author
const getBlogsByAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const blogs = await Blog.find({ author: id });
    return res.status(200).json({
      blogs: blogs,
    });
  } catch (error) {
    return res.status(500).json({
      message: "unable to fetch blogs",
    });
  }
};
const getBlogById = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id).populate(
      "author",
      "username email profileImage"
    );
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }
    return res.json(blog);
  } catch (error) {
    return res.status(500).json({
      message: "Unable to fetch  blogs",
    });
  }
};

const updateBlogById = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id).populate(
      "author",
      "username email profileImage"
    );
    if (!blog) {
      return res.status(404).json({
        message: "blog not found",
      });
    }
    if (blog.author._id.toString() != req.user.id) {
      return res.status(403).json({
        message: "Not authorized to update this blog",
      });
    }
    const { title, description, tags } = req.body;
    blog.title = title || blog.title;
    blog.description = description || blog.description;
    if (tags) {
      blog.tags = tags.trim();
    }
    if (req.file) {
      if (blog.imagePublicId) {
        await cloudinary.uploader.destroy(blog.imagePublicId);
      }
      const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "blogs",
      });
      blog.image = uploadedImage.secure_url;
      blog.imagePublicId = uploadedImage.public_id;
    }
    const updatedBlog = await blog.save();
    return res.json(updatedBlog);
  } catch (error) {
    return res.status(500).json({
      message: "Unable to update blog",
    });
  }
};

const deleteBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized to delete this blog",
      });
    }
    if (blog.imagePublicId) {
      await cloudinary.uploader.destroy(blog.imagePublicId);
    }
    await blog.deleteOne();

    return res.json({
      message: "Blog deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to delete blog",
    });
  }
};
export {
  createBlog,
  getAllBlogs,
  getBlogById,
  deleteBlogById,
  updateBlogById,
  getBlogsByAuthor,
};
