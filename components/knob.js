import AudioService from "../services/audio_service.js";

export default class Knob {
    constructor({ label, type = KnobType.GAIN, onChange }) {
        this.label = label;
        this.type = type;
        this.onChange = onChange;
    }

    get id() { `${this.label}-knob` };

    build() {
        const keyboard = document.getElementById("keyboard");

        const element = document.createElement("input");
        element.type = "range";
        element.id = this.id;
        element.className = "knob";
        element.name = this.label;
        element.oninput = this.onChange;

        const label = document.createElement("label");
        label.htmlFor = this.id;
        label.innerHTML = this.label;

        keyboard.appendChild(label);
        keyboard.appendChild(element);
    }
}

export class KnobType {
    static GAIN = "gain";
}
