import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import profile from "../../assets/profile.png";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/blogs/${id}`);
        setBlog(res.data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchBlog();
  }, [id]);

  const isAuthor = user && blog?.author._id === user.id;
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/blogs/${id}`, {
        withCredentials: true,
      });

      navigate("/");
    } catch (error) {
      toast.error(error.message);
      setError(error.message);
    }
  };
  if (error) {
    return <p>{error.message}</p>;
  }
  if (!blog) {
    return <p>Loading...</p>;
  }
  return (
    <div className="p-2 ">
      <Link to="/" className="no-underline text-lg text-blue-600">
        Go back to home page
      </Link>
      <div className="flex flex-col w-[80%] bg-gray-200 shadow-md mx-auto p-3 mt-8 rounded-md h-fit">
        <h1 className="text-3xl">{blog.title}</h1>
        <div className="rounded-md my-1">
          <img
            alt="blog-image"
            src={blog.image ? blog.image : ""}
            className="w-full h-[30%] w-[80%] py-2 rounded-xl object-fit"
          />
        </div>
        <p className="text-md md:text-lg lg:text-2xl">{blog.description}</p>

        <div className="flex flex-row gap-1 cursor-pointer my-3">
          <img src={profile} alt="logo" className="w-10 h-10 rounded-full " />

          <div className="flex flex-col justify-between md:text-xl">
            <p className="text-xs md:text-sm lg:text-md text-gray-500 font-medium">
              {blog.author.username}
            </p>
            <p className="text-xs md:text-sm text-gray-400">
              {blog.author.email}
            </p>
          </div>
        </div>
        {isAuthor && (
          <div className="flex flex-row gap-4">
            <button
              className="p-2 mt-2 px-3 bg-blue-300 w-fit rounded-md  hover:bg-blue-500  text-white font-semibold cursor-pointer "
              onClick={() => navigate(`/edit-blog/${id}`)}
            >
              Edit
            </button>
            <button
              className="p-2 mt-2 px-3 bg-red-400 w-fit rounded-md hover:bg-red-500 text-white cursoe-pointer text-white"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
