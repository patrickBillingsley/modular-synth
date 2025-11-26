import { NATURAL_NOTE_NAMES } from "../constants.js";
import Key from "./key.js";
import KeyboardController from "../controllers/keyboard_controller.js";
import Note from "../models/note.js";
import { ArgumentError } from "../errors.js";


export default class Manual {
    constructor({ controllers = [new KeyboardController()], start = Note.parse("C4"), end = Note.parse("B5") }) {
        if (!start) {
            throw new ArgumentError("start", "Cannot be null.", new Error().stack);
        }
        if (!end) {
            throw new ArgumentError("end", "Cannot be null.", new Error().stack);
        }
        if (start.value > end.value) {
            throw new ArgumentError("end", "Must be higher than start.", new Error().stack);
        }

        this.id = "manual-0";
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

    #buildNoteSelect = ({ id, name, selection, onSelect }) => {
        const dropdown = document.createElement("select");
        dropdown.id = id;

        for (let i = 0; i < 9; i++) {
            for (const note of NATURAL_NOTE_NAMES) {
                const option = document.createElement("option");
                option.value = option.innerHTML = `${note}${i}`;
                option.selected = option.value == selection;

                dropdown.appendChild(option);
            }
        }

        dropdown.addEventListener("change", ({ target: { value } }) => {
            dropdown.blur(); // Remove focus from element to avoid interference with keyboard input
            onSelect(Note.parse(value));
        });

        const label = document.createElement("label");
        label.htmlFor = dropdown.id;
        label.innerHTML = name;
        label.style.color = "#eee";

        this.element.appendChild(label).appendChild(dropdown);
    }

    build(context) {
        this.element ||= document.createElement("div");
        this.element.style.display = "flex";

        this.#buildNoteSelect({
            id: "start-dropdown",
            name: "Start",
            selection: "C4",
            onSelect: note => {
                context.start = note;
                context.build();
            },
        });
        this.#buildNoteSelect({
            id: "end-dropdown",
            name: "End",
            selection: "B5",
            onSelect: note => {
                context.end = note;
                context.build();
            },
        });

        document.getElementById("app").appendChild(this.element);
    }
}
