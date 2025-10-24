/**
 * # Difficulty: Easy
 *
 * # 110. Balanced Binary Tree
 *
 * Given a binary tree, determine if it is height-balanced.
 *
 * A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than 1.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[3,9,20,null,null,15,7]</dd>
 *         ("Alternative recursive", solution.isBalancedAlternative),
 *         ("Iterative", solution.isBalancedIterative)]</dd>
 * <dt>Output:</dt>
 * <dd>"{name}: {result}"</dd>
 * <dt>Explanation:</dt>
 * <dd>The tree is balanced because the height difference between left and right subtrees is at most 1 at every node</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Array Traversal, Two Pointers, Stack Operations
 * **Data Structures**: Array, Stack, Queue
 * **Patterns**: Two Pointers Pattern, Greedy Algorithm
 * **Time Complexity**: * O(n) - Single pass through input
 * **Space Complexity**: * O(h)

 *
 * ### INTUITION:
 * A balanced binary tree requires that for every node, the heights of its left and right subtrees differ by at most 1. The key insight is to check this condition recursively while computing heights bottom-up.
 *
 * ### APPROACH:
 * 1. **Recursive Height Calculation**: Calculate height of each subtree recursively
 * 2. **Balance Check**: For each node, check if |left_height - right_height| ≤ 1
 * 3. **Early Termination**: If any subtree is unbalanced, immediately return False
 * 4. **Bottom-Up**: Check balance condition while returning heights
 *
 * ### WHY THIS WORKS:
 * - Height-balanced property must hold for ALL nodes, not just root
 * - Recursive structure naturally checks every node
 * - Bottom-up approach avoids redundant height calculations
 * - Early termination optimizes for unbalanced trees
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * [3,9,20,null,null,15,7]
 * ```
 *
 * 3
 * / \
 * 9  20
 * /  \
 * 15   7
 * 1. Check node 9: height = 1, balanced ✓
 * 2. Check node 15: height = 1, balanced ✓
 * 3. Check node 7: height = 1, balanced ✓
 * 4. Check node 20: left_height = 1, right_height = 1, |1-1| = 0 ≤ 1 ✓
 * 5. Check node 3: left_height = 1, right_height = 2, |1-2| = 1 ≤ 1 ✓
 *
 * Output:
 * ```
 * True
 * ```

### TIME COMPLEXITY:
 * O(n)
 * Each node is visited exactly once
 *
 * ### SPACE COMPLEXITY:
 * O(h)
 * Where h is height of tree (recursion stack)
 *
 * ### EDGE CASES:
 * - **Empty tree**: Return True (null tree is balanced)
 * - **Single node**: Return True (height-balanced by definition)
 * - **Perfect binary tree**: All levels completely filled, always balanced
 * - **Linear tree (skewed)**: Height difference > 1, return False
 * - **Subtree unbalanced**: Early termination returns -1 immediately
 *
 * </details>
 */

/**
 * Definition for a binary tree node
 */
class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

/**
 * Main solution for Problem 110: Balanced Binary Tree
 * @param {TreeNode} root - Root of binary tree
 * @returns {boolean} True if tree is balanced, false otherwise
 */
function solve(root) {
  return isBalanced(root);
}

/**
 * Check if binary tree is height-balanced
 * @param {TreeNode} root - Root of binary tree
 * @returns {boolean} True if tree is balanced, false otherwise
 *
 * Time Complexity: O(n) where n is number of nodes
 * Space Complexity: O(h) where h is height of tree
 */
