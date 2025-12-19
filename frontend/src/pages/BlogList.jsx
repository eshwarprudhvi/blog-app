import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Button from "@mui/material/Button";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
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
      <div className="w-[full] h-[15rem] bg-blue-100 flex flex-col justify-center mb-4">
        <div className="mx-auto flex ">
          <input
            type="text"
            className="outline w-[100] md:w-[60vw] rounded-sm h-[3rem] bg-gray-200 px-2"
            value={search}
            placeholder="Search here"
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          <select
            className="w-full w-[30%] max-w-[10rem]"
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.length === 0 && <p>No blogs found</p>}
        {blogs.map((blog) => {
          return (
            <Card
              key={blog._id}
              title={blog.title}
              description={blog.description}
              tag={blog.tag}
              author={blog.author}
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
