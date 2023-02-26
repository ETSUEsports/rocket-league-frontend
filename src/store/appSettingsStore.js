import { defineStore, acceptHMRUpdate } from 'pinia';

export const appSettingsStore = defineStore({
    id: 'appSettings',
    persist: true,
    state: () => ({
        gameWSIP: "10.88.20.200",
        gameWSPort: "49122",
        controlWSIP: "localhost",
        controlWSPort: "3000",
        controlHTTPSecure: false
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
        resetState() {
            this.$reset();
        }
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(appSettingsStore, import.meta.hot));
}