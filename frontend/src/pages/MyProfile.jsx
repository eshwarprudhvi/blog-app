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
      toast.error("failed to update the profile");
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
      const res = await axios.get(
        `http://localhost:3000/api/blogs/author/${id}`,
        { withCredentials: true }
      );
      console.log(res.data.blogs);
      setBlogs(res.data.blogs);
    };
    fetchBlogs();
  }, [user]);

  return (
    <>
      <section className="mt-7 flex flex-col items-center">
        <div>
          <form action="" className="relative" onSubmit={handleUpdate}>
            <img
              src={preview || profileImage}
              alt="profile-image"
              className="h-[12rem] w-[12rem] mt-2 rounded-full border-10 border-blue-300 object-cover"
            />

            <input
              type="file"
              name="profile"
              id="profile"
              onChange={(e) => {
                const file = e.target.files[0];
                setProfileFile(file);
                setPreview(URL.createObjectURL(file));
              }}
              accept="image/*"
              className="hidden"
            />
            <label
              htmlFor="profile"
              className="cursor-pointer absolute bottom-22 right-0 left-35 text-white bg-black text-[1.2rem] border-2 p-2  w-fit rounded-full"
            >
              <FaEdit />
            </label>

            <div className="flex flex-row mt-3">
              <label htmlFor="username">Username : </label>
              <input
                id="username"
                name="profile"
                placeholder="enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className="p-2 bg-blue-400 hover:bg-blue-500 cursor-pointer text-white cursor-pointer rounded-sm px-4 ml-14"
            >
              {loading ? "loading..." : " Edit"}
            </button>
          </form>
        </div>
      </section>
      <h2 className="mt-10 px-5 text-3xl">My Blogs</h2>
      {/* blogs of the author */}
      <section className="mt-4 flex flex-col gap-3 ">
        {blogs.length == 0 ? (
          <NoBlogs />
        ) : (
          blogs.map((blog, index) => {
            return (
              <div
                key={index}
                className="flex items-center gap-4  p-3 rounded-md shadow-xl"
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
            );
          })
        )}
      </section>
    </>
  );
};

export default MyProfile;
