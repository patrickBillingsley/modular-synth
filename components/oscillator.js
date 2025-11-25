export default class Oscillator {
    isPlaying = false;

    constructor(context) {
        this.context = context;
        this.osc = context.createOscillator();
        this.gainNode = new GainNode(context);
        this.gainNode.gain.value = 0.1;

        this.osc.connect(this.gainNode);
    }

    connect(destination) {
        this.gainNode.connect(destination);
        return destination;
    }

    play(freq) {
        this.osc.frequency.linearRampToValueAtTime(freq, this.context.currentTime);
        if (!this.isPlaying) {
            this.osc.start(this.context.currentTime);
            this.isPlaying = true;
        } else {
            this.gainNode.gain.linearRampToValueAtTime(0.2, this.context.currentTime);
        }
    }

    stop() {
        this.gainNode.gain.linearRampToValueAtTime(0.0001, this.context.currentTime);
    }

    setWaveform(waveform) {
        this.osc.type = waveform;
    }
}

export class Waveform {
    static SINE = "sine";
    static SQUARE = "square";
    static SAWTOOTH = "sawtooth";
    static TRIANGLE = "triangle";

    static get values() { return Object.values(this) };
}
