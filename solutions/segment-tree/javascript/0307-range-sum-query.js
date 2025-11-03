/**
 * # 0307. Range Sum Query
 *
 * Difficulty: Medium
 *
 *
 * Given an integer array `nums`, handle multiple queries of the following types:
 *
 *
 *
 * Implement the NumArray class:
 * - NumArray(int[] nums) Initializes the object with the integer array nums.
 * - void update(int index, int val) Updates the value of nums[index] to be val.
 * - int sumRange(int left, int right) Returns the sum of the elements between indices left and right.
 *
 * Example:
 * Input:
 * ["NumArray", "sumRange", "update", "sumRange"]
 * [[[1, 3, 5]], [0, 2], [1, 2], [0, 2]]
 * Output:
 * [null, 9, null, 8]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>["NumArray", "sumRange", "update", "sumRange"]</dd>
 * <dt>Output:</dt>
 * <dd>[null, 9, null, 8]</dd>
 * <dt>Explanation:</dt>
 * <dd>After update(1,10), the sum of range [0,2] is computed as 16 using the segment tree</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * ### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Set, Array, String
 * **Patterns**: Two Pointers Pattern, Tree Pattern
 * **Time Complexity**: O(log n) for both update and query - Binary search or tree height
 * **Space Complexity**: O(n) - Additional set storage

 *
 * ### INTUITION:
 * For mutable arrays, prefix sums become inefficient (O(n) updates). Segment trees provide a balanced solution with O(log n) for both updates and range queries by representing the array as a binary tree where each node stores the sum of its range.
 *
 * ### APPROACH:
 * 1. **Tree Structure**: Complete binary tree where leaves are array elements
 * 2. **Internal Nodes**: Store sum of their children's ranges
 * 3. **Update**: Propagate changes up from leaf to root
 * 4. **Query**: Traverse tree to collect relevant range sums
 *
 * ### WHY THIS WORKS:
The tree height is log n, so we visit at most log n nodes for any operation. Each internal node represents a range, allowing us to quickly skip over irrelevant sections during queries.

### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [1,3,5]
 * ```
 *
 * Steps:
 * Step 1: Initial array → [1,3,5]
 * Step 2: sumRange(0,2) → sum of indices 0-2 → 1+3+5 = 9
 * Step 3: update(1, 2) → nums[1] = 2 → array becomes [1,2,5]
 * Step 4: sumRange(0,2) → sum of indices 0-2 → 1+2+5 = 8
 *
 * Output:
 * ```
 * 8
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(log n) for both update and query
 * - Binary search or tree height
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 * - Additional set storage
 *
 * ### EDGE CASES:
- **Single element array**: Sum queries return that element
- **Update single element**: Propagate changes up segment tree
- **Query entire range**: Return root node value
- **Frequent updates**: Segment tree handles efficiently in O(log n)
- **Range [i, i]**: Query single element

</details>

</details>

</details>

</details>

</details>

</details>

</details>

</details>
 */

class NumArray {
  /**
   * @param {number[]} nums
   */
  constructor(nums) {
    this.n = nums.length;
    // Segment tree array size = 2 * n (for n leaves, we need n-1 internal nodes)
    this.tree = new Array(2 * this.n).fill(0);

    // Build the tree
    this.buildTree(nums);
  }

  /**
   * Build segment tree from input array
   * @param {number[]} nums
   */
  buildTree(nums) {
    // Place leaf nodes at indices [n, 2n)
    for (let i = 0; i < this.n; i++) {
      this.tree[this.n + i] = nums[i];
    }

    // Build internal nodes from bottom up
    for (let i = this.n - 1; i > 0; i--) {
      this.tree[i] = this.tree[2 * i] + this.tree[2 * i + 1];
    }
  }

  /**
   * Update value at index
   * @param {number} index
   * @param {number} val
   * @return {void}
   */
  update(index, val) {
    // Set value at leaf node
    index += this.n;
    this.tree[index] = val;

    // Propagate changes up to root
    while (index > 1) {
      // Update parent node
      const left = index;
      const right = index % 2 === 0 ? index + 1 : index - 1;
      const parent = Math.floor(index / 2);

      this.tree[parent] = this.tree[left] + this.tree[right];
      index = parent;
    }
  }

