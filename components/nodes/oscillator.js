import Gain from './gain.js';
import Knob from '../knob.js';
import Node from './node.js';
import AudioService from '../../services/audio_service.js';
import { Logging } from '../../mixins/logging.js';

/**
 * @extends {Node}
 */
export default class Oscillator extends Logging(Node) {
    constructor() {
        super();
        this.context = new AudioService().context;
        this.input = this.context.createOscillator();
        this.output = this.context.createGain();

        this.level = 0.5;
        this.output.gain.value = 0.0001;
        this.input.start(this.context.currentTime);

        this.input.connect(this.output);
    }

    #isPlaying = false;

    connect = (destination) => {
        console.group(`Connecting to ${destination.constructor.name}`);
        this.output.connect(destination.input);
        console.groupEnd();
        return destination;
    }

    play = (freq) => {
        this.log(`Playing ${freq}`);
        this.input.frequency.linearRampToValueAtTime(freq, this.context.currentTime);
        this.output.gain.linearRampToValueAtTime(this.level, this.context.currentTime);
        this.#isPlaying = true;
    }

    stop = () => {
        this.output.gain.linearRampToValueAtTime(0.0001, this.context.currentTime);
        this.#isPlaying = false;
    }

    setVolume = (level) => {
        this.level = level;
        if (this.#isPlaying) {
            this.output.gain.linearRampToValueAtTime(this.level, this.context.currentTime);
        }
    }

    setWaveform = (waveform) => {
        this.input.type = waveform;
    }

    build = () => {
        Knob.continuous({
            label: "Volume",
            onChange: this.setVolume,
            node: this,
        }).build();
        Knob.rotary({
            label: "Waveform",
            onChange: this.setWaveform,
            options: Waveform.values,
            node: this,
            initialValue: Waveform.SINE,
        }).build();
    }
}
