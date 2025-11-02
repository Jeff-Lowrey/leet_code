/**
 * # Difficulty: Easy
 * 
 * # 0637. Average of Levels in Binary Tree
 * 
 * Given the root of a binary tree, return the average value of the nodes on each level in the form of an array.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[3.0, 14.5, 11.0]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Average of each tree level: [3,14.5,11]</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Map Storage, Array Traversal, Two Pointers
 * **Data Structures**: Array, Queue, Tree
 * **Patterns**: Two Pointers Pattern, Hash Table Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(w)
 * 
 * ### INTUITION:
 * Use level-order traversal (BFS) to process nodes level by level.
 * For each level, calculate the sum and count of nodes, then compute the average.
 * 
 * ### APPROACH:
 * 1. **Handle edge case**: Return empty list if tree is empty
 * 2. **Initialize BFS**: Use a deque with root node
 * 3. **For each level**:
 *    - Process all nodes at current level
 *    - Calculate sum of all node values at this level
 *    - Compute average = sum / count
 *    - Add average to result
 *    - Add children to queue for next level
 * 
 * ### WHY THIS WORKS:
 * - BFS processes nodes level by level
 * - By tracking level boundaries (queue size), we can compute level sums independently
 * - Average is simply sum of values divided by number of nodes
 * - Each level's average is independent of other levels
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
 * Level 0: sum = 3, count = 1, avg = 3.0
 * Level 1: sum = 29, count = 2, avg = 14.5
 * Level 2: sum = 22, count = 2, avg = 11.0
 * Result: [3.0, 14.5, 11.0]

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
 * - Result storage: O(h) where h = height
 * 
 * ### EDGE CASES:
 * - Empty tree: Return []
 * - Single node: Return [root.val]
 * - Integer overflow: Use proper precision for averages
 * - Negative values: Handle correctly with floating-point arithmetic
 * 
 * </details>
 */

class Solution {
  /**
   * Calculate average value of nodes at each level.
   *
   * Args:
   *     root: Root node of binary tree
   *
   * Returns:
   *     List of average values for each level
   *
   * Time Complexity: O(n)
   * Space Complexity: O(w) where w is max width of tree
   */
  averageOfLevels(root: any): number[] {
    if (!root) {
      return [];
    }
    const queue = deque([root]);
    while (queue) {
      const level_size = queue.length;
      const level_sum = 0;
      for (let _ = 0; _ < level_size; _++) {
        const node = queue.popleft();
        level_sum += node.val;
        if (node.left) {
          queue.append(node.left);
        }
        if (node.right) {
          queue.append(node.right);
        }
      }
      result.append(level_sum / level_size);
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