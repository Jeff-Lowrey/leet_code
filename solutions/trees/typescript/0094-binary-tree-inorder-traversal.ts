/**
 * # Difficulty: Easy
 * 
 * # 0094. Binary Tree Inorder Traversal
 * 
 * Given the root of a binary tree, return the inorder traversal of its nodes' values.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[1, 3, 2]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>In-order traversal of tree [1,null,2,3] is [1,3,2]</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Two Pointers
 * **Data Structures**: Array, Stack, Tree
 * **Patterns**: Two Pointers Pattern, Backtracking
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: - Recursive: O(h) where h is tree height (call stack)
 * 
 * ### INTUITION:
 * Inorder traversal visits nodes in the order: Left -> Root -> Right. This gives us a sorted sequence for Binary Search Trees. The key is to implement this pattern using recursion or iteration with a stack.
 * 
 * ### APPROACH:
 * 1. **Recursive**: Visit left subtree, process root, visit right subtree
 * 2. **Iterative with stack**: Simulate recursion using explicit stack
 * 3. **Morris traversal**: O(1) space using threading technique
 * 
 * ### WHY THIS WORKS:
 * - Inorder traversal naturally follows left-root-right pattern
 * - For BSTs, this produces sorted output
 * - Stack-based approach simulates the call stack of recursion
 * - Morris traversal modifies tree temporarily to avoid extra space
 * 
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * Tree:    1
 * ```
 *
 * \
 * 2
 * /
 * 3
 * Inorder traversal steps:
 * 1. Start at root (1)
 * 2. No left child, process 1
 * 3. Go to right child (2)
 * 4. Go to left child of 2 (which is 3)
 * 5. No left child of 3, process 3
 * 6. No right child of 3, backtrack
 * 7. Process 2
 * 8. No right child of 2
 * Result: [1, 3, 2]

 * ### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
 * We visit each node exactly once
 * 
 * ### SPACE COMPLEXITY:
 * - Recursive: O(h) where h is tree height (call stack)
 * - Iterative: O(h) for explicit stack
 * - Morris: O(1) constant space
 * 
 * ### EDGE CASES:
 * - **Empty tree**: Return empty list immediately
 * - **Single node**: Return list with one element
 * - **Left-skewed tree**: Traversal order is leaf-to-root path
 * - **Right-skewed tree**: Traversal order is root-to-leaf path
 * - **BST**: Inorder gives sorted sequence of values
 * 
 * </details>
 */

class Solution {
  /**
   * Recursive inorder traversal.
   *
   *         Args:
   *             root: Root of binary tree
   *
   *         Returns:
   *             List of node values in inorder sequence
   *
   *         Time Complexity: O(n) where n is number of nodes
   *         Space Complexity: O(h) where h is height of tree (recursion stack)
   */
  inorderTraversal(root: any): number[] {
    // Implementation
    result: list.set(Any, []
    def inorder(node: Any) -> Any:
    if not node:
    return
    inorder(node.left)  # Visit left subtree
    result.append(node.val)  # Process current node
    inorder(node.right)  # Visit right subtree
  }

  /**
   * Iterative inorder traversal using stack.
   *
   *         Args:
   *             root: Root of binary tree
   *
   *         Returns:
   *             List of node values in inorder sequence
   *
   *         Time Complexity: O(n)
   *         Space Complexity: O(h) for stack
   */
  inorderTraversalIterative(root: any): number[] {
    // Implementation
    result = []
    stack: list.set(Any, []
    current = root
    while stack or current:
    while current:
    stack.append(current)
    current = current.left
  }

  /**
   * Morris inorder traversal with O(1) space.
   *
   *         Args:
   *             root: Root of binary tree
   *
   *         Returns:
   *             List of node values in inorder sequence
   *
   *         Time Complexity: O(n)
   *         Space Complexity: O(1) constant space
   */
  inorderTraversalMorris(root: any): number[] {
    // Implementation
    result = []
    current = root
    while current:
    if not current.left:
    result.append(current.val)
    current = current.right
    else:
  }

  /**
   * Generator version for memory efficiency.
   *
   *         Args:
   *             root: Root of binary tree
   *
   *         Yields:
   *             Node values in inorder sequence
   */
  inorderTraversalGenerator(root: any): any {
    // Implementation
    def inorder(node: Any) -> Any:
    if node:
    yield from inorder(node.left)
    yield node.val
    yield from inorder(node.right)
    yield from inorder(root)
  }

  /**
   * One-liner using list comprehension with generator.
   *
   *         Args:
   *             root: Root of binary tree
   *
   *         Returns:
   *             List of node values in inorder sequence
   */
  inorderTraversalList(root: any): number[] {
    // Implementation
    return list(self.inorderTraversalGenerator(root))
    def test_solution() -> null:
    """Test cases for Problem 94."""
    solution = Solution()
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
  console.log("=== 94. Binary Tree Inorder Traversal ===")
  # Example 1: Simple tree
  root1 = TreeNode(1)
  root1.right = TreeNode(2)
  root1.right.left = TreeNode(3)
  console.log(`Tree 1 inorder: {solution.inorderTraversal(root1)}`)
  # Example 2: BST (should give sorted output)
  bst_root = create_bst()
  console.log(`BST inorder (sorted): {solution.inorderTraversal(bst_root)}`)
  # Example 3: Compare different approaches
  console.log(`\nComparison of approaches on BST:`)
  approaches = [
  ("Recursive", solution.inorderTraversal),
  ("Iterative", solution.inorderTraversalIterative),
  ("Morris O(1) space", solution.inorderTraversalMorris),
  ("Generator", lambda x: list(solution.inorderTraversalGenerator(x))),
  ("List comprehension", solution.inorderTraversalList),
  ]
  for name, method in approaches:
  result = method(bst_root)
  console.log(`{name}: result`)
  # Example 4: Empty tree
  console.log(`\nEmpty tree: {solution.inorderTraversal(null)}`)  # type: ignore
  # Example 5: Single node
  single = TreeNode(42)
  console.log(`Single node [42]: {solution.inorderTraversal(single)}`)
  console.log(`\nKey insights:`)
  console.log(`1. Inorder: Left -> Root -> Right`)
  console.log(`2. For BST, inorder gives sorted sequence`)
  console.log(`3. Recursive: Clean but uses O(h) space`)
  console.log(`4. Iterative: Explicit stack control`)
  console.log(`5. Morris: O(1) space using threading`)
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;