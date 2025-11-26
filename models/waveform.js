/**
 * @enum
 */
export default class Waveform {
    constructor(value) {
        this.value = value;
    }

    static SINE = "sine";
    static SQUARE = "square";
    static SAWTOOTH = "sawtooth";
    static TRIANGLE = "triangle";

    static get values() { return Object.values(this) };

    toString() { return this.value }
}