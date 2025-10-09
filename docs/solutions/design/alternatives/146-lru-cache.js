/**
 * Difficulty: Medium
 *
 * [Problem description goes here]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[input description]</dd>
 * <dt>Output:</dt>
 * <dd>[output description]</dd>
 * <dt>Explanation:</dt>
 * <dd>[explanation]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * [High-level insight or key observation]
 *
 * ### APPROACH:
 * [Detailed explanation of the solution approach]
 *
 * ### WHY THIS WORKS:
 * - [Explanation of correctness]
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * [example input]
 * ```
 * **Step 1:** [description]
 * **Step 2:** [description]
 *
 * ### TIME COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### SPACE COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### EDGE CASES:
 * - **[Edge case 1]:** [how it's handled]
 * - **[Edge case 2]:** [how it's handled]
 *
 * </details>
 */

/**
 * Node class for doubly-linked list
 */
class ListNode {
    constructor(key = 0, value = 0) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

/**
 * LRU Cache implementation
 *
 * @param {number} capacity - Maximum number of key-value pairs to store
 */
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map(); // key -> node mapping

        // Create dummy head and tail nodes for easier list manipulation
        this.head = new ListNode();
        this.tail = new ListNode();
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    /**
     * Get value for given key
     * @param {number} key
     * @return {number}
     */
    get(key) {
        const node = this.cache.get(key);
        if (!node) {
            return -1;
        }

        // Move accessed node to head (most recently used)
        this.moveToHead(node);
        return node.value;
    }

    /**
     * Put key-value pair in cache
     * @param {number} key
     * @param {number} value
     */
    put(key, value) {
        const existingNode = this.cache.get(key);

        if (existingNode) {
            // Update existing key
            existingNode.value = value;
            this.moveToHead(existingNode);
        } else {
            // Add new key
            const newNode = new ListNode(key, value);

            if (this.cache.size >= this.capacity) {
                // Remove least recently used (tail)
                const tail = this.removeTail();
                this.cache.delete(tail.key);
            }

            this.cache.set(key, newNode);
            this.addToHead(newNode);
        }
    }

    /**
     * Add node right after head
     * @param {ListNode} node
     */
    addToHead(node) {
        node.prev = this.head;
        node.next = this.head.next;
        this.head.next.prev = node;
        this.head.next = node;
    }

    /**
     * Remove node from its current position
     * @param {ListNode} node
     */
    removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    /**
     * Move node to head (mark as most recently used)
     * @param {ListNode} node
     */
    moveToHead(node) {
        this.removeNode(node);
        this.addToHead(node);
    }

    /**
     * Remove and return tail node (least recently used)
     * @return {ListNode}
     */
    removeTail() {
        const lastNode = this.tail.prev;
        this.removeNode(lastNode);
        return lastNode;
    }
}

/**
 * Factory function for creating LRU Cache instances
 * @param {number} capacity
 * @return {LRUCache}
 */
function solve(capacity) {
    return new LRUCache(capacity);
}

/**
 * Test cases for Problem 146: LRU Cache
 */
function testSolution() {
    console.log('Testing 146. LRU Cache');

    // Test case 1: Basic functionality
    const lru1 = new LRUCache(2);
    lru1.put(1, 1);
    lru1.put(2, 2);
    console.assert(lru1.get(1) === 1, 'Test 1a failed');
    lru1.put(3, 3); // evicts key 2
    console.assert(lru1.get(2) === -1, 'Test 1b failed');
    lru1.put(4, 4); // evicts key 1
    console.assert(lru1.get(1) === -1, 'Test 1c failed');
    console.assert(lru1.get(3) === 3, 'Test 1d failed');
    console.assert(lru1.get(4) === 4, 'Test 1e failed');

    // Test case 2: Update existing key
    const lru2 = new LRUCache(2);
    lru2.put(1, 1);
    lru2.put(2, 2);
    lru2.put(1, 10); // update key 1
    console.assert(lru2.get(1) === 10, 'Test 2a failed');
    console.assert(lru2.get(2) === 2, 'Test 2b failed');

    // Test case 3: Capacity of 1
    const lru3 = new LRUCache(1);
    lru3.put(1, 1);
    console.assert(lru3.get(1) === 1, 'Test 3a failed');
    lru3.put(2, 2);
    console.assert(lru3.get(1) === -1, 'Test 3b failed');
    console.assert(lru3.get(2) === 2, 'Test 3c failed');

    // Test case 4: Access order affects eviction
    const lru4 = new LRUCache(2);
    lru4.put(1, 1);
    lru4.put(2, 2);
    lru4.get(1); // makes 1 most recently used
    lru4.put(3, 3); // should evict 2, not 1
    console.assert(lru4.get(1) === 1, 'Test 4a failed');
    console.assert(lru4.get(2) === -1, 'Test 4b failed');
    console.assert(lru4.get(3) === 3, 'Test 4c failed');

    console.log('All test cases passed for 146. LRU Cache!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 146. LRU Cache ===');
    console.log('Category: Design');
    console.log('Difficulty: Medium');
    console.log('');

    testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
    demonstrateSolution();
}

// Export for use in other modules
module.exports = {
    LRUCache,
    solve,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This solution uses classic LRU Cache design pattern
 * - Doubly-linked list + HashMap is the standard approach for O(1) operations
 * - Critical for system design interviews and real-world caching systems
 * - The dummy head/tail nodes simplify edge case handling
 */
