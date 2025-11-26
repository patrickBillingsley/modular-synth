import { ArgumentError, UnimplementedError } from '../../errors.js';
import { Logging } from '../../mixins/logging.js';

/** 
 * Represents an AudioNode. 
 * @abstract
 */
export default class Node extends Logging(Object) {
    /**
     * @type {AudioContext}
     * A WebAudio API AudioContext.
     * https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
     */
    context;

    /**
     * @type {AudioNode}
     * A WebAudio API AudioNode.
     * https://developer.mozilla.org/en-US/docs/Web/API/AudioNode
     */
    node;

    /**
     * 
     * @param {AudioContext} context
     */
    constructor(context) {
        super();
        if (this.constructor == Node) {
            throw new Error('Abstract classes cannot be instantiated.');
        }

        if (!(context instanceof AudioContext)) {
            throw new ArgumentError('context', 'AudioContext');
        }

        this.context = context;
    }

    /**
    * Connects one Node to another.
    * @param {Node} node - The Node to connect to.
    * @returns {Node} Returns the node argument to allow for chaining.
    */
    connect = (node) => {
        throw new UnimplementedError('connect is missing a concrete implementation.');
    }
}
