import React from "react";
import EastIcon from "@mui/icons-material/East";
import { Link, useNavigate } from "react-router-dom";

import profile from "../assets/profile.png";

const Card = ({ title, description, tag, author, blogId, image }) => {
  const { _id } = author;
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/authors/${_id}`);
  };

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 h-full">
     
      <Link to={`/${blogId}`} className="w-full h-48 overflow-hidden relative block group">
        <img
          src={image ? image : profile}
          alt="blog-cover"
          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
        />
        
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-indigo-600 shadow-sm uppercase tracking-wider">
          {tag != undefined && tag.trim() !== "" ? tag : "General"}
        </div>
      </Link>

      {/* Card Content */}
      <div className="flex flex-col flex-grow p-5 sm:p-6">
        <Link to={`/${blogId}`}>
          <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight hover:text-indigo-600 transition-colors">
            {title}
          </h2>
        </Link>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed flex-grow">
          {description}
        </p>

        <Link
          to={`/${blogId}`}
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium text-sm transition-colors mt-auto w-max group"
        >
          Read More 
          <EastIcon className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fontSize="small" />
        </Link>
      </div>

      {/* Author Section */}
      <div 
        className="flex items-center px-5 sm:px-6 py-4 bg-gray-50 border-t border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={handleClick}
      >
        <img
          src={author.profileImage ? author.profileImage : profile}
          alt={author.username}
          className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
        />
        <div className="ml-3">
          <p className="text-sm font-semibold text-gray-900">{author.username}</p>
          <p className="text-xs text-gray-500 truncate max-w-[180px]">{author.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
