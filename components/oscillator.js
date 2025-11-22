export default class Oscillator {
    isPlaying = false;

    constructor(context) {
        this.context = context;
        this.osc = context.createOscillator();
        this.gainNode = new GainNode(context);
        this.gainNode.gain.value = 0.1;

        this.osc.connect(this.gainNode).connect(context.destination);
    }

    play(key) {
        this.osc.frequency.linearRampToValueAtTime(this.#calculateFreq(key.semitones), this.context.currentTime);
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

    #calculateFreq(semitones = 0) {
        return 440 * 2 ** (semitones / 12);
    }
}
