import { ArgumentError } from "../errors.js";

export default class Knob {
    constructor({ label, onChange, options, node, initialValue }) {
        this.label = label;
        this.options = options;
        this.node = node;
        this.initialValue = initialValue ?? node.level;

        this.onChange = (value) => {
            if (options) {
                onChange(options[value]);
            } else {
                value = (value * 0.01).toFixed(2);
                onChange(value);
            }
        }
    }

    static continuous({ label, onChange, node }) {
        return new Knob({
            label: label,
            onChange: onChange,
            node: node,
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

    get id() { return `${this.label}-knob`; }

    update = (target) => {
        for (const data of ["min", "max", "value"]) {
            if (this.element[data]) {
                this.element.style.setProperty(`--${data}`, this.element[data]);
            }
        }
    }

    build = () => {
        this.element = document.createElement("input");
        this.element.type = "range";
        this.element.id = this.id;
        this.element.className = "knob";
        this.element.name = this.label;
        this.element.value = this.initialValue * 100;
        if (this.options) {
            this.element.max = this.options.length - 1;
        }

        this.element.oninput = ({ target }) => {
            this.update(target);
            this.onChange(target.value);
        }

        for (const event of ["input", "change"]) {
            this.element.addEventListener(event, this.update);
        }

        // Initialize CSS custom properties before appending to DOM
        this.update();

        this.container = document.createElement("div");
        this.container.className = "knob-container";

        const label = document.createElement("label");
        label.htmlFor = this.id;
        label.innerHTML = this.label;

        this.container.appendChild(label);
        this.container.appendChild(this.element);

        const controlPanel = document.getElementById("control-panel");
        controlPanel.appendChild(this.container);
    }
}
