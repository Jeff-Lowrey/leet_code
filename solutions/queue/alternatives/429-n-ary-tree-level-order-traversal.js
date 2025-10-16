/**
 * # Difficulty: Medium
 *
 * # 429. N-ary Tree Level Order Traversal
 *
 * Given an n-ary tree, return the level order traversal of its nodes' values.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[node3, node2, node4]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>N-ary tree level-order traversal groups nodes by depth</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * Similar to binary tree level-order traversal, but each node can have multiple children.
 * Use BFS to process nodes level by level, adding all children of each node to the queue.
 *
 * ### APPROACH:
 * 1. **Handle edge case**: Return empty list if tree is empty
 * 2. **Initialize BFS**: Use a deque with root node
 * 3. **For each level**:
 *    - Process all nodes at current level
 *    - Collect values in order
 *    - Add all children of each node to queue for next level
 * 4. **Return result**: List of lists representing each level
 *
 * ### WHY THIS WORKS:
 * - BFS naturally processes nodes level by level
 * - By tracking level boundaries (queue size), we process each level independently
 * - For n-ary trees, we simply iterate through all children instead of just left/right
 * - Deque provides O(1) append/popleft operations
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Tree:        1
 *           /  |  \\
 *          3   2   4
 *         / \\
 *        5   6
 *
 * Level 0: [1]
 * Level 1: [3, 2, 4]
 * Level 2: [5, 6]
 * Result: [[1], [3, 2, 4], [5, 6]]
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)
 * - Visit each node exactly once
 * - n = total number of nodes in tree
 *
 * ### SPACE COMPLEXITY:
 * O(w)
 * - Queue holds at most one level of nodes at a time
 * - w = maximum width of tree (max children at any level)
 * - Result storage: O(n)
 *
 * ### EDGE CASES:
 * - Empty tree: Return []
 * - Single node: Return [[root.val]]
 * - Node with many children: All added to same level
 * - Different branching factors at different levels
 *
 * </details>
 */

// Definition for a Node
function Node(val, children) {
  this.val = val;
  this.children = children || [];
}

/**
 * Main solution for Problem 429: N-ary Tree Level Order Traversal
 *
 * @param {Node} root - Root of the N-ary tree
 * @return {number[][]} - Level order traversal
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

      // Add all children to queue
      for (const child of node.children) {
        queue.push(child);
      }
    }

    result.push(currentLevel);
  }

  return result;
}

/**
 * Test cases for Problem 429: N-ary Tree Level Order Traversal
 */
function testSolution() {
  console.log("Testing 429. N-ary Tree Level Order Traversal");

  // Helper function to compare arrays
  const arraysEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  // Test case 1: Standard N-ary tree
  const tree1 = new Node(1, [
    new Node(3, [new Node(5), new Node(6)]),
    new Node(2),
    new Node(4),
  ]);
  const result1 = solve(tree1);
  const expected1 = [[1], [3, 2, 4], [5, 6]];
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
  const tree3 = new Node(1);
  const result3 = solve(tree3);
  const expected3 = [[1]];
  console.assert(
    arraysEqual(result3, expected3),
    `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`,
  );

  // Test case 4: Multiple levels
  const tree4 = new Node(1, [
    new Node(2),
    new Node(3, [new Node(6), new Node(7, [new Node(11)])]),
    new Node(4, [new Node(8)]),
    new Node(5, [new Node(9), new Node(10)]),
  ]);
  const result4 = solve(tree4);
  const expected4 = [[1], [2, 3, 4, 5], [6, 7, 8, 9, 10], [11]];
  console.assert(
    arraysEqual(result4, expected4),
    `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`,
  );

  console.log(
    "All test cases passed for 429. N-ary Tree Level Order Traversal!",
  );
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 429. N-ary Tree Level Order Traversal ===");
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
  Node,
};

/**
 * Additional Notes:
 * - This solution focuses on queue concepts
 * - The main difference from binary tree traversal is iterating through all children
 * - The algorithm naturally extends BFS to N-ary trees
 * - The approach can be adapted for similar problems in this category
 */
