import { ArgumentError } from "../errors.js";

export default class Knob {
    constructor({ label, onChange, options, initialValue, }) {
        this.label = label;
        this.onChange = onChange;
        this.options = options;
        this.initialValue = initialValue;
    }

    static continuous({ label, onChange, initialValue }) {
        return new Knob({
            label: label,
            onChange: onChange,
            initialValue: initialValue,
        });
    }

    static rotary({ label, onChange, options, initialValue }) {
        if (!options) {
            throw new ArgumentError("options", "Cannot be empty.", new Error().stack);
        }

        return new Knob({
            label: label,
            onChange, onChange,
            options: options,
            initialValue: options.indexOf(initialValue),
        })
    }

    get id() { `${this.label}-knob` };

    build = () => {
        this.element = document.createElement("input");
        this.element.type = "range";
        this.element.id = this.id;
        this.element.className = "knob";
        this.element.name = this.label;
        this.element.value = this.initialValue;
        if (this.options) {
            this.element.max = this.options.length - 1;
            this.element.oninput = ({ target: { value } }) => this.onChange(this.options[value]);
        } else {
            this.element.oninput = ({ target: { value } }) => this.onChange(value);
        }

        this.onChange(this.element.value);

        const label = document.createElement("label");
        label.htmlFor = this.id;
        label.innerHTML = this.label;

        const keyboard = document.getElementById("keyboard");
        keyboard.appendChild(label);
        keyboard.appendChild(this.element);
    }
}
