import axios from 'axios';
import { useToast } from 'vue-toastification';
import { appSettingsStore } from '@/store/appSettingsStore';

export class ControlAPI {

  constructor() {
    this.appSettings = appSettingsStore();
    this.toast = useToast();
    this.controlAPI = axios.create({
      baseURL: this.appSettings.getControlHTTPConn,
      timeout: 1000,
      withCredentials: true,
    });


    this.controlAPI.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (!error.response) return;
        switch (error.response.status) {
          case 401:
            this.toast.error('Control API: Unauthorized');
            throw new Error('Invalid token detected')
          case 403:
            this.toast.error('Control API: Forbidden');
            throw new Error('Forbidden')
          case 404:
            this.toast.error('Control API: Not Found');
            throw new Error('Not Found')
          case 500:
            this.toast.error('Control API: Internal Server Error');
            throw new Error('Internal Server Error')
          default:
            this.toast.error('Control API: Unknown Error');
        }
      }
    );

  }

  async get(url) {
    return new Promise((resolve, reject) => {
      this.controlAPI.get(url).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  async post(url, data) {
    return new Promise((resolve, reject) => {
      this.controlAPI.post(url, data).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  async put(url, data) {
    return new Promise((resolve, reject) => {
      this.controlAPI.put(url, data).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  async delete(url) {
    return new Promise((resolve, reject) => {
      this.controlAPI.delete(url).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  async patch(url, data) {
    return new Promise((resolve, reject) => {
      this.controlAPI.patch(url, data).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

}