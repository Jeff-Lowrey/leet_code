I'll help you create a Python implementation for level-order traversal of a binary tree. Here's the complete solution:

```python
from typing import List, Optional
from collections import deque

class TreeNode:
    """Definition for a binary tree node."""
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def levelOrder(root: Optional[TreeNode]) -> List[List[int]]:
    """
    Performs level-order traversal of a binary tree.
    
    Args:
        root: The root node of the binary tree
        
    Returns:
        List[List[int]]: A list of lists where each inner list contains
        the values of nodes at that level
    """
    # Handle edge case of empty tree
    if not root:
        return []
    
    # Initialize result list and queue for BFS
    result = []
    queue = deque([root])
    
    # Continue BFS while there are nodes to process
    while queue:
        # Get the number of nodes at current level
        level_size = len(queue)
        current_level = []
        
        # Process all nodes at current level
        for _ in range(level_size):
            # Get the next node from queue
            node = queue.popleft()
            current_level.append(node.val)
            
            # Add children to queue if they exist
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        
        # Add current level's values to result
        result.append(current_level)
    
    return result

def create_sample_tree() -> TreeNode:
    """
    Creates a sample binary tree for testing.
    
    Returns:
        TreeNode: Root of the sample tree
    """
    root = TreeNode(3)
    root.left = TreeNode(9)
    root.right = TreeNode(20)
    root.right.left = TreeNode(15)
    root.right.right = TreeNode(7)
    return root

def main():
    """
    Main function to demonstrate the level-order traversal.
    """
    # Create a sample tree
    root = create_sample_tree()
    
    # Perform level-order traversal
    result = levelOrder(root)
    
    # Print the result
    print("Level Order Traversal:")
    for i, level in enumerate(result):
        print(f"Level {i}: {level}")

if __name__ == "__main__":
    main()
```

This implementation includes:

1. A `TreeNode` class for defining the binary tree structure
2. The main `levelOrder` function that performs level-order traversal using BFS
3. A helper function to create a sample tree for testing
4. A main function to demonstrate the usage
5. Proper type hints and documentation
6. Edge case handling for empty trees
7. Use of efficient data structures (deque for the queue)

The code follows Python best practices and includes clear comments explaining the implementation. The level-order traversal is implemented using a breadth-first search approach with a queue, which is the most efficient way to perform this operation.

When run, it will create a sample tree and output its level-order traversal. The sample tree looks like:

```
     3
    / \
   9  20
      / \
     15  7
```

The output will show each level's nodes in order.

You can save this code to the specified path: `/Volumes/Flower/Documents/git/leet_code/generated/TR-102-PY_level_order___python_implementation.py`