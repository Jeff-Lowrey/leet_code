/**
 * # Difficulty: Easy
 * 
 * # 104. Maximum Depth of Binary Tree
 * 
 * Given the root of a binary tree, return its maximum depth.
 * 
 * A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[("Recursive DFS", solution.maxDepth),
 *         ("BFS Level-order", solution.maxDepthBFS),
 *         ("Iterative DFS", solution.maxDepthIterativeDFS),
 *         ("Preorder traversal", solution.maxDepthPreorder)]</dd>
 * <dt>Output:</dt>
 * <dd>"{name}: {result}"</dd>
 * <dt>Explanation:</dt>
 * <dd>The maximum depth of the tree is 3 (from root to deepest leaf)</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Array Traversal, Two Pointers
 * **Data Structures**: Array, Stack, Queue
 * **Patterns**: Two Pointers Pattern, Hash Table Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(h)
 * 
 * ### INTUITION:
 * The maximum depth of a binary tree is simply 1 plus the maximum depth of its left and right subtrees. This naturally suggests a recursive solution where we explore both subtrees and return the maximum depth.
 * 
 * ### APPROACH:
 * 1. **Base Case**: If node is None, depth is 0
 * 2. **Recursive Case**: Depth = 1 + max(left_depth, right_depth)
 * 3. **Multiple Approaches**: Recursive (DFS), iterative (BFS), and stack-based solutions
 * 
 * ### WHY THIS WORKS:
 * - Tree depth follows recursive structure naturally
 * - Each node contributes 1 to the total depth
 * - Maximum depth is determined by the deepest branch
 * - Both DFS and BFS can solve this problem effectively
 * 
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: [3,9,20,null,null,15,7]
 *        3
 *       / \
 *      9  20
 *        /  \
 *       15   7
 * 
 * 1. maxDepth(3): 1 + max(maxDepth(9), maxDepth(20))
 * 2. maxDepth(9): 1 + max(0, 0) = 1
 * 3. maxDepth(20): 1 + max(maxDepth(15), maxDepth(7))
 * 4. maxDepth(15): 1 + max(0, 0) = 1
 * 5. maxDepth(7): 1 + max(0, 0) = 1
 * 6. maxDepth(20): 1 + max(1, 1) = 2
 * 7. maxDepth(3): 1 + max(1, 2) = 3
 * Output: 3
 * ```
 * 
 * ### TIME COMPLEXITY:
 * O(n)
 * Must visit every node to determine maximum depth
 * 
 * ### SPACE COMPLEXITY:
 * O(h)
 * Where h is height of tree (recursion stack or queue size)
 * 
 * ### EDGE CASES:
 * - **Empty tree**: Return 0 (no nodes means depth is 0)
 * - **Single node**: Return 1 (root node has depth 1)
 * - **Linear tree (left/right skewed)**: Depth equals number of nodes
 * - **Perfect binary tree**: Depth is log2(n+1) for n nodes
 * - **Unbalanced tree**: Return depth of deepest leaf node
 * 
 * </details>
 */

class Solution {
  /**
   * Find maximum depth using recursive DFS.
   *
   *         Args:
   *             root: Root of binary tree
   *
   *         Returns:
   *             Maximum depth of the tree
   *
   *         Time Complexity: O(n) where n is number of nodes
   *         Space Complexity: O(h) where h is height of tree
   */
  maxDepth(root: any): number {
    // Implementation
    if not root:
    return 0
    left_depth = self.maxDepth(root.left)
    right_depth = self.maxDepth(root.right)
    return 1 + max(left_depth, right_depth)
  }

  /**
   * Find maximum depth using BFS level-order traversal.
   *
   *         Args:
   *             root: Root of binary tree
   *
   *         Returns:
   *             Maximum depth of the tree
   *
   *         Time Complexity: O(n)
   *         Space Complexity: O(w) where w is maximum width of tree
   */
  maxDepthBFS(root: any): number {
    // Implementation
    if not root:
    return 0
    queue = deque([root])
    depth = 0
    while queue:
    depth += 1
    level_size = queue.length
  }

  /**
   * Find maximum depth using iterative DFS with stack.
   *
   *         Args:
   *             root: Root of binary tree
   *
   *         Returns:
   *             Maximum depth of the tree
   *
   *         Time Complexity: O(n)
   *         Space Complexity: O(h)
   */
  maxDepthIterativeDFS(root: any): number {
    // Implementation
    if not root:
    return 0
    stack = [(root, 1)]  # (node, current_depth)
    max_depth = 0
    while stack:
    node, current_depth = stack.pop()
    max_depth = max(max_depth, current_depth)
  }

  /**
   * Find maximum depth using preorder traversal approach.
   *
   *         Args:
   *             root: Root of binary tree
   *
   *         Returns:
   *             Maximum depth of the tree
   */
  maxDepthPreorder(root: any): number {
    // Implementation
    self.max_depth = 0
    def preorder(node: TreeNode, depth: int) -> null:
    if not node:
    return
    self.max_depth = max(self.max_depth, depth)
    preorder(node.left, depth + 1)
    preorder(node.right, depth + 1)
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
  console.log("=== 104. Maximum Depth of Binary Tree ===")
  # Example 1: Normal tree
  tree1 = build_tree_from_list([3, 9, 20, null, null, 15, 7])
  result1 = solution.maxDepth(tree1)
  console.log(`maxDepth([3,9,20,null,null,15,7]) -> {result1}`)
  console.log("Tree structure:")
  console.log("       3")
  console.log("      / \\")
  console.log("     9  20")
  console.log("       /  \\")
  console.log("      15   7")
  console.log("Depth calculation: 1 + max(1, 2) = 3")
  # Example 2: Single node
  tree2 = TreeNode(1)
  result2 = solution.maxDepth(tree2)
  console.log(`\nmaxDepth([1]) -> {result2}`)
  # Example 3: Empty tree
  tree3 = null
  result3 = solution.maxDepth(tree3)  # type: ignore
  console.log(`maxDepth([]) -> {result3}`)
  # Example 4: Algorithm comparison
  console.log(`\nAlgorithm comparison:`)
  approaches = [
  ("Recursive DFS", solution.maxDepth),
  ("BFS Level-order", solution.maxDepthBFS),
  ("Iterative DFS", solution.maxDepthIterativeDFS),
  ("Preorder traversal", solution.maxDepthPreorder),
  ]
  for name, method in approaches:
  result = method(tree1)
  console.log(`{name}: {result}`)
  console.log(`\nKey insights:`)
  console.log(`1. Recursive solution: depth = 1 + max(left_depth, right_depth)`)
  console.log(`2. BFS counts levels directly as it processes each level`)
  console.log(`3. Iterative DFS tracks depth with each node in stack`)
  console.log(`4. Empty trees have depth 0, single nodes have depth 1`)
  console.log(`5. Time complexity: O(n) for all approaches`)
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;