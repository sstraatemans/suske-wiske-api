import axios from 'axios';

const axiosConfig = {
  baseURL: 'http://localhost:3000/api/v1',
  timeout: 30000,
};

const instance = axios.create(axiosConfig);

export default instance;
