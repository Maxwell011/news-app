import mongoose from "mongoose";

const newsSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    image: { type: String, required: true },
    tags: [{ type: String, required: true }],
    // slug: { type: String, unique: true, required: true },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const News = mongoose.model("News", newsSchema);

export default News;
