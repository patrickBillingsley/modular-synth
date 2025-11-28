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

    drawTicks(canvas, tickCount, isRotary) {
        const size = 80;
        const ctx = canvas.getContext('2d');

        canvas.width = size;
        canvas.height = size;
        canvas.style.width = `${size}px`;
        canvas.style.height = `${size}px`;

        const centerX = size / 2;
        const centerY = size / 2;
        const radius = (size * 38) / 100;

        // Rotary: -90° to 90° clockwise along top (180° range), Continuous: 55° to 305° (250° range)
        const startAngle = isRotary ? 90 : 55;
        const fullAngle = isRotary ? 180 : 250;

        ctx.translate(centerX, centerY);

        for (let i = 0; i <= tickCount; i++) {
            const angle = (fullAngle / tickCount) * i;
            const totalAngle = startAngle + angle + 90;
            const radians = (totalAngle * Math.PI) / 180;

            // Set tick properties
            const tickWidth = 1.2;
            const tickHeight = 4;
            const tickColor = "#222";

            ctx.save();
            ctx.rotate(radians);

            // Draw tick
            ctx.fillStyle = tickColor;
            ctx.fillRect(
                radius - tickHeight / 2,
                -tickWidth / 2,
                tickHeight,
                tickWidth
            );

            ctx.restore();
        }

        ctx.restore();
    }

    update = () => {
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
        this.element.max = this.options ? this.options.length - 1 : 100;
        this.element.oninput = ({ target }) => {
            this.update();
            this.onChange(target.value);
        }

        for (const event of ["input", "change"]) {
            this.element.addEventListener(event, this.update);
        }

        // Initialize CSS custom properties before appending to DOM
        this.update();

        // Create canvas for ticks
        const canvas = document.createElement("canvas");
        canvas.className = "knob-canvas";
        const isRotary = !!this.options;
        const tickCount = this.options ? this.options.length - 1 : 10;
        this.drawTicks(canvas, tickCount, isRotary);

        // Set custom angle properties for rotary knobs
        if (isRotary) {
            this.element.style.setProperty('--full-angle', '180');
            this.element.style.setProperty('--start-angle', '90');
        }

        // Create wrapper to hold canvas and input together
        const wrapper = document.createElement("div");
        wrapper.className = "knob-wrapper";
        wrapper.appendChild(canvas);
        wrapper.appendChild(this.element);

        this.container = document.createElement("div");
        this.container.className = "knob-container";

        const label = document.createElement("label");
        label.htmlFor = this.id;
        label.innerHTML = this.label;

        this.container.appendChild(label);
        this.container.appendChild(wrapper);

        const controlPanel = document.getElementById("control-panel");
        controlPanel.appendChild(this.container);
    }
}
