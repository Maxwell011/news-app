import express from "express";
import {
  getAllNews,
  createNewNews,
  updateNewsById,
  deleteNewsById,
} from "../controllers/news.controller.js";

const router = express.Router();

router.get("/news", getAllNews);
router.post("/news", createNewNews);
// router.put("news/:id", updateNewsById);
router.delete("/news/:id", deleteNewsById);

export default router;
