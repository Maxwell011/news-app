import mongoose from "mongoose";

const newsSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    image: { type: String, required: true },
    tags: [{ type: String, required: true }],
  },
  { timestamps: true }
);

const News = mongoose.model("News", newsSchema);

export default News;
