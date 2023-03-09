import axios from 'axios';
import { appSettingsStore } from '@/store/appSettingsStore';
import Router from '@/router';

export class Auth {

    constructor() {
        this.appSettings = appSettingsStore();
    }

    login(strategy) {
        const vm = this;
        this.appSettings.updateLoginState("loggingIn");
        this.appSettings.updateLoggingInState(true);
        const popupWinHeight = 800;
        const popupWinWidth = 500;
        const left = (screen.width - popupWinWidth) / 2;
        const top = (screen.height - popupWinHeight) / 4;
        const popup = window.open(`${this.appSettings.getControlHTTPConn}/auth/strategies/${strategy}`, "Discord Login", `width=${popupWinWidth},height=${popupWinHeight},left=${left},top=${top}`);
        let timer = setInterval(function () {
            if (popup.closed) {
                clearInterval(timer);
                window.removeEventListener('message', vm.receiveMessage.bind(vm, popup), false);
                vm.appSettings.updateLoggingInState(false);
                vm.appSettings.updateLoginState("canceled");
            }
        }, 1000);
        window.addEventListener('message', this.receiveMessage.bind(this, popup), false);
    }

    receiveMessage(popup, event) {
        if (event.data.status === 'success') {
            this.handleLogin(event.data, popup);
            popup.close();
        }
    }

    handleLogin(data, popup) {
        if (data.status == "success") {
            window.removeEventListener('message', this.receiveMessage.bind(this, popup), false);
            this.appSettings.updateLoginState("loggedIn");
            this.appSettings.updateLoggingInState(false);
            this.appSettings.updateUser(data.user);
            Router.push({ name: 'dashboard' });
        }
    }

    logout() {
        this.appSettings.updateLoginState("loggedOut");
    }

    isAuthenticated() {
    }

    async getAuthStrategies() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.appSettings.getControlHTTPConn}/auth/strategies`).then((response) => {
                resolve(response.data.strategies);
            }).catch((error) => {
                reject(error);
            });
        });
    }


}