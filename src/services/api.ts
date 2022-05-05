import axios from 'axios';

const key = process.env.VIMEO_API_KEY;

const  headers = {
  'Authorization': `Bearer ${key}`,
  'Content-Type': `application/json`,
  'Accept': `application/vnd.vimeo.*+json;version=3.4`
};

const api = axios.create({
  baseURL: 'https://api.vimeo.com', headers
});

export default api;