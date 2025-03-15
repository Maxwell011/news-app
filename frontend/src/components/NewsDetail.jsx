import React, { useState, useEffect } from "react";
import { fetchNewsById } from "../services/newsService";
import { useParams } from "react-router-dom";

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
    </div>
  );
};

export default NewsDetail;
