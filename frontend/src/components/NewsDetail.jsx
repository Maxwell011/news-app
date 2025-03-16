import React, { useState, useEffect } from "react";
import {
  fetchNewsById,
  deleteNews,
  likeNews, // Import likeNews
  unlikeNews, // Import unlikeNews
} from "../services/newsService";
import { useParams, useNavigate } from "react-router-dom";
import { FaTrash, FaThumbsUp, FaThumbsDown } from "react-icons/fa6"; // Import icons

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [likeCount, setLikeCount] = useState(0); // Add likeCount state

  useEffect(() => {
    const loadNews = async () => {
      try {
        const newsItem = await fetchNewsById(id);
        setNews(newsItem);
        setLikeCount(newsItem.likes);
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

  const handleLike = async () => {
    try {
      const updatedNews = await likeNews(id);
      setLikeCount(updatedNews.likes);
    } catch (error) {
      console.error("Error liking news:", error);
    }
  };

  const handleUnlike = async () => {
    try {
      const updatedNews = await unlikeNews(id);
      setLikeCount(updatedNews.likes);
    } catch (error) {
      console.error("Error unlinking news:", error);
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
      <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
      <img src={news.image} alt={news.title} className="w-full mb-4" />
      <p className="mb-4">{news.text}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {news.tags.map((tag) => (
          <span
            key={tag}
            className="bg-gray-200 px-2 py-1 rounded-full text-sm capitalize"
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
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className="flex items-center gap-1 cursor-pointer"
          >
            <FaThumbsUp className="text-red-500" /> Like
          </button>
          <button
            onClick={handleUnlike}
            className="flex items-center gap-1 cursor-pointer"
          >
            <FaThumbsDown /> Unlike
          </button>
          <span>Likes: {likeCount}</span>
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
