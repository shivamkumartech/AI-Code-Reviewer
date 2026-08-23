import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Sends source code to backend for AI review.
 * @param {string} code 
 * @returns {Promise<string>} Review response markdown string
 */
export const getCodeReview = async (code) => {
  try {
    const response = await apiClient.post("/ai/get-review", { code });
    return response.data;
  } catch (error) {
    console.error("API Error - getCodeReview:", error);
    const serverMessage = error.response?.data?.message || error.response?.data;
    if (typeof serverMessage === "string") {
      throw new Error(serverMessage);
    }
    if (error.code === "ECONNABORTED") {
      throw new Error("Request timed out. Please try again.");
    }
    throw new Error(
      "Failed to generate code review. Make sure the backend server is running."
    );
  }
};
