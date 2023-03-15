import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import router from './router';
import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";
import { createPinia } from 'pinia';
import Toast from "vue-toastification";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import VueApexCharts from "vue3-apexcharts";
import en from './locales/en.js';
import "vue-toastification/dist/index.css";

const app = createApp(App);

Sentry.init({
    app,
    dsn: "https://322393fa3b0f469ca03348a7057bb709@o4504840394178560.ingest.sentry.io/4504840408924160",
    integrations: [
        new BrowserTracing({
            routingInstrumentation: Sentry.vueRouterInstrumentation(router),
            tracePropagationTargets: ["localhost", "etsuesports.ryois.net", /^\//],
        }),
    ],
    tracesSampleRate: 1.0,
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const messages = {
    en: en
}

const i18n = createI18n({
    locale: 'en',
    messages,
})



app.use(i18n).use(pinia).use(router).use(VueApexCharts).use(Toast, { pauseOnFocusLoss: false, pauseOnHover: false, timeout: 5000, position: "top-right" }).mount('#app');
