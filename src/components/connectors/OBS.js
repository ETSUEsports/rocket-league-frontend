import OBSWebSocket from 'obs-websocket-js';
export class OBS {

    constructor(ip, port, password) {
        this.obs = new OBSWebSocket();
        this.connect(ip, port, password);
    }

    async connect(ip, port, password) {
        try {
            const { obsWebSocketVersion } = await this.obs.connect(`ws://${ip}:${port}`, password, { rpcVersion: 1 });
            console.log(`[OBS WS] Connected to OBS WebSocket ${obsWebSocketVersion})`)
        } catch (error) {
            console.error('Failed to connect', error.code, error.message);
        }
    }

    async disconnect() {
        this.obs.disconnect();
    }

    async detect() {
        if (!window.obsstudio) {
            console.log("[OBS WS] OBS not detected");
            return false;
        } else {
            console.log("[OBS WS] OBS detected");
            console.log(`[OBS WS] OBS Version: window.obsstudio.pluginVersion`);
            return true;
        }
    }

    async muteAudio() {
        this.obs.call('GetInputList', { inputKind: 'wasapi_process_output_capture' }).then(data => {
            data.inputs.forEach(input => {
                if (input.inputName === 'ROCKET_LEAGUE_AUDIO') {
                    this.obs.call('SetInputMute', { inputName: 'ROCKET_LEAGUE_AUDIO', inputMuted: true });
                }
            });
        });
    }

    async unmuteAudio() {
        this.obs.call('GetInputList', { inputKind: 'wasapi_process_output_capture' }).then(data => {
            data.inputs.forEach(input => {
                if (input.inputName === 'ROCKET_LEAGUE_AUDIO') {
                    this.obs.call('SetInputMute', { inputName: 'ROCKET_LEAGUE_AUDIO', inputMuted: false });
                }
            });
        });
    }

    getAudioSources() {
        this.obs.call('GetInputList').then(data => {
            const output = [];
            data.inputs.forEach(input => {
                if (input.inputKind === 'wasapi_output_capture' || input.inputKind === 'wasapi_input_capture' || input.inputKind === 'wasapi_process_output_capture') {
                    output.push(input);
                }
            });
            return output;
        });
    }
}