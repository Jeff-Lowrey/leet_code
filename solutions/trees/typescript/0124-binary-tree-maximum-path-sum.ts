/**
 * ### METADATA:
 *
 *
 * ### INTUITION:
 * The key insight is that for each node, max path is: left max path + node + right max path. Recursively calculate max single path from each child. Track global maximum. Return max single path (node + best child path) up.
 *
 * ### APPROACH:
 * 1. **Initialize max_sum**: Set max_sum = float('-inf')
 * 2. **Define helper**: Implement max_gain(node)
 * 3. **Base case**: If node is None, return 0
 * 4. **Calculate left gain**: left_gain = max(max_gain(node.left), 0)
 * 5. **Calculate right gain**: right_gain = max(max_gain(node.right), 0)
 * 6. **Update global max**: max_sum = max(max_sum, node.val + left_gain + right_gain)
 * 7. **Return path gain**: Return node.val + max(left_gain, right_gain)
 * 8. **Call helper**: max_gain(root), return max_sum
 *
 * ### WHY THIS WORKS:
 * - This ensures that post-order DFS: compute max path through each node as potential answer
 * - This ensures that path through node = node.val + max(0, left_path) + max(0, right_path)
 * - This ensures that return to parent: node.val + max(0, left_path, right_path) (single path)
 * - This ensures that track global maximum across all nodes
 * - This ensures that o(n) time visiting each node once, O(h) space for recursion
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * root = [-10,9,20,null,null,15,7]
 * ```
 *
 * Step 1: Calculate max path through each node
 * Node 15: path=15
 * Node 7: path=7
 * Node 20: path=20+15+7=42
 * Node 9: path=9
 * Node -10: path=-10+9+42=41
 *
 * Output:
 * ```
 * 42 (maximum path sum)
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)**
 * - Single pass through input
 *
 * ### SPACE COMPLEXITY:
 * **O(n)** - [Explanation of why this complexity]. The algorithm [describe the operation] which takes **O(n)** space.
 *
 * ### EDGE CASES:
 * - **Empty input**: Handle when input is empty
 * - **Single element**: Handle single-element inputs
 * - **Boundary values**: Handle minimum/maximum valid values
 *
 * *
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
  private maxSum: number;

  /**
   * Calculate the maximum path sum in the binary tree.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(h) where h is height of tree
   */
  maxPathSum(root: TreeNode): number {
    this.maxSum = -Infinity;

    const maxGain = (node: TreeNode | null): number => {
      if (!node) {
        return 0;
      }

      // Get the maximum gain from left and right subtrees
      // If the gain is negative, we don't include that path (hence max with 0)
      const leftGain = Math.max(maxGain(node.left), 0);
      const rightGain = Math.max(maxGain(node.right), 0);

      // Calculate the price to start a new path including current node
      const currentPathSum = node.val + leftGain + rightGain;

      // Update global maximum if current path sum is larger
      this.maxSum = Math.max(this.maxSum, currentPathSum);

      // Return maximum gain for parent node
      return node.val + Math.max(leftGain, rightGain);
    };

    maxGain(root);
    return this.maxSum;
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

  const tree1 = buildTree([-10, 9, 20, null, null, 15, 7]);
  console.log(`Test 1: ${solution.maxPathSum(tree1!) === 42 ? "PASS" : "FAIL"}`);

  const tree2 = buildTree([1, 2, 3]);
  console.log(`Test 2: ${solution.maxPathSum(tree2!) === 6 ? "PASS" : "FAIL"}`);

  const tree3 = buildTree([-3]);
  console.log(`Test 3: ${solution.maxPathSum(tree3!) === -3 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
