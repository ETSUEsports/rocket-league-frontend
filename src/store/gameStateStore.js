import { defineStore, acceptHMRUpdate } from 'pinia'

export const gameStateStore = defineStore({
    id: 'gameState',
    state: () => ({
        clock: 300,
        winner: "",
        ball: "",
        hasWinner: false,
        isOT: false,
        isReplay: false,
        hasTarget: false,
        target: "",
        teams: [],
    }),
    getters: {
        scoreboardClock: (state) => {
            const d = Number(state.clock);
            const m = Math.floor(d % 3600 / 60);
            const s = Math.floor(d % 3600 % 60);
            return m + ":" + ('0' + s).slice(-2);
        },
        getTeam: (side) => {
            switch(side){
                case 'left':
                    return this.teams[0];
                case 'right':
                    return this.teams[0];
                default:
                    return 'Specify side';
            }
        },
    },
    actions: {
        updateState(data) {
            this.clock = data.game.time_seconds;
            this.teams = data.game.teams;
        },
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(gameStateStore, import.meta.hot))
}