import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchNewsByTag } from "../services/newsService";
import NewsItem from "../components/NewsItem";

const TagNews = () => {
  const { tag } = useParams();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await fetchNewsByTag(tag);
        setNews(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [tag]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (news.length === 0) {
    return <div>No news found for tag: {tag}</div>;
  }

  return (
    <div>
      <h1>News tagged with: {tag}</h1>
      {news.map((article) => (
        <NewsItem key={article._id} news={article} />
      ))}
    </div>
  );
};

export default TagNews;
