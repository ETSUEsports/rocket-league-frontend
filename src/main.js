import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import VueApexCharts from "vue3-apexcharts";
import en from './locales/en.js';

const messages = {
    en: en
}

const i18n = createI18n({
    locale: 'en',
    messages,
})

createApp(App)
    .use(i18n)
    .use(createPinia())
    .use(router)
    .use(VueApexCharts)
    .mount('#app');
