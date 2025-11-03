/**
### INTUITION:
The key insight is that the right side view is simply the rightmost node at each level of the tree.
Use level-order traversal (BFS) and capture the last node at each level.

### APPROACH:
1. **Handle edge case**: Return empty list if tree is empty
2. **Initialize BFS**: Use a deque with root node
3. **For each level**:
   - Process all nodes at current level
   - Keep track of the last node in the level
   - Add the last node's value to result
   - Add children to queue for next level

### WHY THIS WORKS:
- This ensures that bFS processes nodes level by level, left to right
- This ensures that the last node processed at each level is the rightmost node
- This ensures that this is exactly what's visible from the right side
- This ensures that we collect these rightmost nodes from each level

### EXAMPLE WALKTHROUGH:
Input:
```
Tree:      1            <- Right view: 1
```

/   \\
2     3          <- Right view: 3
\\     \\
5     4        <- Right view: 4
Result: [1, 3, 4]

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
O(n)**
- Single pass through input
- Visit each node exactly once
- n = number of nodes in tree

### SPACE COMPLEXITY:
O(w)**
- Queue holds at most one level of nodes at a time
- w = maximum width of tree (worst case: n/2 for complete tree)
- Result storage: **O(h)** where h = height

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

*/

// Definition for a binary tree node
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * Main solution for Problem 199: Binary Tree Right Side View
 *
 * @param {TreeNode} root - Root of the binary tree
 * @return {number[]} - Values visible from right side
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
    let rightmost = null;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      rightmost = node.val; // Last node at this level

      // Add children to queue
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    // Add the rightmost value of this level
    result.push(rightmost);
  }

  return result;
}

/**
 * Test cases for Problem 199: Binary Tree Right Side View
 */
function testSolution() {
  console.log("Testing 199. Binary Tree Right Side View");

  // Helper function to compare arrays
  const arraysEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  // Test case 1: Standard tree
  const tree1 = new TreeNode(
    1,
    new TreeNode(2, null, new TreeNode(5)),
    new TreeNode(3, null, new TreeNode(4)),
  );
  const result1 = solve(tree1);
  const expected1 = [1, 3, 4];
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

  // Test case 4: Left-skewed tree
  const tree4 = new TreeNode(1, new TreeNode(2, new TreeNode(3)));
  const result4 = solve(tree4);
  const expected4 = [1, 2, 3];
  console.assert(
    arraysEqual(result4, expected4),
    `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`,
  );

  console.log("All test cases passed for 199. Binary Tree Right Side View!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 199. Binary Tree Right Side View ===");
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
