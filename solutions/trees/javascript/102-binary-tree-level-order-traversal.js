/**
 * Difficulty: Medium
 *
 * # 102. Binary Tree Level Order Traversal
 *
 * Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[[3]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Level-order traversal groups nodes by depth: [[3], [9,20], [15,7]]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 *

 * ### METADATA:
 * **Techniques**: Tree Traversal (Inorder/Preorder/Postorder), DFS/BFS
 * **Data Structures**: Binary Tree, BST, N-ary Tree
 * **Patterns**: Tree Traversal Pattern, Recursive Tree Processing
 * **Time Complexity**: **O(n)
 * **Space Complexity**: **O(w)

 *
 * ### INTUITION:
 * Level order traversal visits nodes level by level from left to right. This is a classic BFS (Breadth-First Search) problem where we use a queue to process nodes level by level, collecting values at each level separately.
 *
 * ### APPROACH:
 * 1. **BFS with Queue**: Use queue to process nodes level by level
 * 2. **Level Separation**: Track level size to separate levels in result
 * 3. **Left-to-Right Processing**: Add children left-to-right to maintain order
 * 4. **Result Structure**: Each level becomes a separate list in the result
 *
 * ### WHY THIS WORKS:
 * - Queue ensures FIFO processing for level-by-level traversal
 * - Level size tracking allows us to process exactly one level at a time
 * - Children are added in left-to-right order for correct traversal
 * - BFS naturally explores breadth before depth
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: [3,9,20,null,null,15,7]
 *        3
 *       / \
 *      9  20
 *        /  \
 *       15   7
 *
 * Level 0: [3] → queue: [9, 20]
 * Level 1: [9, 20] → queue: [15, 7]
 * Level 2: [15, 7] → queue: []
 * Output: [[3], [9, 20], [15, 7]]
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)
 * Each node is visited exactly once
 *
 * ### SPACE COMPLEXITY:
 * O(w)
 * Where w is maximum width of the tree (queue size)
 *
 * ### EDGE CASES:
 * - **Empty tree**: Return empty list immediately
 * - **Single node**: Return [[value]] (one level, one node)
 * - **Perfect binary tree**: Each level doubles in size
 * - **Linear tree (skewed)**: Each level has exactly one node
 * - **Unbalanced tree**: Level sizes vary based on structure
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
 * Main solution for Problem 102: Binary Tree Level Order Traversal
 * @param {TreeNode} root - Root of binary tree
 * @returns {number[][]} List of lists, each containing values at that level
 */
function solve(root) {
  return levelOrder(root);
}

/**
 * Return level order traversal using BFS with queue
 * @param {TreeNode} root - Root of binary tree
 * @returns {number[][]} List of lists, each containing values at that level
 *
 * Time Complexity: O(n) where n is number of nodes
 * Space Complexity: O(w) where w is maximum width of tree
 */
function levelOrder(root) {
  if (!root) {
    return [];
  }

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];

    // Process all nodes at current level
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);

      // Add children for next level
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }

    result.push(currentLevel);
  }

  return result;
}

/**
 * Return level order traversal using recursive DFS with level tracking
 * @param {TreeNode} root - Root of binary tree
 * @returns {number[][]} List of lists, each containing values at that level
 */
function levelOrderRecursive(root) {
  const result = [];

  function dfs(node, level) {
    if (!node) {
      return;
    }

    // Ensure result has enough levels
    if (level >= result.length) {
      result.push([]);
    }

    // Add current node to its level
    result[level].push(node.val);

    // Recurse on children
    dfs(node.left, level + 1);
    dfs(node.right, level + 1);
  }

  dfs(root, 0);
  return result;
}

/**
 * Return level order traversal using iterative approach with level markers
 * @param {TreeNode} root - Root of binary tree
 * @returns {number[][]} List of lists, each containing values at that level
 */
function levelOrderIterative(root) {
  if (!root) {
    return [];
  }

  const result = [];
  const queue = [[root, 0]]; // [node, level]

  while (queue.length > 0) {
    const [node, level] = queue.shift();

    // Ensure result has enough levels
    if (level >= result.length) {
      result.push([]);
    }

    // Add current node to its level
    result[level].push(node.val);

    // Add children with incremented level
    if (node.left) {
      queue.push([node.left, level + 1]);
    }
    if (node.right) {
      queue.push([node.right, level + 1]);
    }
  }

  return result;
}

/**
 * Return level order traversal from bottom to top
 * @param {TreeNode} root - Root of binary tree
 * @returns {number[][]} List of lists from bottom level to top level
 */
function levelOrderBottomUp(root) {
  if (!root) {
    return [];
  }

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);

      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }

    result.push(currentLevel);
  }

  // Reverse for bottom-up order
  return result.reverse();
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
 * Test cases for Problem 102: Binary Tree Level Order Traversal
 */
