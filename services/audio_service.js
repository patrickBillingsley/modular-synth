import Oscillator from "../components/oscillator.js";

export default class AudioService {
    static #instance;

    constructor() {
        return AudioService.#instance ??= this;
    }

    initialize = () => {
        this.context ||= new AudioContext();
        this.osc ||= new Oscillator(this.context);
    }

    play = (key) => {
        if (!this.osc) return;

        this.osc.play(key);
    }

    stop = () => {
        if (!this.osc) return;

        this.osc.stop();
    }
}