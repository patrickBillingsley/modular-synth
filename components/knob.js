import AudioService from "../services/audio_service.js";

export default class Knob {
    constructor({ label, type = KnobType.CONTINUOUS, onChange, options }) {
        this.label = label;
        this.type = type;
        this.onChange = onChange;
        this.options = options;
    }

    static continuous({ label, onChange }) {
        return new Knob({
            label: label,
            type: KnobType.CONTINUOUS,
            onChange: onChange,
        });
    }

    static rotary({ label, onChange, options }) {
        console.assert(options, "Options must be provided for a rotary knob.");

        return new Knob({
            label: label,
            type: KnobType.ROTARY,
            onChange, onChange,
            options: options,
        })
    }

    get id() { `${this.label}-knob` };

    build = () => {
        const keyboard = document.getElementById("keyboard");

        const element = document.createElement("input");
        element.type = "range";
        element.id = this.id;
        element.className = "knob";
        element.name = this.label;
        if (this.options) {
            element.max = this.options.length - 1;
            element.oninput = ({ target: { value } }) => this.onChange(this.options[value]);
        } else {
            element.oninput = this.onChange;
        }

        const label = document.createElement("label");
        label.htmlFor = this.id;
        label.innerHTML = this.label;

        keyboard.appendChild(label);
        keyboard.appendChild(element);
    }
}

export class KnobType {
    static CONTINUOUS = "continuous";
    static ROTARY = "rotary";
}
