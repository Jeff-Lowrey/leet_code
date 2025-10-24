/**
 * # Difficulty: Medium
 *
 * # 146. LRU Cache
 *
 * Difficulty: Medium
 *
 * Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.
 *
 * Implement the LRUCache class:
 * - LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
 * - int get(int key) Return the value of the key if the key exists, otherwise return -1.
 * - void put(int key, int value) Update the value of the key if it exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.
 *
 * The functions get and put must each run in O(1) average time complexity.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>LRUCache(2)</dd>
 * <dt>Output:</dt>
 * <dd>put(1, 1) -> [1:1]</dd>
 * <dt>Explanation:</dt>
 * <dd>Cache is initialized with capacity 2, and after put(1, 1), the cache contains key 1 with value 1 as the most recently used item</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Iterative Solution
 * **Time Complexity**: * O(1)
 * **Space Complexity**: * O(capacity)

 *
 * ### INTUITION:
 * LRU Cache needs O(1) access and O(1) eviction. We can combine:
 * - HashMap for O(1) key lookup
 * - Doubly Linked List for O(1) insertion/deletion at any position
 *
 * ### APPROACH:
 * 1. **HashMap + Doubly Linked List**: Hash map stores key->node mapping
 * 2. **Recent Access Tracking**: Move accessed nodes to head of list
 * 3. **Eviction Policy**: Remove from tail when capacity exceeded
 * 4. **O(1) Operations**: All operations use direct node manipulation
 *
 * ### WHY THIS WORKS:
 * - HashMap provides O(1) key lookup
 * - Doubly linked list allows O(1) insertion/deletion anywhere
 * - Head represents most recently used, tail represents least recently used
 * - Moving nodes to head maintains LRU order efficiently
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * LRUCache(2)
 * ```
 *
 * Steps:
 * Step 1: put(1, 1) -> [1:1]
 * Step 2: put(2, 2) -> [2:2, 1:1]
 * Step 3: get(1)    -> [1:1, 2:2] (1 moves to front)
 * Step 4: put(3, 3) -> [3:3, 1:1] (2 evicted)
 * Step 5: get(2)    -> -1 (not found)

### TIME COMPLEXITY:
 * O(1)
 * All operations (get, put) are constant time
 *
 * ### SPACE COMPLEXITY:
 * O(capacity)
 * We store at most 'capacity' key-value pairs
 *
 * ### EDGE CASES:
 * - Capacity of 1
 * - Get non-existent key
 * - Put same key multiple times
 * - Cache at full capacity
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
  console.log("Testing 146. LRU Cache");

  // Test case 1: Basic functionality
  const lru1 = new LRUCache(2);
  lru1.put(1, 1);
  lru1.put(2, 2);
  console.assert(lru1.get(1) === 1, "Test 1a failed");
  lru1.put(3, 3); // evicts key 2
  console.assert(lru1.get(2) === -1, "Test 1b failed");
  lru1.put(4, 4); // evicts key 1
  console.assert(lru1.get(1) === -1, "Test 1c failed");
  console.assert(lru1.get(3) === 3, "Test 1d failed");
  console.assert(lru1.get(4) === 4, "Test 1e failed");

  // Test case 2: Update existing key
  const lru2 = new LRUCache(2);
  lru2.put(1, 1);
  lru2.put(2, 2);
  lru2.put(1, 10); // update key 1
  console.assert(lru2.get(1) === 10, "Test 2a failed");
  console.assert(lru2.get(2) === 2, "Test 2b failed");

  // Test case 3: Capacity of 1
  const lru3 = new LRUCache(1);
  lru3.put(1, 1);
  console.assert(lru3.get(1) === 1, "Test 3a failed");
  lru3.put(2, 2);
  console.assert(lru3.get(1) === -1, "Test 3b failed");
  console.assert(lru3.get(2) === 2, "Test 3c failed");

  // Test case 4: Access order affects eviction
  const lru4 = new LRUCache(2);
  lru4.put(1, 1);
  lru4.put(2, 2);
  lru4.get(1); // makes 1 most recently used
  lru4.put(3, 3); // should evict 2, not 1
  console.assert(lru4.get(1) === 1, "Test 4a failed");
  console.assert(lru4.get(2) === -1, "Test 4b failed");
  console.assert(lru4.get(3) === 3, "Test 4c failed");

  console.log("All test cases passed for 146. LRU Cache!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 146. LRU Cache ===");
  console.log("Category: Design");
  console.log("Difficulty: Medium");
  console.log("");

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
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This solution uses classic LRU Cache design pattern
 * - Doubly-linked list + HashMap is the standard approach for O(1) operations
 * - Critical for system design interviews and real-world caching systems
 * - The dummy head/tail nodes simplify edge case handling
 */
