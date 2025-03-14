import express from "express";
import {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
} from "../controllers/admin.controller.js";
import { authenticateAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// Authentication Routes
router.post("/register", registerAdmin);
router.post("/login", loginAdmin); // Updated route

// Protected Admin Routes
router.get("/profile", authenticateAdmin, getAdminProfile);

export default router;
