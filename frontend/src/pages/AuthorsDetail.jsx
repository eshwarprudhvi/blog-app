import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import profileImage from "../assets/profile.png";
import axios from "axios";
import NoBlogs from "../components/NoBlogs";



const AuthorsDetail = () => {
  const { id } = useParams(); // get author id from URL
  const [author, setAuthor] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [authorRes, blogsRes] = await Promise.all([
          axios.get(`http://localhost:3000/api/users/${id}`, { withCredentials: true }),
          axios.get(`http://localhost:3000/api/blogs/author/${id}`, { withCredentials: true })
        ]);
        setAuthor(authorRes.data);
        setBlogs(blogsRes.data.blogs || []);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!author) return <p className="text-center mt-10 text-gray-600">Author not found.</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Author Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden py-10">
          <div className="px-6 sm:px-10 flex flex-col items-center">
            <div className="flex flex-col items-center w-full max-w-sm">
              <div className="relative mb-6">
                <img
                  src={author.profileImage || profileImage}
                  alt={author.username}
                  className="h-32 w-32 sm:h-40 sm:w-40 rounded-full border-4 border-gray-50 object-cover shadow-sm bg-gray-50"
                />
              </div>

              <div className="w-full text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  {author.username}
                </h1>
                {author.email && (
                  <p className="text-sm text-gray-500">{author.email}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Authored Blogs List */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6 pl-1">
            Articles by {author.username}
          </h2>
          
          {blogs.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 flex justify-center mb-6">
              <NoBlogs />
            </div>
          ) : (
            <div className="space-y-4">
              {blogs.map((blog, index) => (
                <div
                  key={index}
                  className="bg-white flex flex-col sm:flex-row items-start sm:items-center p-4 sm:p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 gap-4"
                >
                  <img
                    src={blog.image || "https://blogs.oregonstate.edu/patss/wp-content/themes/koji/assets/images/default-fallback-image.png"}
                    alt={blog.title}
                    className="w-full sm:w-28 sm:h-20 h-40 object-cover rounded-lg flex-shrink-0 border border-gray-100"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 truncate mb-1">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {blog.description}
                    </p>
                  </div>

                  <div className="mt-4 sm:mt-0 sm:self-center w-full sm:w-auto shrink-0">
                    <Link
                      to={`/${blog._id}`}
                      className="block w-full text-center bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
                    >
                      Read Article
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AuthorsDetail;
