import axios from "axios";

const API_URL = "http://localhost:5000/api/news";

// Fetch news with pagination
export const fetchNews = async (page = 1, limit = 3) => {
  try {
    const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};

// Fetch news by ID
export const fetchNewsById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching news by ID:", error);
    throw error;
  }
};

// Fetch news by tag
export const fetchNewsByTag = async (tag) => {
  try {
    const response = await axios.get(`${API_URL}/tag/${tag}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching news by tag:", error);
    throw error;
  }
};

// Create new news
export const createNews = async (newsData) => {
  try {
    const formData = new FormData();
    for (const key in newsData) {
      formData.append(key, newsData[key]);
    }
    const response = await axios.post(API_URL, formData);
    return response.data;
  } catch (error) {
    console.error("Error creating news:", error);
    throw error;
  }
};

// Update news by ID
export const updateNews = async (id, newsData) => {
  try {
    const formData = new FormData();
    for (const key in newsData) {
      formData.append(key, newsData[key]);
    }
    const response = await axios.patch(`${API_URL}/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error("Error updating news:", error);
    throw error;
  }
};

// Delete news by ID
export const deleteNews = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting news:", error);
    throw error;
  }
};

export const likeNews = async (id) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}/like`);
    return response.data;
  } catch (error) {
    console.error("Error liking news:", error);
    throw error;
  }
};

export const unlikeNews = async (id) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}/unlike`);
    return response.data;
  } catch (error) {
    console.error("Error unlinking news:", error);
    throw error;
  }
};
