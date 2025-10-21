/**
 * Difficulty: Medium
 *
 * # 107. Binary Tree Level Order Traversal II
 *
 * Given the root of a binary tree, return the bottom-up level order traversal of its nodes' values.
 * (i.e., from left to right, level by level from leaf to root).
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[[15, 7]</dd>
 * <dt>Output:</dt>
 * <dd>"Test case 1 passed: Example tree"</dd>
 * <dt>Explanation:</dt>
 * <dd>Bottom-up level-order: [[15,7],[9,20],[3]]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 *

 * ### METADATA:
 * **Techniques**: Queue Operations, Level-order Traversal
 * **Data Structures**: Queue, Deque
 * **Patterns**: BFS Pattern, Level Traversal
 * **Time Complexity**: **O(n)
 * **Space Complexity**: **O(w)

 *
 * ### INTUITION:
 * Perform standard level-order traversal (BFS) but reverse the final result to get bottom-up order.
 * Alternatively, we can prepend each level to the result instead of appending.
 *
 * ### APPROACH:
 * 1. **Handle edge case**: Return empty list if tree is empty
 * 2. **Initialize BFS**: Use a deque for level-order traversal
 * 3. **For each level**:
 *    - Process all nodes at current level
 *    - Collect values in order
 *    - Add level to result
 * 4. **Reverse result**: Return reversed list for bottom-up order
 *
 * ### WHY THIS WORKS:
 * - BFS naturally processes nodes level by level (top to bottom)
 * - By reversing the result at the end, we get bottom-up order
 * - Deque provides efficient O(1) operations for BFS
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Tree:      3
 *          /   \
 *         9     20
 *              /  \
 *             15   7
 *
 * Level-order (top-down): [[3], [9, 20], [15, 7]]
 * Bottom-up: [[15, 7], [9, 20], [3]]
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)
 * - Visit each node exactly once: O(n)
 * - Reversing result: O(h) where h = height
 * - Total: O(n)
 *
 * ### SPACE COMPLEXITY:
 * O(w)
 * - Queue holds at most one level at a time
 * - w = maximum width of tree (worst case: n/2 for complete tree)
 * - Result storage: O(n)
 *
 * ### EDGE CASES:
 * - Empty tree: Return []
 * - Single node: Return [[root.val]]
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
 * Main solution for Problem 107: Binary Tree Level Order Traversal II
 *
 * @param {TreeNode} root - Root of the binary tree
 * @return {number[][]} - Bottom-up level order traversal
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
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);

      // Add children to queue
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(currentLevel);
  }

  // Reverse to get bottom-up order
  return result.reverse();
}

/**
 * Test cases for Problem 107: Binary Tree Level Order Traversal II
 */
function testSolution() {
  console.log("Testing 107. Binary Tree Level Order Traversal II");

  // Helper function to compare arrays
  const arraysEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  // Test case 1: Standard tree
  const tree1 = new TreeNode(
    3,
    new TreeNode(9),
    new TreeNode(20, new TreeNode(15), new TreeNode(7)),
  );
  const result1 = solve(tree1);
  const expected1 = [[15, 7], [9, 20], [3]];
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
  const expected3 = [[1]];
  console.assert(
    arraysEqual(result3, expected3),
    `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`,
  );

  console.log(
    "All test cases passed for 107. Binary Tree Level Order Traversal II!",
  );
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 107. Binary Tree Level Order Traversal Ii ===");
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
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
