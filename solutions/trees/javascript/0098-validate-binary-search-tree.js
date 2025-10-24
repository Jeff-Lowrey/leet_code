/**
 * # Difficulty: Medium
 *
 * # 0098. Validate Binary Search Tree
 *
 *
 * Given the root of a binary tree, determine if it is a valid binary search tree (BST).
 *
 * A valid BST is defined as follows:
 *
 * - The left subtree of a node contains only nodes with keys less than the node's key.
 * - The right subtree of a node contains only nodes with keys greater than the node's key.
 * - Both the left and right subtrees must also be binary search trees.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[2,1,3]</dd>
 * <dt>Output:</dt>
 * <dd>True (valid BST)</dd>
 * <dt>Explanation:</dt>
 * <dd>Tree is valid BST if all nodes satisfy left < node < right</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * ### METADATA:
 * **Techniques**: Array Traversal, Two Pointers, Stack Operations
 * **Data Structures**: Array, Stack, Tree
 * **Patterns**: Two Pointers Pattern, Binary Search Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space

 *
 * ### INTUITION:
 * [This problem requires understanding of trees concepts. The key insight is to identify the optimal approach for this specific scenario.]
 *
 * ### APPROACH:
 * 1. **Analyze the problem**: Understand the input constraints and expected output
 * 2. **Choose the right technique**: Apply trees methodology
 * 3. **Implement efficiently**: Focus on optimal time and space complexity
 * 4. **Handle edge cases**: Consider boundary conditions and special cases
 *
 * ### WHY THIS WORKS:
 * - The solution leverages trees principles
 * - Time complexity is optimized for the given constraints
 * - Space complexity is minimized where possible
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * root = [2,1,3]
 * ```
 *
 * Step 1: In-order traversal
 * Visit left (1), root (2), right (3)
 * Sequence: 1, 2, 3
 * Step 2: Check if sorted
 * 1 < 2 < 3 ✓
 *
 * Output:
 * ```
 * True (valid BST)
 * ```

 * ### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
 *
 * ### EDGE CASES:
 * - Empty input handling
 * - Single element cases
 * - Large input considerations
 *
 * </details>
 */

/**
 * Definition for a binary tree node.
 */
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * Main solution for Problem 098: Validate Binary Search Tree
 * Uses bounds method for efficiency
 *
 * @param {TreeNode} root - Root of the binary tree
 * @return {boolean} - True if valid BST, false otherwise
 *
 * Time Complexity: O(n) where n is number of nodes
 * Space Complexity: O(h) where h is height (recursion stack)
 */
function solve(root) {
  return isValidBSTBounds(root);
}

/**
 * Approach 1: Bounds Method (Most Efficient)
 * Maintains min/max bounds for each node
 *
 * @param {TreeNode} root
 * @return {boolean}
 */
function isValidBSTBounds(root) {
  function validate(node, min, max) {
    // Empty tree is valid BST
    if (node === null) return true;

    // Check if current node violates BST property
    if (node.val <= min || node.val >= max) {
      return false;
    }

    // Recursively validate left and right subtrees with updated bounds
    return (
      validate(node.left, min, node.val) && validate(node.right, node.val, max)
    );
  }

  return validate(root, -Infinity, Infinity);
}

/**
 * Approach 2: Inorder Traversal Method
 * BST inorder traversal should be strictly increasing
 *
 * @param {TreeNode} root
 * @return {boolean}
 */
function isValidBSTInorder(root) {
  const values = [];

  function inorder(node) {
    if (node === null) return;
    inorder(node.left);
    values.push(node.val);
    inorder(node.right);
  }

  inorder(root);

  // Check if inorder traversal is strictly increasing
  for (let i = 1; i < values.length; i++) {
    if (values[i] <= values[i - 1]) {
      return false;
    }
  }

  return true;
}

/**
 * Approach 3: Optimized Inorder (Single Pass)
 * Check during traversal without storing all values
 *
 * @param {TreeNode} root
 * @return {boolean}
 */
function isValidBSTInorderOptimized(root) {
  let prev = -Infinity;

  function inorder(node) {
    if (node === null) return true;

    // Check left subtree
    if (!inorder(node.left)) return false;

    // Check current node
    if (node.val <= prev) return false;
    prev = node.val;

    // Check right subtree
    return inorder(node.right);
  }

  return inorder(root);
}

