import React from "react";
import { FaRegEye } from "react-icons/fa6";
import { Link } from "react-router-dom";

const NewsItem = ({ news }) => {
  console.log("NewsItem news prop:", news);

  if (!news || !news.text) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4 p-4 rounded-lg">
      <Link to={`/news/${news._id}`} className="hover:opacity-80 transition">
        <img src={news.image} alt={news.title} className="w-full rounded-md" />
        <h2 className="font-sans text-xl font-bold mt-2 capitalize">
          {news.title}
        </h2>
        <p className="text-gray-700">{news.text.slice(0, 100)}...</p>
      </Link>
      <div className="flex items-center gap-3 text-gray-600 text-sm">
        <div className="flex gap-2">
          {news.tags.map((tag) => (
            <Link key={tag} to={`/tag/${tag}`}>
              <span className="border px-3 py-1 rounded-full border-gray-500 text-xs capitalize">
                {tag}
              </span>
            </Link>
          ))}
        </div>
        <p className="flex items-center gap-1">
          <FaRegEye /> {news.views}
        </p>
      </div>
    </div>
  );
};

export default NewsItem;
