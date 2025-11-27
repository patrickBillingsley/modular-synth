import AudioService from "../../services/audio_service.js";
import Node from "./node.js";

/**
 * @extends {Node}
 */
export default class Gain extends Node {
    /**
     * 
     * @param {number} [initialValue = 1] 
     */
    constructor() {
        super();
        this.context = new AudioService().context;
        this.input = this.context.createGain();
        this.output = this.input;

        this.level = 0.5;
        this.input.gain.value = this.level;
    }

    connect = (destination) => {
        this.log(`Connecting to ${destination.constructor.name}`);
        this.output.connect(destination.input);
        return destination;
    }

    setLevel = (level) => {
        this.input.gain.linearRampToValueAtTime(level, this.context.currentTime);
        return this;
    }
}
