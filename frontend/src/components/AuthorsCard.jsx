import React from "react";
import { Link } from "react-router-dom";

const AuthorsCard = ({ user }) => {
  return (
    <Link
      to={`/authors/${user._id}`} // link to author's page
      className="flex flex-col items-center bg-white shadow rounded-lg p-4 hover:shadow-lg transition duration-300"
    >
      {/* Profile Image */}
      <img
        src={user.profileImage}
        alt={user.username}
        className="w-20 h-20 rounded-full object-cover mb-3"
      />

      {/* Username */}
      <p className="font-semibold text-gray-800">
        {user.username || user.name}
      </p>

      {/* Email */}
      {user.email && <p className="text-sm text-gray-500">{user.email}</p>}
    </Link>
  );
};

export default AuthorsCard;
