<script setup>
import { appSettingsStore } from '@/store/appSettingsStore';
import { onMounted } from 'vue';
import { Auth } from '@/auth';

const auth = new Auth();
const appSettings = appSettingsStore();
let strategies = [{name: "discord", url: "/auth/strategies/discord", callback: "/auth/strategies/discord/callback", logout: "/auth/strategies/discord/logout"}];

auth.getAuthStrategies().then((response) => {
    strategies = response;
});

function authWith(strategy) {
    auth.login(strategy);
}

onMounted(() => {
    appSettings.updateLoggingInState(false);
});

</script>

<template>
    <div class="container" :class="{ popupOpen: appSettings.getLoggingInState }">
        <div class="header">
            <h1 class="header_text">{{ $t('dashboard.title') }} {{ $t('dashboard.login') }}</h1>
        </div>
        <div class="content">
            <div class="content_text">
                <h3>Login with...</h3>
                <div class="strategies">
                    <div v-for="strategy in strategies" :key="strategy.name" class="strategy" @click="authWith(strategy.name)">
                        <span class="label">{{ strategy.name }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    color: white;
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 100%;
    height: 100%;
    text-overflow: ellipsis;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

    &.popupOpen {
        filter: blur(1px) brightness(0.5);
    }

    .header {
        .header_text {
            font-size: 50px;
            font-weight: bold;
            margin-top: 20px;
            margin-bottom: 20px;
        }
    }

    .content {
        .strategies {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;

            .strategy {
                margin: 10px;
                padding: 10px;
                width: 100px;
                background-color: var(--rl-primary-blue);
                border-radius: 10px;
                .label {
                    font-size: 20px;
                    text-transform: capitalize;
                }
            }
            .strategy:hover {
                background-color: #1e2e4d;
            }
        }
    }
}
</style>