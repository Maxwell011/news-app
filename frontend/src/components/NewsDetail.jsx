import React, { useState, useEffect } from "react";
import { fetchNewsById, deleteNews } from "../services/newsService";
import { useParams, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa6"; // Import FaTrash icon

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

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
        navigate("/"); // Redirect to the main news list after deletion
      } catch (error) {
        console.error("Error deleting news:", error);
        // Handle error (e.g., display an error message)
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
    <div>
      <h1>{news.title}</h1>
      <img src={news.image} alt={news.title} />
      <p>{news.text}</p>
      <div className="">
        {news.tags.map((tag) => (
          <span key={tag} className="">
            {tag}
          </span>
        ))}
      </div>
      <p className="">Views: {news.views}</p>
      <p className="">
        Published on: {new Date(news.createdAt).toDateString()}
      </p>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer"
      >
        <FaTrash className="inline-block mr-2" />
        Delete
      </button>
    </div>
  );
};

export default NewsDetail;
