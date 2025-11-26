export class ArgumentError extends Error {
    constructor(name, reason) {
        super(`Invalid argument for ${name}. ${reason}`);
        this.name = "ArgumentError";
    }
}

export class UnimplementedError extends Error {
    constructor(name) {
        super(`Missing concrete implementation of ${name}.`);
        this.name = "UnimplementedError";
    }
}
