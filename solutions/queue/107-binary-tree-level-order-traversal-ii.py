"""
# 107. Binary Tree Level Order Traversal II
**Medium**

Given the root of a binary tree, return the bottom-up level order traversal of its nodes' values.
(i.e., from left to right, level by level from leaf to root).

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Perform standard level-order traversal (BFS) but reverse the final result to get bottom-up order.
Alternatively, we can prepend each level to the result instead of appending.

### APPROACH:
1. **Handle edge case**: Return empty list if tree is empty
2. **Initialize BFS**: Use a deque for level-order traversal
3. **For each level**:
   - Process all nodes at current level
   - Collect values in order
   - Add level to result
4. **Reverse result**: Return reversed list for bottom-up order

### WHY THIS WORKS:
- BFS naturally processes nodes level by level (top to bottom)
- By reversing the result at the end, we get bottom-up order
- Deque provides efficient O(1) operations for BFS

### TIME COMPLEXITY: O(n)
- Visit each node exactly once: O(n)
- Reversing result: O(h) where h = height
- Total: O(n)

### SPACE COMPLEXITY: O(w)
- Queue holds at most one level at a time
- w = maximum width of tree (worst case: n/2 for complete tree)
- Result storage: O(n)

### EXAMPLE WALKTHROUGH:
```
Tree:      3
         /   \
        9     20
             /  \
            15   7

Level-order (top-down): [[3], [9, 20], [15, 7]]
Bottom-up: [[15, 7], [9, 20], [3]]
```

### EDGE CASES:
- Empty tree: Return []
- Single node: Return [[root.val]]
- Skewed tree: Each level has one node

</details>
"""

from collections import deque
from typing import List, Optional


class TreeNode:
    """Definition for a binary tree node."""
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def levelOrderBottom(self, root: Optional[TreeNode]) -> List[List[int]]:
        """
        Bottom-up level order traversal of binary tree.

        Args:
            root: Root node of binary tree

        Returns:
            List of lists containing node values in bottom-up level order

        Time Complexity: O(n)
        Space Complexity: O(w) where w is max width of tree
        """
        if not root:
            return []

        result = []
        queue = deque([root])

        while queue:
            level_size = len(queue)
            level_values = []

            # Process all nodes at current level
            for _ in range(level_size):
                node = queue.popleft()
                level_values.append(node.val)

                # Add children for next level
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)

            result.append(level_values)

        # Reverse to get bottom-up order
        return result[::-1]


def test_solution():
    """Test cases for Problem 107."""
    solution = Solution()

    # Test case 1: Example tree
    #       3
    #      / \
    #     9   20
    #        /  \
    #       15   7
    root1 = TreeNode(3)
    root1.left = TreeNode(9)
    root1.right = TreeNode(20)
    root1.right.left = TreeNode(15)
    root1.right.right = TreeNode(7)
    assert solution.levelOrderBottom(root1) == [[15, 7], [9, 20], [3]]
    print("Test case 1 passed: Example tree")

    # Test case 2: Single node
    root2 = TreeNode(1)
    assert solution.levelOrderBottom(root2) == [[1]]
    print("Test case 2 passed: Single node")

    # Test case 3: Empty tree
    assert solution.levelOrderBottom(None) == []
    print("Test case 3 passed: Empty tree")

    # Test case 4: Left-skewed tree
    #     1
    #    /
    #   2
    #  /
    # 3
    root4 = TreeNode(1)
    root4.left = TreeNode(2)
    root4.left.left = TreeNode(3)
    assert solution.levelOrderBottom(root4) == [[3], [2], [1]]
    print("Test case 4 passed: Left-skewed tree")

    # Test case 5: Complete binary tree
    #        1
    #       / \
    #      2   3
    #     / \
    #    4   5
    root5 = TreeNode(1)
    root5.left = TreeNode(2)
    root5.right = TreeNode(3)
    root5.left.left = TreeNode(4)
    root5.left.right = TreeNode(5)
    assert solution.levelOrderBottom(root5) == [[4, 5], [2, 3], [1]]
    print("Test case 5 passed: Complete binary tree")

    print("\nAll test cases passed!")


if __name__ == "__main__":
    test_solution()
