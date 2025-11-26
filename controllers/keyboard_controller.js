export default class KeyboardController {
    static availableKeys = ["a", "w", "s", "e", "d", "r", "f", "t", "g", "y", "h", "u", "j", "i", "k", "o", "l", "p", ";"];

    constructor() {
        this.inputs = KeyboardController.availableKeys.map((input) => {
            const entry = {};
            entry[input] = false;

            return entry;
        });

        window.addEventListener("keypress", this.handleKeyPress);
        window.addEventListener("keyup", this.handleKeyPress);
    }

    #nextSubscriptionId = 0;
    #subscriptions = [];

    listen = ({ keys }, callback) => {
        const subscription = {
            id: this.#nextSubscriptionId,
            keyRef: this.#keyRefFrom(keys),
            callback: callback,
        };
        this.#subscriptions.push(subscription);
        this.#nextSubscriptionId++;

        return {
            cancel: () => {
                const index = this.#subscriptions.indexOf(subscription);
                if (index > -1) {
                    this.#subscriptions.splice(index, 1);
                }
            }
        };
    }

    handleKeyPress = (event) => {
        const inputIndex = KeyboardController.availableKeys.indexOf(event.key);
        if (inputIndex < 0) return;

        switch (event.type) {
            case "keypress":
                if (this.inputs[event.key]) return; // Keeps keys from spamming when held.

                this.inputs[event.key] = true;
                break;
            case "keyup":
                this.inputs[event.key] = false;
                break;
        }

        for (const { keyRef, callback } of this.#subscriptions) {
            const key = keyRef[inputIndex]
            if (!key) continue;

            callback(key, this.inputs[event.key]);
        }
    }

    #keyRefFrom = (keys) => {
        const keyRef = [];
        for (const key of keys) {
            const previousKey = keyRef.at(-1);
            if (previousKey && !previousKey.note.isFlat && !key.note.isFlat) {
                keyRef.push(null); // Skip non-existent Cb and Fb.
            }
            keyRef.push(key);
        }

        return keyRef;
    }
}
