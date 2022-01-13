import axios from 'axios';

const axiosConfig = {
  baseURL: '/api/v1',
  timeout: 30000,
};

const instance = axios.create(axiosConfig);

export default instance;
