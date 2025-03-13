import React, { useState, useEffect } from "react";
import { fetchNews } from "../services/newsService";
import NewsItem from "../components/NewsItem";
import InfiniteScroll from "react-infinite-scroll-component";

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadMoreNews = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newNews = await fetchNews(page);
      if (newNews.length === 0) {
        setHasMore(false); // No more news to load
      } else {
        setNews((prevNews) => [...prevNews, ...newNews]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMoreNews();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (news.length === 0 && !loading) {
    return <div>No news available.</div>;
  }

  return (
    <InfiniteScroll
      dataLength={news.length}
      next={loadMoreNews}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={<p>No more news to show.</p>}
    >
      {news.map((article) => (
        <NewsItem key={article._id} news={article} />
      ))}
    </InfiniteScroll>
  );
};

export default NewsList;
