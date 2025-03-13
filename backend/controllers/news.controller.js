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
    const news = await getNews({});
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

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const imageUrl = req.file.path; // Cloudinary URL

    const newsData = {
      title,
      text,
      image: imageUrl,
      tags: Array.isArray(tags) ? tags : tags.split(","),
    };

    const news = await createNews(newsData);
    res.json(news);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
      error: err,
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
