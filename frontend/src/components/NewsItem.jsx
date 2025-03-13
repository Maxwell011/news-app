import React from "react";

const NewsItem = ({ news }) => {
  return (
    <div className="news-item">
      <h2>{news.title}</h2>
      <img src={news.image} alt={news.title} />
      <p>{news.text.substring(0, 100)}...</p>{" "}
      {/* Display a preview of the text */}
      <div className="tags">
        {news.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
      <p className="views">Views: {news.views}</p>
    </div>
  );
};

export default NewsItem;
