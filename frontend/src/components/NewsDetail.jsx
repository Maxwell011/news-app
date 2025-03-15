import React, { useState, useEffect } from "react";
import { fetchNewsById, deleteNews } from "../services/newsService";
import { useParams, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa6";

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadNews = async () => {
      try {
        const newsItem = await fetchNewsById(id);
        setNews(newsItem);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    loadNews();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this news item?")) {
      try {
        await deleteNews(id);
        navigate("/");
      } catch (error) {
        console.error("Error deleting news:", error);
      }
    } else {
      console.log("Deletion cancelled.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!news) {
    return <div>News not found.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      {" "}
      {/* Container with max width */}
      <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
      <img src={news.image} alt={news.title} className="w-full mb-4" />
      <p className="mb-4">{news.text}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {news.tags.map((tag) => (
          <span
            key={tag}
            className="bg-gray-200 px-2 py-1 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">Views: {news.views}</p>
          <p className="text-sm text-gray-600">
            Published on: {new Date(news.createdAt).toDateString()}
          </p>
        </div>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer"
        >
          <FaTrash className="inline-block mr-2" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default NewsDetail;