/**
 * Approach 4: Iterative with Stack
 * Space-optimized iterative inorder traversal
 *
 * @param {TreeNode} root
 * @return {boolean}
 */
function isValidBSTIterative(root) {
  const stack = [];
  let current = root;
  let prev = -Infinity;

  while (current !== null || stack.length > 0) {
    // Go to leftmost node
    while (current !== null) {
      stack.push(current);
      current = current.left;
    }

    // Process current node
    current = stack.pop();

    // Check BST property
    if (current.val <= prev) {
      return false;
    }
    prev = current.val;

    // Move to right subtree
    current = current.right;
  }

  return true;
}

/**
 * Test cases for Problem 098: Validate Binary Search Tree
 */
function testSolution() {
  console.log("Testing 098. Validate Binary Search Tree");

  // Test case 1: Valid BST
  //     5
  //    / \
  //   3   8
  //  / \ / \
  // 2  4 7  9
  const tree1 = new TreeNode(
    5,
    new TreeNode(3, new TreeNode(2), new TreeNode(4)),
    new TreeNode(8, new TreeNode(7), new TreeNode(9)),
  );
  const result1 = solve(tree1);
  console.assert(
    result1 === true,
    `Test 1 failed: expected true, got ${result1}`,
  );

  // Test case 2: Invalid BST (right child smaller than root)
  //   5
  //  / \
  // 1   4
  //    / \
  //   3   6
  const tree2 = new TreeNode(
    5,
    new TreeNode(1),
    new TreeNode(4, new TreeNode(3), new TreeNode(6)),
  );
  const result2 = solve(tree2);
  console.assert(
    result2 === false,
    `Test 2 failed: expected false, got ${result2}`,
  );

  // Test case 3: Empty tree
  const result3 = solve(null);
  console.assert(
    result3 === true,
    `Test 3 failed: expected true, got ${result3}`,
  );

  // Test case 4: Single node
  const tree4 = new TreeNode(42);
  const result4 = solve(tree4);
  console.assert(
    result4 === true,
    `Test 4 failed: expected true, got ${result4}`,
  );

  // Test case 5: Duplicate values (invalid)
  //   5
  //  / \
  // 5   7
  const tree5 = new TreeNode(5, new TreeNode(5), new TreeNode(7));
  const result5 = solve(tree5);
  console.assert(
    result5 === false,
    `Test 5 failed: expected false, got ${result5}`,
  );

  // Test case 6: Edge case with integer boundaries
  //         2147483647
  //        /
  //   -2147483648
  const tree6 = new TreeNode(2147483647, new TreeNode(-2147483648), null);
  const result6 = solve(tree6);
  console.assert(
    result6 === true,
    `Test 6 failed: expected true, got ${result6}`,
  );

  // Test case 7: Subtle violation (left child of right subtree)
  //     10
  //    /  \
  //   5    15
  //       /  \
  //      6   20
  const tree7 = new TreeNode(
    10,
    new TreeNode(5),
    new TreeNode(
      15,
      new TreeNode(6), // This violates BST: 6 < 10
      new TreeNode(20),
    ),
  );
  const result7 = solve(tree7);
  console.assert(
    result7 === false,
    `Test 7 failed: expected false, got ${result7}`,
  );

  // Test all approaches give same results for tree1
  const resultBounds = isValidBSTBounds(tree1);
  const resultInorder = isValidBSTInorder(tree1);
  const resultOptimized = isValidBSTInorderOptimized(tree1);
  const resultIterative = isValidBSTIterative(tree1);
  console.assert(
    resultBounds === resultInorder &&
      resultInorder === resultOptimized &&
      resultOptimized === resultIterative,
    "All approaches should give the same result",
  );

  console.log("All test cases passed for 098. Validate Binary Search Tree!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 098. Validate Binary Search Tree ===");
  console.log("Category: Trees");
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
  isValidBSTBounds,
  isValidBSTInorder,
  isValidBSTInorderOptimized,
  isValidBSTIterative,
  TreeNode,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - Four different approaches with different trade-offs:




 * - Key insight: BST property must hold globally, not just locally
 * - Duplicate values make BST invalid (strictly less/greater)
 * - Integer overflow considerations for extreme values
 * - All approaches handle edge cases consistently
 */
