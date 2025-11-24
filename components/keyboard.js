import Manual from "./manual.js";

export default class Keyboard {
    constructor({
        controls = [],
        manual = new Manual({}),
    }) {
        this.controls = controls;
        this.manual = manual;

        this.#build();
    }

    #build() {
        const app = document.getElementById("app");
        const element = document.createElement("div");
        element.id = "keyboard";

        app.appendChild(element);

        this.controls.forEach((control) => { control.build() });
        this.manual.build();
    }
}