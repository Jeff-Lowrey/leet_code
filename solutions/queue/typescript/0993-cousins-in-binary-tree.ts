/**
 * # Difficulty: Easy
 *
 * # 993. Cousins in Binary Tree
 *
 * Difficulty: Medium
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
 * <dd>root = [1,2,3,4], x = 4, y = 3</dd>
 * <dt>Output:</dt>
 * <dd>false</dd>
 * <dt>Explanation:</dt>
 * <dd>Nodes 2 and 3 are not cousins (same parent)</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Two Pointers, Stack Operations
 * **Data Structures**: Hash Map, Stack, Queue
 * **Patterns**: Two Pointers Pattern, Graph Pattern
 * **Time Complexity**: O(n)
 * **Space Complexity**: O(w)
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
 * Input:
 * ```
 * Tree:      1
 * ```
 *
 * /   \\
 * 2     3
 * /
 * 4
 * x=4, y=3:
 * - Node 4: depth=2, parent=2
 * - Node 3: depth=1, parent=1
 * x=2, y=3:
 *
 * Steps:
 * Step 1: - Different depths → NOT cousins
 * Step 2: - Node 2: depth=1, parent=1
 * Step 3: - Node 3: depth=1, parent=1
 * Step 4: - Same parent → NOT cousins

### TIME COMPLEXITY:
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

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

class Solution {
  /**
   * Check if two nodes are cousins using BFS.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(w)
   */
  isCousins(root: TreeNode | null, x: number, y: number): boolean {
    if (!root) {
      return false;
    }

    const info: Map<number, [TreeNode | null, number]> = new Map();
    const queue: [TreeNode, TreeNode | null, number][] = [[root, null, 0]];

    while (queue.length > 0) {
      const [node, parent, depth] = queue.shift()!;

      if (node.val === x || node.val === y) {
        info.set(node.val, [parent, depth]);

        if (info.size === 2) {
          const [xParent, xDepth] = info.get(x)!;
          const [yParent, yDepth] = info.get(y)!;
          return xDepth === yDepth && xParent !== yParent;
        }
      }

      if (node.left) {
        queue.push([node.left, node, depth + 1]);
      }
      if (node.right) {
        queue.push([node.right, node, depth + 1]);
      }
    }

    return false;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { Solution, TreeNode };
}

function runTests(): void {
  const solution = new Solution();

  const root1 = new TreeNode(1);
  root1.left = new TreeNode(2);
  root1.right = new TreeNode(3);
  root1.left.left = new TreeNode(4);
  root1.right.right = new TreeNode(5);
  console.log(`Test 1: ${solution.isCousins(root1, 4, 5) === true ? "PASS" : "FAIL"}`);

  const root2 = new TreeNode(1);
  root2.left = new TreeNode(2);
  root2.right = new TreeNode(3);
  console.log(`Test 2: ${solution.isCousins(root2, 2, 3) === false ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
export { TreeNode };
