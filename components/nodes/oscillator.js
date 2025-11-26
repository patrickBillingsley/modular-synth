import Node from './node.js';
import Gain from './gain.js';
import { Logging } from '../../mixins/logging.js';

/**
 * @extends {Node}
 */
export default class Oscillator extends Node {
    constructor(context) {
        super(context);
        this.node = context.createOscillator();
        this.gain = new Gain(context, { initialValue: 0.1 });
        this.node.connect(this.gain.node);
    }

    #isPlaying = false;

    connect = (node) => {
        this.log(`Connecting to ${node.constructor.name}`);
        this.gain.connect(node);
        return node;
    }

    play = (freq) => {
        this.node.frequency.linearRampToValueAtTime(freq, this.context.currentTime);
        if (this.#isPlaying) {
            this.gain.setLevel(0.2);
        } else {
            this.node.start(this.context.currentTime);
            this.#isPlaying = true;
        }
    }

    stop = () => {
        this.gain.setLevel(0.0001);
    }

    setWaveform = (waveform) => {
        this.node.type = waveform;
    }
}
