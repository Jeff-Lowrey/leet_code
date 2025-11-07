/**
### INTUITION:
The key insight is that the maximum depth of a binary tree is simply 1 plus the maximum depth of its left and right subtrees. This naturally suggests a recursive solution where we explore both subtrees and return the maximum depth.

### APPROACH:
1. **Base Case**: If node is None, depth is 0
2. **Recursive Case**: Depth = 1 + max(left_depth, right_depth)
3. **Multiple Approaches**: Recursive (DFS), iterative (BFS), and stack-based solutions

### WHY THIS WORKS:
- This ensures that tree depth follows recursive structure naturally
- This ensures that each node contributes 1 to the total depth
- This ensures that maximum depth is determined by the deepest branch
- This ensures that both DFS and BFS can solve this problem effectively

### EXAMPLE WALKTHROUGH:
Input:
```
[3,9,20,null,null,15,7]
```

3
/ \
9  20
/  \
15   7
1. maxDepth(3): 1 + max(maxDepth(9), maxDepth(20))
2. maxDepth(9): 1 + max(0, 0) = 1
3. maxDepth(20): 1 + max(maxDepth(15), maxDepth(7))
4. maxDepth(15): 1 + max(0, 0) = 1
5. maxDepth(7): 1 + max(0, 0) = 1
6. maxDepth(20): 1 + max(1, 1) = 2
7. maxDepth(3): 1 + max(1, 2) = 3

Output:
```
3
```

### TIME COMPLEXITY:
O(n)**
- Single pass through input
Must visit every node to determine maximum depth

### SPACE COMPLEXITY:
O(h)**
Where h is height of tree (recursion stack or queue size)

### EDGE CASES:
- **Empty tree**: Return 0 (no nodes means depth is 0)
- **Single node**: Return 1 (root node has depth 1)
- **Linear tree (left/right skewed)**: Depth equals number of nodes
- **Perfect binary tree**: Depth is log2(n+1) for n nodes
- **Unbalanced tree**: Return depth of deepest leaf node

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
 * Main solution for Problem 104: Maximum Depth of Binary Tree
 * @param {TreeNode} root - Root of binary tree
 * @returns {number} Maximum depth of the tree
 */
function solve(root) {
  return maxDepth(root);
}

/**
 * Find maximum depth using recursive DFS
 * @param {TreeNode} root - Root of binary tree
 * @returns {number} Maximum depth of the tree
 *
 * Time Complexity: O(n) where n is number of nodes
 * Space Complexity: O(h) where h is height of tree
 */
function maxDepth(root) {
  if (!root) {
    return 0;
  }

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  return 1 + Math.max(leftDepth, rightDepth);
}

/**
 * Find maximum depth using BFS level-order traversal
 * @param {TreeNode} root - Root of binary tree
 * @returns {number} Maximum depth of the tree
 *
 * Time Complexity: O(n)
 * Space Complexity: O(w) where w is maximum width of tree
 */
function maxDepthBFS(root) {
  if (!root) {
    return 0;
  }

  const queue = [root];
  let depth = 0;

  while (queue.length > 0) {
    depth++;
    const levelSize = queue.length;

    // Process all nodes at current level
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();

      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
  }

  return depth;
}

/**
 * Find maximum depth using iterative DFS with stack
 * @param {TreeNode} root - Root of binary tree
 * @returns {number} Maximum depth of the tree
 *
 * Time Complexity: O(n)
 * Space Complexity: O(h)
 */
function maxDepthIterativeDFS(root) {
  if (!root) {
    return 0;
  }

  const stack = [[root, 1]]; // [node, current_depth]
  let maxDepthValue = 0;

  while (stack.length > 0) {
    const [node, currentDepth] = stack.pop();
    maxDepthValue = Math.max(maxDepthValue, currentDepth);

    if (node.left) {
      stack.push([node.left, currentDepth + 1]);
    }
    if (node.right) {
      stack.push([node.right, currentDepth + 1]);
    }
  }

  return maxDepthValue;
}

/**
 * Find maximum depth using preorder traversal approach
 * @param {TreeNode} root - Root of binary tree
 * @returns {number} Maximum depth of the tree
 */
