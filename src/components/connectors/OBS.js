import { useToast } from "vue-toastification";
const toast = useToast();

function detectOBS(){
    if(!window.obsstudio){
        console.log("OBS not detected");
        return false;
    } else {
        console.log("OBS detected");
        console.log(window.obsstudio.pluginVersion);
        toast.info("OBS detected", { timeout: 2000 });
        return true;
    }
}

export { detectOBS };
