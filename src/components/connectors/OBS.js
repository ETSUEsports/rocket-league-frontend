function detectOBS(){
    if(!window.obsstudio){
        console.log("[OBS WS] OBS not detected");
        return false;
    } else {
        console.log("[OBS WS] OBS detected");
        console.log(window.obsstudio.pluginVersion);
        return true;
    }
}

function muteAudio(){
    if(detectOBS()){
        window.obsstudio.send("SetMute", {
            "source": "ROCKET_LEAGUE_AUDIO",
            "mute": true
        });
    }
}

function unmuteAudio(){
    if(detectOBS()){
        window.obsstudio.send("SetMute", {
            "source": "ROCKET_LEAGUE_AUDIO",
            "mute": false
        });
    }
}

export { detectOBS, muteAudio, unmuteAudio };
