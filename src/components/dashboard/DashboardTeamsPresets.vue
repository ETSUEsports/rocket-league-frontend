<script setup>
import { ControlAPI } from '@/api';
import { useToast } from 'vue-toastification';

const api = new ControlAPI();
const toast = useToast();

const presets = [{ name: "ETSU", score: 0, image: "etsu_rl.png" }, { name: "King", score: 0, image: "king_rl.png" }, { name: "NESCC", score: 0, image: "nescc_rl.png" }];

const setPreset = (preset, side) => {
    console.log(preset, side);

    if (side === "left") {
        api.post('/teams/left', { name: preset.name, score: preset.score, image: preset.image }).then(() => {
            toast.success("Successfully set preset");
        }).catch(() => {
            toast.error("There was an error");
        });
    } else {
        api.post('/teams/right', { name: preset.name, score: preset.score, image: preset.image }).then(() => {
            toast.success("Successfully set preset");
        }).catch(() => {
            toast.error("There was an error");
        });
    }

};

</script>

<template>
    <div class="presets_container">
        <div class="preset" v-for="preset in presets" :key="preset.name">
            <h4>{{ preset.name }}</h4>
            <button class="button blue" @click="setPreset(preset, 'left')">Left</button>
            <button class="button orange" @click="setPreset(preset, 'right')">Right</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.presets_container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    width: 100%;
    height: 150px;

    .preset {
        width: 100px;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid var(--etsu-primary-gold);
        border-radius: 10px;
        margin: 5px;
        flex-direction: column;

        h4 {
            margin: 0;
            font-size: 2vh;
        }
    }

    .preset:hover {
        background-color: var(--etsu-secondary-bg);
    }
}

.button {
    &.blue {
        background-color: var(--rl-primary-blue);
    }

    &.orange {
        background-color: var(--rl-primary-orange);
    }

    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 2.5vh;
    border-radius: 4px;
    margin-right: 5px;
}
</style>
