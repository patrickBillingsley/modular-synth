import AudioService from "../services/audio_service.js";
import ScreenService from "../services/screen_service.js";

export default class Key {
    static notes = ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab"];

    constructor({ semitones = 0 }) {
        this.semitones = semitones;
        this.id = `key-${semitones}`;
        this.note = this.#findNote(semitones);

        this.#appendDomElement(this.id, this.note);

        if (this.note.length > 1) {
            const screenService = new ScreenService();
            screenService.onChange(this.positionSelf);
        }
    }

    get isFlat() {
        return this.note.length > 1;
    }

    positionSelf = () => {
        if (this.isFlat) {
            const element = document.getElementById(this.id);
            this.#positionFlatKey(element);
        }
    }

    play = () => {
        new AudioService().play(this);
        console.log(this.element);
        if (!this.element.classList.contains("playing")) {
            this.element.classList.add("playing");
        }
    }

    stop = () => {
        new AudioService().stop();
        if (this.element.classList.contains("playing")) {
            this.element.classList.remove("playing");
        }
    }

    #appendDomElement(id, note) {
        this.element = document.createElement("div");
        this.element.id = id;
        this.element.className = `key${note.length > 1 ? " flat" : ""}`;

        const audioService = new AudioService();
        this.element.addEventListener("mouseover", this.play);
        this.element.addEventListener("mouseleave", this.stop);

        return document.getElementById("keybed").appendChild(this.element);
    }

    #positionFlatKey(element) {
        const neighbor = document.getElementById(`key-${this.semitones - 1}`).getBoundingClientRect();
        element.style.width = `${neighbor.width / 2}px`;
        element.style.height = `${neighbor.height * 0.7}px`;
        element.style.left = `${neighbor.left + (neighbor.width * 0.75)}px`;
    }

    #findNote(semitones) {
        if (semitones < Key.notes.length) {
            return Key.notes[semitones];
        }
        return this.#findNote(semitones - Key.notes.length);
    }
}
