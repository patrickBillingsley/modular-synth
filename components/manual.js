import { NATURALS } from "../constants.js";
import Key from "./key.js";
import KeyboardInput from "./keyboard_input.js";
import Note from "../models/note.js";


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

        this.configControls ||= new ConfigControls(this);
    }
}

class ConfigControls {
    constructor(context) {
        this.context = context;
        this.build(context);
    }

    #buildNoteSelect = (context, { id, name, selection, onSelect }) => {
        const dropdown = document.createElement("select");
        dropdown.id = id;

        for (let i = 0; i < 9; i++) {
            for (const note of NATURALS) {
                const option = document.createElement("option");
                option.value = option.innerHTML = `${note}${i}`;
                option.selected = option.value == selection;

                dropdown.appendChild(option);
            }
        }

        dropdown.addEventListener("change", ({ target: { value } }) => {
            dropdown.blur(); // Remove focus from element to avoid interference with keyboard input

            const note = value.slice(0, value.length - 1);
            const octave = value.slice(value.length - 1);
            onSelect(new Note(note, octave));
        });

        const label = document.createElement("label");
        label.htmlFor = dropdown.id;
        label.innerHTML = name;
        label.style.color = "#eee";

        context.appendChild(label).appendChild(dropdown);
    }

    build = (context) => {
        const element = document.createElement("div");
        element.style.display = "flex";

        this.#buildNoteSelect(element, {
            id: "start-dropdown",
            name: "Start",
            selection: "C4",
            onSelect: note => {
                context.start = note;
                context.build();
            },
        });
        this.#buildNoteSelect(element, {
            id: "end-dropdown",
            name: "End",
            selection: "B5",
            onSelect: note => {
                context.end = note;
                context.build();
            },
        });

        document.getElementById("app").appendChild(element);
    }
}
