import Note from "../models/note.js";
import AudioService from "../services/audio_service.js";
import ScreenService from "../services/screen_service.js";

export default class Key {
    constructor({ id, note }) {
        this.id = id;
        this.note = note;

        if (note.isFlat) {
            const screenService = new ScreenService();
            screenService.onChange(this.positionSelf);
        }

        this.build();
    }

    static fromIndex(index, { offset = 0 }) {
        return new Key({
            id: `key-${index}`,
            note: Note.fromIndex(index + offset),
        });
    }

    play = () => {
        new AudioService().play(this.note);
        if (!this.element.classList.contains("playing")) {
            this.element.classList.add("playing");
        }
    }

    stop = () => {
        new AudioService().stop(this.note);
        if (this.element.classList.contains("playing")) {
            this.element.classList.remove("playing");
        }
    }

    positionSelf = () => {
        if (this.note.isFlat) {
            const element = document.getElementById(this.id);
            const neighbor = this.#getLeftNeighbor();

            element.style.width = `${(neighbor.width / 2).toFixed()}px`;
            element.style.height = `${(neighbor.height * 0.7).toFixed()}px`;
            element.style.left = `${(neighbor.left + (neighbor.width * 0.75)).toFixed()}px`;

        }
    }

    #getLeftNeighbor() {
        const index = this.id.split("-").at(-1) - 1;
        const id = `key-${index}`;
        return document.getElementById(id).getBoundingClientRect();
    }

    build() {
        this.element = document.createElement("div");
        this.element.id = this.id;
        this.element.className = `key${this.note.isFlat ? " flat" : ""}`;

        document.getElementById("manual").appendChild(this.element);
    }
}
