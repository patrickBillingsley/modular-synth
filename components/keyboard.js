import Manual from "./manual.js";

export default class Keyboard {
    constructor({ controls, manual }) {
        this.controls = controls || [];
        this.manual = manual || new Manual({});

        this.build();
    }

    build = () => {
        this.element = document.createElement("div");
        this.element.id = "keyboard";

        document.getElementById("app").appendChild(this.element);

        this.controls.forEach((control) => { control.build() });
        this.manual.build();
    }
}