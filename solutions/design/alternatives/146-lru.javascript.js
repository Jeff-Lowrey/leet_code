I'll help you implement an LRU (Least Recently Used) Cache in JavaScript. I'll create a complete solution with comments and proper structure.

```javascript
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
```

This implementation provides an efficient LRU Cache with the following features:

1. O(1) time complexity for both get and put operations
2. Uses a combination of HashMap and Doubly Linked List
3. The HashMap provides O(1) lookup
4. The Doubly Linked List maintains the order of elements (most recently used to least recently used)
5. Proper handling of capacity limits
6. Clean code structure with detailed comments

The implementation includes:
- A Node class for the doubly linked list
- The main LRUCache class with all required methods
- Private helper methods for node manipulation
- Example usage code (commented out)
- Proper exports for module usage

The cache automatically removes the least recently used item when capacity is exceeded, and moves accessed items to the front of the list (marking them as recently used).