function maxDepthPreorder(root) {
  let maxDepthValue = 0;

  function preorder(node, depth) {
    if (!node) {
      return;
    }

    maxDepthValue = Math.max(maxDepthValue, depth);
    preorder(node.left, depth + 1);
    preorder(node.right, depth + 1);
  }

  if (root) {
    preorder(root, 1);
  }

  return maxDepthValue;
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
 * Test cases for Problem 104: Maximum Depth of Binary Tree
 */
function testSolution() {
  console.log("Testing 104. Maximum Depth of Binary Tree");

  // Test case 1: Normal binary tree
  const tree1 = buildTreeFromArray([3, 9, 20, null, null, 15, 7]);
  const result1 = maxDepth(tree1);
  const expected1 = 3;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Single node
  const tree2 = new TreeNode(1);
  const result2 = maxDepth(tree2);
  const expected2 = 1;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Empty tree
  const tree3 = null;
  const result3 = maxDepth(tree3);
  const expected3 = 0;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Linear tree (left skewed)
  const tree4 = buildTreeFromArray([1, 2, null, 3, null, 4]);
  const result4 = maxDepth(tree4);
  const expected4 = 4;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Linear tree (right skewed)
  const tree5 = buildTreeFromArray([1, null, 2, null, 3, null, 4]);
  const result5 = maxDepth(tree5);
  const expected5 = 4;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  // Test case 6: Perfect binary tree
  const tree6 = buildTreeFromArray([1, 2, 3, 4, 5, 6, 7]);
  const result6 = maxDepth(tree6);
  const expected6 = 3;
  console.assert(
    result6 === expected6,
    `Test 6 failed: expected ${expected6}, got ${result6}`,
  );

  // Test alternative implementations
  const result7 = maxDepthBFS(tree1);
  console.assert(
    result7 === expected1,
    `BFS test failed: expected ${expected1}, got ${result7}`,
  );

  const result8 = maxDepthIterativeDFS(tree1);
  console.assert(
    result8 === expected1,
    `Iterative DFS test failed: expected ${expected1}, got ${result8}`,
  );

  const result9 = maxDepthPreorder(tree1);
  console.assert(
    result9 === expected1,
    `Preorder test failed: expected ${expected1}, got ${result9}`,
  );

  console.log("All test cases passed for 104. Maximum Depth of Binary Tree!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 104. Maximum Depth of Binary Tree ===");
  console.log("Category: Trees");
  console.log("Difficulty: Easy");
  console.log("");

  // Example 1: Normal tree
  const tree1 = buildTreeFromArray([3, 9, 20, null, null, 15, 7]);
  const result1 = maxDepth(tree1);
  console.log(`maxDepth([3,9,20,null,null,15,7]) -> ${result1}`);
  console.log("Tree structure:");
  console.log("       3");
  console.log("      / \\");
  console.log("     9  20");
  console.log("       /  \\");
  console.log("      15   7");
  console.log("Depth calculation: 1 + max(1, 2) = 3");

  // Example 2: Single node
  const tree2 = new TreeNode(1);
  const result2 = maxDepth(tree2);
  console.log(`\nmaxDepth([1]) -> ${result2}`);

  // Example 3: Empty tree
  const tree3 = null;
  const result3 = maxDepth(tree3);
  console.log(`maxDepth([]) -> ${result3}`);

  // Example 4: Algorithm comparison
  console.log(`\nAlgorithm comparison:`);
  const approaches = [
    ["Recursive DFS", maxDepth],
    ["BFS Level-order", maxDepthBFS],
    ["Iterative DFS", maxDepthIterativeDFS],
    ["Preorder traversal", maxDepthPreorder],
  ];

  for (const [name, method] of approaches) {
    const result = method(tree1);
    console.log(`${name}: ${result}`);
  }

  console.log(`\nKey insights:`);
  console.log(
    `1. Recursive solution: depth = 1 + max(left_depth, right_depth)`,
  );
  console.log(`2. BFS counts levels directly as it processes each level`);
  console.log(`3. Iterative DFS tracks depth with each node in stack`);
  console.log(`4. Empty trees have depth 0, single nodes have depth 1`);
  console.log(`5. Time complexity: O(n) for all approaches`);

  testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
  demonstrateSolution();
}

// Export for use in other modules
module.exports = {
  solve,
  maxDepth,
  maxDepthBFS,
  maxDepthIterativeDFS,
  maxDepthPreorder,
  TreeNode,
  buildTreeFromArray,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This solution uses recursive DFS as the primary approach for its simplicity
 * - Time complexity is O(n) for visiting each node exactly once
 * - Space complexity is O(h) for recursion stack where h is tree height
 * - The algorithm handles all edge cases including empty trees and single nodes
 * - Essential insight: tree depth follows natural recursive structure
 * - Alternative BFS approach processes level by level for different space characteristics
 */
