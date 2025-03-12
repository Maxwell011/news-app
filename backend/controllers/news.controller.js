import {
  getNews,
  createNews,
  updateNews,
  deleteNews,
} from "../services/news.service.js";

// Get all news
export const getAllNews = async (req, res) => {
  try {
    const news = await getNews({});
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create news
export const createNewNews = async (req, res) => {
  try {
    const news = await createNews(req.body);
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
