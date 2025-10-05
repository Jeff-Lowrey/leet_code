I'll help you create a solution for validating a Binary Search Tree (BST) in Python. Here's the complete implementation:

```python
#!/usr/bin/env python3
"""
Validate Binary Search Tree (BST) Implementation
This module provides functionality to validate if a binary tree is a valid BST.

A valid BST is defined as follows:
- The left subtree of a node contains only nodes with keys less than the node's key.
- The right subtree of a node contains only nodes with keys greater than the node's key.
- Both the left and right subtrees must also be binary search trees.
"""

from typing import Optional


class TreeNode:
    """Binary Tree Node class definition."""
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        """
        Validates if the given binary tree is a valid Binary Search Tree (BST).
        
        Args:
            root: Root node of the binary tree
            
        Returns:
            bool: True if the tree is a valid BST, False otherwise
        """
        def validate(node: Optional[TreeNode], min_val: float, max_val: float) -> bool:
            # Empty tree is valid BST
            if not node:
                return True
            
            # Check if current node's value is within valid range
            if node.val <= min_val or node.val >= max_val:
                return False
            
            # Recursively validate left and right subtrees
            # For left subtree: all values must be less than current node's value
            # For right subtree: all values must be greater than current node's value
            return (validate(node.left, min_val, node.val) and 
                   validate(node.right, node.val, max_val))
        
        # Start validation with initial range (-infinity, +infinity)
        return validate(root, float('-inf'), float('inf'))


def test_validate_bst():
    """Test function to verify BST validation implementation."""
    # Create test cases
    
    # Test Case 1: Valid BST
    #     2
    #    / \
    #   1   3
    root1 = TreeNode(2)
    root1.left = TreeNode(1)
    root1.right = TreeNode(3)
    
    # Test Case 2: Invalid BST
    #     5
    #    / \
    #   1   4
    #      / \
    #     3   6
    root2 = TreeNode(5)
    root2.left = TreeNode(1)
    root2.right = TreeNode(4)
    root2.right.left = TreeNode(3)
    root2.right.right = TreeNode(6)
    
    # Create solution instance
    solution = Solution()
    
    # Run tests
    assert solution.isValidBST(root1) == True, "Test case 1 failed"
    assert solution.isValidBST(root2) == False, "Test case 2 failed"
    
    print("All test cases passed!")


if __name__ == "__main__":
    test_validate_bst()
```

This implementation includes:

1. A `TreeNode` class to represent nodes in the binary tree.
2. A `Solution` class with the `isValidBST` method that validates if a given binary tree is a valid BST.
3. A helper function `validate` that performs the actual validation using recursion and range checking.
4. Test cases to verify the implementation.

The validation algorithm works by:
- Using a recursive approach to traverse the tree
- Maintaining valid ranges for each node
- Checking if each node's value falls within its valid range
- Recursively validating left and right subtrees with updated ranges

The solution handles edge cases such as:
- Empty trees
- Single node trees
- Trees with duplicate values
- Trees with negative values
- Invalid BST configurations

The time complexity is O(n) where n is the number of nodes in the tree, as we need to visit each node once. The space complexity is O(h) where h is the height of the tree, due to the recursive call stack.