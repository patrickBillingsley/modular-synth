import Manual from "./manual.js";
import AudioService from "../services/audio_service.js";
import Output from "./nodes/output.js";

export default class Keyboard {
    constructor({ manual, voices = 1, polyphonic = false }) {
        this.manual = manual || new Manual({});
        this.voices = voices;
        this.polyphonic = polyphonic;

        this.build();
    }

    build = () => {
        this.element = document.createElement("div");
        this.element.id = "keyboard";
        document.getElementById("app").appendChild(this.element);

        new Output().build();
        new AudioService().generateOscillators(this.voices, this.polyphonic);
        this.manual.build();
    }
}