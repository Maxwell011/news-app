import React from "react";
import useNewsInfiniteScroll from "../useNewsInfiniteScroll.js";
import NewsItem from "./NewsItem"; // ✅ Import NewsItem component

const NewsList = () => {
  const { news, loading, hasMore } = useNewsInfiniteScroll();

  return (
    <div className="grid grid-cols-3 gap-6 p-4">
      {news.map((item) => (
        <NewsItem key={item._id} news={item} /> // ✅ Use NewsItem component
      ))}
      {loading && (
        <p className="text-center col-span-3">Loading more news...</p>
      )}
      {!hasMore && (
        <p className="text-center col-span-3">No more news available.</p>
      )}
    </div>
  );
};

export default NewsList;