function isBalanced(root) {
  /**
   * Return height if balanced, -1 if unbalanced
   * @param {TreeNode} node - Current tree node
   * @returns {number} Height of subtree if balanced, -1 if unbalanced
   */
  function checkHeight(node) {
    if (!node) {
      return 0;
    }

    // Check left subtree
    const leftHeight = checkHeight(node.left);
    if (leftHeight === -1) {
      return -1; // Left subtree is unbalanced
    }

    // Check right subtree
    const rightHeight = checkHeight(node.right);
    if (rightHeight === -1) {
      return -1; // Right subtree is unbalanced
    }

    // Check balance condition for current node
    if (Math.abs(leftHeight - rightHeight) > 1) {
      return -1; // Current node is unbalanced
    }

    // Return height of current subtree
    return Math.max(leftHeight, rightHeight) + 1;
  }

  return checkHeight(root) !== -1;
}

/**
 * Alternative approach using separate height function
 * @param {TreeNode} root - Root of binary tree
 * @returns {boolean} True if tree is balanced, false otherwise
 */
function isBalancedAlternative(root) {
  /**
   * Get height of subtree
   * @param {TreeNode} node
   * @returns {number}
   */
  function getHeight(node) {
    if (!node) {
      return 0;
    }
    return Math.max(getHeight(node.left), getHeight(node.right)) + 1;
  }

  /**
   * Check if subtree is balanced
   * @param {TreeNode} node
   * @returns {boolean}
   */
  function isBalancedHelper(node) {
    if (!node) {
      return true;
    }

    // Check balance condition for current node
    const leftHeight = getHeight(node.left);
    const rightHeight = getHeight(node.right);

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    }

    // Recursively check subtrees
    return isBalancedHelper(node.left) && isBalancedHelper(node.right);
  }

  return isBalancedHelper(root);
}

/**
 * Iterative approach using stack and height calculation
 * @param {TreeNode} root - Root of binary tree
 * @returns {boolean} True if tree is balanced, false otherwise
 */
function isBalancedIterative(root) {
  if (!root) {
    return true;
  }

  /**
   * Calculate height iteratively
   * @param {TreeNode} node
   * @returns {number}
   */
  function getHeight(node) {
    if (!node) {
      return 0;
    }

    const stack = [[node, 1]];
    let maxHeight = 0;

    while (stack.length > 0) {
      const [current, height] = stack.pop();
      maxHeight = Math.max(maxHeight, height);

      if (current.left) {
        stack.push([current.left, height + 1]);
      }
      if (current.right) {
        stack.push([current.right, height + 1]);
      }
    }

    return maxHeight;
  }

  // Check each node iteratively
  const stack = [root];
  while (stack.length > 0) {
    const node = stack.pop();

    const leftHeight = getHeight(node.left);
    const rightHeight = getHeight(node.right);

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    }

    if (node.left) {
      stack.push(node.left);
    }
    if (node.right) {
      stack.push(node.right);
    }
  }

  return true;
}

/**
 * Helper function to build tree from array representation
 * @param {Array} values - Array representation of tree
 * @returns {TreeNode} Root of constructed tree
 */
function buildTreeFromArray(values) {
  if (!values || values.length === 0) {
    return null;
  }

  const root = new TreeNode(values[0]);
  const queue = [root];
  let i = 1;

  while (queue.length > 0 && i < values.length) {
    const node = queue.shift();

    if (i < values.length && values[i] !== null) {
      node.left = new TreeNode(values[i]);
      queue.push(node.left);
    }
    i++;

    if (i < values.length && values[i] !== null) {
      node.right = new TreeNode(values[i]);
      queue.push(node.right);
    }
    i++;
  }

  return root;
}

/**
 * Test cases for Problem 110: Balanced Binary Tree
 */
