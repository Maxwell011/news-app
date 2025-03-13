import {
  getNews,
  createNews,
  updateNews,
  deleteNews,
  getNewsById,
  getNewsByTag,
} from "../services/news.service.js";

// Get all news
export const getAllNews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;

    const news = await getNews(page, limit);
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get news by ID
export const getNewsByTheId = async (req, res) => {
  try {
    const news = await getNewsById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    res.json(news);
  } catch (err) {
    res.json(500).json({ message: "An error occurred" });
  }
};

// Create news
export const createNewNews = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Log the request body
    console.log("Uploaded file:", req.file); // Log the uploaded file

    const { title, text, tags } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    const newsData = {
      title,
      text,
      image: imageUrl,
      tags: Array.isArray(tags) ? tags : tags.split(","),
    };

    console.log("News data to be saved:", newsData); // Log the news data

    const news = await createNews(newsData);
    res.json(news);
  } catch (err) {
    console.error("Error creating news:", err); // Log the full error
    res.status(500).json({
      message: err.message,
      error: err, // Send the full error object for debugging
    });
  }
};
// Update news by ID
export const updateNewsById = async (req, res) => {
  try {
    const news = await updateNews(req.params.id, req.body);
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete news by ID
export const deleteNewsById = async (req, res) => {
  try {
    const news = await deleteNews(req.params.id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get news by tag
export const getNewsByTheTag = async (req, res) => {
  try {
    const news = await getNewsByTag(req.params.tag);
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
