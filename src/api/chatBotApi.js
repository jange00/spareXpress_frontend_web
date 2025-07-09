import axios from 'axios';

// Create an axios instance with a base URL.
// This is useful if all your API calls go to the same server.
const apiClient = axios.create({
  baseURL: '/api', // Your backend proxy is likely set up to handle this
  headers: {
    'Content-Type': 'application/json',
  },
});

export const postChatQuery = async ({ query, history }) => {
  try {
    // The backend endpoint is /api/chat-bot/query
    const response = await apiClient.post('/chat-bot/query', { query, history });
    // The backend wraps the actual data in a `data` property.
    return response.data;
  } catch (error) {
    // Rethrow the error to be handled by Tanstack Query
    throw error.response?.data || new Error("An unknown error occurred.");
  }
};