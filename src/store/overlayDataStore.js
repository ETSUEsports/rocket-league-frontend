import { defineStore, acceptHMRUpdate } from 'pinia';

export const overlayDataStore = defineStore({
    id: 'overlayData',
    persist: true,
    state: () => ({
        leftTeam: { name: "Left Team", score: 0, image: "" },
        rightTeam: { name: "Right Team", score: 0, image: "" },
        series: { gameNumber: 1, bestOf: 5 }
    }),
    getters: {
        getTeam: (state) => {
            return (side) => {
                switch (side) {
                    case 'left':
                        return state.leftTeam;
                    case 'right':
                        return state.rightTeam;
                    default:
                        return 'Specify side';
                }
            }
        },
        getSeries: (state) => {
            return state.series;
        }
    },
    actions: {
        updateLeftTeam(team) {
            this.leftTeam = team;
        },
        updateRightTeam(team) {
            this.rightTeam = team;
        },
        updateSeries(series) {
            this.series = series;
        },
        resetState() {
            this.$reset();
        }
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(overlayDataStore, import.meta.hot));
}