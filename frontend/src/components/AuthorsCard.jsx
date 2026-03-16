import React from "react";
import { Link } from "react-router-dom";
import defaultProfile from "../assets/profile.png";

const AuthorsCard = ({ user }) => {
  return (
    <Link
      to={`/authors/${user._id}`} 
      className="flex flex-col items-center bg-white border border-gray-100 shadow-sm rounded-xl p-6 hover:shadow-md transform hover:-translate-y-1 transition duration-300 group"
    >
      <div className="relative mb-4">
        <div className="absolute inset-0 bg-indigo-500 rounded-full blur/20 opacity-0 group-hover:opacity-20 transition duration-300"></div>
        <img
          src={user.profileImage || defaultProfile}
          alt={user.username || "Author"}
          className="w-24 h-24 rounded-full object-cover border-4 border-gray-50 shadow-sm relative z-10"
        />
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors text-center w-full truncate">
        {user.username || "Anonymous"}
      </h3>

      {user.email && (
        <p className="text-sm text-gray-500 text-center w-full truncate mb-4">
          {user.email}
        </p>
      )}

      <div className="mt-auto pt-4 border-t border-gray-100 w-full text-center">
        <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-800 transition-colors">
          View Profile &rarr;
        </span>
      </div>
    </Link>
  );
};

export default AuthorsCard;
