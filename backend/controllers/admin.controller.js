import Admin from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";

// Register Admin (Keep express-validator here, or remove and do manual validation)
export const registerAdmin = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").trim().isEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, email, password } = req.body;

      console.log("Register Request Body:", req.body);

      const existingAdmin = await Admin.findOne({ email });
      console.log("Existing Admin:", existingAdmin);

      if (existingAdmin) {
        return res.status(400).json({ message: "Admin already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("Hashed Password:", hashedPassword);

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
  },
];

// Login Admin (No express-validator)
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login Request Body:", req.body);

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email });
    console.log("Admin Found:", admin);

    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("Password Match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("Token Generated:", token);

    res.json({
      token,
      admin: { id: admin._id, username: admin.username, email: admin.email },
    });
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
