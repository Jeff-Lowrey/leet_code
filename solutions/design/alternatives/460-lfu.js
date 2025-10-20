/**
 * # Difficulty: Hard
 *
 * # 460. LFU Cache
 *
 * Design and implement a Least Frequently Used (LFU) cache.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>LFUCache(2)</dd>
 * <dt>Output:</dt>
 * <dd>put(1, 1): cache={1:(1,1)}, freq_to_keys={1:[1]}, min_freq=1</dd>
 * <dt>Explanation:</dt>
 * <dd>Cache is initialized with capacity 2, and after put(1, 1), the cache contains key 1 with value 1 and frequency 1, making it the least frequently used item</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### METADATA:
**Techniques**: TBD
**Data Structures**: TBD
**Patterns**: TBD
**Time Complexity**: * - get: O(1)
**Space Complexity**: * O(capacity) for storing items

 *
 * ### INTUITION:
 * LFU cache evicts the least frequently used item when capacity is reached.
 * If multiple items have the same frequency, evict the least recently used (LRU) among them.
 *
 * The challenge is achieving O(1) for both get() and put() operations.
 *
 * ### APPROACH:
 * 1. **Data Structures**:
 *    - cache: dict mapping key -> (value, frequency)
 *    - freq_to_keys: dict mapping frequency -> OrderedDict of keys
 *    - key_to_freq: dict mapping key -> frequency
 *    - min_freq: track minimum frequency for eviction
 *
 * 2. **get(key)**:
 *    - Return -1 if key not found
 *    - Increment frequency of key
 *    - Update data structures
 *    - Return value
 *
 * 3. **put(key, value)**:
 *    - If key exists: update value and increment frequency
 *    - If cache full: evict LFU item (first item in min_freq list)
 *    - Add new item with frequency 1
 *    - Update min_freq
 *
 * ### WHY THIS WORKS:
 * - Hash map provides O(1) lookup
 * - OrderedDict maintains LRU order within each frequency
 * - Tracking min_freq allows O(1) eviction
 * - All operations are O(1)
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * LFUCache(2)
 * put(1, 1): cache={1:(1,1)}, freq_to_keys={1:[1]}, min_freq=1
 * put(2, 2): cache={1:(1,1), 2:(2,1)}, freq_to_keys={1:[1,2]}, min_freq=1
 * get(1): freq increases to 2, cache={1:(1,2), 2:(2,1)}, freq_to_keys={1:[2], 2:[1]}, min_freq=1, return 1
 * put(3, 3): evict key 2 (LFU), add 3
 * ```
 *
 * ### TIME COMPLEXITY:
 * - get: O(1)
 * - put: O(1)
 *
 * ### SPACE COMPLEXITY:
 * O(capacity) for storing items
 *
 * ### EDGE CASES:
 * - Cache capacity 0
 * - Single capacity
 * - Multiple items with same frequency
 * - Update existing key
 *
 * </details>
 */

/**
 * Node class for doubly-linked list
 */
class Node {
  constructor(key = 0, value = 0) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

/**
 * DoublyLinkedList class for maintaining LRU order within frequency groups
 */
class DoublyLinkedList {
  constructor() {
    this.head = new Node();
    this.tail = new Node();
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.size = 0;
  }

  /**
   * Add node right after head (most recently used)
   */
  addToHead(node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
    this.size++;
  }

  /**
   * Remove node from its current position
   */
  removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
    this.size--;
  }

  /**
   * Remove and return tail node (least recently used)
   */
  removeTail() {
    if (this.size === 0) return null;
    const lastNode = this.tail.prev;
    this.removeNode(lastNode);
    return lastNode;
  }

  /**
   * Check if list is empty
   */
  isEmpty() {
    return this.size === 0;
  }
}

/**
 * LFUCache class - Implements LFU Cache with O(1) operations
 *
 * Uses three main data structures:
 * - values: Map from key to node (contains key-value pairs)
 * - frequencies: Map from key to its access frequency
 * - freqGroups: Map from frequency to doubly-linked list of nodes with that frequency
 */
class LFUCache {
  /**
   * Initialize LFU Cache with given capacity
   * @param {number} capacity - Maximum number of key-value pairs
   */
  constructor(capacity) {
    this.capacity = capacity;
    this.values = new Map(); // key -> node
    this.frequencies = new Map(); // key -> frequency
    this.freqGroups = new Map(); // frequency -> DoublyLinkedList
    this.minFreq = 0; // minimum frequency for O(1) eviction
  }

  /**
   * Get value for given key and update frequency
   * @param {number} key
   * @return {number} - Value if key exists, -1 otherwise
   *
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  get(key) {
    if (!this.values.has(key)) {
      return -1;
    }

    // Update frequency and move node to appropriate frequency group
    this.updateFreq(key);
    return this.values.get(key).value;
  }

  /**
   * Put key-value pair in cache
   * @param {number} key
   * @param {number} value
   *
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  put(key, value) {
    if (this.capacity === 0) return;

    if (this.values.has(key)) {
      // Update existing key
      const node = this.values.get(key);
      node.value = value;
      this.updateFreq(key);
    } else {
      // Add new key
      if (this.values.size >= this.capacity) {
        this.evictLFU();
      }

      // Create new node and add to cache
      const newNode = new Node(key, value);
      this.values.set(key, newNode);
      this.frequencies.set(key, 1);

      // Add to frequency group 1
      if (!this.freqGroups.has(1)) {
        this.freqGroups.set(1, new DoublyLinkedList());
      }
      this.freqGroups.get(1).addToHead(newNode);
      this.minFreq = 1;
    }
  }

  /**
   * Update frequency of a key and move to appropriate frequency group
   * @param {number} key
   */
  updateFreq(key) {
    const node = this.values.get(key);
    const oldFreq = this.frequencies.get(key);
    const newFreq = oldFreq + 1;

    // Remove from old frequency group
    const oldGroup = this.freqGroups.get(oldFreq);
    oldGroup.removeNode(node);

    // Update minFreq if necessary
    if (this.minFreq === oldFreq && oldGroup.isEmpty()) {
      this.minFreq++;
    }

    // Add to new frequency group
    this.frequencies.set(key, newFreq);
    if (!this.freqGroups.has(newFreq)) {
      this.freqGroups.set(newFreq, new DoublyLinkedList());
    }
    this.freqGroups.get(newFreq).addToHead(node);
  }

