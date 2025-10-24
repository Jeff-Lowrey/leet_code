/**
 * # Difficulty: Easy
 * 
 * # 110. Balanced Binary Tree
 * 
 * Given a binary tree, determine if it is height-balanced.
 * 
 * A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than 1.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[3,9,20,null,null,15,7]</dd>
 *         ("Alternative recursive", solution.isBalancedAlternative),
 *         ("Iterative", solution.isBalancedIterative)]</dd>
 * <dt>Output:</dt>
 * <dd>* True</dd>
 * <dt>Explanation:</dt>
 * <dd>The tree is balanced because the height difference between left and right subtrees is at most 1 at every node</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Two Pointers, Sliding Window
 * **Data Structures**: Array, Stack, Queue
 * **Patterns**: Two Pointers Pattern, Sliding Window Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(h)
 * 
 * ### INTUITION:
 * A balanced binary tree requires that for every node, the heights of its left and right subtrees differ by at most 1. The key insight is to check this condition recursively while computing heights bottom-up.
 * 
 * ### APPROACH:
 * 1. **Recursive Height Calculation**: Calculate height of each subtree recursively
 * 2. **Balance Check**: For each node, check if |left_height - right_height| ≤ 1
 * 3. **Early Termination**: If any subtree is unbalanced, immediately return False
 * 4. **Bottom-Up**: Check balance condition while returning heights
 * 
 * ### WHY THIS WORKS:
 * - Height-balanced property must hold for ALL nodes, not just root
 * - Recursive structure naturally checks every node
 * - Bottom-up approach avoids redundant height calculations
 * - Early termination optimizes for unbalanced trees
 * 
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * [3,9,20,null,null,15,7]
 * ```
 *
 * 3
 * / \
 * 9  20
 * /  \
 * 15   7
 * 1. Check node 9: height = 1, balanced ✓
 * 2. Check node 15: height = 1, balanced ✓
 * 3. Check node 7: height = 1, balanced ✓
 * 4. Check node 20: left_height = 1, right_height = 1, |1-1| = 0 ≤ 1 ✓
 * 5. Check node 3: left_height = 1, right_height = 2, |1-2| = 1 ≤ 1 ✓
 *
 * Output:
 * ```
 * True
 * ```

### TIME COMPLEXITY:
 * O(n)
 * Each node is visited exactly once
 * 
 * ### SPACE COMPLEXITY:
 * O(h)
 * Where h is height of tree (recursion stack)
 * 
 * ### EDGE CASES:
 * - **Empty tree**: Return True (null tree is balanced)
 * - **Single node**: Return True (height-balanced by definition)
 * - **Perfect binary tree**: All levels completely filled, always balanced
 * - **Linear tree (skewed)**: Height difference > 1, return False
 * - **Subtree unbalanced**: Early termination returns -1 immediately
 * 
 * </details>
 */

class Solution {
  /**
   * Check if binary tree is height-balanced.
   *
   *         Args:
   *             root: Root of binary tree
   *
   *         Returns:
   *             True if tree is balanced, False otherwise
   *
   *         Time Complexity: O(n) where n is number of nodes
   *         Space Complexity: O(h) where h is height of tree
   */
  isBalanced(root: any): boolean {
    // Implementation
    def checkHeight(node: TreeNode) -> int:
    """
    Return height if balanced, -1 if unbalanced.
    Args:
    node: Current tree node
    Returns:
    Height of subtree if balanced, -1 if unbalanced
    """
  }

  /**
   * Alternative approach using separate height function.
   *
   *         Args:
   *             root: Root of binary tree
   *
   *         Returns:
   *             True if tree is balanced, False otherwise
   */
  isBalancedAlternative(root: any): boolean {
    // Implementation
    def getHeight(node: TreeNode) -> int:
    """Get height of subtree."""
    if not node:
    return 0
    return max(getHeight(node.left), getHeight(node.right)) + 1
    def isBalancedHelper(node: TreeNode) -> bool:
    """Check if subtree is balanced."""
    if not node:
    return true
  }

  /**
   * Iterative approach using stack and height calculation.
   *
   *         Args:
   *             root: Root of binary tree
   *
   *         Returns:
   *             True if tree is balanced, False otherwise
   */
  isBalancedIterative(root: any): boolean {
    // Implementation
    if not root:
    return true
    def getHeight(node: TreeNode) -> int:
    """Calculate height iteratively."""
    if not node:
    return 0
    stack = [(node, 1)]
    max_height = 0
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  test_solution()
  # Example usage
  solution = Solution()
  console.log("=== 110. Balanced Binary Tree ===")
  # Example 1: Balanced tree
  tree1 = build_tree_from_list([3, 9, 20, null, null, 15, 7])
  result1 = solution.isBalanced(tree1)
  console.log(`isBalanced([3,9,20,null,null,15,7]) -> {result1}`)
  console.log("Tree structure:")
  console.log("       3")
  console.log("      / \\")
  console.log("     9  20")
  console.log("       /  \\")
  console.log("      15   7")
  console.log("Heights: 9=1, 15=1, 7=1, 20=2, 3=3. All differences ≤ 1 ✓")
  # Example 2: Unbalanced tree
  tree2 = build_tree_from_list([1, 2, 2, 3, 3, null, null, 4, 4])
  result2 = solution.isBalanced(tree2)
  console.log(`\nisBalanced([1,2,2,3,3,null,null,4,4]) -> {result2}`)
  console.log("Tree structure:")
  console.log("         1")
  console.log("       /   \\")
  console.log("      2     2")
  console.log("     / \\")
  console.log("    3   3")
  console.log("   / \\")
  console.log("  4   4")
  console.log("Left subtree height = 4, Right subtree height = 1. |4-1| = 3 > 1 ✗")
  # Example 3: Algorithm comparison
  console.log(`\nAlgorithm comparison:`)
  approaches = [
  ("Optimized recursive", solution.isBalanced),
  ("Alternative recursive", solution.isBalancedAlternative),
  ("Iterative", solution.isBalancedIterative),
  ]
  for name, method in approaches:
  result = method(tree1)
  console.log(`{name}: result`)
  console.log(`\nKey insights:`)
  console.log(`1. Balance condition: |left_height - right_height| ≤ 1 for ALL nodes`)
  console.log(`2. Recursive approach with early termination is most efficient`)
  console.log(`3. Bottom-up calculation avoids redundant height computations`)
  console.log(`4. Empty trees and single nodes are always balanced`)
  console.log(`5. Time complexity: O(n), Space complexity: O(h)`)
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;