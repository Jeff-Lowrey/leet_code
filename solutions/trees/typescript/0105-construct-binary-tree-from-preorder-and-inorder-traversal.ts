/**
 * # Difficulty: Medium
 *
 * # 0105. Construct Binary Tree From Preorder And Inorder Traversal
 *
 *
 * Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]</dd>
 * <dt>Output:</dt>
 * <dd>Tree with root 3</dd>
 * <dt>Explanation:</dt>
 * <dd>The tree is uniquely constructed from preorder [3,9,20,15,7] and inorder [9,3,15,20,7] traversals</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Array, String
 * **Patterns**: Two Pointers Pattern, Tree Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Recursively build tree. Find root in preorder (first element). Find root in inorder (splits left/right). Recursively build left subtree with elements before root, right subtree with elements after root in inorder.
 *
 * ### APPROACH:
 * 1. **Build index map**: Create dict mapping inorder values to indices
 * 2. **Define helper**: Implement build(pre_start, pre_end, in_start, in_end)
 * 3. **Base case**: If pre_start > pre_end, return None
 * 4. **Create root**: root = TreeNode(preorder[pre_start])
 * 5. **Find root in inorder**: root_idx = inorder_map[root.val]
 * 6. **Calculate left size**: left_size = root_idx - in_start
 * 7. **Build left subtree**: root.left = build(pre_start+1, pre_start+left_size, in_start, root_idx-1)
 * 8. **Build right subtree**: root.right = build(pre_start+left_size+1, pre_end, root_idx+1, in_end), return root
 *
 * ### WHY THIS WORKS:
 * - Preorder gives root (first element), inorder splits left/right subtrees
 * - Find root in inorder: elements left of root are left subtree, right are right subtree
 * - Recursively build left and right subtrees with their preorder/inorder slices
 * - Hash map stores inorder indices for O(1) root lookup instead of O(n) search
 * - O(n) time: each node processed once, O(n) space for map and recursion
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
 * ```
 *
 * Step 1: Root is first in preorder
 * root = 3
 * Step 2: Find root in inorder
 * left subtree: [9]
 * right subtree: [15,20,7]
 * Step 3: Recursively build
 * left: preorder=[9], inorder=[9]
 * right: preorder=[20,15,7], inorder=[15,20,7]
 *
 * Output:
 * ```
 * Tree with root 3
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
   * Construct binary tree from preorder and inorder traversals.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    if (!preorder.length || !inorder.length) {
      return null;
    }

    // Build index map for inorder array for O(1) lookups
    const inorderMap: Map<number, number> = new Map();
    for (let i = 0; i < inorder.length; i++) {
      inorderMap.set(inorder[i], i);
    }

    const build = (preStart: number, preEnd: number, inStart: number, inEnd: number): TreeNode | null => {
      if (preStart > preEnd) {
        return null;
      }

      // Create root node with first element in preorder
      const root = new TreeNode(preorder[preStart]);

      // Find root in inorder to split left/right subtrees
      const rootIdx = inorderMap.get(root.val)!;

      // Calculate left subtree size
      const leftSize = rootIdx - inStart;

      // Build left subtree
      root.left = build(preStart + 1, preStart + leftSize, inStart, rootIdx - 1);

      // Build right subtree
      root.right = build(preStart + leftSize + 1, preEnd, rootIdx + 1, inEnd);

      return root;
    };

    return build(0, preorder.length - 1, 0, inorder.length - 1);
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

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

  const tree1 = solution.buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]);
  console.log(`Test 1: ${JSON.stringify(treeToArray(tree1)) === JSON.stringify([3, 9, 20, null, null, 15, 7]) ? "PASS" : "FAIL"}`);

  const tree2 = solution.buildTree([-1], [-1]);
  console.log(`Test 2: ${JSON.stringify(treeToArray(tree2)) === JSON.stringify([-1]) ? "PASS" : "FAIL"}`);

  const tree3 = solution.buildTree([], []);
  console.log(`Test 3: ${tree3 === null ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
