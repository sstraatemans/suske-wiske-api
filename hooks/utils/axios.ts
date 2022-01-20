import axios from 'axios';

const axiosConfig = {
  baseURL: 'https://suskeenwiske.dev/api/v1',
  timeout: 30000,
};

const instance = axios.create(axiosConfig);

export default instance;
