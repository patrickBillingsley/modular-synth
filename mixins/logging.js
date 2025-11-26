export const Logging = (base) => class extends base {
    get runtimeType() {
        return this.constructor.name;
    }

    log(message, err) {
        const prefix = this.runtimeType;

        if (err) {
            console.group(`${prefix} Error`);
            console.error(`[${prefix}]: ${message}`);
            console.error(err);
            console.groupEnd();
        } else {
            console.log(`[${prefix}]: ${message}`);
        }
    }
}