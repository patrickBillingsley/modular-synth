export default class ScreenService {
    static #instance;

    callbacks = [];

    constructor() {
        if (ScreenService.#instance) {
            return ScreenService.#instance ??= this;
        }

        window.addEventListener('resize', this.notifyListeners.bind(this));
    }

    get availWidth() {
        return window.innerWidth;
    }


    onChange(callback) {
        this.callbacks.push(callback);
    }

    notifyListeners() {
        for (const callback of this.callbacks) {
            callback(this.availWidth);
        }
    }
}
