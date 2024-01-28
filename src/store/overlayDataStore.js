import { defineStore, acceptHMRUpdate } from 'pinia';

export const overlayDataStore = defineStore({
    id: 'overlayData',
    persist: true,
    state: () => ({
        game: 0,
        games: [
            {
                leftTeam: { name: "Left Team", score: 0, image: "" },
                rightTeam: { name: "Right Team", score: 0, image: "" },
                series: { gameNumber: 1, bestOf: 5, name: "Series Name" },
                replay: { showTransition: false, color: "blue" },
                casters: { casterl: "Caster 1", casterr: "Caster 2" },
            },
            {
                leftTeam: { name: "Left Team", score: 0, image: "" },
                rightTeam: { name: "Right Team", score: 0, image: "" },
                series: { gameNumber: 1, bestOf: 5, name: "Series Name" },
                replay: { showTransition: false, color: "blue" },
                casters: { casterl: "Caster 1", casterr: "Caster 2" },
            },
        ],
    }),
    getters: {
        getTeam: (state) => {
            return (game, side) => {
                switch (side) {
                    case 'left':
                        return state.games[game].leftTeam;
                    case 'right':
                        return state.games[game].rightTeam;
                    case 0:
                        return state.games[game].leftTeam;
                    case 1:
                        return state.games[game].rightTeam;
                    default:
                        return 'Specify side and game number';
                }
            }
        },
        getSeries: (state) => {
            return (game) => {
                return state.games[game].series;
            }
        },
        getReplay: (state) => {
            return (game) => {
                return state.games[game].replay;
            }
        },
        getCasters: (state) => {
            return (game) => {
                return state.games[game].casters;
            }
        }
    },
    actions: {
        updateLeftTeam(game, team) {
            this.games[game].leftTeam = team;
        },
        updateRightTeam(game, team) {
            this.games[game].rightTeam = team;
        },
        updateSeries(game, series) {
            this.games[game].series = series;
        },
        updateReplay(game, transition, side) {
            console.log(game, transition, side)
            this.games[game].replay.showTransition = transition;
            this.games[game].replay.color = side === 0 ? "blue" : "orange";
        },
        updateCasters(game, casters) {
            this.games[game].casters = casters;
        },
        resetState() {
            this.$reset();
        },
        getCastersByGame(game) {
            return this.games[game].casters;
        }
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(overlayDataStore, import.meta.hot));
}