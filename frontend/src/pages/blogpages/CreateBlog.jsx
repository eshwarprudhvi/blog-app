import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("tags", tags);
      if (image) {
        formData.append("image", image);
      }
      const res = await axios.post(
        "http://localhost:3000/api/blogs",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("Blog created successfully  ");

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "failed to create blog");
    }
  };
  return (
    <div className="flex flex-col justify-center  pt-10 bg-red-300 max-w-full mt-5 p-4 ">
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-col grid grid-cols-1 gap-2 text-xl p-2 border-red-300 "
      >
        <h1 className="text-4xl">Create Blog</h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="title">Enter title:</label>
          <input
            type="text"
            name="title"
            placeholder="Enter title"
            onChange={(e) => setTitle(e.target.value)}
            className="h-[2rem] bg-white p-3 h-[3rem] rounded-md text-xl outline-none w-[70%]"
            value={title}
            required
          />
        </div>
        <div>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description">Enter the description:</label>
          <textarea
            placeholder="enter description"
            name="description"
            id=""
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="h-[20rem] bg-white p-3 h-[3rem] rounded-md text-xl outline-none w-[70%] overflow-auto resize-none"
            required
          ></textarea>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="tags">Enter tags:</label>
          <input
            type="text"
            name="tags"
            placeholder="Enter Tag"
            onChange={(e) => setTags(e.target.value)}
            className="h-[2rem] bg-white p-3 h-[3rem] rounded-md text-xl outline-none w-[70%]"
            value={tags}
          />
        </div>
        <div>
          <button
            type="submit"
            className="p-2 mt-2 bg-blue-300 w-fit rounded-md  hover:bg-blue-500   text-white font-semibold cursor-pointer "
          >
            Create Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
