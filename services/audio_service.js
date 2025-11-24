import Oscillator from "../components/oscillator.js";

export default class AudioService {
    static #instance;

    constructor() {
        return AudioService.#instance ??= this;
    }

    #heldNotes = [];

    get #highestNote() {
        const heldNotes = this.#heldNotes;
        return heldNotes[heldNotes.findLastIndex(n => n)];
    }

    initialize = () => {
        this.context ||= new AudioContext();
        this.osc ||= new Oscillator(this.context);
        this.masterVol ||= new GainNode(this.context);
        this.masterVol.gain.value = 1;

        this.connect();
    }

    connect = () => {
        this.osc.connect(this.masterVol).connect(this.context.destination);
    }

    play = (note) => {
        if (!this.osc) return;

        this.#heldNotes.push(note);
        this.#heldNotes.sort();
        this.osc.play(this.#highestNote.freq);
    }

    stop = (note) => {
        const index = this.#heldNotes.indexOf(note);
        if (index > -1) {
            this.#heldNotes.splice(index, 1);
        }
        if (!this.osc) return;

        if (this.#heldNotes.some(n => n)) {
            this.osc.play(this.#highestNote.freq);
        } else {
            this.osc.stop();
        }
    }

    setVolume = ({ target: { value } }) => {
        value = (value * 0.01).toFixed(2);
        console.log(`Volume: ${value}`);
        this.masterVol.gain.linearRampToValueAtTime(value, this.context.currentTime);
    }
}