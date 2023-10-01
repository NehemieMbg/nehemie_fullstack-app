import axios from 'axios';

const customFetch = axios.create({
  baseURL: 'https://career-compass-client.vercel.app/api/v1',
});

export default customFetch;
