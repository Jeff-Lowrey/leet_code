"""
# Difficulty: Easy

# 104. Maximum Depth of Binary Tree

Given the root of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[3,9,20,null,null,15,7]</dd>
        ("BFS Level-order", solution.maxDepthBFS),
        ("Iterative DFS", solution.maxDepthIterativeDFS),
        ("Preorder traversal", solution.maxDepthPreorder)]</dd>
<dt>Output:</dt>
<dd>3</dd>
<dt>Explanation:</dt>
<dd>The maximum depth of the tree is 3 (from root to deepest leaf)</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
**Techniques**: Hash Table Lookup, Array Traversal, Two Pointers
**Data Structures**: Array, Stack, Queue
**Patterns**: Two Pointers Pattern, Hash Table Pattern
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(h)

### INTUITION:
The maximum depth of a binary tree is simply 1 plus the maximum depth of its left and right subtrees. This naturally suggests a recursive solution where we explore both subtrees and return the maximum depth.

### APPROACH:
1. **Base Case**: If node is None, depth is 0
2. **Recursive Case**: Depth = 1 + max(left_depth, right_depth)
3. **Multiple Approaches**: Recursive (DFS), iterative (BFS), and stack-based solutions

### WHY THIS WORKS:
- Tree depth follows recursive structure naturally
- Each node contributes 1 to the total depth
- Maximum depth is determined by the deepest branch
- Both DFS and BFS can solve this problem effectively

### EXAMPLE WALKTHROUGH:
Input:
```
[3,9,20,null,null,15,7]
```

3
/ \
9  20
/  \
15   7
1. maxDepth(3): 1 + max(maxDepth(9), maxDepth(20))
2. maxDepth(9): 1 + max(0, 0) = 1
3. maxDepth(20): 1 + max(maxDepth(15), maxDepth(7))
4. maxDepth(15): 1 + max(0, 0) = 1
5. maxDepth(7): 1 + max(0, 0) = 1
6. maxDepth(20): 1 + max(1, 1) = 2
7. maxDepth(3): 1 + max(1, 2) = 3

Output:
```
3
```

### TIME COMPLEXITY:
O(n)
Must visit every node to determine maximum depth

### SPACE COMPLEXITY:
O(h)
Where h is height of tree (recursion stack or queue size)

### EDGE CASES:
- **Empty tree**: Return 0 (no nodes means depth is 0)
- **Single node**: Return 1 (root node has depth 1)
- **Linear tree (left/right skewed)**: Depth equals number of nodes
- **Perfect binary tree**: Depth is log2(n+1) for n nodes
- **Unbalanced tree**: Return depth of deepest leaf node

</details>
"""

from collections import deque
from typing import Any


class TreeNode:
    def __init__(self, val: Any = 0, left: Any = None, right: Any = None) -> None:
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def maxDepth(self, root: TreeNode) -> int:
        """
        Find maximum depth using recursive DFS.

        Args:
            root: Root of binary tree

        Returns:
            Maximum depth of the tree

        Time Complexity: O(n) where n is number of nodes
        Space Complexity: O(h) where h is height of tree
        """
        if not root:
            return 0

        left_depth = self.maxDepth(root.left)
        right_depth = self.maxDepth(root.right)

        return 1 + max(left_depth, right_depth)

    def maxDepthBFS(self, root: TreeNode) -> int:
        """
        Find maximum depth using BFS level-order traversal.

        Args:
            root: Root of binary tree

        Returns:
            Maximum depth of the tree

        Time Complexity: O(n)
        Space Complexity: O(w) where w is maximum width of tree
        """
        if not root:
            return 0

        queue = deque([root])
        depth = 0

        while queue:
            depth += 1
            level_size = len(queue)

            # Process all nodes at current level
            for _ in range(level_size):
                node = queue.popleft()

                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)

        return depth

    def maxDepthIterativeDFS(self, root: TreeNode) -> int:
        """
        Find maximum depth using iterative DFS with stack.

        Args:
            root: Root of binary tree

        Returns:
            Maximum depth of the tree

        Time Complexity: O(n)
        Space Complexity: O(h)
        """
        if not root:
            return 0

        stack = [(root, 1)]  # (node, current_depth)
        max_depth = 0

        while stack:
            node, current_depth = stack.pop()
            max_depth = max(max_depth, current_depth)

            if node.left:
                stack.append((node.left, current_depth + 1))
            if node.right:
                stack.append((node.right, current_depth + 1))

        return max_depth

    def maxDepthPreorder(self, root: TreeNode) -> int:
        """
        Find maximum depth using preorder traversal approach.

        Args:
            root: Root of binary tree

        Returns:
            Maximum depth of the tree
        """
        self.max_depth = 0

        def preorder(node: TreeNode, depth: int) -> None:
            if not node:
                return

            self.max_depth = max(self.max_depth, depth)
            preorder(node.left, depth + 1)
            preorder(node.right, depth + 1)

        if root:
            preorder(root, 1)

        return self.max_depth


