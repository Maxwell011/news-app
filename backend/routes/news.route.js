import express from "express";
import {
  getAllNews,
  createNewNews,
  updateNewsById,
  deleteNewsById,
  getNewsByTheId,
  getNewsByTheTag,
  likeNewsById,
  unlikeNewsById,
} from "../controllers/news.controller.js";
import multer from "multer";
import { authenticateAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Public Routes (Anyone Can Access)
router.get("/news", getAllNews);
router.get("/tag/:tag", getNewsByTheTag);
router.get("/news/:id", getNewsByTheId);
router.patch("/news/:id/like", likeNewsById);
router.patch("/news/:id/unlike", unlikeNewsById);

// Protected Admin Routes (Only Admins Can Access)
router.post("/news", authenticateAdmin, upload.single("image"), createNewNews);
router.patch(
  "/news/:id",
  authenticateAdmin,
  upload.single("image"),
  updateNewsById
);
router.delete("/news/:id", authenticateAdmin, deleteNewsById);

export default router;
