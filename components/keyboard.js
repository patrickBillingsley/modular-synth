export default class Keyboard {
    constructor({ controls = [], manuals = [] }) {
        this.controls = controls;
        this.manuals = manuals;

        this.#build();
    }

    #build() {
        const app = document.getElementById("app");
        const element = document.createElement("div");
        element.id = "keyboard";

        app.appendChild(element);

        this.controls.forEach((control) => { control.build() });
        this.manuals.forEach((manual) => { manual.build() });
    }
}