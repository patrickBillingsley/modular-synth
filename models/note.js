import { NOTE_NAMES } from "../constants.js";

export default class Note {
    /**
     * @type {number}
     * Index of middle A
     */
    static ref = 48;

    /**
     * 
     * @param {String} name 
     * @param {String | number} octave 
     */
    constructor(name, octave) {
        this.name = name;
        this.octave = octave = parseInt(octave);
        this.isFlat = name.at(-1) == "b";

        const nameIndex = NOTE_NAMES.indexOf(name);
        const offset = octave * NOTE_NAMES.length;
        this.value = offset + nameIndex;
    }

    /**
     * 
     * @param {String} string 
     * @constructor
     */
    static parse(string) {
        const name = string.slice(0, string.length - 1);
        const octave = string.slice(string.length - 1);

        return new Note(name, octave);
    }

    /**
     * 
     * @param {number} index 
     * @constructor
     */
    static fromIndex(index) {
        const name = NOTE_NAMES[index % NOTE_NAMES.length];
        const octave = Math.floor(index / NOTE_NAMES.length);

        return new Note(name, octave);
    }

    /**
     * @returns {number}
     */
    get freq() {
        const semitones = this.value - Note.ref;

        return 440 * 2 ** (semitones / NOTE_NAMES.length);
    }

    /**
     * 
     * @param {number} octaves 
     * @returns {Note}
     */
    add({ octaves }) {
        return new Note(this.name, this.octave + octaves);
    }

    /**
     * 
     * @param {Note} other
     * @returns
     */
    difference(other) {
        return Math.abs(this.value - other.value);
    }

    toString() {
        return `${this.name}${this.octave}`;
    }
}
