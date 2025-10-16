/**
 * # Difficulty: Medium
 *
 * # 677. Map Sum Pairs
 *
 * You are asked to implement a map that supports the following two operations:
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>Operations:</dd>
 * <dt>Output:</dt>
 * <dd>insert("apple", 3)</dd>
 * <dt>Explanation:</dt>
 * <dd>The sum of all values with prefix 'ap' is 7 (apple=3 + app=4)</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * This is a perfect Trie (prefix tree) problem. We need to store key-value pairs and efficiently compute sums for all keys with a given prefix. A trie naturally groups keys by their prefixes, making prefix sum queries efficient.
 *
 * ### APPROACH:
 * 1. **Trie Structure**: Use a trie where each node stores the sum of all values in its subtree
 * 2. **Insert Operation**: Add/update key in trie and propagate value changes up to root
 * 3. **Sum Operation**: Navigate to prefix node and return its accumulated sum
 * 4. **Value Updates**: Handle key updates by adjusting differences in trie nodes
 *
 * ### WHY THIS WORKS:
 * - Trie groups keys by common prefixes naturally
 * - Each node stores sum of all keys in its subtree
 * - Insert/update operations maintain these sums correctly
 * - Sum queries are just lookups at the prefix node
 * - Time complexity is optimal for prefix-based operations
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Operations:
 * insert("apple", 3)
 * insert("app", 2)
 * sum("ap") → 5 (apple: 3 + app: 2)
 * insert("app", 4)  # Update existing key
 * sum("ap") → 7 (apple: 3 + app: 4)
 *
 * Trie structure after operations:
 *     root
 *      |
 *      a (sum: 7)
 *      |
 *      p (sum: 7)
 *      |
 *      p (sum: 7, has_app: 4)
 *      |
 *      l (sum: 3)
 *      |
 *      e (sum: 3, has_apple: 3)
 * ```
 *
 * ### TIME COMPLEXITY:
 * - Insert: O(k) where k is key length
 * - Sum: O(p) where p is prefix length
 *
 * ### SPACE COMPLEXITY:
 * O(TOTAL_KEY_LENGTH)
 * For storing all keys in the trie structure
 *
 * ### EDGE CASES:
 * - **Empty prefix**: Return sum of all values in dictionary
 * - **Prefix not found**: Return 0 (no keys match prefix)
 * - **Updating existing key**: Adjust trie sums by difference (new - old)
 * - **Key is prefix of another**: Both keys contribute to prefix sum
 * - **Single character keys**: Handled correctly in trie structure
 *
 * </details>
 */

/**
 * Trie node for storing prefix sums
 */
class TrieNode {
  constructor() {
    this.children = new Map(); // char -> TrieNode
    this.value = 0; // Value if this node represents end of a key
    this.sum = 0; // Sum of all values in subtree
  }
}

/**
 * Map that supports prefix sum queries using Trie
 */
class MapSum {
  /**
   * Initialize the data structure
   */
  constructor() {
    this.root = new TrieNode();
    this.keys = new Map(); // Store key -> value mapping for updates
  }

  /**
   * Insert a key-value pair into the map
   * @param {string} key - The key to insert/update
   * @param {number} val - The value to associate with the key
   *
   * Time Complexity: O(k) where k is length of key
   * Space Complexity: O(k) for new keys
   */
  insert(key, val) {
    // Calculate difference for existing keys
    const delta = val - (this.keys.get(key) || 0);
    this.keys.set(key, val);

    // Update trie with the delta
    let node = this.root;
    node.sum += delta;

    for (const char of key) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char);
      node.sum += delta;
    }

    // Update the value at the final node
    node.value = val;
  }

  /**
   * Return sum of all values whose keys start with prefix
   * @param {string} prefix - The prefix to search for
   * @returns {number} Sum of all values with keys starting with prefix
   *
   * Time Complexity: O(p) where p is length of prefix
   * Space Complexity: O(1)
   */
  sum(prefix) {
    let node = this.root;

    for (const char of prefix) {
      if (!node.children.has(char)) {
        return 0;
      }
      node = node.children.get(char);
    }

    return node.sum;
  }

  /**
   * Get all key-value pairs (for debugging/testing)
   * @returns {Array} Array of [key, value] pairs
   */
  getAllKeys() {
    const result = [];

    function dfs(node, currentKey) {
      if (node.value > 0) {
        result.push([currentKey, node.value]);
      }

      for (const [char, childNode] of node.children) {
        dfs(childNode, currentKey + char);
      }
    }

    dfs(this.root, "");
    return result;
  }
}

/**
 * Alternative implementation using simpler approach
 */
class MapSumAlternative {
  /**
   * Initialize with dictionary storage
   */
  constructor() {
    this.keys = new Map();
  }

  /**
   * Insert key-value pair
   * @param {string} key
   * @param {number} val
   */
  insert(key, val) {
    this.keys.set(key, val);
  }

  /**
   * Sum all values whose keys start with prefix
   * @param {string} prefix
   * @returns {number}
   */
  sum(prefix) {
    let total = 0;
    for (const [key, val] of this.keys) {
      if (key.startsWith(prefix)) {
        total += val;
      }
    }
    return total;
  }
}

/**
 * Test cases for Problem 677: Map Sum Pairs
 */
