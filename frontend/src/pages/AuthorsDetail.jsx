import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import profileImage from "../assets/profile.png";
import axios from "axios";
import NoBlogs from "../components/NoBlogs";

const AuthorsDetail = () => {
  const { id } = useParams(); // get author id from URL
  const [author, setAuthor] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/users/${id}`, {
          withCredentials: true,
        });
        setAuthor(res.data);
      } catch (error) {
        console.error("Failed to fetch author", error);
      }
    };

    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/blogs/author/${id}`,
          { withCredentials: true }
        );
        setBlogs(res.data.blogs);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      }
    };

    fetchAuthor();
    fetchBlogs();
  }, [id]);

  if (!author) return <p className="text-center mt-10">Loading author...</p>;

  return (
    <>
      <section className="mt-7 flex flex-col items-center">
        <div className="relative">
          {/* Profile Image */}
          <img
            src={author.profileImage || profileImage}
            alt="author-profile"
            className="h-[12rem] w-[12rem] mt-2 rounded-full border-10 border-blue-300 object-cover"
          />

          {/* Username */}
          <div className="flex flex-row mt-3 justify-center">
            <span className="font-semibold text-lg">Username: </span>
            <span className="ml-2 text-lg">{author.username}</span>
          </div>
        </div>
      </section>

      <h2 className="mt-10 px-5 text-3xl">Author Blogs</h2>

      {/* Blogs of the author */}
      <section className="mt-4 flex flex-col gap-3">
        {blogs.length === 0 ? (
          <NoBlogs />
        ) : (
          blogs.map((blog, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 rounded-md shadow-xl"
            >
              {/* Blog Image */}
              <img
                src={
                  blog.image ||
                  "https://blogs.oregonstate.edu/patss/wp-content/themes/koji/assets/images/default-fallback-image.png"
                }
                alt={blog.title}
                className="w-20 h-20 object-cover rounded-md"
              />

              {/* Blog Title */}
              <h3 className="flex-1 text-lg font-semibold">{blog.title}</h3>

              {/* View Button */}
              <Link
                to={`/${blog._id}`}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                View
              </Link>
            </div>
          ))
        )}
      </section>
    </>
  );
};

export default AuthorsDetail;
