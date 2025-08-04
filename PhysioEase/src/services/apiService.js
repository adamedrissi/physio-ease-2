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
    const response = await axios.get(`http://localhost:8081/api/auth/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`http://localhost:8081/api/auth/update/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const changePassword = async (userId, oldPassword, newPassword) => {
  try {
    const response = await axios.put(`http://localhost:8081/api/auth/change-password/${userId}`,
      {
        oldPassword,
        newPassword,
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
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

export const fetchFeedbackReports = async () => {
  try {
    const response = await axios.get('http://localhost:8081/api/feedback');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteFeedback = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8081/api/feedback/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const sendContactMessage = async (formData) => {
  try {
    const response = await axios.post('http://localhost:8081/api/contact', formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchAddress = async (query, countryCode) => {
  try {
    const response = await axios.get(`http://localhost:8081/api/address/search`, {
      params: { q: query, countryCode }
    });
    return response.data;
  } catch (error) {
    console.error("Address search error:", error);
    throw error.response?.data || error.message;
  }
};

const VIDEO_RATING_API = 'http://localhost:8081/api/video-ratings';

export const submitVideoRating = async (ratingData) => {
  try {
    const response = await axios.post(VIDEO_RATING_API, ratingData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const fetchUserVideoRatings = async (userId) => {
  try {
    const response = await axios.get(`${VIDEO_RATING_API}/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const WATCHED_API = 'http://localhost:8081/api/watched-videos';

export const markVideoAsWatched = async ({ userId, videoId }) => {
  return await axios.post(WATCHED_API, { userId, videoId });
};

export const fetchWatchedVideos = async (userId) => {
  const res = await axios.get(`${WATCHED_API}/${userId}`);
  return res.data;
};

export const fetchAllVideoRatings = async () => {
  const response = await axios.get('http://localhost:8081/api/video-ratings');
  return response.data;
};

export const fetchAllVideos = async () => {
  const response = await axios.get('http://localhost:8081/api/videos');
  return response.data;
};

export const fetchPhysioConsultations = async (physioId) => {
  const response = await axios.get(`http://localhost:8081/api/consultations/physio/${physioId}`);
  return response.data;
};

export const searchPhysios = async ({ lat, lon, radiusKm, country, speciality }) => {
  const response = await axios.get("http://localhost:8081/api/consultations/search-physios", {
    params: { lat, lon, radiusKm, country, speciality }
  });
  return response.data;
};

export const assignPhysio = async (physioId, patientId) =>
  (await axios.post(`/api/physios/${physioId}/assign`, { patientId })).data;

export const fetchSlots = async (physioId, weekIso) =>
  (await axios.get(`/api/physios/${physioId}/available-slots`, { params:{week:weekIso} })).data;

export const bookConsultation = async (payload) =>
  (await axios.post('/api/consultations', payload)).data;

export default axios;