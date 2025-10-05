I'll help you create a Python implementation of a balanced binary tree with methods to check if a tree is balanced and create a balanced tree. Here's the complete implementation:

```python
#!/usr/bin/env python3
"""
Balanced Tree Implementation in Python
This module provides a binary tree implementation with balance checking functionality.
A balanced tree is one where the heights of the left and right subtrees of every node
differ by at most one.
"""

class TreeNode:
    """
    TreeNode class represents a node in a binary tree.
    Each node has a value and optional left and right children.
    """
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class BalancedTree:
    """
    BalancedTree class provides methods to work with balanced binary trees.
    """
    
    @staticmethod
    def is_balanced(root: TreeNode) -> bool:
        """
        Check if the binary tree is balanced.
        A tree is balanced if the heights of left and right subtrees of every node
        differ by at most one.
        
        Args:
            root: Root node of the binary tree
            
        Returns:
            bool: True if the tree is balanced, False otherwise
        """
        def check_height(node: TreeNode) -> int:
            if not node:
                return 0
                
            left_height = check_height(node.left)
            if left_height == -1:
                return -1
                
            right_height = check_height(node.right)
            if right_height == -1:
                return -1
                
            if abs(left_height - right_height) > 1:
                return -1
                
            return max(left_height, right_height) + 1
            
        return check_height(root) != -1

    @staticmethod
    def create_balanced_tree(values: list) -> TreeNode:
        """
        Create a balanced binary tree from a sorted list of values.
        
        Args:
            values: Sorted list of values to create the tree from
            
        Returns:
            TreeNode: Root node of the created balanced tree
        """
        if not values:
            return None
            
        def build_tree(left: int, right: int) -> TreeNode:
            if left > right:
                return None
                
            mid = (left + right) // 2
            root = TreeNode(values[mid])
            
            root.left = build_tree(left, mid - 1)
            root.right = build_tree(mid + 1, right)
            
            return root
            
        return build_tree(0, len(values) - 1)

    @staticmethod
    def print_tree(root: TreeNode, level: int = 0, prefix: str = "Root: "):
        """
        Print the binary tree in a hierarchical format.
        
        Args:
            root: Root node of the tree to print
            level: Current level in the tree (for indentation)
            prefix: Prefix to print before the node value
        """
        if not root:
            return
            
        indent = "  " * level
        print(f"{indent}{prefix}{root.val}")
        
        if root.left:
            BalancedTree.print_tree(root.left, level + 1, "L--- ")
        if root.right:
            BalancedTree.print_tree(root.right, level + 1, "R--- ")


def main():
    """
    Main function to demonstrate the balanced tree implementation.
    """
    # Example 1: Create a balanced tree from sorted values
    values = [1, 2, 3, 4, 5, 6, 7]
    tree = BalancedTree()
    root = tree.create_balanced_tree(values)
    
    print("Created balanced tree:")
    tree.print_tree(root)
    
    # Check if the tree is balanced
    is_balanced = tree.is_balanced(root)
    print(f"\nIs the tree balanced? {is_balanced}")
    
    # Example 2: Create an unbalanced tree
    unbalanced_root = TreeNode(1)
    unbalanced_root.left = TreeNode(2)
    unbalanced_root.left.left = TreeNode(3)
    
    print("\nUnbalanced tree:")
    tree.print_tree(unbalanced_root)
    
    # Check if the unbalanced tree is balanced
    is_unbalanced = tree.is_balanced(unbalanced_root)
    print(f"\nIs the unbalanced tree balanced? {is_unbalanced}")


if __name__ == "__main__":
    main()
```

This implementation includes:

1. A `TreeNode` class representing nodes in the binary tree
2. A `BalancedTree` class with methods to:
   - Check if a tree is balanced (`is_balanced`)
   - Create a balanced tree from sorted values (`create_balanced_tree`)
   - Print the tree structure (`print_tree`)
3. A main function demonstrating the usage of the implementation

The code handles:
- Edge cases (empty trees, single nodes)
- Balance checking using height calculation
- Creation of balanced trees from sorted arrays
- Visual representation of the tree structure

The implementation follows Python best practices:
- Clear documentation and comments
- Type hints
- Proper class structure
- Clean code organization
- Error handling
- Demonstration examples

You can run this file directly to see example usage of the balanced tree implementation. The output will show both balanced and unbalanced tree examples and their respective balance status.