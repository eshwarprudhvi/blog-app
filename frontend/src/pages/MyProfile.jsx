import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import profileImage from "../assets/profile.png";
import { FaEdit } from "react-icons/fa";
import { updateProfileSuccess } from "../store/authSlice";
import axios from "axios";
import { toast } from "react-toastify";
import NoBlogs from "../components/NoBlogs";

const MyProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [username, setUsername] = useState(user.username);
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const id = user.id;

  const [profileFile, setProfileFile] = useState("");
  const [preview, setPreview] = useState(user.profileImage);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("username", username);
      if (profileFile) {
        formData.append("profile", profileFile);
      }
      const res = await axios.put(
        "http://localhost:3000/api/users/profile",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      dispatch(updateProfileSuccess(res.data));
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update the profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setPreview(user.profileImage);
    }
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/blogs/author/${id}`,
          { withCredentials: true }
        );
        setBlogs(res.data.blogs || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlogs();
  }, [user, id]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden py-10">
          <div className="px-6 sm:px-10 flex flex-col items-center">
            <form onSubmit={handleUpdate} className="flex flex-col items-center w-full max-w-sm">
              <div className="relative mb-8">
                <img
                  src={preview || profileImage}
                  alt="profile"
                  className="h-32 w-32 sm:h-40 sm:w-40 rounded-full border-4 border-gray-50 object-cover shadow-sm bg-gray-50"
                />
                <input
                  type="file"
                  name="profile"
                  id="profile"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if(file) {
                      setProfileFile(file);
                      setPreview(URL.createObjectURL(file));
                    }
                  }}
                  accept="image/*"
                  className="hidden"
                />
                <label
                  htmlFor="profile"
                  className="cursor-pointer absolute bottom-2 right-2 bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-full shadow-md transition-colors border-2 border-white flex items-center justify-center transform hover:scale-105"
                  title="Change Profile Picture"
                >
                  <FaEdit className="w-5 h-5" />
                </label>
              </div>

              <div className="w-full">
                <div className="mb-5 text-center">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                    Display Name
                  </label>
                  <input
                    id="username"
                    name="profile"
                    type="text"
                    required
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="appearance-none block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base transition duration-150 text-center"
                  />
                </div>

                <button
                  disabled={loading}
                  type="submit"
                  className="w-full flex justify-center py-2.5 px-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Authored Blogs List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pl-1">My Authored Blogs</h2>
          
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

                  <div className="mt-4 sm:mt-0 sm:self-center w-full sm:w-auto shrink-0 flex gap-2">
                    <Link
                      to={`/edit-blog/${blog._id}`}
                      className="flex-1 sm:flex-none text-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/${blog._id}`}
                      className="flex-1 sm:flex-none text-center bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      View
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

export default MyProfile;
