/**
 * # Difficulty: Easy
 *
 * # 993. Cousins in Binary Tree
 *
 * Given the root of a binary tree with unique values and the values of two different nodes x and y,
 * return true if the nodes corresponding to the values x and y are cousins, or false otherwise.
 *
 * Two nodes of a binary tree are cousins if they have the same depth but have different parents.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>Tree:      1</dd>
 * <dt>Output:</dt>
 * <dd>/   \\</dd>
 * <dt>Explanation:</dt>
 * <dd>Nodes 2 and 3 are not cousins (same parent)</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Array Traversal, Two Pointers, Queue Operations
 * **Data Structures**: Queue, Tree, Trie
 * **Patterns**: Two Pointers Pattern, Graph Pattern
 * **Time Complexity**: * O(n)
 * **Space Complexity**: * O(w)

 *
 * ### INTUITION:
 * Cousins are nodes at the same level (depth) but with different parents.
 * Use BFS to track both depth and parent information for each node.
 *
 * ### APPROACH:
 * 1. **Handle edge case**: Return false if tree is empty or has only one node
 * 2. **Initialize BFS**: Use a deque with (node, parent, depth) tuples
 * 3. **Track target nodes**: Store depth and parent when we find x or y
 * 4. **Determine if cousins**:
 *    - Both nodes must be found
 *    - They must be at same depth
 *    - They must have different parents
 *
 * ### WHY THIS WORKS:
 * - BFS naturally tracks depth by processing level by level
 * - By storing parent along with each node in queue, we can track parent information
 * - When we find both target values, we have all information needed to check if they're cousins
 * - Early termination: Can stop as soon as we find both nodes
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Tree:      1
 *          /   \\
 *         2     3
 *        /
 *       4
 *
 * x=4, y=3:
 * - Node 4: depth=2, parent=2
 * - Node 3: depth=1, parent=1
 * - Different depths → NOT cousins
 *
 * x=2, y=3:
 * - Node 2: depth=1, parent=1
 * - Node 3: depth=1, parent=1
 * - Same parent → NOT cousins
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)
 * - In worst case, visit all nodes in tree
 * - n = number of nodes in tree
 *
 * ### SPACE COMPLEXITY:
 * O(w)
 * - Queue holds at most one level of nodes at a time
 * - w = maximum width of tree (worst case: n/2 for complete tree)
 *
 * ### EDGE CASES:
 * - One or both nodes not in tree: Return false
 * - Nodes at different depths: Return false
 * - Nodes with same parent (siblings): Return false
 * - Root node as one of the values: Cannot be cousin
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
 * Main solution for Problem 993: Cousins In Binary Tree
 *
 * @param {TreeNode} root - Root of the binary tree
 * @param {number} x - First value to check
 * @param {number} y - Second value to check
 * @return {boolean} - True if x and y are cousins
 *
 * Time Complexity: O(n)
 * Space Complexity: O(w) where w is maximum width
 */
function solve(root, x, y) {
  if (!root) return false;

  // Queue stores [node, parent, depth]
  const queue = [[root, null, 0]];
  let xInfo = null;
  let yInfo = null;

  while (queue.length > 0) {
    const [node, parent, depth] = queue.shift();

    // Check if this is one of our target nodes
    if (node.val === x) {
      xInfo = { parent, depth };
    }
    if (node.val === y) {
      yInfo = { parent, depth };
    }

    // If we found both, check if they're cousins
    if (xInfo && yInfo) {
      return xInfo.depth === yInfo.depth && xInfo.parent !== yInfo.parent;
    }

    // Add children to queue with current node as parent
    if (node.left) {
      queue.push([node.left, node, depth + 1]);
    }
    if (node.right) {
      queue.push([node.right, node, depth + 1]);
    }
  }

  // One or both nodes not found
  return false;
}

/**
 * Test cases for Problem 993: Cousins In Binary Tree
 */
function testSolution() {
  console.log("Testing 993. Cousins In Binary Tree");

  // Test case 1: Not cousins (different depths)
  const tree1 = new TreeNode(
    1,
    new TreeNode(2, new TreeNode(4)),
    new TreeNode(3),
  );
  const result1 = solve(tree1, 4, 3);
  console.assert(
    result1 === false,
    `Test 1 failed: expected false, got ${result1}`,
  );

  // Test case 2: Are cousins
  const tree2 = new TreeNode(
    1,
    new TreeNode(2, null, new TreeNode(4)),
    new TreeNode(3, null, new TreeNode(5)),
  );
  const result2 = solve(tree2, 4, 5);
  console.assert(
    result2 === true,
    `Test 2 failed: expected true, got ${result2}`,
  );

  // Test case 3: Siblings (same parent)
  const tree3 = new TreeNode(
    1,
    new TreeNode(2, new TreeNode(4), new TreeNode(5)),
    new TreeNode(3),
  );
  const result3 = solve(tree3, 4, 5);
  console.assert(
    result3 === false,
    `Test 3 failed: expected false, got ${result3}`,
  );

  // Test case 4: Single node
  const tree4 = new TreeNode(1);
  const result4 = solve(tree4, 1, 2);
  console.assert(
    result4 === false,
    `Test 4 failed: expected false, got ${result4}`,
  );

  // Test case 5: More complex tree - are cousins
  const tree5 = new TreeNode(
    1,
    new TreeNode(2, new TreeNode(4), new TreeNode(5)),
    new TreeNode(3, new TreeNode(6), new TreeNode(7)),
  );
  const result5 = solve(tree5, 4, 6);
  console.assert(
    result5 === true,
    `Test 5 failed: expected true, got ${result5}`,
  );

  // Test case 6: Same depth but one is ancestor of other
  const tree6 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
  const result6 = solve(tree6, 2, 3);
  console.assert(
    result6 === false,
    `Test 6 failed: expected false (siblings), got ${result6}`,
  );

  console.log("All test cases passed for 993. Cousins In Binary Tree!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 993. Cousins In Binary Tree ===");
  console.log("Category: Queue");
  console.log("Difficulty: Easy");
  console.log("");

  console.log("Cousins definition: Same depth, different parents");
  console.log("");

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
 * - BFS is ideal for tracking depth information
 * - Storing parent with each queue entry enables parent comparison
 * - Early termination when both nodes are found improves efficiency
 * - Alternative: Use DFS with depth tracking, but BFS is more natural
 */
