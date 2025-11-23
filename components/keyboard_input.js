import AudioService from "../services/audio_service.js";

export default class KeyboardInput {
    inputs = {
        "a": false,
        "w": false,
        "s": false,
        "d": false,
        "r": false,
        "f": false,
        "t": false,
        "g": false,
        "h": false,
        "u": false,
        "j": false,
        "i": false,
        "k": false,
        "o": false,
        "l": false,
    };

    constructor(manual) {
        this.manual = manual;

        window.addEventListener("keypress", this.handleKeyPress);
        window.addEventListener("keyup", this.handleKeyPress);

        return manual;
    }

    handleKeyPress = (event) => {
        event.stopPropagation();
        if (!Object.keys(this.inputs).includes(event.key)) return;

        switch (event.type) {
            case "keypress":
                if (this.inputs[event.key]) return;

                this.inputs[event.key] = true;
                break;
            case "keyup":
                this.inputs[event.key] = false;
                this.manual.keys[Object.keys(this.inputs).indexOf(event.key)].stop();
                break;
        }

        const lastIndex = Object.values(this.inputs).lastIndexOf(true);
        if (lastIndex > -1) {
            this.manual.keys[lastIndex].play();
        } else {
            new AudioService().stop();
        }
    }
}
