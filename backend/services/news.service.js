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
    return results;
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
    return results;
  } catch (err) {
    throw new Error(err.message);
  }
};

export { getNews, createNews, updateNews, deleteNews };
