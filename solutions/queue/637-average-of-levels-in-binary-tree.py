"""
# 637. Average of Levels in Binary Tree
**Easy**

Given the root of a binary tree, return the average value of the nodes on each level in the form of an array.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Use level-order traversal (BFS) to process nodes level by level.
For each level, calculate the sum and count of nodes, then compute the average.

### APPROACH:
1. **Handle edge case**: Return empty list if tree is empty
2. **Initialize BFS**: Use a deque with root node
3. **For each level**:
   - Process all nodes at current level
   - Calculate sum of all node values at this level
   - Compute average = sum / count
   - Add average to result
   - Add children to queue for next level

### WHY THIS WORKS:
- BFS processes nodes level by level
- By tracking level boundaries (queue size), we can compute level sums independently
- Average is simply sum of values divided by number of nodes
- Each level's average is independent of other levels

### TIME COMPLEXITY: O(n)
- Visit each node exactly once
- n = number of nodes in tree

### SPACE COMPLEXITY: O(w)
- Queue holds at most one level of nodes at a time
- w = maximum width of tree (worst case: n/2 for complete tree)
- Result storage: O(h) where h = height

### EXAMPLE WALKTHROUGH:
```
Tree:      3
         /   \
        9     20
             /  \
            15   7

Level 0: sum = 3, count = 1, avg = 3.0
Level 1: sum = 29, count = 2, avg = 14.5
Level 2: sum = 22, count = 2, avg = 11.0
Result: [3.0, 14.5, 11.0]
```

### EDGE CASES:
- Empty tree: Return []
- Single node: Return [root.val]
- Integer overflow: Use proper precision for averages
- Negative values: Handle correctly with floating-point arithmetic

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
    def averageOfLevels(self, root: Optional[TreeNode]) -> List[float]:
        """
        Calculate average value of nodes at each level.

        Args:
            root: Root node of binary tree

        Returns:
            List of average values for each level

        Time Complexity: O(n)
        Space Complexity: O(w) where w is max width of tree
        """
        if not root:
            return []

        result = []
        queue = deque([root])

        while queue:
            level_size = len(queue)
            level_sum = 0

            # Process all nodes at current level
            for _ in range(level_size):
                node = queue.popleft()
                level_sum += node.val

                # Add children for next level
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)

            # Calculate and add average
            result.append(level_sum / level_size)

        return result


def test_solution():
    """Test cases for Problem 637."""
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
    result1 = solution.averageOfLevels(root1)
    expected1 = [3.0, 14.5, 11.0]
    assert len(result1) == len(expected1)
    for i in range(len(result1)):
        assert abs(result1[i] - expected1[i]) < 1e-5
    print("Test case 1 passed: Example tree")

    # Test case 2: Single node
    root2 = TreeNode(5)
    assert solution.averageOfLevels(root2) == [5.0]
    print("Test case 2 passed: Single node")

    # Test case 3: Empty tree
    assert solution.averageOfLevels(None) == []
    print("Test case 3 passed: Empty tree")

    # Test case 4: Complete binary tree
    #        1
    #       / \
    #      2   3
    #     / \ / \
    #    4  5 6  7
    root4 = TreeNode(1)
    root4.left = TreeNode(2)
    root4.right = TreeNode(3)
    root4.left.left = TreeNode(4)
    root4.left.right = TreeNode(5)
    root4.right.left = TreeNode(6)
    root4.right.right = TreeNode(7)
    result4 = solution.averageOfLevels(root4)
    expected4 = [1.0, 2.5, 5.5]
    assert len(result4) == len(expected4)
    for i in range(len(result4)):
        assert abs(result4[i] - expected4[i]) < 1e-5
    print("Test case 4 passed: Complete binary tree")

    # Test case 5: Left-skewed tree
    #   1
    #  /
    # 2
    # /
    # 3
    root5 = TreeNode(1)
    root5.left = TreeNode(2)
    root5.left.left = TreeNode(3)
    assert solution.averageOfLevels(root5) == [1.0, 2.0, 3.0]
    print("Test case 5 passed: Left-skewed tree")

    # Test case 6: Negative and mixed values
    #      10
    #      / \
    #    -5   8
    #    /     \
    #  -10      6
    root6 = TreeNode(10)
    root6.left = TreeNode(-5)
    root6.right = TreeNode(8)
    root6.left.left = TreeNode(-10)
    root6.right.right = TreeNode(6)
    result6 = solution.averageOfLevels(root6)
    expected6 = [10.0, 1.5, -2.0]
    assert len(result6) == len(expected6)
    for i in range(len(result6)):
        assert abs(result6[i] - expected6[i]) < 1e-5
    print("Test case 6 passed: Negative and mixed values")

    # Test case 7: Large values (precision test)
    root7 = TreeNode(2147483647)
    root7.left = TreeNode(2147483647)
    root7.right = TreeNode(2147483647)
    result7 = solution.averageOfLevels(root7)
    assert result7[0] == 2147483647.0
    assert result7[1] == 2147483647.0
    print("Test case 7 passed: Large values")

    print("\nAll test cases passed!")


if __name__ == "__main__":
    test_solution()
