/**
 * # Difficulty: Medium
 * 
 * # 102. Binary Tree Level Order Traversal
 * 
 * Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[[3]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Level-order traversal groups nodes by depth: [[3], [9,20], [15,7]]</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Array, Queue, Tree
 * **Patterns**: Two Pointers Pattern, Hash Table Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(w)
 * 
 * ### INTUITION:
 * Level order traversal visits nodes level by level from left to right. This is a classic BFS (Breadth-First Search) problem where we use a queue to process nodes level by level, collecting values at each level separately.
 * 
 * ### APPROACH:
 * 1. **BFS with Queue**: Use queue to process nodes level by level
 * 2. **Level Separation**: Track level size to separate levels in result
 * 3. **Left-to-Right Processing**: Add children left-to-right to maintain order
 * 4. **Result Structure**: Each level becomes a separate list in the result
 * 
 * ### WHY THIS WORKS:
 * - Queue ensures FIFO processing for level-by-level traversal
 * - Level size tracking allows us to process exactly one level at a time
 * - Children are added in left-to-right order for correct traversal
 * - BFS naturally explores breadth before depth
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
 *
 * Steps:
 * Step 1: Level 0: [3] → queue: [9, 20]
 * Step 2: Level 1: [9, 20] → queue: [15, 7]
 * Step 3: Level 2: [15, 7] → queue: []
 *
 * Output:
 * ```
 * [[3], [9, 20], [15, 7]]
 * ```

### TIME COMPLEXITY:
 * O(n)
 * Each node is visited exactly once
 * 
 * ### SPACE COMPLEXITY:
 * O(w)
 * Where w is maximum width of the tree (queue size)
 * 
 * ### EDGE CASES:
 * - **Empty tree**: Return empty list immediately
 * - **Single node**: Return [[value]] (one level, one node)
 * - **Perfect binary tree**: Each level doubles in size
 * - **Linear tree (skewed)**: Each level has exactly one node
 * - **Unbalanced tree**: Level sizes vary based on structure
 * 
 * </details>
 */

class Solution {
  /**
   * Return level order traversal using BFS with queue.
   *
   *         Args:
   *             root: Root of binary tree
   *
   *         Returns:
   *             List of lists, each containing values at that level
   *
   *         Time Complexity: O(n) where n is number of nodes
   *         Space Complexity: O(w) where w is maximum width of tree
   */
  levelOrder(root: any | null): any {
    // Implementation
    if not root:
    return []
    result: list.set(Any, []
    queue = deque([root])
    while queue:
    level_size = queue.length
    current_level: list.set(Any, []
  }

  /**
   * Return level order traversal using recursive DFS with level tracking.
   *
   *         Args:
   *             root: Root of binary tree
   *
   *         Returns:
   *             List of lists, each containing values at that level
   */
  levelOrderRecursive(root: any | null): any {
    // Implementation
    result: list.get(list[int)] = []
    def dfs(node: Optional.get(TreeNode), level: int) -> null:
    if not node:
    return
    if level >= result.length:
    result.append([])
  }

  /**
   * Return level order traversal using iterative approach with level markers.
   *
   *         Args:
   *             root: Root of binary tree
   *
   *         Returns:
   *             List of lists, each containing values at that level
   */
  levelOrderIterative(root: any | null): any {
    // Implementation
    if not root:
    return []
    result: list.get(list[int)] = []
    queue = [(root, 0)]  # (node, level)
    while queue:
    node, level = queue.pop(0)
  }

  /**
   * Return level order traversal from bottom to top.
   *
   *         Args:
   *             root: Root of binary tree
   *
   *         Returns:
   *             List of lists from bottom level to top level
   */
  levelOrderBottomUp(root: any | null): any {
    // Implementation
    if not root:
    return []
    result: list.get(list[int)] = []
    queue = deque([root])
    while queue:
    level_size = queue.length
    current_level = []
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
  console.log("=== 102. Binary Tree Level Order Traversal ===")
  # Example 1: Normal tree
  tree1 = build_tree_from_list([3, 9, 20, null, null, 15, 7])
  result1 = solution.levelOrder(tree1)
  console.log(`levelOrder([3,9,20,null,null,15,7]) -> {result1}`)
  console.log("Tree structure:")
  console.log("       3")
  console.log("      / \\")
  console.log("     9  20")
  console.log("       /  \\")
  console.log("      15   7")
  console.log("Processing:")
  console.log("Level 0: [3]")
  console.log("Level 1: [9, 20]")
  console.log("Level 2: [15, 7]")
  # Example 2: Single node
  tree2 = TreeNode(1)
  result2 = solution.levelOrder(tree2)
  console.log(`\nlevelOrder([1]) -> {result2}`)
  # Example 3: Perfect binary tree
  tree3 = build_tree_from_list([1, 2, 3, 4, 5, 6, 7])
  result3 = solution.levelOrder(tree3)
  console.log(`\nlevelOrder([1,2,3,4,5,6,7]) -> {result3}`)
  # Example 4: Algorithm comparison
  console.log(`\nAlgorithm comparison:`)
  approaches = [
  ("BFS with queue", solution.levelOrder),
  ("Recursive DFS", solution.levelOrderRecursive),
  ("Iterative with levels", solution.levelOrderIterative),
  ("Bottom-up BFS", solution.levelOrderBottomUp),
  ]
  for name, method in approaches:
  result = method(tree1)
  if name == "Bottom-up BFS":
  console.log(`{name}: {result} (reversed order)`)
  else:
  console.log(`{name}: {result}`)
  console.log(`\nKey insights:`)
  console.log(`1. BFS with queue naturally processes level by level`)
  console.log(`2. Level size tracking separates levels in the result`)
  console.log(`3. Children added left-to-right maintain correct order`)
  console.log(`4. Recursive DFS can achieve same result with level parameter`)
  console.log(`5. Time: O(n), Space: O(w) where w is maximum tree width`)
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;