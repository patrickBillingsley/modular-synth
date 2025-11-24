import Note from "../models/note.js";
import AudioService from "../services/audio_service.js";
import Key from "./key.js";

export default class Manual {
    constructor({ controllers = [], start = new Note("A", 3), end = new Note("C", 5) }) {
        console.assert(start.value < end.value, "Start note must be lower than end note.");

        this.controller = controllers[0];
        this.start = start;
        this.end = end;

        this.keys = [];
    }

    #handleInput(key, pressed) {
        console.log(key);
        if (pressed) {
            key.play();
        } else {
            key.stop();
        }
    }

    build() {
        const element = document.createElement("div");
        element.id = "manual";
        document.getElementById("keyboard").appendChild(element);

        for (let i = 0; i <= this.start.difference(this.end); i++) {
            const key = Key.fromIndex(i, { offset: this.start.value });
            this.keys.push(key);
        }

        // This has to be done after generating all keys so all necessary
        // positioning information is available.
        this.keys.forEach((k) => k.positionSelf());
        this.controller.listen({ keys: this.keys, onInput: this.#handleInput });
    }
}
