export default class KeyboardInput {
    static availableKeys = ["a", "w", "s", "e", "d", "r", "f", "t", "g", "y", "h", "u", "j", "i", "k", "o", "l", "p", ";"];

    constructor() {
        this.inputs = KeyboardInput.availableKeys.map(input => {
            const entry = {};
            entry[input] = false;

            return entry;
        });

        window.addEventListener("keypress", this.handleKeyPress);
        window.addEventListener("keyup", this.handleKeyPress);
    }

    #callbacks = [];

    listen({ keys, onInput }) {
        const keyRef = [];
        for (const key of keys) {
            const lastKey = keyRef.at(-1);
            if (lastKey && !lastKey.note.isFlat && !key.note.isFlat) {
                keyRef.push(null);
            }
            keyRef.push(key);
        }

        this.#callbacks.push({ keyRef: keyRef, callback: onInput });
    }

    handleKeyPress = (event) => {
        if (!KeyboardInput.availableKeys.includes(event.key)) return;

        const inputIndex = KeyboardInput.availableKeys.indexOf(event.key);

        switch (event.type) {
            case "keypress":
                if (this.inputs[event.key]) return; // Keeps keys from spamming when held.

                this.inputs[event.key] = true;
                break;
            case "keyup":
                this.inputs[event.key] = false;
                break;
        }

        for (const { keyRef, callback } of this.#callbacks) {
            const key = keyRef[inputIndex]
            if (!key) continue;

            callback(key, this.inputs[event.key]);
        }
    }
}
