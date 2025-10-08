"""
# 429. N-ary Tree Level Order Traversal
**Medium**

Given an n-ary tree, return the level order traversal of its nodes' values.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Similar to binary tree level-order traversal, but each node can have multiple children.
Use BFS to process nodes level by level, adding all children of each node to the queue.

### APPROACH:
1. **Handle edge case**: Return empty list if tree is empty
2. **Initialize BFS**: Use a deque with root node
3. **For each level**:
   - Process all nodes at current level
   - Collect values in order
   - Add all children of each node to queue for next level
4. **Return result**: List of lists representing each level

### WHY THIS WORKS:
- BFS naturally processes nodes level by level
- By tracking level boundaries (queue size), we process each level independently
- For n-ary trees, we simply iterate through all children instead of just left/right
- Deque provides O(1) append/popleft operations

### TIME COMPLEXITY: O(n)
- Visit each node exactly once
- n = total number of nodes in tree

### SPACE COMPLEXITY: O(w)
- Queue holds at most one level of nodes at a time
- w = maximum width of tree (max children at any level)
- Result storage: O(n)

### EXAMPLE WALKTHROUGH:
```
Tree:        1
          /  |  \
         3   2   4
        / \
       5   6

Level 0: [1]
Level 1: [3, 2, 4]
Level 2: [5, 6]
Result: [[1], [3, 2, 4], [5, 6]]
```

### EDGE CASES:
- Empty tree: Return []
- Single node: Return [[root.val]]
- Node with many children: All added to same level
- Different branching factors at different levels

</details>
"""

from collections import deque
from typing import List, Optional


class Node:
    """Definition for a N-ary tree node."""
    def __init__(self, val=None, children=None):
        self.val = val
        self.children = children if children is not None else []


class Solution:
    def levelOrder(self, root: Optional[Node]) -> List[List[int]]:
        """
        Level order traversal of n-ary tree.

        Args:
            root: Root node of n-ary tree

        Returns:
            List of lists containing node values in level order

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

                # Add all children for next level
                for child in node.children:
                    queue.append(child)

            result.append(level_values)

        return result


def test_solution():
    """Test cases for Problem 429."""
    solution = Solution()

    # Test case 1: Example tree
    #        1
    #     /  |  \
    #    3   2   4
    #   / \
    #  5   6
    root1 = Node(1)
    node3 = Node(3)
    node2 = Node(2)
    node4 = Node(4)
    node5 = Node(5)
    node6 = Node(6)
    root1.children = [node3, node2, node4]
    node3.children = [node5, node6]

    assert solution.levelOrder(root1) == [[1], [3, 2, 4], [5, 6]]
    print("Test case 1 passed: Example tree")

    # Test case 2: Single node
    root2 = Node(1)
    assert solution.levelOrder(root2) == [[1]]
    print("Test case 2 passed: Single node")

    # Test case 3: Empty tree
    assert solution.levelOrder(None) == []
    print("Test case 3 passed: Empty tree")

    # Test case 4: Linear tree (each node has one child)
    #  1
    #  |
    #  2
    #  |
    #  3
    #  |
    #  4
    root4 = Node(1)
    node2_4 = Node(2)
    node3_4 = Node(3)
    node4_4 = Node(4)
    root4.children = [node2_4]
    node2_4.children = [node3_4]
    node3_4.children = [node4_4]

    assert solution.levelOrder(root4) == [[1], [2], [3], [4]]
    print("Test case 4 passed: Linear tree")

    # Test case 5: Wide tree (root has many children)
    #       1
    #   / / | \ \
    #  2 3  4  5 6
    root5 = Node(1)
    root5.children = [Node(2), Node(3), Node(4), Node(5), Node(6)]

    assert solution.levelOrder(root5) == [[1], [2, 3, 4, 5, 6]]
    print("Test case 5 passed: Wide tree")

    # Test case 6: Complex multi-level tree
    #          1
    #      /   |   \
    #     2    3    4
    #    /|\   |   /|\
    #   5 6 7  8  9 10 11
    root6 = Node(1)
    node2_6 = Node(2, [Node(5), Node(6), Node(7)])
    node3_6 = Node(3, [Node(8)])
    node4_6 = Node(4, [Node(9), Node(10), Node(11)])
    root6.children = [node2_6, node3_6, node4_6]

    assert solution.levelOrder(root6) == [[1], [2, 3, 4], [5, 6, 7, 8, 9, 10, 11]]
    print("Test case 6 passed: Complex multi-level tree")

    print("\nAll test cases passed!")


if __name__ == "__main__":
    test_solution()
