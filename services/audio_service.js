import Gain from "../components/nodes/gain.js";
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
        this.context = new AudioContext();
        this.osc = new Oscillator(this.context);
        this.volumes = [new Gain(this.context, {})];
        this.output = new Output(this.context);

        return AudioService.#instance ||= this;
    }

    #heldNotes = [];

    get masterVol() { return this.volumes[0] }
    get highestNote() {
        return this.#heldNotes.sort((a, b) => a.value - b.value).at(-1)
    }

    initialize = () => {
        try {
            this.osc.connect(this.masterVol).connect(this.output);
            this.log("Successfully initialized.");
        } catch (err) {
            this.log("Failed to initialize.", err);
        }
    }

    static play = (note) => {
        if (!AudioService.#instance.osc) return;

        AudioService.#instance.#heldNotes.push(note);
        AudioService.#instance.osc.play(AudioService.#instance.highestNote.freq);
    }

    static stop = (note) => {
        const index = AudioService.#instance.#heldNotes.indexOf(note);
        if (index > -1) {
            AudioService.#instance.#heldNotes.splice(index, 1);
        }
        if (!AudioService.#instance.osc) return;

        if (AudioService.#instance.#heldNotes.some(n => n)) {
            AudioService.#instance.osc.play(AudioService.#instance.highestNote.freq);
        } else {
            AudioService.#instance.osc.stop();
        }
    }

    static setMasterVolume = (value) => {
        value = (value * 0.01).toFixed(2);
        AudioService.#instance.log(`Master Volume: ${value}`);
        AudioService.#instance.masterVol.setLevel(value);
    }

    static setWaveform = (waveform) => {
        AudioService.#instance.log(`Waveform: ${waveform}`);
        AudioService.#instance.osc.setWaveform(waveform);
    }
}