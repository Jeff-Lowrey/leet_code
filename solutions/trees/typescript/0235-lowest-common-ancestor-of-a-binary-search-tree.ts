/**
### INTUITION:
In a BST, we can leverage the ordering property to find LCA efficiently. If both nodes are smaller than current node, LCA is in left subtree. If both are larger, LCA is in right subtree. Otherwise, current node is the LCA.

### APPROACH:
1. **Use BST property**: Left subtree < root < right subtree
2. **Compare values**: If both p and q < root, go left; if both > root, go right
3. **Find split point**: When p and q are on different sides, current node is LCA
4. **Handle edge cases**: One node is ancestor of the other

### WHY THIS WORKS:
- This ensures that bST ordering allows us to determine which subtree contains the LCA
- This ensures that the first node where p and q diverge (different subtrees) is the LCA
- This ensures that if one node equals current node, current node is the LCA
- This ensures that this is much more efficient than general tree LCA algorithms

### EXAMPLE WALKTHROUGH:
Input:
```
BST:      6
```

/ \\
2   8
/ \\ / \\
0  4 7  9
/ \\
3   5
Find LCA of 2 and 8:
1. Start at 6: 2 < 6 and 8 > 6, so 6 is LCA
Find LCA of 2 and 4:
1. Start at 6: 2 < 6 and 4 < 6, go left
2. At 2: 2 == 2 (found p), so 2 is LCA

Output:
```
6
2
```

### TIME COMPLEXITY:
O(h)**
Where h is the height of the tree. **O(log n)** for balanced BST, **O(n)** for skewed tree

### SPACE COMPLEXITY:
O(h)**
For recursion stack, **O(1)** for iterative solution

### EDGE CASES:
- **One node is ancestor of other**: Return the ancestor node
- **Both nodes on same side**: Recursively search that subtree
- **Nodes on different sides**: Current node is LCA
- **One node equals root**: Root is the LCA
- **Linear BST (skewed)**: O(n) time complexity in worst case

</details>

</details>

</details>

</details>

</details>

</details>

</details>

</details>

*/

class Solution {
  /**
   * Find LCA in BST using recursive approach.
   *
   *         Args:
   *             root: Root of BST
   *             p: First node
   *             q: Second node
   *
   *         Returns:
   *             LCA node
   *
   *         Time Complexity: O(h) where h is height of tree
   *         Space Complexity: O(h) for recursion stack
   */
  lowestCommonAncestor(root: any, p: any, q: any): any {
    // Implementation
    if not root:
    return null  # type: ignore
    if p.val < root.val and q.val < root.val:
    return self.lowestCommonAncestor(root.left, p, q)
    if p.val > root.val and q.val > root.val:
  }

  /**
   * Find LCA in BST using iterative approach.
   *
   *         Args:
   *             root: Root of BST
   *             p: First node
   *             q: Second node
   *
   *         Returns:
   *             LCA node
   *
   *         Time Complexity: O(h) where h is height of tree
   *         Space Complexity: O(1) - constant space
   */
  lowestCommonAncestorIterative(root: any, p: any, q: any): any {
    // Implementation
    current = root
    while current:
    if p.val < current.val and q.val < current.val:
    current = current.left
    elif p.val > current.val and q.val > current.val:
    current = current.right
    else:
  }

  /**
   * General tree LCA approach (works for any binary tree, not just BST).
   *
   *         Args:
   *             root: Root of tree
   *             p: First node
   *             q: Second node
   *
   *         Returns:
   *             LCA node
   *
   *         Time Complexity: O(n) where n is number of nodes
   *         Space Complexity: O(h) for recursion stack
   */
  lowestCommonAncestorGeneral(root: any, p: any, q: any): any {
    // Implementation
    if not root or root == p or root == q:
    return root
    left = self.lowestCommonAncestorGeneral(root.left, p, q)
    right = self.lowestCommonAncestorGeneral(root.right, p, q)
    if left and right:
  }

  /**
   * Helper function to find path from root to target node.
   *
   *         Args:
   *             root: Root of BST
   *             target: Target node to find
   *
   *         Returns:
   *             List of nodes from root to target
   */
  findPath(root: any, target: any): any[] {
    // Implementation
    path: list.set(Any, []
    current = root
    while current:
    path.append(current)
    if target.val == current.val:
    break
    elif target.val < current.val:
    current = current.left
    else:
  }

  /**
   * Alternative approach using path finding.
   *
   *         Args:
   *             root: Root of BST
   *             p: First node
   *             q: Second node
   *
   *         Returns:
   *             LCA node
   */
  lowestCommonAncestorPaths(root: any, p: any, q: any): any {
    // Implementation
    path_p = self.findPath(root, p)
    path_q = self.findPath(root, q)
    lca = null
    min_len = min(path_p.length, path_q.length)
    for (let i = 0; i < min_len; i++) {
    if path_p.set(i, = path_q.get(i):
    lca = path_p.get(i)
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
  console.log("=== 235. Lowest Common Ancestor of a Binary Search Tree ===")
  # Create simple BST for demonstration
  root, node1, node3 = create_simple_bst()
  # Find LCA of 1 and 3
  lca = solution.lowestCommonAncestor(root, node1, node3)
  console.log(`LCA of nodes 1 and 3: {lca.val}`)
  # Create larger BST for more examples
  #       6
  #      / \\
  #     2   8
  #    / \\ / \\
  #   0  4 7  9
  #     / \\
  #    3   5
  large_root = TreeNode(6)
  large_root.left = TreeNode(2)
  large_root.right = TreeNode(8)
  large_root.left.left = TreeNode(0)
  large_root.left.right = TreeNode(4)
  large_root.right.left = TreeNode(7)
  large_root.right.right = TreeNode(9)
  large_root.left.right.left = TreeNode(3)
  large_root.left.right.right = TreeNode(5)
  # Test with larger tree
  node_2 = large_root.left
  node_8 = large_root.right
  node_4 = large_root.left.right
  console.log(`\\nIn larger BST:`)
  console.log(`LCA of nodes 2 and 8: {solution.lowestCommonAncestor(large_root, node_2, node_8).val}`)
  console.log(`LCA of nodes 2 and 4: {solution.lowestCommonAncestor(large_root, node_2, node_4).val}`)
  console.log(`\\nUsing iterative approach:`)
  console.log(`LCA of nodes 2 and 8: {solution.lowestCommonAncestorIterative(large_root, node_2, node_8).val}`)
  console.log(`\\nAlgorithm comparison for nodes 2 and 8:`)
  algorithms = [
  ("BST Recursive", solution.lowestCommonAncestor),
  ("BST Iterative", solution.lowestCommonAncestorIterative),
  ("General Tree", solution.lowestCommonAncestorGeneral),
  ("Path-based", solution.lowestCommonAncestorPaths),
  ]
  for name, method in algorithms:
  result = method(large_root, node_2, node_8)
  console.log(`{name}: {result.val}`)
  console.log(`\nKey insights:`)
  console.log(`1. BST property allows O(h) time complexity`)
  console.log(`2. Compare node values to determine which subtree to explore`)
  console.log(`3. LCA is the first node where paths to p and q diverge`)
  console.log(`4. Iterative solution uses O(1) space vs O(h) for recursive`)
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;