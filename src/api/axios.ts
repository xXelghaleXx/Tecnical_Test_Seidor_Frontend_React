import axios from 'axios';

// API Gateway para operaciones GET (people, favorites)
const apiGet = axios.create({
  baseURL: import.meta.env.VITE_API_GET_URL || 'https://y76a850dh4.execute-api.us-east-1.amazonaws.com',
});

// API Gateway para operaciones POST/DELETE (create/delete favorites)
const apiPost = axios.create({
  baseURL: import.meta.env.VITE_API_POST_URL || 'https://lvryteny8c.execute-api.us-east-1.amazonaws.com',
});

export { apiGet, apiPost };