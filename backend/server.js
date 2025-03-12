import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import newsRoutes from "./routes/news.route.js";

dotenv.config();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use("/api", newsRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});
