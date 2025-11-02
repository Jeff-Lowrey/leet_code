/**
 * # Difficulty: Medium
 * 
 * # 0103. Binary Tree Zigzag Level Order Traversal
 * 
 * Given the root of a binary tree, return the zigzag level order traversal of its nodes' values.
 * (i.e., from left to right, then right to left for the next level and alternate between).
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[[3]]</dd>
 * <dt>Output:</dt>
 * <dd>"Test case 1 passed: Example tree"</dd>
 * <dt>Explanation:</dt>
 * <dd>Zigzag level-order traversal: [[3],[20,9],[15,7]]</dd>
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
 * Perform a level-order traversal (BFS) but alternate the direction of reading values at each level.
 * Use a flag to track whether we should append values left-to-right or right-to-left.
 * 
 * ### APPROACH:
 * 1. **Handle edge case**: Return empty list if tree is empty
 * 2. **Initialize BFS**: Use a deque for level-order traversal
 * 3. **Track direction**: Use a boolean flag that alternates each level
 * 4. **For each level**:
 *    - Process all nodes at current level
 *    - Collect values in order
 *    - If right-to-left level, reverse the values before adding to result
 *    - Toggle direction flag for next level
 * 
 * ### WHY THIS WORKS:
 * - BFS naturally processes nodes level by level
 * - By tracking level boundaries (queue size), we can process each level independently
 * - Reversing alternate levels gives us the zigzag pattern
 * - Deque provides O(1) append/popleft operations
 * 
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * Tree:      3
 * ```
 *
 * /   \\
 * 9     20
 * /  \\
 * 15   7
 *
 * Steps:
 * Step 1: Level 0 (L->R): [3]
 * Step 2: Level 1 (R->L): [20, 9]
 * Step 3: Level 2 (L->R): [15, 7]
 * Step 4: Result: [[3], [20, 9], [15, 7]]
 * 
 * Output:
 * ```
 * [[3], [20, 9], [15, 7]]
 * ```
 * 
 * ### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
 * - Visit each node exactly once
 * - n = number of nodes in tree
 * 
 * ### SPACE COMPLEXITY:
 * O(w)
 * - Queue holds at most one level of nodes at a time
 * - w = maximum width of tree (worst case: n/2 for complete tree)
 * 
 * ### EDGE CASES:
 * - Empty tree: Return []
 * - Single node: Return [[root.val]]
 * - Skewed tree: Works correctly with zigzag pattern
 * 
 * </details>
 */

class Solution {
  /**
   * Zigzag level order traversal of binary tree.
   *
   * Args:
   *     root: Root node of binary tree
   *
   * Returns:
   *     List of lists containing node values in zigzag level order
   *
   * Time Complexity: O(n)
   * Space Complexity: O(w) where w is max width of tree
   */
  zigzagLevelOrder(root: any): number[][] {
    if (!root) {
      return [];
    }
    const queue = deque([root]);
    const left_to_right = true;
    while (queue) {
      const level_size = queue.length;
      for (let _ = 0; _ < level_size; _++) {
        const node = queue.popleft();
        level_values.append(node.val);
        if (node.left) {
          queue.append(node.left);
        }
        if (node.right) {
          queue.append(node.right);
        }
      }
      if (!left_to_right) {
        level_values.reverse();
      }
      result.append(level_values);
      const left_to_right = !left_to_right;
    }
    return result;
  }

}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  test_solution();
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;