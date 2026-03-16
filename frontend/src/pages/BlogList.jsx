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
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>Error : {error}</p>;
  }
  return (
    <>
      <div
        className="w-[full] h-[15rem]  flex flex-col justify-center mb-4"
        style={{ backgroundColor: "rgb(255, 255, 255)" }}
      >
        <div className="mx-auto flex ">
          <input
            type="text"
            className="outline w-[100] md:w-[60vw] rounded-sm h-[3rem] border-1 bg-white px-2"
            value={search}
            placeholder="Search here"
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          <select
            className="w-full max-w-[10rem] sm:max-w-[12rem] text-sm sm:text-base px-2 py-1 rounded-md ml-2 border border-gray-300 font-medium"
            name="tag"
            onChange={(e) => {
              setTag(e.target.value);
            }}
          >
            <option value="">All</option>
            <option value="web">web</option>
            <option value="mern">MERN</option>
            <option value="backend">Backend</option>
            <option value="frontend">Frontend</option>
          </select>
        </div>
      </div>
      {blogs.length === 0 && <NoBlogs />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
      {/* 
      prev button */}
      <div className="flex flex-row justify-between px-auto mx-4 mb-4">
        <Button
          className="block"
          variant="contained"
          color="error"
          disabled={page == 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          <KeyboardArrowLeftIcon /> Prev
        </Button>

        <Button
          variant="contained"
          className="inline-block bg-red-500"
          disabled={blogs.length == 0}
          onClick={() => {
            setPage((prev) => prev + 1);
          }}
        >
          Next <KeyboardArrowRightIcon />
        </Button>
      </div>
    </>
  );
};

export default BlogList;
