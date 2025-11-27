import AudioService from "../../services/audio_service.js";
import Knob from "../knob.js";
import Node from "./node.js";

export default class Output extends Node {
    static #instance;

    constructor() {
        if (Output.#instance) {
            return Output.#instance;
        }

        super();
        Output.#instance = this;
        this.context = new AudioService().context;
        this.input = this.context.createGain();
        this.output = this.context.destination;

        this.volume = 0.5;
        this.input.gain.value = this.volume;

        this.input.connect(this.output);
    }

    setLevel = (level) => {
        this.log(`Master Volume: ${level}`);
        this.volume = level;
        this.input.gain.linearRampToValueAtTime(this.volume, this.context.currentTime);
    }

    build = () => {
        Knob.continuous({
            label: "Master Volume",
            onChange: this.setLevel,
            node: this,
        }).build();
    }
}
