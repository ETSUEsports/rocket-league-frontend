import { defineStore, acceptHMRUpdate } from 'pinia';

export const appSettingsStore = defineStore({
    id: 'appSettings',
    persist: true,
    state: () => ({
        gameWSIP: "localhost",
        gameWSPort: "49122",
        gameWSStatus: "disconnected",
        controlWSIP: "esports.ryois.me",
        controlWSPort: "3000",
        controlHTTPSecure: false,
        controlWSStatus: "disconnected",
        obsStatus: "disconnected",
        obsIP: "localhost",
        obsPort: "4444",
        obsPassword: "password",
        user: null,
        loginState: "loggedOut",
        loggingInState: false,
    }),
    getters: {
        getGameWSIP: (state) => {
            return state.gameWSIP;
        },
        getGameWSPort: (state) => {
            return state.gameWSPort;
        },
        getControlWSIP: (state) => {
            return state.controlWSIP;
        },
        getControlWSPort: (state) => {
            return state.controlWSPort;
        },
        getGameWSConn: (state) => {
            return `ws://${state.gameWSIP}:${state.gameWSPort}/`;
        },
        getControlWSConn: (state) => {
            if (process.env.NODE_ENV === 'development') {
                return `ws://localhost:${state.controlWSPort}/`;
            } else {
                return `wss://${state.controlWSIP}/rocket-league-backend/`;
            }
        },
        getControlHTTPConn: (state) => {
            if (process.env.NODE_ENV === 'development') {
                return `http://localhost:${state.controlWSPort}/api/v1`;
            } else {
                return `https://${state.controlWSIP}/rocket-league-backend/api/v1`;
            }
        },
        getGameWSStatus: (state) => {
            return state.gameWSStatus;
        },
        getControlWSStatus: (state) => {
            return state.controlWSStatus;
        },
        getOBSStatus: (state) => {
            return state.obsStatus;
        },
        getOBSIP: (state) => {
            return state.obsIP;
        },
        getOBSPort: (state) => {
            return state.obsPort;
        },
        getOBSPassword: (state) => {
            return state.obsPassword;
        },
        getUser: (state) => {
            if (state.user == null) {
                return {};
            }
            return state.user;
        },
        getLoginState: (state) => {
            return state.loginState;
        },
        getLoggingInState: (state) => {
            return state.loggingInState;
        },
    },
    actions: {
        updateGameWSIP(ip) {
            this.gameWSIP = ip;
        },
        updateGameWSPort(port) {
            this.gameWSPort = port;
        },
        updateControlWSIP(ip) {
            this.controlWSIP = ip;
        },
        updateControlWSPort(port) {
            this.controlWSPort = port;
        },
        updateControlHTTPSecure(secure) {
            this.controlHTTPSecure = secure;
        },
        updateGameWSStatus(status) {
            this.gameWSStatus = status;
        },
        updateControlWSStatus(status) {
            this.controlWSStatus = status;
        },
        updateOBSStatus(status) {
            this.obsStatus = status;
        },
        updateOBSIP(ip) {
            this.obsIP = ip;
        },
        updateOBSPort(port) {
            this.obsPort = port;
        },
        updateOBSPassword(password) {
            this.obsPassword = password;
        },
        updateUser(user) {
            this.user = user;
        },
        updateLoginState(state) {
            this.loginState = state;
        },
        updateLoggingInState(state) {
            this.loggingInState = state;
        },
        logout() {
            this.user = {};
            this.loginState = "loggedOut";
            this.loggingInState = false;
        },
        resetState() {
            this.$reset();
        }
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(appSettingsStore, import.meta.hot));
}