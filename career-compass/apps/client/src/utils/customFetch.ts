import axios from 'axios';

const API_BASE_URL = 'https://career-compass-server.vercel.app';

const customFetch = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
});

export default customFetch;
