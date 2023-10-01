import axios from 'axios';

const customFetch = axios.create({
  baseURL: 'career-compass-server.vercel.app/api/v1',
});

export default customFetch;
