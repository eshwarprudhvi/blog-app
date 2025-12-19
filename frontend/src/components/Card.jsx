import React from "react";
import EastIcon from "@mui/icons-material/East";
const Card = ({ title, description, tag, author }) => {
  return (
    <div className="flex flex-col w-[20rem] bg-red-100 p-3 mx-auto mb-6 max-w-[20rem] h-[22rem] rounded-md shadow-lg gap-2">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold font-sans">
        {title.length > 100 ? title.slice(0, 100) : title}
      </h1>
      image will be added later part here
      <p className="text-sm">{tag} tag herer</p>
      <p>{description}</p>
      <a href="asf" className="text-sky-500 hover:text-sky-700">
        Read More <EastIcon></EastIcon>
      </a>
      <div className="flex flex-row ">
        <img src="asdf" alt="logo" />
        <p>{author.username}</p>
      </div>
    </div>
  );
};

export default Card;
