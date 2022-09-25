import axios from 'axios';
import { localStorageService } from '../utils/localStorageService';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

axios.interceptors.request.use(
  async (config) => {
    const sessionKey = localStorageService.getToken();

    if (config.headers && sessionKey) {
      config.headers['X-AUTH-TOKEN'] = sessionKey;
    }

    if (config.headers) {
      config.headers['Content-Type'] = 'application/json';
      config.headers['Access-Control-Allow-Origin'] = '*';
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default axios;