def build_tree_from_list(values: list) -> TreeNode:
    """Helper function to build tree from list representation."""
    if not values:
        return None  # type: ignore

    root = TreeNode(values[0])
    queue = deque([root])
    i = 1

    while queue and i < len(values):
        node = queue.popleft()

        if i < len(values) and values[i] is not None:
            node.left = TreeNode(values[i])
            queue.append(node.left)
        i += 1

        if i < len(values) and values[i] is not None:
            node.right = TreeNode(values[i])
            queue.append(node.right)
        i += 1

    return root


def test_solution() -> None:
    """Test cases for Problem 104."""
    solution = Solution()

    # Test case 1: Normal binary tree
    tree1 = build_tree_from_list([3, 9, 20, None, None, 15, 7])
    result1 = solution.maxDepth(tree1)
    expected1 = 3
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Single node
    tree2 = TreeNode(1)
    result2 = solution.maxDepth(tree2)
    expected2 = 1
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Empty tree
    tree3 = None
    result3 = solution.maxDepth(tree3)  # type: ignore
    expected3 = 0
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Linear tree (left skewed)
    tree4 = build_tree_from_list([1, 2, None, 3, None, 4])
    result4 = solution.maxDepth(tree4)
    expected4 = 4
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Linear tree (right skewed)
    tree5 = build_tree_from_list([1, None, 2, None, 3, None, 4])
    result5 = solution.maxDepth(tree5)
    expected5 = 4
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test case 6: Perfect binary tree
    tree6 = build_tree_from_list([1, 2, 3, 4, 5, 6, 7])
    result6 = solution.maxDepth(tree6)
    expected6 = 3
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test alternative implementations
    result7 = solution.maxDepthBFS(tree1)
    assert result7 == expected1, f"BFS: Expected {expected1}, got {result7}"

    result8 = solution.maxDepthIterativeDFS(tree1)
    assert result8 == expected1, f"Iterative DFS: Expected {expected1}, got {result8}"

    result9 = solution.maxDepthPreorder(tree1)
    assert result9 == expected1, f"Preorder: Expected {expected1}, got {result9}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 104. Maximum Depth of Binary Tree ===")

    # Example 1: Normal tree
    tree1 = build_tree_from_list([3, 9, 20, None, None, 15, 7])
    result1 = solution.maxDepth(tree1)
    print(f"maxDepth([3,9,20,null,null,15,7]) -> {result1}")
    print("Tree structure:")
    print("       3")
    print("      / \\")
    print("     9  20")
    print("       /  \\")
    print("      15   7")
    print("Depth calculation: 1 + max(1, 2) = 3")

    # Example 2: Single node
    tree2 = TreeNode(1)
    result2 = solution.maxDepth(tree2)
    print(f"\nmaxDepth([1]) -> {result2}")

    # Example 3: Empty tree
    tree3 = None
    result3 = solution.maxDepth(tree3)  # type: ignore
    print(f"maxDepth([]) -> {result3}")

    # Example 4: Algorithm comparison
    print(f"\nAlgorithm comparison:")
    approaches = [
        ("Recursive DFS", solution.maxDepth),
        ("BFS Level-order", solution.maxDepthBFS),
        ("Iterative DFS", solution.maxDepthIterativeDFS),
        ("Preorder traversal", solution.maxDepthPreorder),
    ]

    for name, method in approaches:
        result = method(tree1)
        print(f"{name}: result")

    print(f"\nKey insights:")
    print(f"1. Recursive solution: depth = 1 + max(left_depth, right_depth)")
    print(f"2. BFS counts levels directly as it processes each level")
    print(f"3. Iterative DFS tracks depth with each node in stack")
    print(f"4. Empty trees have depth 0, single nodes have depth 1")
    print(f"5. Time complexity: O(n) for all approaches")
