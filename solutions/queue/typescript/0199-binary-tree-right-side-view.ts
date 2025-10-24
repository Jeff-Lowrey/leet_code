/**
 * # Difficulty: Medium
 * 
 * # 199. Binary Tree Right Side View
 * 
 * Given the root of a binary tree, imagine yourself standing on the right side of it,
 * return the values of the nodes you can see ordered from top to bottom.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[1, 3, 4]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Right side view of tree is [1,3,4]</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Map Storage, Array Traversal, Two Pointers
 * **Data Structures**: Array, Stack, Queue
 * **Patterns**: Two Pointers Pattern, Graph Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(w)
 * 
 * ### INTUITION:
 * The right side view is simply the rightmost node at each level of the tree.
 * Use level-order traversal (BFS) and capture the last node at each level.
 * 
 * ### APPROACH:
 * 1. **Handle edge case**: Return empty list if tree is empty
 * 2. **Initialize BFS**: Use a deque with root node
 * 3. **For each level**:
 *    - Process all nodes at current level
 *    - Keep track of the last node in the level
 *    - Add the last node's value to result
 *    - Add children to queue for next level
 * 
 * ### WHY THIS WORKS:
 * - BFS processes nodes level by level, left to right
 * - The last node processed at each level is the rightmost node
 * - This is exactly what's visible from the right side
 * - We collect these rightmost nodes from each level
 * 
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * Tree:      1            <- Right view: 1
 * ```
 *
 * /   \\
 * 2     3          <- Right view: 3
 * \\     \\
 * 5     4        <- Right view: 4
 * Result: [1, 3, 4]

### TIME COMPLEXITY:
 * O(n)
 * - Visit each node exactly once
 * - n = number of nodes in tree
 * 
 * ### SPACE COMPLEXITY:
 * O(w)
 * - Queue holds at most one level of nodes at a time
 * - w = maximum width of tree (worst case: n/2 for complete tree)
 * - Result storage: O(h) where h = height
 * 
 * ### EDGE CASES:
 * - Empty tree: Return []
 * - Single node: Return [root.val]
 * - Left-skewed tree: All nodes visible from right
 * - Right-skewed tree: Only rightmost branch visible
 * 
 * </details>
 */

class Solution {
  /**
   * Get right side view of binary tree.
   *
   * Args:
   *     root: Root node of binary tree
   *
   * Returns:
   *     List of values visible from right side (top to bottom)
   *
   * Time Complexity: O(n)
   * Space Complexity: O(w) where w is max width of tree
   */
  rightSideView(root: any): number[] {
    if (!root) {
      return [];
    }
    const queue = deque([root]);
    while (queue) {
      const level_size = queue.length;
      for (let i = 0; i < level_size; i++) {
        const node = queue.popleft();
        if (i === level_size - 1) {
          result.append(node.val);
        }
        if (node.left) {
          queue.append(node.left);
        }
        if (node.right) {
          queue.append(node.right);
        }
      }
    }
    return result;
  }

  /**
   * Alternative DFS solution.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(h) where h is height (recursion stack)
   */
  rightSideView_dfs(root: any): number[] {
    dfs(root, 0);
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