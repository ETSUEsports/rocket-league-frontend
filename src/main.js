import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import Toast from "vue-toastification";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import VueApexCharts from "vue3-apexcharts";
import en from './locales/en.js';
import "vue-toastification/dist/index.css";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const messages = {
    en: en
}

const i18n = createI18n({
    locale: 'en',
    messages,
})


createApp(App)
    .use(i18n)
    .use(pinia)
    .use(router)
    .use(VueApexCharts)
    .use(Toast, { pauseOnFocusLoss: false, pauseOnHover: false, timeout: 5000, position: "top-right"})
    .mount('#app');
