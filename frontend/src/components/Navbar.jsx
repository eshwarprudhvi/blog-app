import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import axios from "axios";
import "./Navbar.css";
import { toast } from "react-toastify";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://blog-app-0j5v.onrender.com/api/users/logout",
        {},
        { withCredentials: true }
      );
      dispatch(logout());
      setIsOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="font-bold text-xl text-indigo-600 hover:text-indigo-700 transition duration-200"
              onClick={closeMenu}
            >
              MyBlog
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-indigo-600 font-medium px-3 py-2 rounded-md transition duration-200"
              >
                Home
              </Link>
              <Link
                to={"/create-blog"}
                className="text-gray-600 hover:text-indigo-600 font-medium px-3 py-2 rounded-md transition duration-200"
              >
                Create
              </Link>
              <Link
                to={"/my-profile"}
                className="text-gray-600 hover:text-indigo-600 font-medium px-3 py-2 rounded-md transition duration-200"
              >
                Profile
              </Link>
              <Link
                to={"/authors"}
                className="text-gray-600 hover:text-indigo-600 font-medium px-3 py-2 rounded-md transition duration-200"
              >
                Authors
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* User Auth Section */}
            <div className="hidden sm:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <span className="text-gray-800 font-medium">
                    Hi, {user.username}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-indigo-50 border border-indigo-200 text-indigo-600 hover:bg-indigo-100 hover:text-indigo-700 font-medium px-4 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    className="text-gray-600 hover:text-indigo-600 font-medium px-4 py-2 rounded-lg transition duration-200"
                    to="/signin"
                  >
                    Sign in
                  </Link>
                  <Link
                    className="bg-indigo-600 text-white hover:bg-indigo-700 font-medium px-4 py-2 rounded-lg shadow-sm transition-all duration-200"
                    to="/signup"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>

    
            <button
              className="md:hidden text-gray-600 hover:text-indigo-600 focus:outline-none border-none bg-transparent"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              onClick={closeMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition duration-150"
            >
              Home
            </Link>
            <Link
              to="/create-blog"
              onClick={closeMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition duration-150"
            >
              Create
            </Link>
            <Link
              to="/my-profile"
              onClick={closeMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition duration-150"
            >
              Profile
            </Link>
            <Link
              to="/authors"
              onClick={closeMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition duration-150"
            >
              Authors
            </Link>
            
           
            <div className="border-t border-gray-200 mt-4 pt-4 pb-2 sm:hidden">
              {isAuthenticated ? (
                <div className="px-3 space-y-3">
                  <div className="text-base font-medium text-gray-800">
                    Hi, {user.username}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left lock px-3 py-2 rounded-md text-base font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition duration-150"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/signin"
                    onClick={closeMenu}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition duration-150"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    onClick={closeMenu}
                    className="block px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
