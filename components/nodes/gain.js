import Node from "./node.js";

/**
 * @extends {Node}
 */
export default class Gain extends Node {
    /**
     * 
     * @param {AudioContext} context 
     * @param {number} [initialValue = 1] 
     */
    constructor(context, { initialValue = 1 }) {
        if (initialValue < 0) {
            initialValue = 0;
        } else if (initialValue > 1) {
            initialValue = 1;
        }

        super(context);
        this.node = new GainNode(context);
        this.node.gain.value = initialValue;
    }

    connect = (node) => {
        this.log(`Connecting to ${node.constructor.name}`);
        this.node.connect(node.node);
        return node;
    }

    setLevel = (level) => {
        this.node.gain.linearRampToValueAtTime(level, this.context.currentTime);
        return this;
    }
}
