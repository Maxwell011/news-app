import React from "react";
import { FaRegEye } from "react-icons/fa6";
import { Link } from "react-router-dom";

const NewsItem = ({ news }) => {
  return (
    <div className="flex flex-col gap-4">
      <Link to={`/news/${news._id}`}>
        <img
          src={news.image}
          alt={news.title}
          className="w-[500px] rounded-md"
        />
        <h2 className="font-sans text-3xl mb-2.5">{news.title}</h2>
        <p className="text-2xl">{news.text}</p>
      </Link>
      <div className="flex items-center gap-2">
        {news.tags.map((tag) => (
          <Link key={tag} to={`/tag/${tag}`}>
            <span className="border p-[5px] rounded-[15px] border-[#000] capitalize">
              {tag}
            </span>
          </Link>
        ))}
        <p className="flex items-center gap-2 text-2xl">
          <FaRegEye /> {news.views}
        </p>
      </div>
    </div>
  );
};

export default NewsItem;
