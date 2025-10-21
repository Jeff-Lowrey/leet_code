"""
# Difficulty: Easy

# 993. Cousins in Binary Tree

Given the root of a binary tree with unique values and the values of two different nodes x and y,
return true if the nodes corresponding to the values x and y are cousins, or false otherwise.

Two nodes of a binary tree are cousins if they have the same depth but have different parents.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>root = [1,2,3,4], x = 4, y = 3</dd>
<dt>Output:</dt>
<dd>false</dd>
<dt>Explanation:</dt>
<dd>Nodes 2 and 3 are not cousins (same parent)</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
**Techniques**: Hash Table Lookup, Two Pointers, Stack Operations
**Data Structures**: Hash Map, Stack, Queue
**Patterns**: Two Pointers Pattern, Graph Pattern
**Time Complexity**: O(n)
**Space Complexity**: O(w)

### INTUITION:
Cousins are nodes at the same level (depth) but with different parents.
Use BFS to track both depth and parent information for each node.

### APPROACH:
1. **Handle edge case**: Return false if tree is empty or has only one node
2. **Initialize BFS**: Use a deque with (node, parent, depth) tuples
3. **Track target nodes**: Store depth and parent when we find x or y
4. **Determine if cousins**:
   - Both nodes must be found
   - They must be at same depth
   - They must have different parents

### WHY THIS WORKS:
- BFS naturally tracks depth by processing level by level
- By storing parent along with each node in queue, we can track parent information
- When we find both target values, we have all information needed to check if they're cousins
- Early termination: Can stop as soon as we find both nodes

### EXAMPLE WALKTHROUGH:
```
Tree:      1
         /   \\
        2     3
       /
      4

x=4, y=3:
- Node 4: depth=2, parent=2
- Node 3: depth=1, parent=1
- Different depths → NOT cousins

x=2, y=3:
- Node 2: depth=1, parent=1
- Node 3: depth=1, parent=1
- Same parent → NOT cousins
```

### TIME COMPLEXITY:
O(n)
- In worst case, visit all nodes in tree
- n = number of nodes in tree

### SPACE COMPLEXITY:
O(w)
- Queue holds at most one level of nodes at a time
- w = maximum width of tree (worst case: n/2 for complete tree)

### EDGE CASES:
- One or both nodes not in tree: Return false
- Nodes at different depths: Return false
- Nodes with same parent (siblings): Return false
- Root node as one of the values: Cannot be cousin

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
    def isCousins(self, root: TreeNode | None, x: int, y: int) -> bool:
        """
        Check if two nodes are cousins in binary tree.

        Args:
            root: Root node of binary tree
            x: Value of first node
            y: Value of second node

        Returns:
            True if nodes are cousins, False otherwise

        Time Complexity: O(n)
        Space Complexity: O(w) where w is max width of tree
        """
        if not root:
            return False

        # Store (parent, depth) for each target value
        info: dict[Any, Any] = {}

        # BFS with (node, parent, depth)
        queue = deque([(root, None, 0)])

        while queue:
            node, parent, depth = queue.popleft()

            # If we found one of the target values, store its info
            if node.val == x or node.val == y:
                info[node.val] = (parent, depth)

                # If we found both, check if they're cousins
                if len(info) == 2:
                    x_parent, x_depth = info[x]
                    y_parent, y_depth = info[y]
                    return x_depth == y_depth and x_parent != y_parent

            # Add children to queue
            if node.left:
                queue.append((node.left, node, depth + 1))  # type: ignore
            if node.right:
                queue.append((node.right, node, depth + 1))  # type: ignore

        # If we didn't find both nodes
        return False

    def isCousins_dfs(self, root: TreeNode | None, x: int, y: int) -> bool:
        """
        Alternative DFS solution.

        Time Complexity: O(n)
        Space Complexity: O(h) where h is height (recursion stack)
        """

        def dfs(
            node: TreeNode | None, parent: TreeNode | None, depth: int, target: int
        ) -> tuple[TreeNode | None, int] | None:
            """Returns (parent, depth) if target found, else None."""
            if not node:
                return None

            if node.val == target:
                return (parent, depth)

            # Search in left and right subtrees
            left = dfs(node.left, node, depth + 1, target)
            if left:
                return left
            return dfs(node.right, node, depth + 1, target)

        x_info = dfs(root, None, 0, x)
        y_info = dfs(root, None, 0, y)

        if not x_info or not y_info:
            return False

        x_parent, x_depth = x_info
        y_parent, y_depth = y_info

        return x_depth == y_depth and x_parent != y_parent


def test_solution() -> None:
    """Test cases for Problem 993."""
    solution = Solution()

    # Test case 1: Example tree - cousins
    #       1
    #      / \
    #     2   3
    #    /
    #   4
    root1 = TreeNode(1)
    root1.left = TreeNode(2)
    root1.right = TreeNode(3)
    root1.left.left = TreeNode(4)
    assert not solution.isCousins(root1, 4, 3)  # Different depths
    assert not solution.isCousins_dfs(root1, 4, 3)
    print("Test case 1 passed: Different depths")

    # Test case 2: Siblings (not cousins)
    #       1
    #      / \
    #     2   3
    #    / \
    #   4   5
    root2 = TreeNode(1)
    root2.left = TreeNode(2)
    root2.right = TreeNode(3)
    root2.left.left = TreeNode(4)
    root2.left.right = TreeNode(5)
    assert not solution.isCousins(root2, 4, 5)  # Same parent
    print("Test case 2 passed: Siblings (same parent)")

    # Test case 3: True cousins
    #       1
    #      / \
    #     2   3
    #    /     \
    #   4       5
    root3 = TreeNode(1)
    root3.left = TreeNode(2)
    root3.right = TreeNode(3)
    root3.left.left = TreeNode(4)
    root3.right.right = TreeNode(5)
    assert solution.isCousins(root3, 4, 5)  # Cousins!
    assert solution.isCousins_dfs(root3, 4, 5)
    print("Test case 3 passed: True cousins")

    # Test case 4: Nodes at root level
    #       1
    #      / \
    #     2   3
    root4 = TreeNode(1)
    root4.left = TreeNode(2)
    root4.right = TreeNode(3)
    assert not solution.isCousins(root4, 2, 3)  # Same parent
    print("Test case 4 passed: Children of root (same parent)")

    # Test case 5: One node doesn't exist
    root5 = TreeNode(1)
    root5.left = TreeNode(2)
    assert not solution.isCousins(root5, 2, 3)  # Node 3 doesn't exist
    print("Test case 5 passed: Node doesn't exist")

    # Test case 6: Complex tree with cousins
    #          1
    #        /   \
    #       2     3
    #      / \   / \
    #     4   5 6   7
    root6 = TreeNode(1)
    root6.left = TreeNode(2)
    root6.right = TreeNode(3)
    root6.left.left = TreeNode(4)
    root6.left.right = TreeNode(5)
    root6.right.left = TreeNode(6)
    root6.right.right = TreeNode(7)
    assert solution.isCousins(root6, 4, 6)  # Cousins
    assert not solution.isCousins(root6, 4, 5)  # Siblings
    assert solution.isCousins(root6, 5, 7)  # Cousins
    assert solution.isCousins_dfs(root6, 5, 7)
    print("Test case 6 passed: Complex tree")

    # Test case 7: Single node
    root7 = TreeNode(1)
    assert not solution.isCousins(root7, 1, 2)
    print("Test case 7 passed: Single node")

    print("\nAll test cases passed!")


if __name__ == "__main__":
    test_solution()
