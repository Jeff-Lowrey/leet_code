"""
# 515. Find Largest Value in Each Tree Row
**Medium**

Given the root of a binary tree, return an array of the largest value in each row of the tree (0-indexed).

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Use level-order traversal (BFS) to process nodes level by level.
For each level, track the maximum value among all nodes at that level.

### APPROACH:
1. **Handle edge case**: Return empty list if tree is empty
2. **Initialize BFS**: Use a deque with root node
3. **For each level**:
   - Process all nodes at current level
   - Track maximum value seen at this level
   - Add maximum to result
   - Add children to queue for next level

### WHY THIS WORKS:
- BFS processes nodes level by level
- Within each level, we can easily find the maximum value
- By processing level boundaries (queue size), we separate levels
- Each level's maximum is independent of other levels

### TIME COMPLEXITY: O(n)
- Visit each node exactly once
- n = number of nodes in tree

### SPACE COMPLEXITY: O(w)
- Queue holds at most one level of nodes at a time
- w = maximum width of tree (worst case: n/2 for complete tree)
- Result storage: O(h) where h = height

### EXAMPLE WALKTHROUGH:
```
Tree:      1
         /   \
        3     2
       / \     \
      5   3     9

Level 0: max = 1
Level 1: max = max(3, 2) = 3
Level 2: max = max(5, 3, 9) = 9
Result: [1, 3, 9]
```

### EDGE CASES:
- Empty tree: Return []
- Single node: Return [root.val]
- All negative values: Returns correct negative maximum
- Skewed tree: Each level has one node

### ALTERNATIVE APPROACHES:
1. DFS with depth tracking and dictionary to store level maxima
2. Recursive level-order traversal

</details>
"""

from collections import deque


class TreeNode:
    """Definition for a binary tree node."""

    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def largestValues(self, root: TreeNode | None) -> list[int]:
        """
        Find largest value in each row of binary tree.

        Args:
            root: Root node of binary tree

        Returns:
            List of maximum values for each level

        Time Complexity: O(n)
        Space Complexity: O(w) where w is max width of tree
        """
        if not root:
            return []

        result = []
        queue = deque([root])

        while queue:
            level_size = len(queue)
            level_max = float("-inf")

            # Process all nodes at current level
            for _ in range(level_size):
                node = queue.popleft()
                level_max = max(level_max, node.val)

                # Add children for next level
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)

            result.append(level_max)

        return result

    def largestValues_dfs(self, root: TreeNode | None) -> list[int]:
        """
        Alternative DFS solution using depth tracking.

        Time Complexity: O(n)
        Space Complexity: O(h) where h is height (recursion stack)
        """
        result = []

        def dfs(node: TreeNode | None, depth: int) -> None:
            if not node:
                return

            # If this is the first node at this depth, initialize
            if depth == len(result):
                result.append(node.val)
            else:
                # Update maximum at this depth
                result[depth] = max(result[depth], node.val)

            # Visit both subtrees
            dfs(node.left, depth + 1)
            dfs(node.right, depth + 1)

        dfs(root, 0)
        return result


def test_solution():
    """Test cases for Problem 515."""
    solution = Solution()

    # Test case 1: Example tree
    #       1
    #      / \
    #     3   2
    #    / \   \
    #   5   3   9
    root1 = TreeNode(1)
    root1.left = TreeNode(3)
    root1.right = TreeNode(2)
    root1.left.left = TreeNode(5)
    root1.left.right = TreeNode(3)
    root1.right.right = TreeNode(9)
    assert solution.largestValues(root1) == [1, 3, 9]
    assert solution.largestValues_dfs(root1) == [1, 3, 9]
    print("Test case 1 passed: Example tree")

    # Test case 2: Single node
    root2 = TreeNode(1)
    assert solution.largestValues(root2) == [1]
    print("Test case 2 passed: Single node")

    # Test case 3: Empty tree
    assert solution.largestValues(None) == []
    print("Test case 3 passed: Empty tree")

    # Test case 4: All negative values
    #      -1
    #      / \
    #    -2  -3
    #    /
    #  -4
    root4 = TreeNode(-1)
    root4.left = TreeNode(-2)
    root4.right = TreeNode(-3)
    root4.left.left = TreeNode(-4)
    assert solution.largestValues(root4) == [-1, -2, -4]
    print("Test case 4 passed: All negative values")

    # Test case 5: Right-skewed tree
    #  1
    #   \
    #    2
    #     \
    #      3
    root5 = TreeNode(1)
    root5.right = TreeNode(2)
    root5.right.right = TreeNode(3)
    assert solution.largestValues(root5) == [1, 2, 3]
    print("Test case 5 passed: Right-skewed tree")

    # Test case 6: Complete binary tree with varying values
    #        10
    #       /  \
    #      5    8
    #     / \  / \
    #    3  7 6  9
    root6 = TreeNode(10)
    root6.left = TreeNode(5)
    root6.right = TreeNode(8)
    root6.left.left = TreeNode(3)
    root6.left.right = TreeNode(7)
    root6.right.left = TreeNode(6)
    root6.right.right = TreeNode(9)
    assert solution.largestValues(root6) == [10, 8, 9]
    assert solution.largestValues_dfs(root6) == [10, 8, 9]
    print("Test case 6 passed: Complete binary tree")

    print("\nAll test cases passed!")


if __name__ == "__main__":
    test_solution()
