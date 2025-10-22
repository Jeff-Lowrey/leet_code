/**
 * # Difficulty: Easy
 *
 * # 226. Invert Binary Tree
 *
 * Given the root of a binary tree, invert the tree, and return its root.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[4,2,7,1,3,6,9]</dd>
 * <dt>Output:</dt>
 * <dd>[4,7,2,9,6,3,1] (inverted tree)</dd>
 * <dt>Explanation:</dt>
 * <dd>After inverting, left and right subtrees are swapped recursively: left child 4 becomes right child</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Two Pointers, Stack Operations, Graph Traversal
 * **Data Structures**: Stack, Tree, Trie
 * **Patterns**: Two Pointers Pattern, Hash Table Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Recursively swap left and right children of each node. Base case: null returns null. Post-order: invert both subtrees, then swap them at current node.
 *
 * ### APPROACH:
 * 1. **Base case**: If root is None, return None
 * 2. **Swap children**: temp = root.left, root.left = root.right, root.right = temp
 * 3. **Recursively invert left**: invertTree(root.left)
 * 4. **Recursively invert right**: invertTree(root.right)
 * 5. **Return root**: Return modified tree root
 *
 * ### WHY THIS WORKS:
 * - Recursive approach: swap left and right children, then recurse on both
 * - Base case: null node returns null immediately
 * - Post-order traversal ensures children inverted before parent processes
 * - Each node visited once for swap operation
 * - O(n) time visiting all nodes, O(h) space for recursion stack
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: root = [4,2,7,1,3,6,9]
 * Step 1: Recursively swap children
 *   Swap children of 4: left=7, right=2
 *   Swap children of 7: left=9, right=6
 *   Swap children of 2: left=3, right=1
 *
 * Output: [4,7,2,9,6,3,1] (inverted tree)
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 *
 * ### EDGE CASES:
 * - Empty input handling
 * - Single element cases
 * - Large input considerations
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
   * Invert binary tree recursively.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(h) where h is height of tree
   */
  invertTree(root: TreeNode | null): TreeNode | null {
    if (!root) {
      return null;
    }

    // Swap left and right children
    [root.left, root.right] = [root.right, root.left];

    // Recursively invert left and right subtrees
    this.invertTree(root.left);
    this.invertTree(root.right);

    return root;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  // Helper to build tree from array
  function buildTree(arr: (number | null)[]): TreeNode | null {
    if (!arr.length || arr[0] === null) return null;

    const root = new TreeNode(arr[0]);
    const queue: TreeNode[] = [root];
    let i = 1;

    while (i < arr.length) {
      const node = queue.shift()!;

      if (i < arr.length && arr[i] !== null) {
        node.left = new TreeNode(arr[i]!);
        queue.push(node.left);
      }
      i++;

      if (i < arr.length && arr[i] !== null) {
        node.right = new TreeNode(arr[i]!);
        queue.push(node.right);
      }
      i++;
    }

    return root;
  }

  // Helper to convert tree to array
  function treeToArray(root: TreeNode | null): (number | null)[] {
    if (!root) return [];
    const result: (number | null)[] = [];
    const queue: (TreeNode | null)[] = [root];

    while (queue.length > 0) {
      const node = queue.shift()!;
      if (node) {
        result.push(node.val);
        queue.push(node.left);
        queue.push(node.right);
      } else {
        result.push(null);
      }
    }

    // Remove trailing nulls
    while (result.length > 0 && result[result.length - 1] === null) {
      result.pop();
    }

    return result;
  }

  const tree1 = buildTree([4, 2, 7, 1, 3, 6, 9]);
  const inverted1 = solution.invertTree(tree1);
  console.log(`Test 1: ${JSON.stringify(treeToArray(inverted1)) === JSON.stringify([4, 7, 2, 9, 6, 3, 1]) ? "PASS" : "FAIL"}`);

  const tree2 = buildTree([2, 1, 3]);
  const inverted2 = solution.invertTree(tree2);
  console.log(`Test 2: ${JSON.stringify(treeToArray(inverted2)) === JSON.stringify([2, 3, 1]) ? "PASS" : "FAIL"}`);

  const tree3 = buildTree([]);
  const inverted3 = solution.invertTree(tree3);
  console.log(`Test 3: ${inverted3 === null ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
