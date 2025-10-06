"""
# 235. Lowest Common Ancestor of a Binary Search Tree
**Medium**

Given a binary search tree (BST), find the lowest common ancestor (LCA) of two given nodes in the BST.

According to the definition of LCA on Wikipedia: "The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself)."

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
In a BST, we can leverage the ordering property to find LCA efficiently. If both nodes are smaller than current node, LCA is in left subtree. If both are larger, LCA is in right subtree. Otherwise, current node is the LCA.

### APPROACH:
1. **Use BST property**: Left subtree < root < right subtree
2. **Compare values**: If both p and q < root, go left; if both > root, go right
3. **Find split point**: When p and q are on different sides, current node is LCA
4. **Handle edge cases**: One node is ancestor of the other

### WHY THIS WORKS:
- BST ordering allows us to determine which subtree contains the LCA
- The first node where p and q diverge (different subtrees) is the LCA
- If one node equals current node, current node is the LCA
- This is much more efficient than general tree LCA algorithms

### TIME COMPLEXITY: O(h)
Where h is the height of the tree. O(log n) for balanced BST, O(n) for skewed tree

### SPACE COMPLEXITY: O(h)
For recursion stack, O(1) for iterative solution

### EXAMPLE WALKTHROUGH:
```
BST:      6
         / \
        2   8
       / \ / \
      0  4 7  9
        / \
       3   5

Find LCA of 2 and 8:
1. Start at 6: 2 < 6 and 8 > 6, so 6 is LCA
Output: 6

Find LCA of 2 and 4:
1. Start at 6: 2 < 6 and 4 < 6, go left
2. At 2: 2 == 2 (found p), so 2 is LCA
Output: 2
```

### KEY INSIGHTS:
- BST property makes LCA finding O(h) instead of O(n)
- No need to search entire tree like in general binary tree
- Can be solved iteratively or recursively
- Works even when one node is ancestor of the other

</details>
"""

