export default class Key {
    constructor({ semitones = 0 }) {
        this.semitones = semitones;
        this.id = `key-${semitones}`;
        this.component = `<div id=${this.id} class="key" data-semitones="${semitones}">${semitones}</div>`;

        this.note = this.notes[this.findIndex(semitones)];
    }

    notes = ["A", "Bb", "B", "C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab"];

    findIndex(semitones) {
        if (semitones < this.notes.length) {
            return this.notes[semitones];
        }
        return this.findIndex(semitones / 2);
    }
}
