// components/NewsItem.jsx
import React from "react";
import { FaRegEye } from "react-icons/fa6";
import { Link } from "react-router-dom";

const NewsItem = ({ news }) => {
  return (
    <div className="flex flex-col gap-4">
      <Link to={`/news/${news._id}`}>
        <img src={news.image} alt={news.title} className="w-[500px]" />
        <h2 className="font-sans text-4xl">{news.title}</h2>
        <p className="text-3xl">{news.text}</p>
        <div className="flex items-center gap-2">
          {news.tags.map((tag) => (
            <span
              key={tag}
              className="border p-[5px] rounded-[15px] border-[#000] capitalize"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="flex items-center gap-2 text-2xl">
          <FaRegEye /> {news.views}
        </p>
      </Link>
    </div>
  );
};

export default NewsItem;