function testSolution() {
  console.log("Testing 677. Map Sum Pairs");

  // Test case 1: Basic operations
  const mapSum = new MapSum();

  mapSum.insert("apple", 3);
  const result1 = mapSum.sum("ap");
  const expected1 = 3;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  mapSum.insert("app", 2);
  const result2 = mapSum.sum("ap");
  const expected2 = 5;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 2: Key update
  mapSum.insert("app", 4); // Update existing key
  const result3 = mapSum.sum("ap");
  const expected3 = 7; // apple: 3 + app: 4
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 3: Non-existent prefix
  const result4 = mapSum.sum("b");
  const expected4 = 0;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 4: Empty prefix
  const result5 = mapSum.sum("");
  const expected5 = 7; // Sum of all values
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  // Test case 5: Exact key match
  const result6 = mapSum.sum("apple");
  const expected6 = 3;
  console.assert(
    result6 === expected6,
    `Test 6 failed: expected ${expected6}, got ${result6}`,
  );

  // Test case 6: Multiple operations
  const mapSum2 = new MapSum();
  mapSum2.insert("a", 3);
  mapSum2.insert("aa", 2);
  mapSum2.insert("aaa", 1);

  const result7 = mapSum2.sum("a");
  const expected7 = 6; // a: 3 + aa: 2 + aaa: 1
  console.assert(
    result7 === expected7,
    `Test 7 failed: expected ${expected7}, got ${result7}`,
  );

  const result8 = mapSum2.sum("aa");
  const expected8 = 3; // aa: 2 + aaa: 1
  console.assert(
    result8 === expected8,
    `Test 8 failed: expected ${expected8}, got ${result8}`,
  );

  // Test alternative implementation
  const altMap = new MapSumAlternative();
  altMap.insert("apple", 3);
  altMap.insert("app", 2);
  const result9 = altMap.sum("ap");
  console.assert(
    result9 === 5,
    `Alternative test failed: expected 5, got ${result9}`,
  );

  console.log("All test cases passed for 677. Map Sum Pairs!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 677. Map Sum Pairs ===");
  console.log("Category: Trees");
  console.log("Difficulty: Medium");
  console.log("");

  // Example 1: Basic usage
  const mapSum = new MapSum();

  const operations = [
    ["insert", "apple", 3],
    ["sum", "ap", null],
    ["insert", "app", 2],
    ["sum", "ap", null],
    ["insert", "app", 4], // Update
    ["sum", "ap", null],
  ];

  console.log("Operations:");
  for (const op of operations) {
    if (op[0] === "insert") {
      mapSum.insert(op[1], op[2]);
      console.log(`insert('${op[1]}', ${op[2]})`);
    } else {
      // sum
      const result = mapSum.sum(op[1]);
      console.log(`sum('${op[1]}') -> ${result}`);
    }
  }

  console.log(`\nAll key-value pairs: ${JSON.stringify(mapSum.getAllKeys())}`);

  // Example 2: Step-by-step trie building
  console.log(`\n--- Step-by-step example ---`);
  const mapSum2 = new MapSum();

  console.log("1. insert('apple', 3)");
  mapSum2.insert("apple", 3);
  console.log(`   sum('a') -> ${mapSum2.sum("a")}`);
  console.log(`   sum('ap') -> ${mapSum2.sum("ap")}`);
  console.log(`   sum('app') -> ${mapSum2.sum("app")}`);

  console.log("2. insert('app', 2)");
  mapSum2.insert("app", 2);
  console.log(`   sum('a') -> ${mapSum2.sum("a")}`);
  console.log(`   sum('ap') -> ${mapSum2.sum("ap")}`);
  console.log(`   sum('app') -> ${mapSum2.sum("app")}`);

  console.log("3. insert('application', 1)");
  mapSum2.insert("application", 1);
  console.log(`   sum('app') -> ${mapSum2.sum("app")}`);
  console.log(`   sum('appl') -> ${mapSum2.sum("appl")}`);

  console.log(`\nAlgorithm comparison:`);
  const methods = [
    [
      "Trie-based",
      (prefix) => {
        const map = new MapSum();
        map.insert("apple", 3);
        map.insert("app", 2);
        return map.sum(prefix);
      },
    ],
    [
      "Simple Map",
      (prefix) => {
        const map = new MapSumAlternative();
        map.insert("apple", 3);
        map.insert("app", 2);
        return map.sum(prefix);
      },
    ],
  ];

  for (const [name, method] of methods) {
    const result = method("ap");
    console.log(`${name}: ${result}`);
  }

  console.log(`\nKey insights:`);
  console.log(`1. Trie structure enables efficient prefix queries`);
  console.log(`2. Each node stores sum of values in its subtree`);
  console.log(`3. Insert operations update all nodes along the path`);
  console.log(`4. Key updates handle value differences correctly`);
  console.log(`5. Time complexity: O(k) insert, O(p) sum query`);

  testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
  demonstrateSolution();
}

// Export for use in other modules
module.exports = {
  MapSum,
  MapSumAlternative,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This solution uses trie with cumulative sum storage for optimal prefix queries
 * - Time complexity is O(k) for insert and O(p) for sum operations
 * - Space complexity is O(TOTAL_KEY_LENGTH) for trie storage
 * - The algorithm handles all edge cases including key updates and empty prefixes
 * - Essential insight: trie nodes store subtree sums for efficient prefix operations
 * - Alternative simple map approach trades query efficiency for implementation simplicity
 */
