import { NOTES } from "../constants.js";
import Note from "../models/note.js";
import Key from "./key.js";
import KeyboardInput from "./keyboard_input.js";


export default class Manual {
    constructor({ controllers = [new KeyboardInput()], start = new Note("C", 4), end = new Note("B", 5) }) {
        console.assert(start.value < end.value, "Start note must be lower than end note.");

        this.id = "manual-1";
        this.controller = controllers[0];
        this.start = start;
        this.end = end;
    }

    #handleInput(key, pressed) {
        if (pressed) {
            key.play();
        } else {
            key.stop();
        }
    }

    #buildConfigControllers = () => {
        const startNote = document.createElement("select");
        startNote.id = "start-note";

        const endNote = document.createElement("select");
        endNote.id = "end-note";

        const naturals = NOTES.filter(n => n.length == 1);
        for (let i = 0; i < 9; i++) {
            for (const note of naturals) {
                const value = `${note}${i}`;
                const start = document.createElement("option");
                start.value = value;
                start.innerHTML = value;

                const end = start.cloneNode(true);

                start.selected = start.innerHTML == "C4";
                end.selected = end.innerHTML == "C5"

                startNote.appendChild(start);
                endNote.appendChild(end);
            }
        }

        const app = document.getElementById("app")
        const startLabel = document.createElement("label");
        startLabel.htmlFor = startNote.id;
        startLabel.innerHTML = "Start";
        startLabel.style.color = "#eee";
        app.appendChild(startLabel);
        app.appendChild(startNote);

        const endLabel = document.createElement("label");
        endLabel.htmlFor = startNote.id;
        endLabel.innerHTML = "End";
        endLabel.style.color = "#eee";
        app.appendChild(endLabel);
        app.appendChild(endNote);

        startNote.addEventListener("change", ({ target }) => {
            startNote.blur(); // Remove focus from element to avoid interference with keyboard input

            const noteName = target.value.split("")[0];
            const octave = target.value.split("")[1];
            const note = new Note(noteName, octave);

            this.start = note;
            this.build();
        });

        endNote.addEventListener("change", ({ target }) => {
            endNote.blur(); // Remove focus from element to avoid interference with keyboard input

            const noteName = target.value.split("")[0];
            const octave = target.value.split("")[1];
            const note = new Note(noteName, octave);

            this.end = note;
            this.build();
        });

        return true;
    }

    build() {
        this.keys = [];
        this.element?.remove();
        this.element = document.createElement("div");
        this.element.id = this.id;
        this.element.className = "manual";

        keyboard.appendChild(this.element);

        for (let i = 0; i <= this.start.difference(this.end); i++) {
            const key = Key.fromIndex(i, { offset: this.start.value });
            this.keys.push(key);
        }

        // This has to be done after generating all keys so all necessary
        // positioning information is available.
        this.keys.forEach(key => key.positionSelf());

        this.subscription?.cancel();
        this.subscription = this.controller?.listen(this, this.#handleInput);

        this.configControls ||= this.#buildConfigControllers();
    }
}