# Definition for a binary tree node
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        """
        Find LCA in BST using recursive approach.

        Args:
            root: Root of BST
            p: First node
            q: Second node

        Returns:
            LCA node

        Time Complexity: O(h) where h is height of tree
        Space Complexity: O(h) for recursion stack
        """
        # Base case
        if not root:
            return None

        # If both nodes are smaller than root, LCA is in left subtree
        if p.val < root.val and q.val < root.val:
            return self.lowestCommonAncestor(root.left, p, q)

        # If both nodes are larger than root, LCA is in right subtree
        if p.val > root.val and q.val > root.val:
            return self.lowestCommonAncestor(root.right, p, q)

        # If we reach here, then one node is on left side and other on right
        # OR one of the nodes is the root itself
        return root

    def lowestCommonAncestorIterative(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        """
        Find LCA in BST using iterative approach.

        Args:
            root: Root of BST
            p: First node
            q: Second node

        Returns:
            LCA node

        Time Complexity: O(h) where h is height of tree
        Space Complexity: O(1) - constant space
        """
        current = root

        while current:
            # If both nodes are smaller than current, go left
            if p.val < current.val and q.val < current.val:
                current = current.left
            # If both nodes are larger than current, go right
            elif p.val > current.val and q.val > current.val:
                current = current.right
            else:
                # Found the LCA (split point or one node equals current)
                return current

        return None

    def lowestCommonAncestorGeneral(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        """
        General tree LCA approach (works for any binary tree, not just BST).

        Args:
            root: Root of tree
            p: First node
            q: Second node

        Returns:
            LCA node

        Time Complexity: O(n) where n is number of nodes
        Space Complexity: O(h) for recursion stack
        """
        # Base case
        if not root or root == p or root == q:
            return root

        # Search in left and right subtrees
        left = self.lowestCommonAncestorGeneral(root.left, p, q)
        right = self.lowestCommonAncestorGeneral(root.right, p, q)

        # If both subtrees return non-null, current node is LCA
        if left and right:
            return root

        # Return non-null result
        return left if left else right

    def findPath(self, root: 'TreeNode', target: 'TreeNode') -> list['TreeNode']:
        """
        Helper function to find path from root to target node.

        Args:
            root: Root of BST
            target: Target node to find

        Returns:
            List of nodes from root to target
        """
        path = []
        current = root

        while current:
            path.append(current)
            if target.val == current.val:
                break
            elif target.val < current.val:
                current = current.left
            else:
                current = current.right

        return path

    def lowestCommonAncestorPaths(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        """
        Alternative approach using path finding.

        Args:
            root: Root of BST
            p: First node
            q: Second node

        Returns:
            LCA node
        """
        path_p = self.findPath(root, p)
        path_q = self.findPath(root, q)

        # Find last common node in both paths
        lca = None
        min_len = min(len(path_p), len(path_q))

        for i in range(min_len):
            if path_p[i] == path_q[i]:
                lca = path_p[i]
            else:
                break

        return lca


def test_solution():
    """Test cases for Problem 235."""
    solution = Solution()

    # Create BST:      6
    #                 / \
    #                2   8
    #               / \ / \
    #              0  4 7  9
    #                / \
    #               3   5
    root = TreeNode(6)
    root.left = TreeNode(2)
    root.right = TreeNode(8)
    root.left.left = TreeNode(0)
    root.left.right = TreeNode(4)
    root.right.left = TreeNode(7)
    root.right.right = TreeNode(9)
    root.left.right.left = TreeNode(3)
    root.left.right.right = TreeNode(5)

    # Store references to nodes for testing
    node_2 = root.left
    node_8 = root.right
    node_4 = root.left.right
    node_3 = root.left.right.left
    node_5 = root.left.right.right

    # Test case 1: LCA of 2 and 8 should be 6
    result1 = solution.lowestCommonAncestor(root, node_2, node_8)
    assert result1.val == 6, f"Expected 6, got {result1.val}"

    # Test case 2: LCA of 2 and 4 should be 2
    result2 = solution.lowestCommonAncestor(root, node_2, node_4)
    assert result2.val == 2, f"Expected 2, got {result2.val}"

    # Test case 3: LCA of 3 and 5 should be 4
    result3 = solution.lowestCommonAncestor(root, node_3, node_5)
    assert result3.val == 4, f"Expected 4, got {result3.val}"

    # Test case 4: LCA of 2 and 3 should be 2 (ancestor relationship)
    result4 = solution.lowestCommonAncestor(root, node_2, node_3)
    assert result4.val == 2, f"Expected 2, got {result4.val}"

    # Test iterative approach
    result5 = solution.lowestCommonAncestorIterative(root, node_2, node_8)
    assert result5.val == 6, f"Iterative: Expected 6, got {result5.val}"

    result6 = solution.lowestCommonAncestorIterative(root, node_3, node_5)
    assert result6.val == 4, f"Iterative: Expected 4, got {result6.val}"

    # Test general approach
    result7 = solution.lowestCommonAncestorGeneral(root, node_2, node_8)
    assert result7.val == 6, f"General: Expected 6, got {result7.val}"

    # Test path-based approach
    result8 = solution.lowestCommonAncestorPaths(root, node_2, node_8)
    assert result8.val == 6, f"Paths: Expected 6, got {result8.val}"

    print("All test cases passed!")


def create_simple_bst():
    """Create a simple BST for demonstration."""
    #     2
    #    / \
    #   1   3
    root = TreeNode(2)
    root.left = TreeNode(1)
    root.right = TreeNode(3)
    return root, root.left, root.right


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 235. Lowest Common Ancestor of a Binary Search Tree ===")

    # Create simple BST for demonstration
    root, node1, node3 = create_simple_bst()

    # Find LCA of 1 and 3
    lca = solution.lowestCommonAncestor(root, node1, node3)
    print(f"LCA of nodes 1 and 3: {lca.val}")

    # Create larger BST for more examples
    #       6
    #      / \
    #     2   8
    #    / \ / \
    #   0  4 7  9
    #     / \
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

    print(f"\nIn larger BST:")
    print(f"LCA of nodes 2 and 8: {solution.lowestCommonAncestor(large_root, node_2, node_8).val}")
    print(f"LCA of nodes 2 and 4: {solution.lowestCommonAncestor(large_root, node_2, node_4).val}")

    print(f"\nUsing iterative approach:")
    print(f"LCA of nodes 2 and 8: {solution.lowestCommonAncestorIterative(large_root, node_2, node_8).val}")

    print(f"\nAlgorithm comparison for nodes 2 and 8:")
    algorithms = [
        ("BST Recursive", solution.lowestCommonAncestor),
        ("BST Iterative", solution.lowestCommonAncestorIterative),
        ("General Tree", solution.lowestCommonAncestorGeneral),
        ("Path-based", solution.lowestCommonAncestorPaths)
    ]

    for name, method in algorithms:
        result = method(large_root, node_2, node_8)
        print(f"{name}: {result.val}")

    print(f"\nKey insights:")
    print(f"1. BST property allows O(h) time complexity")
    print(f"2. Compare node values to determine which subtree to explore")
    print(f"3. LCA is the first node where paths to p and q diverge")
    print(f"4. Iterative solution uses O(1) space vs O(h) for recursive")