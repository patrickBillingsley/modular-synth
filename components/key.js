export default class Key {
    constructor({ semitones = 0 }) {
        this.semitones = semitones;
        this.id = `key-${semitones}`;
        this.component = `<div id=${this.id} class="key" data-semitones="${semitones}">${semitones}</div>`;
    }
}