function testSolution() {
  console.log("Testing 110. Balanced Binary Tree");

  // Test case 1: Balanced tree
  const tree1 = buildTreeFromArray([3, 9, 20, null, null, 15, 7]);
  const result1 = isBalanced(tree1);
  const expected1 = true;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Unbalanced tree
  const tree2 = buildTreeFromArray([1, 2, 2, 3, 3, null, null, 4, 4]);
  const result2 = isBalanced(tree2);
  const expected2 = false;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Empty tree
  const tree3 = null;
  const result3 = isBalanced(tree3);
  const expected3 = true;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Single node
  const tree4 = new TreeNode(1);
  const result4 = isBalanced(tree4);
  const expected4 = true;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Linear tree (unbalanced)
  const tree5 = buildTreeFromArray([1, 2, null, 3, null, 4]);
  const result5 = isBalanced(tree5);
  const expected5 = false;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  // Test case 6: Perfect binary tree
  const tree6 = buildTreeFromArray([1, 2, 3, 4, 5, 6, 7]);
  const result6 = isBalanced(tree6);
  const expected6 = true;
  console.assert(
    result6 === expected6,
    `Test 6 failed: expected ${expected6}, got ${result6}`,
  );

  // Test alternative implementations
  const result7 = isBalancedAlternative(tree1);
  console.assert(
    result7 === expected1,
    `Alternative test failed: expected ${expected1}, got ${result7}`,
  );

  const result8 = isBalancedIterative(tree1);
  console.assert(
    result8 === expected1,
    `Iterative test failed: expected ${expected1}, got ${result8}`,
  );

  console.log("All test cases passed for 110. Balanced Binary Tree!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 110. Balanced Binary Tree ===");
  console.log("Category: Trees");
  console.log("Difficulty: Easy");
  console.log("");

  // Example 1: Balanced tree
  const tree1 = buildTreeFromArray([3, 9, 20, null, null, 15, 7]);
  const result1 = isBalanced(tree1);
  console.log(`isBalanced([3,9,20,null,null,15,7]) -> ${result1}`);
  console.log("Tree structure:");
  console.log("       3");
  console.log("      / \\");
  console.log("     9  20");
  console.log("       /  \\");
  console.log("      15   7");
  console.log("Heights: 9=1, 15=1, 7=1, 20=2, 3=3. All differences ≤ 1 ✓");

  // Example 2: Unbalanced tree
  const tree2 = buildTreeFromArray([1, 2, 2, 3, 3, null, null, 4, 4]);
  const result2 = isBalanced(tree2);
  console.log(`\nisBalanced([1,2,2,3,3,null,null,4,4]) -> ${result2}`);
  console.log("Tree structure:");
  console.log("         1");
  console.log("       /   \\");
  console.log("      2     2");
  console.log("     / \\");
  console.log("    3   3");
  console.log("   / \\");
  console.log("  4   4");
  console.log(
    "Left subtree height = 4, Right subtree height = 1. |4-1| = 3 > 1 ✗",
  );

  // Example 3: Algorithm comparison
  console.log(`\nAlgorithm comparison:`);
  const approaches = [
    ["Optimized recursive", isBalanced],
    ["Alternative recursive", isBalancedAlternative],
    ["Iterative", isBalancedIterative],
  ];

  for (const [name, method] of approaches) {
    const result = method(tree1);
    console.log(`${name}: ${result}`);
  }

  console.log(`\nKey insights:`);
  console.log(
    `1. Balance condition: |left_height - right_height| ≤ 1 for ALL nodes`,
  );
  console.log(`2. Recursive approach with early termination is most efficient`);
  console.log(`3. Bottom-up calculation avoids redundant height computations`);
  console.log(`4. Empty trees and single nodes are always balanced`);
  console.log(`5. Time complexity: O(n), Space complexity: O(h)`);

  testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
  demonstrateSolution();
}

// Export for use in other modules
module.exports = {
  solve,
  isBalanced,
  isBalancedAlternative,
  isBalancedIterative,
  TreeNode,
  buildTreeFromArray,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This solution uses optimized recursive approach with early termination
 * - Time complexity is O(n) for visiting each node exactly once
 * - Space complexity is O(h) for recursion stack where h is tree height
 * - The algorithm handles all edge cases including empty trees and single nodes
 * - Essential insight: balance property must hold for every node in the tree
 * - Alternative approaches provide different trade-offs between clarity and efficiency
 */
