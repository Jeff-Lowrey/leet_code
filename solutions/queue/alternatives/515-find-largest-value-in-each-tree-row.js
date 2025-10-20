/**
 * # Difficulty: Medium
 *
 * # 515. Find Largest Value in Each Tree Row
 *
 * Given the root of a binary tree, return an array of the largest value in each row of the tree (0-indexed).
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[1, 3, 9]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Largest value in each tree level: [1,3,9]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### METADATA:
**Techniques**: TBD
**Data Structures**: TBD
**Patterns**: TBD
**Time Complexity**: * O(n)
**Space Complexity**: * O(w)

 *
 * ### INTUITION:
 * Use level-order traversal (BFS) to process nodes level by level.
 * For each level, track the maximum value among all nodes at that level.
 *
 * ### APPROACH:
 * 1. **Handle edge case**: Return empty list if tree is empty
 * 2. **Initialize BFS**: Use a deque with root node
 * 3. **For each level**:
 *    - Process all nodes at current level
 *    - Track maximum value seen at this level
 *    - Add maximum to result
 *    - Add children to queue for next level
 *
 * ### WHY THIS WORKS:
 * - BFS processes nodes level by level
 * - Within each level, we can easily find the maximum value
 * - By processing level boundaries (queue size), we separate levels
 * - Each level's maximum is independent of other levels
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Tree:      1
 *          /   \\
 *         3     2
 *        / \\     \\
 *       5   3     9
 *
 * Level 0: max = 1
 * Level 1: max = max(3, 2) = 3
 * Level 2: max = max(5, 3, 9) = 9
 * Result: [1, 3, 9]
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)
 * - Visit each node exactly once
 * - n = number of nodes in tree
 *
 * ### SPACE COMPLEXITY:
 * O(w)
 * - Queue holds at most one level of nodes at a time
 * - w = maximum width of tree (worst case: n/2 for complete tree)
 * - Result storage: O(h) where h = height
 *
 * ### EDGE CASES:
 * - Empty tree: Return []
 * - Single node: Return [root.val]
 * - All negative values: Returns correct negative maximum
 * - Skewed tree: Each level has one node
 *
 * </details>
 */

// Definition for a binary tree node
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * Main solution for Problem 515: Find Largest Value In Each Tree Row
 *
 * @param {TreeNode} root - Root of the binary tree
 * @return {number[]} - Largest value in each tree row
 *
 * Time Complexity: O(n)
 * Space Complexity: O(w) where w is maximum width
 */
function solve(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    let maxVal = -Infinity;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      maxVal = Math.max(maxVal, node.val);

      // Add children to queue
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(maxVal);
  }

  return result;
}

/**
 * Test cases for Problem 515: Find Largest Value In Each Tree Row
 */
function testSolution() {
  console.log("Testing 515. Find Largest Value In Each Tree Row");

  // Helper function to compare arrays
  const arraysEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  // Test case 1: Standard tree
  const tree1 = new TreeNode(
    1,
    new TreeNode(3, new TreeNode(5), new TreeNode(3)),
    new TreeNode(2, null, new TreeNode(9)),
  );
  const result1 = solve(tree1);
  const expected1 = [1, 3, 9];
  console.assert(
    arraysEqual(result1, expected1),
    `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`,
  );

  // Test case 2: Empty tree
  const result2 = solve(null);
  const expected2 = [];
  console.assert(
    arraysEqual(result2, expected2),
    `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`,
  );

  // Test case 3: Single node
  const tree3 = new TreeNode(1);
  const result3 = solve(tree3);
  const expected3 = [1];
  console.assert(
    arraysEqual(result3, expected3),
    `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`,
  );

  // Test case 4: Negative values
  const tree4 = new TreeNode(
    -1,
    new TreeNode(-5, new TreeNode(-10)),
    new TreeNode(-3),
  );
  const result4 = solve(tree4);
  const expected4 = [-1, -3, -10];
  console.assert(
    arraysEqual(result4, expected4),
    `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`,
  );

  // Test case 5: Left-skewed tree
  const tree5 = new TreeNode(1, new TreeNode(2, new TreeNode(3)));
  const result5 = solve(tree5);
  const expected5 = [1, 2, 3];
  console.assert(
    arraysEqual(result5, expected5),
    `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`,
  );

  console.log(
    "All test cases passed for 515. Find Largest Value In Each Tree Row!",
  );
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 515. Find Largest Value In Each Tree Row ===");
  console.log("Category: Queue");
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
  TreeNode,
};

/**
 * Additional Notes:
 * - This solution focuses on queue concepts
 * - Using -Infinity as initial max handles negative values correctly
 * - The approach efficiently finds the maximum in a single pass per level
 * - The solution can be adapted for finding minimum, sum, or other aggregates
 */
