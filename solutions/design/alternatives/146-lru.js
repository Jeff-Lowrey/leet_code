/**
 * 146. Lru
 * Medium
 *
 * LRUCache Implementation Uses a combination of HashMap and Doubly Linked List for O(1) operations
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Lru is to understand the core problem pattern
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
 * LRUCache Implementation
 * Uses a combination of HashMap and Doubly Linked List for O(1) operations
 */

// Node class for doubly linked list
class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    /**
     * Initialize LRU Cache with a maximum capacity
     * @param {number} capacity - Maximum number of items the cache can hold
     */
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map(); // HashMap for O(1) lookup
        
        // Initialize dummy head and tail nodes
        this.head = new Node(0, 0);
        this.tail = new Node(0, 0);
        
        // Connect head and tail
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    /**
     * Remove a node from the doubly linked list
     * @param {Node} node - Node to be removed
     * @private
     */
    _removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    /**
     * Add a node right after the head
     * @param {Node} node - Node to be added
     * @private
     */
    _addNode(node) {
        node.prev = this.head;
        node.next = this.head.next;
        this.head.next.prev = node;
        this.head.next = node;
    }

    /**
     * Move a node to the front (mark as most recently used)
     * @param {Node} node - Node to be moved
     * @private
     */
    _moveToFront(node) {
        this._removeNode(node);
        this._addNode(node);
    }

    /**
     * Get value from cache by key
     * @param {number} key - Key to lookup
     * @return {number} - Value associated with key, or -1 if not found
     */
    get(key) {
        if (this.cache.has(key)) {
            const node = this.cache.get(key);
            // Move to front (mark as recently used)
            this._moveToFront(node);
            return node.value;
        }
        return -1;
    }

    /**
     * Put key-value pair into cache
     * @param {number} key - Key to store
     * @param {number} value - Value to store
     */
    put(key, value) {
        if (this.cache.has(key)) {
            // Update existing key
            const node = this.cache.get(key);
            node.value = value;
            this._moveToFront(node);
        } else {
            // Add new key
            const newNode = new Node(key, value);
            this.cache.set(key, newNode);
            this._addNode(newNode);

            // Check if over capacity
            if (this.cache.size > this.capacity) {
                // Remove least recently used item (last item before tail)
                const lru = this.tail.prev;
                this._removeNode(lru);
                this.cache.delete(lru.key);
            }
        }
    }
}

/**
 * Example usage:
 */
function runExample() {
    const cache = new LRUCache(2);
    
    cache.put(1, 1); // cache is {1=1}
    cache.put(2, 2); // cache is {1=1, 2=2}
    console.log(cache.get(1));    // returns 1
    cache.put(3, 3); // LRU key was 2, cache is {1=1, 3=3}
    console.log(cache.get(2));    // returns -1 (not found)
    cache.put(4, 4); // LRU key was 1, cache is {4=4, 3=3}
    console.log(cache.get(1));    // returns -1 (not found)
    console.log(cache.get(3));    // returns 3
    console.log(cache.get(4));    // returns 4
}

// Export the LRUCache class
module.exports = LRUCache;

// Uncomment to run the example
// runExample();