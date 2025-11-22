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
            screenService.onChange(this.positionSelf.bind(this));
        }
    }

    get isFlat() {
        return this.note.length > 1;
    }

    positionSelf() {
        const element = document.getElementById(this.id);
        this.#positionFlatKey(element);
    }

    #appendDomElement(id, note) {
        const element = document.createElement("div");
        element.id = id;
        element.className = `key${note.length > 1 ? " flat" : ""}`;

        return document.getElementById("keybed").appendChild(element);
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
