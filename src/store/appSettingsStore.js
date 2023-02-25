import { defineStore, acceptHMRUpdate } from 'pinia';

export const appSettingsStore = defineStore({
    id: 'appSettings',
    persist: true,
    state: () => ({
        gameWSIP: "10.",
        gameWSPort: "",
        controlWSIP: "",
        controlWSPort: ""
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