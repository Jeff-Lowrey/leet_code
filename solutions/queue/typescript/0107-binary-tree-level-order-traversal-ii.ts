/**
 * # Difficulty: Medium
 *
 * # 0107. Binary Tree Level Order Traversal II
 *
 *
 * Given the root of a binary tree, return the bottom-up level order traversal of its nodes' values.
 * (i.e., from left to right, level by level from leaf to root).
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[[15, 7]]</dd>
 * <dt>Output:</dt>
 * <dd>"Test case 1 passed: Example tree"</dd>
 * <dt>Explanation:</dt>
 * <dd>Bottom-up level-order: [[15,7],[9,20],[3]]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Map Storage, Array Traversal, Two Pointers
 * **Data Structures**: Array, Queue, Tree
 * **Patterns**: Two Pointers Pattern, Graph Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(w)
 *
 * ### INTUITION:
 * Perform standard level-order traversal (BFS) but reverse the final result to get bottom-up order.
 * Alternatively, we can prepend each level to the result instead of appending.
 *
 * ### APPROACH:
 * 1. **Handle edge case**: Return empty list if tree is empty
 * 2. **Initialize BFS**: Use a deque for level-order traversal
 * 3. **For each level**:
 *    - Process all nodes at current level
 *    - Collect values in order
 *    - Add level to result
 * 4. **Reverse result**: Return reversed list for bottom-up order
 *
 * ### WHY THIS WORKS:
- This ensures that bFS naturally processes nodes level by level (top to bottom)
- This ensures that by reversing the result at the end, we get bottom-up order
- This ensures that deque provides efficient O(1) operations for BFS

### EXAMPLE WALKTHROUGH:
Input:
```
Tree:      3
```

/   \
9     20
/  \
15   7
Level-order (top-down): [[3], [9, 20], [15, 7]]
Bottom-up: [[15, 7], [9, 20], [3]]

Output:
```
[Expected output]
```

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
 * - Visit each node exactly once: O(n)
 * - Reversing result: O(h) where h = height
 * - Total: O(n)
 *
 * ### SPACE COMPLEXITY:
 * O(w)
 * - Queue holds at most one level at a time
 * - w = maximum width of tree (worst case: n/2 for complete tree)
 * - Result storage: O(n)
 *
 * ### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>
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
   * Bottom-up level order traversal using BFS.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(w)
   */
  levelOrderBottom(root: TreeNode | null): number[][] {
    if (!root) {
      return [];
    }

    const result: number[][] = [];
    const queue: TreeNode[] = [root];

    while (queue.length > 0) {
      const levelSize = queue.length;
      const levelValues: number[] = [];

      for (let i = 0; i < levelSize; i++) {
        const node = queue.shift()!;
        levelValues.push(node.val);

        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }

      result.push(levelValues);
    }

    return result.reverse();
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { Solution, TreeNode };
}

function runTests(): void {
  const solution = new Solution();

  const root1 = new TreeNode(3);
  root1.left = new TreeNode(9);
  root1.right = new TreeNode(20);
  root1.right.left = new TreeNode(15);
  root1.right.right = new TreeNode(7);
  console.log(`Test 1: ${JSON.stringify(solution.levelOrderBottom(root1)) === JSON.stringify([[15, 7], [9, 20], [3]]) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
export { TreeNode };
