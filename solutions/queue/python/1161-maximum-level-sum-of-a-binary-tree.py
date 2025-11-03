"""
### INTUITION:
The key insight is that use level-order traversal (BFS) to calculate the sum of values at each level.
Track the level with maximum sum and return the smallest level if there are ties.

### APPROACH:
1. **Handle edge case**: Return 0 if tree is empty (though problem guarantees non-empty tree)
2. **Initialize BFS**: Use a deque with root node
3. **Track variables**:
   - Current level number
   - Maximum sum seen so far
   - Level with maximum sum
4. **For each level**:
   - Calculate sum of all node values at current level
   - If sum > max_sum, update max_sum and max_level
   - Add children to queue for next level

### WHY THIS WORKS:
- This ensures that bFS processes nodes level by level
- This ensures that by tracking level sums, we can find the level with maximum sum
- Since we process levels in order (1, 2, 3, ...), the first maximum we find is the smallest level

### EXAMPLE WALKTHROUGH:
Input:
```
Tree:      1
```

/   \
7     0
/ \
7  -8
Level 1: sum = 1
Level 2: sum = 7 + 0 = 7 (max)
Level 3: sum = 7 + (-8) = -1
Result: 2

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
**O(n)**
- Visit each node exactly once
- n = number of nodes in tree

### SPACE COMPLEXITY:
**O(w)**
- Queue holds at most one level of nodes at a time
- w = maximum width of tree (worst case: n/2 for complete tree)

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

"""

from collections import deque
from typing import Any


class TreeNode:
    """Definition for a binary tree node."""

    def __init__(self, val: Any = 0, left: Any = None, right: Any = None) -> None:
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def maxLevelSum(self, root: TreeNode | None) -> int:
        """
        Find the level with maximum sum of node values.

        Args:
            root: Root node of binary tree

        Returns:
            Smallest level number with maximum sum (1-indexed)

        Time Complexity: O(n)
        Space Complexity: O(w) where w is max width of tree
        """
        if not root:
            return 0

        max_sum = float("-inf")
        max_level = 1
        current_level = 1

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

            # Update max if current level has greater sum
            if level_sum > max_sum:
                max_sum = level_sum
                max_level = current_level

            current_level += 1

        return max_level


# Test cases
if __name__ == "__main__":
    solution = Solution()

    # Test case 1: Example tree
    #       1
    #      / \
    #     7   0
    #    / \
    #   7  -8
    root1 = TreeNode(1)
    root1.left = TreeNode(7)
    root1.right = TreeNode(0)
    root1.left.left = TreeNode(7)
    root1.left.right = TreeNode(-8)
    print(f"Test 1 - Example tree: {solution.maxLevelSum(root1)}")  # 2

    # Test case 2: Single node
    root2 = TreeNode(5)
    print(f"Test 2 - Single node: {solution.maxLevelSum(root2)}")  # 1

    # Test case 3: Increasing sums
    #     1
    #    / \
    #   2   3
    #  / \
    # 4   5
    root3 = TreeNode(1)
    root3.left = TreeNode(2)
    root3.right = TreeNode(3)
    root3.left.left = TreeNode(4)
    root3.left.right = TreeNode(5)
    print(f"Test 3 - Increasing sums: {solution.maxLevelSum(root3)}")  # 3

    # Test case 4: Negative values
    #      -100
    #       /  \
    #     -200 -300
    #      /
    #    -20
    root4 = TreeNode(-100)
    root4.left = TreeNode(-200)
    root4.right = TreeNode(-300)
    root4.left.left = TreeNode(-20)
    print(f"Test 4 - Negative values: {solution.maxLevelSum(root4)}")  # 3

    # Test case 5: Tied sums (return smallest level)
    #     5
    #    / \
    #   3   2
    #  / \
    # 1   4
    root5 = TreeNode(5)
    root5.left = TreeNode(3)
    root5.right = TreeNode(2)
    root5.left.left = TreeNode(1)
    root5.left.right = TreeNode(4)
    print(f"Test 5 - Tied sums: {solution.maxLevelSum(root5)}")  # 1

    # Test case 6: Right-skewed tree
    #  1
    #   \
    #    2
    #     \
    #      3
    root6 = TreeNode(1)
    root6.right = TreeNode(2)
    root6.right.right = TreeNode(3)
    print(f"Test 6 - Right-skewed tree: {solution.maxLevelSum(root6)}")  # 3
