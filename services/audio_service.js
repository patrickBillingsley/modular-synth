import Oscillator from "../components/nodes/oscillator.js";
import Output from "../components/nodes/output.js";
import { Logging } from "../mixins/logging.js";

export default class AudioService extends Logging(Object) {
    static #instance;

    constructor() {
        if (AudioService.#instance) {
            return AudioService.#instance;
        }

        super();
        AudioService.#instance = this;
        this.context = new AudioContext();
        this.output = new Output();
        this.oscillators = [];
    }

    #heldNotes = [];

    get highestNote() {
        return this.#heldNotes.sort((a, b) => a.value - b.value).at(-1)
    }

    initialize = () => {
        try {
            for (const oscillator of this.oscillators) {
                oscillator.connect(this.output);
            }
            this.log("Successfully initialized.");
        } catch (err) {
            this.log("Failed to initialize.", err);
        }
    }

    play = (note) => {
        this.log(`${note} pressed.`);
        this.#heldNotes.push(note);
        for (const oscillator of this.oscillators) {
            this.log(`Playing ${this.highestNote}.`);
            oscillator.play(this.highestNote.freq);
        }
    }

    stop = (note) => {
        const index = this.#heldNotes.indexOf(note);
        if (index > -1) {
            this.#heldNotes.splice(index, 1);
        }

        if (this.#heldNotes.some(n => n)) {
            for (const oscillator of this.oscillators) {
                oscillator.play(this.highestNote.freq);
            }
        } else {
            for (const oscillator of this.oscillators) {
                oscillator.stop();
            }
        }
    }

    generateOscillators = (count) => {
        if (this.oscillators.length >= count) {
            return;
        }

        this.log(`Generating ${this.oscillators.length + 1} of ${count} oscillators.`);
        const oscillator = new Oscillator();
        oscillator.connect(this.output);
        oscillator.build();
        this.oscillators.push(oscillator);

        return this.generateOscillators(count);
    }
}