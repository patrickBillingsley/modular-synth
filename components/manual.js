import Key from "./key.js";

export default class Manual {
    constructor({ octaves = 1 }) {
        this.octaves = octaves;
        this.keys = [];
    }

    build() {
        const element = document.createElement("div");
        element.id = "keybed";
        document.getElementById('keyboard').appendChild(element);

        for (let i = 0; i <= this.octaves * 12; i++) {
            this.keys.push(new Key({ semitones: i }));
        }

        this.keys.forEach((k) => k.positionSelf());
    }
}
