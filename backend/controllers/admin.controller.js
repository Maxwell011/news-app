import Admin from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";

// Register Admin (Keep express-validator here, or remove and do manual validation)
export const registerAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, email, password } = req.body;
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password Before Saving:", hashedPassword);

    const admin = await Admin.create({
      username,
      email,
      password: hashedPassword,
    });

    console.log("Admin Created:", admin);

    res.status(201).json({ message: "Admin created successfully", admin });
  } catch (err) {
    console.error("Error in registerAdmin:", err);
    res.status(500).json({ message: err.message });
  }
};

// Login Admin (No express-validator)
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    console.log("Admin Found:", admin);
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
  } catch (err) {
    console.error("Error in loginAdmin:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get Admin Profile (Protected Route)
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select("-password");
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
