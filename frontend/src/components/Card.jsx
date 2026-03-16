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
    <div className="flex flex-col w-[20rem] bg-red-100 p-3 mx-auto mb-6 max-w-[20rem] h-[30rem] rounded-md shadow-lg gap-2 justify-between">
      <div>
        <h1 className="text-lg  md:text-xl lg:text-2xl font-bold text-gray-900">
          {title.length > 100 ? title.slice(0, 100) : title}
        </h1>
        <div className="w-full py-2">
          <img
            src={image ? image : profile}
            alt="blog-image"
            className="rounded-md object-cover w-[100%] h-[10rem]"
          />
        </div>
        <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed">
          tag: {`${tag}`}
        </p>
        <p>{description.slice(0, 100)}</p>
        <Link
          to={`/${blogId}`}
          className="text-sm md:text-base text-blue-600 hover:underline font-medium"
        >
          Read More <EastIcon></EastIcon>
        </Link>
      </div>
      <div
        className="flex flex-row gap-1 cursor-pointer mb-3"
        onClick={handleClick}
      >
        <img
          src={author.profileImage ? author.profileImage : profile}
          alt="logo"
          className="w-10 h-10 rounded-full "
        />
        <div className="flex flex-col justify-between">
          <p className="text-xs md:text-sm text-gray-500 font-medium">
            {author.username}
          </p>
          <p className="text-xs md:text-sm text-gray-400">{author.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
