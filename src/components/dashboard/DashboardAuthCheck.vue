<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useToast } from 'vue-toastification';
import router from '@/router';
import { ControlAPI } from '@/api';

const api = new ControlAPI();
const toast = useToast();

let alertFlag = ref(false);

const isAuth = ref(false);
const authCheck = async () => {
    const response = await api.get('/auth/me', { withCredentials: true });
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