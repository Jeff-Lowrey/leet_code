"""
# 103. Binary Tree Zigzag Level Order Traversal
**Medium**

Given the root of a binary tree, return the zigzag level order traversal of its nodes' values.
(i.e., from left to right, then right to left for the next level and alternate between).

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Perform a level-order traversal (BFS) but alternate the direction of reading values at each level.
Use a flag to track whether we should append values left-to-right or right-to-left.

### APPROACH:
1. **Handle edge case**: Return empty list if tree is empty
2. **Initialize BFS**: Use a deque for level-order traversal
3. **Track direction**: Use a boolean flag that alternates each level
4. **For each level**:
   - Process all nodes at current level
   - Collect values in order
   - If right-to-left level, reverse the values before adding to result
   - Toggle direction flag for next level

### WHY THIS WORKS:
- BFS naturally processes nodes level by level
- By tracking level boundaries (queue size), we can process each level independently
- Reversing alternate levels gives us the zigzag pattern
- Deque provides O(1) append/popleft operations

### TIME COMPLEXITY: O(n)
- Visit each node exactly once
- n = number of nodes in tree

### SPACE COMPLEXITY: O(w)
- Queue holds at most one level of nodes at a time
- w = maximum width of tree (worst case: n/2 for complete tree)

### EXAMPLE WALKTHROUGH:
```
Tree:      3
         /   \
        9     20
             /  \
            15   7

Level 0 (L->R): [3]
Level 1 (R->L): [20, 9]
Level 2 (L->R): [15, 7]
Result: [[3], [20, 9], [15, 7]]
```

### EDGE CASES:
- Empty tree: Return []
- Single node: Return [[root.val]]
- Skewed tree: Works correctly with zigzag pattern

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
    def zigzagLevelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        """
        Zigzag level order traversal of binary tree.

        Args:
            root: Root node of binary tree

        Returns:
            List of lists containing node values in zigzag level order

        Time Complexity: O(n)
        Space Complexity: O(w) where w is max width of tree
        """
        if not root:
            return []

        result = []
        queue = deque([root])
        left_to_right = True

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

            # Reverse if going right to left
            if not left_to_right:
                level_values.reverse()

            result.append(level_values)
            left_to_right = not left_to_right

        return result


def test_solution():
    """Test cases for Problem 103."""
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
    assert solution.zigzagLevelOrder(root1) == [[3], [20, 9], [15, 7]]
    print("Test case 1 passed: Example tree")

    # Test case 2: Single node
    root2 = TreeNode(1)
    assert solution.zigzagLevelOrder(root2) == [[1]]
    print("Test case 2 passed: Single node")

    # Test case 3: Empty tree
    assert solution.zigzagLevelOrder(None) == []
    print("Test case 3 passed: Empty tree")

    # Test case 4: Skewed tree
    #     1
    #      \
    #       2
    #        \
    #         3
    #          \
    #           4
    root4 = TreeNode(1)
    root4.right = TreeNode(2)
    root4.right.right = TreeNode(3)
    root4.right.right.right = TreeNode(4)
    assert solution.zigzagLevelOrder(root4) == [[1], [2], [3], [4]]
    print("Test case 4 passed: Skewed tree")

    # Test case 5: Complete binary tree
    #        1
    #       / \
    #      2   3
    #     / \ / \
    #    4  5 6  7
    root5 = TreeNode(1)
    root5.left = TreeNode(2)
    root5.right = TreeNode(3)
    root5.left.left = TreeNode(4)
    root5.left.right = TreeNode(5)
    root5.right.left = TreeNode(6)
    root5.right.right = TreeNode(7)
    assert solution.zigzagLevelOrder(root5) == [[1], [3, 2], [4, 5, 6, 7]]
    print("Test case 5 passed: Complete binary tree")

    print("\nAll test cases passed!")


if __name__ == "__main__":
    test_solution()
