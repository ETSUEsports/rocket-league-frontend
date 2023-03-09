<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { appSettingsStore } from '@/store/appSettingsStore';
import { useToast } from 'vue-toastification';
import router from '@/router';
import controlAPI from '@/api';

const toast = useToast();
const appSettings = appSettingsStore();

let alertFlag = ref(false);

const isAuth = ref(false);
const authCheck = async () => {
    const response = await controlAPI.get(`${appSettings.getControlHTTPConn}/auth/me`, { withCredentials: true });
    switch(response.data.status) {
        case 'error':
            isAuth.value = false;
            if(alertFlag.value) return;
            alertFlag.value = true;
            toast.error('You are not logged in');
            router.push({name: 'auth-login'});
            break;
        case 'success':
            isAuth.value = true;
            break;
        default:
            isAuth.value = false;
            break;
    }
};

let authCheckInterval;

onMounted(() => {
    authCheck();
    authCheckInterval = setInterval(() => {
        authCheck();
    }, 8000);
});

onBeforeUnmount(() => {
    clearInterval(authCheckInterval);
});

</script>