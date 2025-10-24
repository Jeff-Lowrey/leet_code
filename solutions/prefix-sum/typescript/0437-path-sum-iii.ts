/**
 * # Difficulty: Medium
 *
 * # 437. Path Sum III
 *
 * Difficulty: Medium
 *
 * Given the root of a binary tree and an integer targetSum, return the number of paths where the sum of the values along the path equals targetSum.
 *
 * The path does not need to start or end at the root or a leaf, but it must go downwards (i.e., traveling only from parent nodes to child nodes).
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[root]</dd>
 * <dt>Output:</dt>
 * <dd>"\nExample 1:"</dd>
 * <dt>Explanation:</dt>
 * <dd>There are 3 paths in the tree that sum to 8: [5->3], [5->2->1], [-3->11]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Two Pointers
 * **Data Structures**: Hash Map, Array, Stack
 * **Patterns**: Complement Search, Two Pointers Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(h)
 *
 * ### INTUITION:
 * This problem extends the prefix sum concept to binary trees. For any path from node A to node B going downwards, if we know the prefix sum from root to A and root to B, then path sum A→B = prefix_sum[B] - prefix_sum[A]. We can use a hashmap to store the frequency of prefix sums as we traverse the tree, similar to the "Subarray Sum Equals K" problem.
 *
 * ### APPROACH:
 * 1. **Use DFS traversal**: Traverse tree in preorder (root, left, right)
 * 2. **Track prefix sums**: Maintain running sum from root to current node
 * 3. **HashMap for counts**: Store frequency of each prefix sum seen
 * 4. **Find valid paths**: At each node, check if (current_sum - targetSum) exists
 * 5. **Backtrack**: Remove current prefix sum when returning from recursion
 *
 * ### WHY THIS WORKS:
 * - Path sum from node A to B = prefix_sum[B] - prefix_sum[A]
 * - If we want path sum = targetSum, we need: prefix_sum[B] - prefix_sum[A] = targetSum
 * - Therefore: prefix_sum[A] = prefix_sum[B] - targetSum
 * - By storing prefix sums in hashmap during DFS, we can find all valid starting points
 * - Backtracking ensures we only count paths that go downwards (no upward paths)
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
 * ```
 *
 * Tree structure:
 * 10
 * /  \\
 * 5   -3
 * / \\    \\
 * 3   2   11
 * / \\   \\
 * 3  -2   1
 * DFS traversal with prefix sums:
 * Node 10: sum=10, need=10-8=2, count=0, map={0:1, 10:1}
 * Node 5: sum=15, need=15-8=7, count=0, map={0:1, 10:1, 15:1}
 * Node 3: sum=18, need=18-8=10, count=1 (found 10), map={0:1, 10:1, 15:1, 18:1}
 * Node 3: sum=21, need=21-8=13, count=0, map={0:1, 10:1, 15:1, 18:1, 21:1}
 * ... and so on
 * Total paths with sum 8: 3

### TIME COMPLEXITY:
 * O(n)
 * Visit each node exactly once, with O(1) hashmap operations per node
 *
 * ### SPACE COMPLEXITY:
 * O(h)
 * Recursion stack depth is tree height h, hashmap stores at most h entries in any path
 *
 * ### EDGE CASES:
 * - Empty tree (return 0)
 * - Single node tree
 * - Target sum is 0
 * - Negative values in tree
 * - Multiple valid paths through same nodes
 * - Paths that start from root vs internal nodes
 *
 * </details>
 */

class TreeNode {
  val: number;
  next: TreeNode | null;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class Solution {
  /**
   * Count paths with sum equal to targetSum using prefix sum approach.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(h)
   */
  pathSum(root: TreeNode | null, targetSum: number): number {
    const prefixSumCount: Map<number, number> = new Map([[0, 1]]);

    const dfs = (node: TreeNode | null, currentSum: number): number => {
      if (!node) {
        return 0;
      }

      currentSum += node.val;

      const neededSum = currentSum - targetSum;
      let count = prefixSumCount.get(neededSum) || 0;

      prefixSumCount.set(currentSum, (prefixSumCount.get(currentSum) || 0) + 1);

      count += dfs(node.left, currentSum);
      count += dfs(node.right, currentSum);

      prefixSumCount.set(currentSum, prefixSumCount.get(currentSum)! - 1);

      return count;
    };

    return dfs(root, 0);
  }
}

/**
 * Helper function to build tree from array.
 */
function buildTree(values: (number | null)[]): TreeNode | null {
  if (values.length === 0 || values[0] === null) {
    return null;
  }

  const root = new TreeNode(values[0]);
  const queue: TreeNode[] = [root];
  let i = 1;

  while (queue.length > 0 && i < values.length) {
    const node = queue.shift()!;

    if (i < values.length && values[i] !== null) {
      node.left = new TreeNode(values[i]!);
      queue.push(node.left);
    }
    i++;

    if (i < values.length && values[i] !== null) {
      node.right = new TreeNode(values[i]!);
      queue.push(node.right);
    }
    i++;
  }

  return root;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { Solution, TreeNode };
}

function runTests(): void {
  const solution = new Solution();

  // Test case 1: Basic example
  const root1 = buildTree([10, 5, -3, 3, 2, null, 11, 3, -2, null, 1]);
  console.log(`Test 1: ${solution.pathSum(root1, 8) === 3 ? "PASS" : "FAIL"}`);

  // Test case 2: Simple path
  const root2 = buildTree([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1]);
  console.log(`Test 2: ${solution.pathSum(root2, 22) === 3 ? "PASS" : "FAIL"}`);

  // Test case 3: Single node
  const root3 = buildTree([1]);
  console.log(`Test 3: ${solution.pathSum(root3, 1) === 1 ? "PASS" : "FAIL"}`);

  // Test case 4: No valid paths
  const root4 = buildTree([1, 2, 3]);
  console.log(`Test 4: ${solution.pathSum(root4, 10) === 0 ? "PASS" : "FAIL"}`);

  // Test case 5: All same values
  const root5 = buildTree([1, 1, 1]);
  console.log(`Test 5: ${solution.pathSum(root5, 2) === 2 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
