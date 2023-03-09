import axios from 'axios';
import { useToast } from 'vue-toastification';

const toast = useToast();

const controlAPI = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  timeout: 1000,
  withCredentials: true,
});

controlAPI.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    switch (error.response.status) {
      case 401:
        toast.error('Control API: Unauthorized');
        throw new Error('Invalid token detected')
      case 403:
        toast.error('Control API: Forbidden');
        throw new Error('Forbidden')
      case 404:
        toast.error('Control API: Not Found');
        throw new Error('Not Found')
      case 500:
        toast.error('Control API: Internal Server Error');
        throw new Error('Internal Server Error')
      default:
        toast.error('Control API: Unknown Error');
    }
  }
);

export default controlAPI;