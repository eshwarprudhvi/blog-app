import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Button from "@mui/material/Button";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import NoBlogs from "../components/NoBlogs";
const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [tag, setTag] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetch(
        `http://localhost:3000/api/blogs?search=${search}&page=${page}&tag=${tag}`
      )
        .then((res) => res.json())
        .then((data) => {
          setBlogs(data.blogs);
          setLoading(false);
        })
        .catch((e) => setError(e.message))
        .finally(() => {
          setLoading(false);
        });
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [search, tag, page]);
  if (loading && blogs.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <p className="text-red-600 font-medium bg-red-50 px-4 py-2 rounded-lg border border-red-200">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12">
      {/* Header / Search Section */}
      <div className="bg-white border-b border-gray-200 mb-8 py-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-6">
            Explore the Blog
          </h1>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-2xl mx-auto">
            <input
              type="text"
              className="w-full sm:w-2/3 h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 shadow-sm transition duration-200"
              value={search}
              placeholder="Search articles..."
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />

            <select
              className="w-full sm:w-1/3 h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 shadow-sm transition duration-200 bg-white"
              name="tag"
              value={tag}
              onChange={(e) => {
                setTag(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Categories</option>
              <option value="web">Web</option>
              <option value="mern">MERN</option>
              <option value="backend">Backend</option>
              <option value="frontend">Frontend</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {blogs.length === 0 && !loading && <NoBlogs />}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => {
            return (
              <Card
                key={blog._id}
                blogId={blog._id}
                title={blog.title}
                description={blog.description}
                tag={blog.tags}
                author={blog.author}
                image={blog.image}
              />
            );
          })}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-12 gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
          >
            <KeyboardArrowLeftIcon className="mr-1 h-5 w-5" /> Previous
          </button>

          <button
            disabled={blogs.length === 0}
            onClick={() => {
              setPage((prev) => prev + 1);
            }}
            className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
          >
            Next <KeyboardArrowRightIcon className="ml-1 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
