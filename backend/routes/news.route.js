// routes/news.route.js
import express from "express";
import {
  getAllNews,
  createNewNews,
  updateNewsById,
  deleteNewsById,
  getNewsByTheId,
  getNewsByTheTag,
} from "../controllers/news.controller.js";
import multer from "multer";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Routes
router.get("/news", getAllNews);
router.post("/news", upload.single("image"), createNewNews);
router.delete("/news/:id", deleteNewsById);
router.get("/tag/:tag", getNewsByTheTag);
router.get("/news/:id", getNewsByTheId);
router.patch("/news/:id", upload.single("image"), updateNewsById);
export default router;
