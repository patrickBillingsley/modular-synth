import AudioService from "../services/audio_service.js";
import Key from "./key.js";

export default class Keybed {
    constructor({ octaves = 2 }) {
        this.octaves = octaves;
        this.keys = [];
        this.element = document.createElement("div");
        this.element.id = "keybed";

        this.#build(this.element);
    }

    #build(element) {
        document.getElementById('keyboard').appendChild(element);

        for (let i = 0; i <= this.octaves * 12; i++) {
            this.keys.push(new Key({ semitones: i }));
        }

        this.keys.forEach((k) => k.positionSelf());
    }
}
