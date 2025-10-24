/**
 * # Difficulty: Medium
 * 
 * # 116. Populating Next Right Pointers in Each Node
 * 
 * You are given a perfect binary tree where all leaves are on the same level, and every parent has two children.
 * Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL.
 * 
 * Initially, all next pointers are set to NULL.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>root = [1,2,3,4,5,6,7]</dd>
 * <dt>Output:</dt>
 * <dd>[1,#,2,3,#,4,5,6,7,#]</dd>
 * <dt>Explanation:</dt>
 * <dd>Each node's next pointer connects to right neighbor at same level</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Array Traversal, Two Pointers
 * **Data Structures**: Hash Set, Queue, Tree
 * **Patterns**: Two Pointers Pattern, Graph Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(w)
 * 
 * ### INTUITION:
 * Use level-order traversal (BFS) to connect nodes at the same level.
 * For each level, link each node to the next node in the queue.
 * 
 * ### APPROACH:
 * 1. **Handle edge case**: Return root if tree is empty
 * 2. **Initialize BFS**: Use a deque with root node
 * 3. **For each level**:
 *    - Record level size
 *    - Process all nodes at current level
 *    - Connect each node to the next node in same level
 *    - Last node in level points to NULL (already set)
 *    - Add children to queue for next level
 * 
 * ### WHY THIS WORKS:
 * - BFS processes nodes level by level, left to right
 * - Within each level, nodes are in the queue in left-to-right order
 * - By connecting each node to the next node in queue (at same level), we establish next pointers
 * - Last node of each level naturally has next = NULL
 * 
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * Tree:        1
 * ```
 *
 * /   \\
 * 2     3
 * / \\   / \\
 * 4   5 6   7
 * After connecting:
 *
 * Steps:
 * Step 1: Level 0: 1 -> NULL
 * Step 2: Level 1: 2 -> 3 -> NULL
 * Step 3: Level 2: 4 -> 5 -> 6 -> 7 -> NULL

### TIME COMPLEXITY:
 * O(n)
 * - Visit each node exactly once
 * - n = number of nodes in tree
 * 
 * ### SPACE COMPLEXITY:
 * O(w)
 * - Queue holds at most one level of nodes at a time
 * - w = maximum width of tree (for perfect tree: n/2 at last level)
 * 
 * ### EDGE CASES:
 * - Empty tree: Return None
 * - Single node: Return node with next = NULL
 * - Perfect binary tree: All levels fully connected
 * 
 * </details>
 */

class Solution {
  /**
   * Populate next right pointers in perfect binary tree.
   *
   * Args:
   *     root: Root node of perfect binary tree
   *
   * Returns:
   *     Root node with next pointers populated
   *
   * Time Complexity: O(n)
   * Space Complexity: O(w) where w is max width of tree
   */
  connect(root: any): any {
    if (!root) {
      return null;
    }
    const queue = deque([root]);
    while (queue) {
      const level_size = queue.length;
      for (let i = 0; i < level_size; i++) {
        const node = queue.popleft();
        if (i < level_size - 1) {
          const node.next = queue[0];
        }
        if (node.left) {
          queue.append(node.left);
        }
        if (node.right) {
          queue.append(node.right);
        }
      }
    }
    return root;
  }

  /**
   * O(1) space solution using previously established next pointers.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  connect_optimized(root: any): any {
    if (!root) {
      return null;
    }
    const leftmost = root;
    while (leftmost.left) {
      const head = leftmost;
      while (head) {
        const head.left.next = head.right;
        if (head.next) {
          const head.right.next = head.next.left;
        }
        const head = head.next;
      }
      const leftmost = leftmost.left;
    }
    return root;
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