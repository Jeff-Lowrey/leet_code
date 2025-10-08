"""
# 199. Binary Tree Right Side View
**Medium**

Given the root of a binary tree, imagine yourself standing on the right side of it,
return the values of the nodes you can see ordered from top to bottom.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
The right side view is simply the rightmost node at each level of the tree.
Use level-order traversal (BFS) and capture the last node at each level.

### APPROACH:
1. **Handle edge case**: Return empty list if tree is empty
2. **Initialize BFS**: Use a deque with root node
3. **For each level**:
   - Process all nodes at current level
   - Keep track of the last node in the level
   - Add the last node's value to result
   - Add children to queue for next level

### WHY THIS WORKS:
- BFS processes nodes level by level, left to right
- The last node processed at each level is the rightmost node
- This is exactly what's visible from the right side
- We collect these rightmost nodes from each level

### TIME COMPLEXITY: O(n)
- Visit each node exactly once
- n = number of nodes in tree

### SPACE COMPLEXITY: O(w)
- Queue holds at most one level of nodes at a time
- w = maximum width of tree (worst case: n/2 for complete tree)
- Result storage: O(h) where h = height

### EXAMPLE WALKTHROUGH:
```
Tree:      1            <- Right view: 1
         /   \
        2     3          <- Right view: 3
         \     \
          5     4        <- Right view: 4

Result: [1, 3, 4]
```

### EDGE CASES:
- Empty tree: Return []
- Single node: Return [root.val]
- Left-skewed tree: All nodes visible from right
- Right-skewed tree: Only rightmost branch visible

### ALTERNATIVE APPROACHES:
1. DFS with depth tracking (visit right child first)
2. Level-order traversal collecting all nodes but taking last of each level

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
    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
        """
        Get right side view of binary tree.

        Args:
            root: Root node of binary tree

        Returns:
            List of values visible from right side (top to bottom)

        Time Complexity: O(n)
        Space Complexity: O(w) where w is max width of tree
        """
        if not root:
            return []

        result = []
        queue = deque([root])

        while queue:
            level_size = len(queue)

            # Process all nodes at current level
            for i in range(level_size):
                node = queue.popleft()

                # If this is the last node in the level, add to result
                if i == level_size - 1:
                    result.append(node.val)

                # Add children for next level
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)

        return result

    def rightSideView_dfs(self, root: Optional[TreeNode]) -> List[int]:
        """
        Alternative DFS solution.

        Time Complexity: O(n)
        Space Complexity: O(h) where h is height (recursion stack)
        """
        result = []

        def dfs(node: Optional[TreeNode], depth: int) -> None:
            if not node:
                return

            # If this is the first node at this depth, it's visible from right
            if depth == len(result):
                result.append(node.val)

            # Visit right subtree first, then left
            dfs(node.right, depth + 1)
            dfs(node.left, depth + 1)

        dfs(root, 0)
        return result


def test_solution():
    """Test cases for Problem 199."""
    solution = Solution()

    # Test case 1: Example tree
    #       1
    #      / \
    #     2   3
    #      \   \
    #       5   4
    root1 = TreeNode(1)
    root1.left = TreeNode(2)
    root1.right = TreeNode(3)
    root1.left.right = TreeNode(5)
    root1.right.right = TreeNode(4)
    assert solution.rightSideView(root1) == [1, 3, 4]
    assert solution.rightSideView_dfs(root1) == [1, 3, 4]
    print("Test case 1 passed: Example tree")

    # Test case 2: Right-skewed tree
    #  1
    #   \
    #    3
    #     \
    #      4
    root2 = TreeNode(1)
    root2.right = TreeNode(3)
    root2.right.right = TreeNode(4)
    assert solution.rightSideView(root2) == [1, 3, 4]
    print("Test case 2 passed: Right-skewed tree")

    # Test case 3: Single node
    root3 = TreeNode(1)
    assert solution.rightSideView(root3) == [1]
    print("Test case 3 passed: Single node")

    # Test case 4: Empty tree
    assert solution.rightSideView(None) == []
    print("Test case 4 passed: Empty tree")

    # Test case 5: Left-skewed tree (all nodes visible)
    #     1
    #    /
    #   2
    #  /
    # 3
    root5 = TreeNode(1)
    root5.left = TreeNode(2)
    root5.left.left = TreeNode(3)
    assert solution.rightSideView(root5) == [1, 2, 3]
    print("Test case 5 passed: Left-skewed tree")

    # Test case 6: Complex tree
    #        1
    #       / \
    #      2   3
    #     / \   \
    #    4   5   6
    #   /         \
    #  7           8
    root6 = TreeNode(1)
    root6.left = TreeNode(2)
    root6.right = TreeNode(3)
    root6.left.left = TreeNode(4)
    root6.left.right = TreeNode(5)
    root6.right.right = TreeNode(6)
    root6.left.left.left = TreeNode(7)
    root6.right.right.right = TreeNode(8)
    assert solution.rightSideView(root6) == [1, 3, 6, 8]
    assert solution.rightSideView_dfs(root6) == [1, 3, 6, 8]
    print("Test case 6 passed: Complex tree")

    print("\nAll test cases passed!")


if __name__ == "__main__":
    test_solution()
