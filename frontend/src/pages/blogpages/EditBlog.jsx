import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/blogs/${id}`);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setTags(res.data.tags);
        setImage(res.data.image);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("tags", tags);
      if (image) {
        formData.append("image", image);
      }
      const finalTags = tags;

      const res = await axios.put(
        `http://localhost:3000/api/blogs/${id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("blog updated successfully");

      navigate(`/${id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "failed to edit blog");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col justify-center  pt-10 bg-red-300 max-w-full mt-5 p-4 ">
      <form action="" onSubmit={handleSubmit}>
        <h1 className="text-4xl">Edit Blog</h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="title">Enter title:</label>
          <input
            type="text"
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
            required
            placeholder="Enter Tag"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
            className="h-[2rem] bg-white p-3 h-[3rem] rounded-md text-xl outline-none w-[70%]"
          />
        </div>
        <div>
          <button
            className="p-2 mt-2 bg-blue-300 w-fit rounded-md  hover:bg-blue-500   text-white font-semibold cursor-pointer "
            type="submit"
            disabled={loading}
          >
            {loading ? "Updating" : "Edit Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
