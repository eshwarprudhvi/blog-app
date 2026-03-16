import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import profile from "../../assets/profile.png";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`https://blog-app-0j5v.onrender.com/api/blogs/${id}`);
        setBlog(res.data);
      } catch (error) {
        toast.error(error.message);
        setError("Failed to load the article.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const isAuthor = user && blog?.author._id === user.id;

  const handleDelete = async () => {
    if(!window.confirm("Are you sure you want to delete this blog post?")) return;
    try {
      await axios.delete(`https://blog-app-0j5v.onrender.com/api/blogs/${id}`, {
        withCredentials: true,
      });
      toast.success("Blog deleted successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center flex-col">
        <p className="text-red-600 font-medium bg-red-50 px-4 py-2 rounded-lg border border-red-200 mb-4">{error || "Blog not found"}</p>
        <Link to="/" className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
           <KeyboardBackspaceIcon className="mr-1" fontSize="small" /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6lg:px-8">
      <article className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Navigation bar */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
          <Link to="/" className="text-gray-500 hover:text-indigo-600 font-medium flex items-center transition-colors text-sm">
            <KeyboardBackspaceIcon className="mr-1 w-4 h-4" /> Back to home
          </Link>
          {blog.tags && (
             <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
             {blog.tags}
           </span>
          )}
        </div>

        <div className="p-6 md:p-10 lg:p-12">
          {/* Header Section */}
          <header className="mb-10 text-center sm:text-left">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight">
              {blog.title}
            </h1>

            {/* Author */}
            <div className="flex items-center justify-center sm:justify-start mt-6">
              <img 
                src={blog.author.profileImage ? blog.author.profileImage : profile} 
                alt={blog.author.username} 
                className="w-12 h-12 rounded-full object-cover border-2 border-indigo-100" 
              />
              <div className="ml-4 text-left">
                <p className="text-base font-semibold text-gray-900">
                  {blog.author.username}
                </p>
                <div className="flex items-center text-sm text-gray-500 mt-0.5">
                  <p>{blog.author.email}</p>
                </div>
              </div>
            </div>
          </header>

          {/* Hero Image */}
          {blog.image && (
             <div className="mb-12 rounded-xl overflow-hidden shadow-sm border border-gray-100">
             <img
               alt="Blog Hero"
               src={blog.image}
               className="w-full h-auto max-h-[500px] object-cover"
             />
           </div>
          )}

          {/* description */}
          <div className="prose prose-lg prose-indigo max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
            {blog.description}
          </div>

        
          {isAuthor && (
            <div className="mt-14 pt-6 border-t border-gray-100 flex items-center justify-end gap-3">
              <button
                className="px-5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm"
                onClick={() => navigate(`/edit-blog/${id}`)}
              >
                Edit Article
              </button>
              <button
                className="px-5 py-2.5 bg-red-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-sm"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;
