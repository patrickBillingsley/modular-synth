import Oscillator from "../components/oscillator.js";

export default class AudioService {
    static #instance;

    constructor() {
        return AudioService.#instance ??= this;
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

    play = (key) => {
        if (!this.osc) return;

        this.osc.play(key);
    }

    stop = () => {
        if (!this.osc) return;

        this.osc.stop();
    }

    setVolume = ({ target: { value } }) => {
        value = (value * 0.01).toFixed(2);
        console.log(`Volume: ${value}`);
        this.masterVol.gain.linearRampToValueAtTime(value, this.context.currentTime);
    }
}