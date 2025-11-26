export default class ScreenService {
    static #instance;

    #callbacks = [];

    constructor() {
        if (ScreenService.#instance) {
            return ScreenService.#instance;
        }

        window.addEventListener('resize', this.notifyListeners);

        return ScreenService.#instance = this;
    }

    get availWidth() {
        return window.innerWidth;
    }


    onChange = (callback) => {
        this.#callbacks.push(callback);
    }

    notifyListeners = () => {
        for (const callback of this.#callbacks) {
            callback(this.availWidth);
        }
    }
}
