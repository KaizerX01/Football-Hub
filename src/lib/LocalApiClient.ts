import axios from 'axios';

export const localApiClient = axios.create({
  baseURL: 'http://localhost:3000/api', 
});