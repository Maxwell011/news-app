import {
  getNews,
  createNews,
  updateNews,
  deleteNews,
  getNewsById,
  getNewsByTag,
  likeNews,
  unlikeNews,
} from "../services/news.service.js";
import cloudinary from "cloudinary";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import News from "../models/news.model.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all news
export const getAllNews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;

    console.log(
      `📢 Incoming Request - Page: ${page}, Limit: ${limit}, Skipping: ${skip}`
    );

    const totalNews = await News.countDocuments();
    const news = await News.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const hasMore = skip + news.length < totalNews; // ✅ Correct hasMore logic

    console.log(
      `✅ Sent ${news.length} News Articles for Page ${page} | hasMore: ${hasMore}`
    );

    res.json({ data: news, hasMore });
  } catch (err) {
    console.error("Error fetching news:", err.message);
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
    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file);

    const { title, text, tags } = req.body;

    let imageUrl = null;
    if (req.file) {
      const base64Image = req.file.buffer.toString("base64");
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${base64Image}`,
        { public_id: uuidv4() }
      );
      imageUrl = result.secure_url;
    }

    const newsData = {
      title,
      text,
      image: imageUrl,
      tags: Array.isArray(tags) ? tags : tags.split(","),
    };

    console.log("News data to be saved:", newsData);

    const news = await createNews(newsData);
    res.json(news);
  } catch (err) {
    console.error("Error creating news:", err);
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

// Like news by ID
export const likeNewsById = async (req, res) => {
  try {
    const news = await likeNews(req.params.id);
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Unlike news by ID
export const unlikeNewsById = async (req, res) => {
  try {
    const news = await unlikeNews(req.params.id);
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
