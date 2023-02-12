import { useToast } from "vue-toastification";
const toast = useToast();

function detectOBS(){
    if(!window.obsstudio){
        console.log("OBS not detected");
        return;
    } else {
        console.log("OBS detected");
        console.log(window.obsstudio.pluginVersion);
        toast.info("OBS detected", { timeout: 2000 });
    }
}

export { detectOBS };
