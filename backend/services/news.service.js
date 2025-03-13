import News from "../models/news.model.js";

const getNews = async (newsData) => {
  try {
    const results = await News.find(newsData);
    return results;
  } catch (err) {
    throw new Error(err.message);
  }
};

const createNews = async (newsData) => {
  try {
    const results = await News.create(newsData);
    return results; // Only return the result
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateNews = async (id, newsData) => {
  try {
    const results = await News.findByIdAndUpdate(id, newsData, { new: true });
    return results;
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteNews = async (id) => {
  try {
    const results = await News.findByIdAndDelete(id);
    if (!results) {
      throw new Error("News not found");
    }
    return results;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getNewsById = async (id) => {
  try {
    const news = await News.findById(id);
    if (!news) {
      throw new Error(err.message);
    }
    const update = await News.findByIdAndUpdate(
      id,
      { views: news.views + 1 },
      { new: true }
    );
    return update;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getNewsByTag = async (tag) => {
  try {
    const results = await News.find({ tags: tag });

    const updatedResults = await Promise.all(
      results.map(async (news) => {
        news.views++;
        await news.save();
        return news;
      })
    );

    return updatedResults;
  } catch (err) {
    throw new Error(err.message);
  }
};
export {
  getNews,
  createNews,
  updateNews,
  deleteNews,
  getNewsById,
  getNewsByTag,
};
