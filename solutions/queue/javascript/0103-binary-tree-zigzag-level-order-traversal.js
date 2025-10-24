/**
 * # Difficulty: Medium
 *
 * # 103. Binary Tree Zigzag Level Order Traversal
 *
 * Difficulty: Medium
 *
 * Given the root of a binary tree, return the zigzag level order traversal of its nodes' values.
 * (i.e., from left to right, then right to left for the next level and alternate between).
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[[3]</dd>
 * <dt>Output:</dt>
 * <dd>"Test case 1 passed: Example tree"</dd>
 * <dt>Explanation:</dt>
 * <dd>Zigzag level-order traversal: [[3],[20,9],[15,7]]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Array Traversal, Two Pointers, Queue Operations
 * **Data Structures**: Array, String, Queue
 * **Patterns**: Two Pointers Pattern, Tree Pattern
 * **Time Complexity**: * O(n) - Single pass through input
 * **Space Complexity**: * O(w)

 *
 * ### INTUITION:
 * Perform a level-order traversal (BFS) but alternate the direction of reading values at each level.
 * Use a flag to track whether we should append values left-to-right or right-to-left.
 *
 * ### APPROACH:
 * 1. **Handle edge case**: Return empty list if tree is empty
 * 2. **Initialize BFS**: Use a deque for level-order traversal
 * 3. **Track direction**: Use a boolean flag that alternates each level
 * 4. **For each level**:
 *    - Process all nodes at current level
 *    - Collect values in order
 *    - If right-to-left level, reverse the values before adding to result
 *    - Toggle direction flag for next level
 *
 * ### WHY THIS WORKS:
 * - BFS naturally processes nodes level by level
 * - By tracking level boundaries (queue size), we can process each level independently
 * - Reversing alternate levels gives us the zigzag pattern
 * - Deque provides O(1) append/popleft operations
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * Tree:      3
 * ```
 *
 * /   \\
 * 9     20
 * /  \\
 * 15   7
 *
 * Steps:
 * Step 1: Level 0 (L->R): [3]
 * Step 2: Level 1 (R->L): [20, 9]
 * Step 3: Level 2 (L->R): [15, 7]
 * Step 4: Result: [[3], [20, 9], [15, 7]]
 * 
 * Output:
 * ```
 * [[3], [20, 9], [15, 7]]
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
 *
 * ### EDGE CASES:
 * - Empty tree: Return []
 * - Single node: Return [[root.val]]
 * - Skewed tree: Works correctly with zigzag pattern
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
 * Main solution for Problem 103: Binary Tree Zigzag Level Order Traversal
 *
 * @param {TreeNode} root - Root of the binary tree
 * @return {number[][]} - Zigzag level order traversal
 *
 * Time Complexity: O(n)
 * Space Complexity: O(w) where w is maximum width
 */
function solve(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];
  let leftToRight = true;

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();

      // Add value based on direction
      if (leftToRight) {
        currentLevel.push(node.val);
      } else {
        currentLevel.unshift(node.val);
      }

      // Add children to queue
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(currentLevel);
    leftToRight = !leftToRight;
  }

  return result;
}

/**
 * Test cases for Problem 103: Binary Tree Zigzag Level Order Traversal
 */
function testSolution() {
  console.log("Testing 103. Binary Tree Zigzag Level Order Traversal");

  // Helper function to compare arrays
  const arraysEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  // Test case 1: Standard tree
  const tree1 = new TreeNode(
    3,
    new TreeNode(9),
    new TreeNode(20, new TreeNode(15), new TreeNode(7)),
  );
  const result1 = solve(tree1);
  const expected1 = [[3], [20, 9], [15, 7]];
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

  // Test case 4: Left-skewed tree
  const tree4 = new TreeNode(1, new TreeNode(2, new TreeNode(3)));
  const result4 = solve(tree4);
  const expected4 = [[1], [2], [3]];
  console.assert(
    arraysEqual(result4, expected4),
    `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`,
  );

  console.log(
    "All test cases passed for 103. Binary Tree Zigzag Level Order Traversal!",
  );
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log(
    "\n=== Problem 103. Binary Tree Zigzag Level Order Traversal ===",
  );
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