  /**
   * Return sum of elements in range [left, right]
   * @param {number} left
   * @param {number} right
   * @return {number}
   */
  sumRange(left, right) {
    // Convert to leaf indices
    left += this.n;
    right += this.n;

    let sum = 0;

    // Process ranges from leaves toward root
    while (left <= right) {
      // If left is a right child, include it and move to next range
      if (left % 2 === 1) {
        sum += this.tree[left];
        left++;
      }

      // If right is a left child, include it and move to previous range
      if (right % 2 === 0) {
        sum += this.tree[right];
        right--;
      }

      // Move to parent level
      left = Math.floor(left / 2);
      right = Math.floor(right / 2);
    }

    return sum;
  }
}

/**
 * Wrapper function for testing
 */
function solve(operations, args) {
  let numArray = null;
  const results = [];

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    const arg = args[i];

    if (op === "NumArray") {
      numArray = new NumArray(arg);
      results.push(null);
    } else if (op === "sumRange") {
      results.push(numArray.sumRange(arg[0], arg[1]));
    } else if (op === "update") {
      numArray.update(arg[0], arg[1]);
      results.push(null);
    }
  }

  return results;
}

/**
 * Test cases for Problem 307: Range Sum Query - Mutable
 */
function testSolution() {
  console.log("Testing 307. Range Sum Query - Mutable");

  // Test case 1: Basic operations
  const ops1 = ["NumArray", "sumRange", "update", "sumRange"];
  const args1 = [[[1, 3, 5]], [0, 2], [1, 2], [0, 2]];
  const result1 = solve(ops1, args1);
  const expected1 = [null, 9, null, 8];
  console.assert(
    JSON.stringify(result1) === JSON.stringify(expected1),
    `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`,
  );
  console.log(
    `✓ Test 1 passed: [1,3,5] operations -> ${JSON.stringify(result1)}`,
  );

  // Test case 2: Multiple updates
  const ops2 = ["NumArray", "sumRange", "update", "update", "sumRange"];
  const args2 = [[[1, 2, 3, 4, 5]], [0, 4], [0, 10], [4, 10], [0, 4]];
  const result2 = solve(ops2, args2);
  const expected2 = [null, 15, null, null, 24];
  console.assert(
    JSON.stringify(result2) === JSON.stringify(expected2),
    `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`,
  );
  console.log(
    `✓ Test 2 passed: Multiple updates -> ${JSON.stringify(result2)}`,
  );

  // Test case 3: Single element
  const ops3 = ["NumArray", "sumRange", "update", "sumRange"];
  const args3 = [[[5]], [0, 0], [0, 10], [0, 0]];
  const result3 = solve(ops3, args3);
  const expected3 = [null, 5, null, 10];
  console.assert(
    JSON.stringify(result3) === JSON.stringify(expected3),
    `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`,
  );
  console.log(`✓ Test 3 passed: Single element -> ${JSON.stringify(result3)}`);

  // Test case 4: Range queries
  const numArray = new NumArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  console.assert(numArray.sumRange(0, 8) === 45, "Test 4a failed");
  console.assert(numArray.sumRange(2, 5) === 18, "Test 4b failed");
  console.assert(numArray.sumRange(4, 4) === 5, "Test 4c failed");
  console.log(`✓ Test 4 passed: Various range queries`);

  console.log("All test cases passed for 307. Range Sum Query - Mutable!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 307. Range Sum Query - Mutable ===");
  console.log("Category: Segment Tree");
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
  NumArray,
  solve,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This is a classic segment tree implementation
 * - Array-based representation is more efficient than pointer-based
 * - For index i: left child = 2*i, right child = 2*i+1, parent = i/2
 * - Leaves are stored at indices [n, 2n)
 * - The approach generalizes to other aggregate functions (min, max, gcd, etc.)
 */
