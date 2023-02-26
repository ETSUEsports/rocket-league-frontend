function detectOBS(){
    if(!window.obsstudio){
        console.log("OBS not detected");
        return false;
    } else {
        console.log("OBS detected");
        console.log(window.obsstudio.pluginVersion);
        return true;
    }
}

export { detectOBS };
