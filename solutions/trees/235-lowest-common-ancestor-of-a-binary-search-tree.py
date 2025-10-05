I'll help you implement a solution for finding the Lowest Common Ancestor (LCA) in a Binary Search Tree (BST). Here's the complete implementation:

```python
#!/usr/bin/env python3
"""
LCA (Lowest Common Ancestor) in Binary Search Tree Implementation
This module provides a solution for finding the lowest common ancestor of two nodes in a BST.
"""

class TreeNode:
    """
    Definition for a binary tree node.
    """
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def lowestCommonAncestor(root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
    """
    Find the lowest common ancestor of two nodes in a Binary Search Tree.
    
    Args:
        root: Root node of the BST
        p: First node
        q: Second node
    
    Returns:
        TreeNode: The lowest common ancestor node
    
    Time Complexity: O(h) where h is the height of the tree
    Space Complexity: O(1)
    """
    # If root is None, return None
    if not root:
        return None
    
    # Get the values for comparison
    curr_val = root.val
    p_val = p.val
    q_val = q.val
    
    # If both p and q are greater than current node,
    # LCA must be in right subtree
    if p_val > curr_val and q_val > curr_val:
        return lowestCommonAncestor(root.right, p, q)
    
    # If both p and q are smaller than current node,
    # LCA must be in left subtree
    elif p_val < curr_val and q_val < curr_val:
        return lowestCommonAncestor(root.left, p, q)
    
    # If one node is smaller and other is greater, or
    # one of the nodes equals current node,
    # current node is the LCA
    else:
        return root

def lowestCommonAncestorIterative(root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
    """
    Iterative version of finding the lowest common ancestor in a BST.
    
    Args:
        root: Root node of the BST
        p: First node
        q: Second node
    
    Returns:
        TreeNode: The lowest common ancestor node
    
    Time Complexity: O(h) where h is the height of the tree
    Space Complexity: O(1)
    """
    # Get the values for comparison
    p_val = p.val
    q_val = q.val
    
    # Start from root and traverse down
    current = root
    
    while current:
        # Get current node's value
        curr_val = current.val
        
        if p_val > curr_val and q_val > curr_val:
            # Both nodes are in right subtree
            current = current.right
        elif p_val < curr_val and q_val < curr_val:
            # Both nodes are in left subtree
            current = current.left
        else:
            # We have found the split point, i.e. LCA
            return current
    
    return None

def test_lca():
    """
    Test function to verify the LCA implementation
    """
    # Create a sample BST
    #       6
    #      / \
    #     2   8
    #    / \   \
    #   0   4   9
    #      / \
    #     3   5
    
    root = TreeNode(6)
    root.left = TreeNode(2)
    root.right = TreeNode(8)
    root.left.left = TreeNode(0)
    root.left.right = TreeNode(4)
    root.left.right.left = TreeNode(3)
    root.left.right.right = TreeNode(5)
    root.right.right = TreeNode(9)
    
    # Test cases
    test_cases = [
        (root.left, root.right),  # LCA of 2 and 8 should be 6
        (root.left.left, root.left.right),  # LCA of 0 and 4 should be 2
        (root.left.right.left, root.left.right.right),  # LCA of 3 and 5 should be 4
    ]
    
    # Run tests
    for p, q in test_cases:
        result = lowestCommonAncestor(root, p, q)
        print(f"LCA of {p.val} and {q.val} is {result.val}")
        
        # Test iterative version
        result_iter = lowestCommonAncestorIterative(root, p, q)
        print(f"LCA (iterative) of {p.val} and {q.val} is {result_iter.val}")

if __name__ == "__main__":
    test_lca()
```

This implementation includes:

1. A `TreeNode` class for representing nodes in the BST
2. Two implementations of the LCA function:
   - Recursive implementation (`lowestCommonAncestor`)
   - Iterative implementation (`lowestCommonAncestorIterative`)
3. A test function with sample cases
4. Proper documentation and comments
5. Edge case handling
6. Time and space complexity analysis

The solution leverages the BST property where:
- All nodes in the left subtree are smaller than the current node
- All nodes in the right subtree are greater than the current node

This property allows us to efficiently find the LCA by comparing the values of p and q with the current node's value and deciding which subtree to traverse.

The code handles the following cases:
- When both nodes are in the left subtree
- When both nodes are in the right subtree
- When the nodes are in different subtrees (or one is the current node)
- Edge cases like null nodes

Both implementations have O(h) time complexity where h is the height of the tree, and O(1) space complexity for the iterative version (O(h) for recursive due to call stack).