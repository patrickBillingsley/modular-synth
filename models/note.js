import { NOTE_NAMES } from "../constants.js";

export default class Note {
    // Index of A440
    // Used for calculating frequency by semitones.
    static ref = 48;

    constructor(name, octave) {
        this.name = name;
        this.octave = octave = parseInt(octave);
        this.isFlat = name.at(-1) == "b";

        const nameIndex = NOTE_NAMES.indexOf(name);
        const offset = octave * NOTE_NAMES.length;
        this.value = offset + nameIndex;
    }

    static parse(string) {
        const name = string.slice(0, string.length - 1);
        const octave = string.slice(string.length - 1);

        return new Note(name, octave);
    }

    static fromIndex(index) {
        const name = NOTE_NAMES[index % NOTE_NAMES.length];
        const octave = Math.floor(index / NOTE_NAMES.length);

        return new Note(name, octave);
    }

    get freq() {
        const semitones = this.value - Note.ref;

        return 440 * 2 ** (semitones / NOTE_NAMES.length);
    }

    plus({ octaves }) {
        return new Note(this.name, this.octave + octaves);
    }

    difference(other) {
        return Math.abs(this.value - other.value);
    }

    toString() {
        return `${this.note}${this.octave}`;
    }
}
