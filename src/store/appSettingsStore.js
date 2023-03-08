import { defineStore, acceptHMRUpdate } from 'pinia';

export const appSettingsStore = defineStore({
    id: 'appSettings',
    persist: true,
    state: () => ({
        gameWSIP: "localhost",
        gameWSPort: "49122",
        gameWSStatus: "disconnected",
        controlWSIP: "localhost",
        controlWSPort: "3000",
        controlHTTPSecure: false,
        controlWSStatus: "disconnected",
        obsStatus: "disconnected",
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
            return `ws://${state.controlWSIP}:${state.controlWSPort}/`;
        },
        getControlHTTPConn: (state) => {
            if (state.controlHTTPSecure) {
                return `https://${state.controlWSIP}:${state.controlWSPort}/api/v1`;
            } else {
                return `http://${state.controlWSIP}:${state.controlWSPort}/api/v1`;
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
        }
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
        resetState() {
            this.$reset();
        }
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(appSettingsStore, import.meta.hot));
}