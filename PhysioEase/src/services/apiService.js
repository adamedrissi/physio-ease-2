import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api/auth'

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:8081/api/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const API_BASE_URL2 = 'http://localhost:8081/api/feedback'

export const submitFeedback = async (feedbackData) => {
  try {
    const response = await axios.post(`${API_BASE_URL2}`, feedbackData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default axios;