  /**
   * Evict the least frequently used (and least recently used in case of tie)
   */
  evictLFU() {
    const minFreqGroup = this.freqGroups.get(this.minFreq);
    const nodeToEvict = minFreqGroup.removeTail();

    if (nodeToEvict) {
      this.values.delete(nodeToEvict.key);
      this.frequencies.delete(nodeToEvict.key);
    }
  }
}

/**
 * Factory function for creating LFUCache instances
 * @param {number} capacity
 * @return {LFUCache}
 */
function solve(capacity) {
  return new LFUCache(capacity);
}

/**
 * Test cases for Problem 460: LFU Cache
 */
function testSolution() {
  console.log("Testing 460. LFU Cache");

  // Test case 1: Basic LFU behavior
  const lfu1 = new LFUCache(2);
  lfu1.put(1, 1);
  lfu1.put(2, 2);
  console.assert(lfu1.get(1) === 1, "Test 1a failed");
  lfu1.put(3, 3); // evicts key 2 (LFU)
  console.assert(lfu1.get(2) === -1, "Test 1b failed: key 2 should be evicted");
  console.assert(lfu1.get(3) === 3, "Test 1c failed");
  lfu1.put(4, 4); // evicts key 1 (LFU after get operations)
  console.assert(lfu1.get(1) === -1, "Test 1d failed: key 1 should be evicted");
  console.assert(lfu1.get(3) === 3, "Test 1e failed");
  console.assert(lfu1.get(4) === 4, "Test 1f failed");

  // Test case 2: LRU tiebreaker within same frequency
  const lfu2 = new LFUCache(2);
  lfu2.put(1, 1);
  lfu2.put(2, 2);
  lfu2.put(3, 3); // should evict 1 (LRU among same frequency)
  console.assert(lfu2.get(1) === -1, "Test 2a failed: key 1 should be evicted");
  console.assert(lfu2.get(2) === 2, "Test 2b failed");
  console.assert(lfu2.get(3) === 3, "Test 2c failed");

  // Test case 3: Update existing key
  const lfu3 = new LFUCache(2);
  lfu3.put(1, 1);
  lfu3.put(2, 2);
  lfu3.put(1, 10); // update existing key
  console.assert(lfu3.get(1) === 10, "Test 3a failed: updated value");
  console.assert(lfu3.get(2) === 2, "Test 3b failed");

  // Test case 4: Single capacity cache
  const lfu4 = new LFUCache(1);
  lfu4.put(1, 1);
  console.assert(lfu4.get(1) === 1, "Test 4a failed");
  lfu4.put(2, 2); // evicts 1
  console.assert(lfu4.get(1) === -1, "Test 4b failed");
  console.assert(lfu4.get(2) === 2, "Test 4c failed");

  // Test case 5: Zero capacity cache
  const lfu5 = new LFUCache(0);
  lfu5.put(1, 1);
  console.assert(lfu5.get(1) === -1, "Test 5a failed: zero capacity");

  console.log("All test cases passed for 460. LFU Cache!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 460. LFU Cache ===");
  console.log("Category: Design");
  console.log("Difficulty: Hard");
  console.log("");

  // Example demonstration
  const lfu = new LFUCache(2);
  console.log("LFU Cache with capacity 2");
  console.log("");

  console.log("put(1, 1): Add key 1 with value 1");
  lfu.put(1, 1);

  console.log("put(2, 2): Add key 2 with value 2");
  lfu.put(2, 2);

  console.log("get(1):", lfu.get(1), "(increases frequency of key 1)");

  console.log("put(3, 3): Add key 3, evicts key 2 (LFU)");
  lfu.put(3, 3);

  console.log("get(2):", lfu.get(2), "(should be -1, key 2 was evicted)");
  console.log("get(3):", lfu.get(3), "(should be 3)");

  console.log(
    "put(4, 4): Add key 4, evicts key 1 (LFU after frequency update)",
  );
  lfu.put(4, 4);

  console.log("get(1):", lfu.get(1), "(should be -1, key 1 was evicted)");
  console.log("get(3):", lfu.get(3), "(should be 3)");
  console.log("get(4):", lfu.get(4), "(should be 4)");
  console.log("");

  testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
  demonstrateSolution();
}

// Export for use in other modules
module.exports = {
  LFUCache,
  Node,
  DoublyLinkedList,
  solve,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This solution achieves O(1) time complexity for both get and put operations
 * - Uses three coordinated data structures: HashMap + frequency tracking + frequency-grouped doubly-linked lists
 * - The minFreq optimization eliminates the need to search for minimum frequency
 * - LRU ordering within each frequency group handles tie-breaking elegantly
 * - More complex than LRU cache due to dual eviction criteria (frequency + recency)
 * - Critical for advanced system design interviews and real-world caching systems
 * - The approach demonstrates sophisticated coordination between multiple data structures
 */
