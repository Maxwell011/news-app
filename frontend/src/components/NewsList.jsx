import React, { useState, useEffect } from "react";
import { fetchNews } from "../services/newsService";
import NewsItem from "../components/NewsItem";

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const allNews = await fetchNews();
        setNews(allNews);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {news.map((article) => (
        <NewsItem key={article._id} news={article} />
      ))}
    </div>
  );
};

export default NewsList;
