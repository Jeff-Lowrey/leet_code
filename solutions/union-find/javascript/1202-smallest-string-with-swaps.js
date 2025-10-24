/**
 * # 1202. Smallest String With Swaps
 *
 * Difficulty: Medium
 *
 * # Difficulty: Medium
 *
 * You are given a string s, and an array of pairs where pairs[i] = [a, b] indicates 2 indices
 * (0-indexed) that can be swapped. You can swap indices multiple times. Return the lexicographically
 * smallest string that s can be transformed to after using the swaps.
 *
 * Example:
 * Input: s = "dcab", pairs = [[0,3],[1,2]]
 * Output: "bacd"
 * Explanation: Swap s[0] and s[3] → "bcad", then swap s[1] and s[2] → "bacd"
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>s = "dcab", pairs = [[0,3],[1,2]]</dd>
 * <dt>Output:</dt>
 * <dd>bacd"</dd>
 * <dt>Explanation:</dt>
 * <dd>Smallest string after swapping characters in connected components</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Iterative Solution
 * **Time Complexity**: * O(n log n + m α(n)) where m is pairs count
 * **Space Complexity**: * O(n) - Additional hash map storage

 *
 * ### INTUITION:
 * Pairs form connected components via union-find. Within each component, indices can be
 * rearranged freely. Sort characters in each component and assign to sorted indices.
 *
 * ### APPROACH:
 * 1. **Union-Find**: Group indices into connected components
 * 2. **Collect**: For each component, gather indices and characters
 * 3. **Sort**: Sort both indices and characters
 * 4. **Assign**: Place sorted characters at sorted indices
 *
 * ### WHY THIS WORKS:
 * If indices are transitively swappable, they form a connected component where any
 * permutation is achievable. Lexicographically smallest = sort characters ascending.
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * s = "dcab", pairs = [[0,3],[1,2]]
 * ```
 *
 * Step 1: Union-find to group connected indices
 * Groups: {0,3}, {1,2}
 * Step 2: Sort characters within each group
 *
 * Steps:
 * Step 1: Group {0,3}: 'd','b' → 'b','d'
 * Step 2: Group {1,2}: 'c','a' → 'a','c'
 *
 * Output:
 * ```
 * "bacd"
 * ```

### TIME COMPLEXITY:
 * O(n log n + m α(n)) where m is pairs count
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 *
 * ### EDGE CASES:
 * - **No pairs given**: Return original string unchanged
 * - **Single character string**: Return as-is (no swaps possible)
 * - **All indices connected**: Sort entire string lexicographically
 * - **Multiple disconnected components**: Sort each component independently
 * - **Duplicate characters**: Sorting naturally handles duplicates correctly
 *
 * </details>
 */

class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = Array(n).fill(0);
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // Path compression
    }
    return this.parent[x];
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) return false;

    // Union by rank
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }

    return true;
  }
}

/**
 * Main solution for Problem 1202: Smallest String With Swaps
 *
 * @param {string} s - Input string
 * @param {number[][]} pairs - Array of index pairs that can be swapped
 * @return {string} - Lexicographically smallest string
 *
 * Time Complexity: O(n log n + m * α(n))
 * Space Complexity: O(n)
 */
function solve(s, pairs) {
  const n = s.length;
  if (n <= 1 || pairs.length === 0) return s;

  // Initialize Union-Find
  const uf = new UnionFind(n);

  // Union all connected indices
  for (const [i, j] of pairs) {
    uf.union(i, j);
  }

  // Group indices by their root parent (connected component)
  const components = new Map();
  for (let i = 0; i < n; i++) {
    const root = uf.find(i);
    if (!components.has(root)) {
      components.set(root, []);
    }
    components.get(root).push(i);
  }

  // Build result array
  const result = s.split("");

  // For each component, sort characters and place them back
  for (const indices of components.values()) {
    // Get characters at these indices
    const chars = indices.map((i) => s[i]);

    // Sort both indices and characters
    indices.sort((a, b) => a - b);
    chars.sort();

    // Place sorted characters back into sorted indices
    for (let i = 0; i < indices.length; i++) {
      result[indices[i]] = chars[i];
    }
  }

  return result.join("");
}

/**
 * Test cases for Problem 1202: Smallest String With Swaps
 */
function testSolution() {
  console.log("Testing 1202. Smallest String With Swaps");

  // Test case 1: Example from LeetCode
  const result1 = solve("dcab", [
    [0, 3],
    [1, 2],
  ]);
  const expected1 = "bacd";
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );
  console.log(`Test 1 passed: "${result1}"`);

  // Test case 2: All connected
  const result2 = solve("dcab", [
    [0, 3],
    [1, 2],
    [0, 2],
  ]);
  const expected2 = "abcd";
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );
  console.log(`Test 2 passed: "${result2}"`);

  // Test case 3: No pairs
  const result3 = solve("abc", []);
  const expected3 = "abc";
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );
  console.log(`Test 3 passed: "${result3}"`);

  // Test case 4: Single character
  const result4 = solve("a", []);
  const expected4 = "a";
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );
  console.log(`Test 4 passed: "${result4}"`);

  // Test case 5: Complex case
  const result5 = solve("cba", [
    [0, 1],
    [1, 2],
  ]);
  const expected5 = "abc";
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );
  console.log(`Test 5 passed: "${result5}"`);

  console.log("All test cases passed for 1202. Smallest String With Swaps!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 1202. Smallest String With Swaps ===");
  console.log("Category: Union Find");
  console.log("Difficulty: Medium");
  console.log("");

  // Example demonstration would go here
  testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
  demonstrateSolution();
}

// Export for use in other modules
module.exports = {
  solve,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This solution focuses on union find concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
