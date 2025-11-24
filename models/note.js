import { NOTES } from "../constants.js";

export default class Note {
    constructor(note, octave) {
        this.note = note;
        this.octave = octave;

        this.isFlat = note.length > 1;
        const noteIndex = NOTES.indexOf(note);

        const offset = octave * NOTES.length;
        this.value = offset + noteIndex;
    }

    static fromIndex(index) {
        const note = NOTES[index % NOTES.length];
        const octave = Math.floor(index / NOTES.length);
        return new Note(note, octave);
    }

    get freq() {
        const ref = new Note("A", 4);
        const semitones = this.value - ref.value;
        console.log(`ref: ${ref.value}, this: ${this.value}, semitones: ${semitones}`);

        return 440 * 2 ** (semitones / NOTES.length);
    }

    difference(other) {
        return Math.abs(this.value - other.value);
    }
}
