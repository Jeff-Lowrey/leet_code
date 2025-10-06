/**
 * 232. Implement
 * Medium
 *
 * Queue Implementation in JavaScript A Queue is a First-In-First-Out (FIFO) data structure
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Implement is to understand the core problem pattern
 * and apply the most efficient algorithmic approach.
 *
 * ### APPROACH:
 * 1. Analyze the problem requirements
 * 2. Choose the optimal data structure
 * 3. Implement the solution step by step
 * 4. Handle edge cases appropriately
 *
 * ### WHY THIS WORKS:
 * This approach works because it leverages the fundamental properties of the problem
 * to achieve an efficient solution.
 *
 * ### EXAMPLE WALKTHROUGH:
 * For a typical input, the algorithm processes the data systematically
 * to produce the expected output.
 *
 * </details>
 */

/**
 * Queue Implementation in JavaScript
 * A Queue is a First-In-First-Out (FIFO) data structure
 */

class Queue {
    /**
     * Initialize an empty queue
     */
    constructor() {
        this.items = [];
        this.frontIndex = 0;
        this.backIndex = 0;
    }

    /**
     * Add an element to the back of the queue
     * @param {*} element - The element to enqueue
     * @returns {void}
     */
    enqueue(element) {
        if (element === undefined || element === null) {
            throw new Error("Cannot enqueue undefined or null elements");
        }
        this.items[this.backIndex] = element;
        this.backIndex++;
    }

    /**
     * Remove and return the front element from the queue
     * @returns {*} The front element of the queue
     * @throws {Error} If the queue is empty
     */
    dequeue() {
        if (this.isEmpty()) {
            throw new Error("Cannot dequeue from an empty queue");
        }

        const item = this.items[this.frontIndex];
        delete this.items[this.frontIndex];
        this.frontIndex++;

        // Reset indices when queue becomes empty
        if (this.frontIndex === this.backIndex) {
            this.frontIndex = 0;
            this.backIndex = 0;
        }

        return item;
    }

    /**
     * View the front element without removing it
     * @returns {*} The front element of the queue
     * @throws {Error} If the queue is empty
     */
    peek() {
        if (this.isEmpty()) {
            throw new Error("Cannot peek an empty queue");
        }
        return this.items[this.frontIndex];
    }

    /**
     * Check if the queue is empty
     * @returns {boolean} True if queue is empty, false otherwise
     */
    isEmpty() {
        return this.frontIndex === this.backIndex;
    }

    /**
     * Get the current size of the queue
     * @returns {number} The number of elements in the queue
     */
    size() {
        return this.backIndex - this.frontIndex;
    }

    /**
     * Clear all elements from the queue
     * @returns {void}
     */
    clear() {
        this.items = [];
        this.frontIndex = 0;
        this.backIndex = 0;
    }

    /**
     * Convert the queue to an array
     * @returns {Array} Array containing all queue elements in order
     */
    toArray() {
        return this.items.slice(this.frontIndex, this.backIndex);
    }
}

// Example usage:
try {
    // Create a new queue
    const queue = new Queue();

    // Add some elements
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    console.log("Queue size:", queue.size()); // 3
    console.log("Front element:", queue.peek()); // 1
    console.log("Queue as array:", queue.toArray()); // [1, 2, 3]

    // Remove elements
    console.log("Dequeued:", queue.dequeue()); // 1
    console.log("Dequeued:", queue.dequeue()); // 2

    console.log("New size:", queue.size()); // 1
    console.log("Is empty?", queue.isEmpty()); // false

    // Clear the queue
    queue.clear();
    console.log("After clear - Is empty?", queue.isEmpty()); // true

} catch (error) {
    console.error("Error:", error.message);
}

// Export the Queue class for use in other modules
module.exports = Queue;