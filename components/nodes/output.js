import Node from "./node.js";

export default class Output extends Node {
    static #instance;

    constructor(context) {
        if (Output.#instance) {
            return Output.#instance;
        }

        super(context);
        this.node = context.destination;

        return Output.#instance = this;
    }
}
