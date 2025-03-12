import express from "express";
import {
  getAllNews,
  createNewNews,
  updateNewsById,
  deleteNewsById,
  getNewsByTheId,
  getNewsByTheTag,
} from "../controllers/news.controller.js";

const router = express.Router();

router.get("/news", getAllNews);
router.post("/news", createNewNews);
router.delete("/news/:id", deleteNewsById);
router.get("/tag/:tag", getNewsByTheTag);
router.get("/news/:id", getNewsByTheId);
// router.put("news/:id", updateNewsById);

export default router;