function testSolution() {
  console.log("Testing 102. Binary Tree Level Order Traversal");

  // Test case 1: Normal binary tree
  const tree1 = buildTreeFromArray([3, 9, 20, null, null, 15, 7]);
  const result1 = levelOrder(tree1);
  const expected1 = [[3], [9, 20], [15, 7]];
  console.assert(
    JSON.stringify(result1) === JSON.stringify(expected1),
    `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`,
  );

  // Test case 2: Single node
  const tree2 = new TreeNode(1);
  const result2 = levelOrder(tree2);
  const expected2 = [[1]];
  console.assert(
    JSON.stringify(result2) === JSON.stringify(expected2),
    `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`,
  );

  // Test case 3: Empty tree
  const tree3 = null;
  const result3 = levelOrder(tree3);
  const expected3 = [];
  console.assert(
    JSON.stringify(result3) === JSON.stringify(expected3),
    `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`,
  );

  // Test case 4: Linear tree (left skewed)
  const tree4 = buildTreeFromArray([1, 2, null, 3, null, 4]);
  const result4 = levelOrder(tree4);
  const expected4 = [[1], [2], [3], [4]];
  console.assert(
    JSON.stringify(result4) === JSON.stringify(expected4),
    `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`,
  );

  // Test case 5: Linear tree (right skewed)
  const tree5 = buildTreeFromArray([1, null, 2, null, 3, null, 4]);
  const result5 = levelOrder(tree5);
  const expected5 = [[1], [2], [3], [4]];
  console.assert(
    JSON.stringify(result5) === JSON.stringify(expected5),
    `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`,
  );

  // Test case 6: Perfect binary tree
  const tree6 = buildTreeFromArray([1, 2, 3, 4, 5, 6, 7]);
  const result6 = levelOrder(tree6);
  const expected6 = [[1], [2, 3], [4, 5, 6, 7]];
  console.assert(
    JSON.stringify(result6) === JSON.stringify(expected6),
    `Test 6 failed: expected ${JSON.stringify(expected6)}, got ${JSON.stringify(result6)}`,
  );

  // Test alternative implementations
  const result7 = levelOrderRecursive(tree1);
  console.assert(
    JSON.stringify(result7) === JSON.stringify(expected1),
    `Recursive test failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result7)}`,
  );

  const result8 = levelOrderIterative(tree1);
  console.assert(
    JSON.stringify(result8) === JSON.stringify(expected1),
    `Iterative test failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result8)}`,
  );

  const result9 = levelOrderBottomUp(tree1);
  const expected9 = [[15, 7], [9, 20], [3]];
  console.assert(
    JSON.stringify(result9) === JSON.stringify(expected9),
    `Bottom-up test failed: expected ${JSON.stringify(expected9)}, got ${JSON.stringify(result9)}`,
  );

  console.log(
    "All test cases passed for 102. Binary Tree Level Order Traversal!",
  );
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 102. Binary Tree Level Order Traversal ===");
  console.log("Category: Trees");
  console.log("Difficulty: Medium");
  console.log("");

  // Example 1: Normal tree
  const tree1 = buildTreeFromArray([3, 9, 20, null, null, 15, 7]);
  const result1 = levelOrder(tree1);
  console.log(
    `levelOrder([3,9,20,null,null,15,7]) -> ${JSON.stringify(result1)}`,
  );
  console.log("Tree structure:");
  console.log("       3");
  console.log("      / \\");
  console.log("     9  20");
  console.log("       /  \\");
  console.log("      15   7");
  console.log("Processing:");
  console.log("Level 0: [3]");
  console.log("Level 1: [9, 20]");
  console.log("Level 2: [15, 7]");

  // Example 2: Single node
  const tree2 = new TreeNode(1);
  const result2 = levelOrder(tree2);
  console.log(`\nlevelOrder([1]) -> ${JSON.stringify(result2)}`);

  // Example 3: Perfect binary tree
  const tree3 = buildTreeFromArray([1, 2, 3, 4, 5, 6, 7]);
  const result3 = levelOrder(tree3);
  console.log(`\nlevelOrder([1,2,3,4,5,6,7]) -> ${JSON.stringify(result3)}`);

  // Example 4: Algorithm comparison
  console.log(`\nAlgorithm comparison:`);
  const approaches = [
    ["BFS with queue", levelOrder],
    ["Recursive DFS", levelOrderRecursive],
    ["Iterative with levels", levelOrderIterative],
    ["Bottom-up BFS", levelOrderBottomUp],
  ];

  for (const [name, method] of approaches) {
    const result = method(tree1);
    if (name === "Bottom-up BFS") {
      console.log(`${name}: ${JSON.stringify(result)} (reversed order)`);
    } else {
      console.log(`${name}: ${JSON.stringify(result)}`);
    }
  }

  console.log(`\nKey insights:`);
  console.log(`1. BFS with queue naturally processes level by level`);
  console.log(`2. Level size tracking separates levels in the result`);
  console.log(`3. Children added left-to-right maintain correct order`);
  console.log(`4. Recursive DFS can achieve same result with level parameter`);
  console.log(`5. Time: O(n), Space: O(w) where w is maximum tree width`);

  testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
  demonstrateSolution();
}

// Export for use in other modules
module.exports = {
  solve,
  levelOrder,
  levelOrderRecursive,
  levelOrderIterative,
  levelOrderBottomUp,
  TreeNode,
  buildTreeFromArray,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This solution uses BFS with queue as the primary approach for its natural fit
 * - Time complexity is O(n) for visiting each node exactly once
 * - Space complexity is O(w) for queue size where w is maximum tree width
 * - The algorithm handles all edge cases including empty trees and single nodes
 * - Essential insight: BFS with level size tracking enables level separation
 * - Alternative recursive approach provides different space characteristics
 */
