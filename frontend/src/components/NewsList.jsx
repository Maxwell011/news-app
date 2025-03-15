import React from "react";
import useNewsInfiniteScroll from "../useNewsInfiniteScroll.js";

const NewsList = () => {
  const { news, loading, hasMore } = useNewsInfiniteScroll();

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {news.map((item) => (
        <div key={`${item._id}-${item.createdAt}`} className="">
          {" "}
          {item.image && <img src={item.image} alt={item.title} />}
          <h3>{item.title}</h3>
          <p>{item.text}</p>
          <small>Published on {new Date(item.createdAt).toDateString()}</small>
        </div>
      ))}
      {loading && <p>Loading more news...</p>}
      {!hasMore && <p>No more news available.</p>}
    </div>
  );
};

export default NewsList;
