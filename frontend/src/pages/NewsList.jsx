import React, { useState, useEffect } from "react";
import { fetchNews } from "../services/newsService";
import NewsItem from "../components/NewsItem";

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const loadNews = async () => {
      try {
        const allNews = await fetchNews();
        setNews(allNews);
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        setError(err);
        setLoading(false); // Set loading to false on error
      }
    };

    loadNews();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Render loading indicator
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>News List</h1>
      {news.map((article) => (
        <NewsItem key={article._id} news={article} />
      ))}
    </div>
  );
};

export default NewsList;
