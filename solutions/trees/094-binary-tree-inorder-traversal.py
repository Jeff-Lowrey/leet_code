"""
# Difficulty: Easy

# 94. Binary Tree Inorder Traversal

Given the root of a binary tree, return the inorder traversal of its nodes' values.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[1, 3, 2]</dd>
<dt>Output:</dt>
<dd>1</dd>
<dt>Explanation:</dt>
<dd>In-order traversal of tree [1,null,2,3] is [1,3,2]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Inorder traversal visits nodes in the order: Left -> Root -> Right. This gives us a sorted sequence for Binary Search Trees. The key is to implement this pattern using recursion or iteration with a stack.

### APPROACH:
1. **Recursive**: Visit left subtree, process root, visit right subtree
2. **Iterative with stack**: Simulate recursion using explicit stack
3. **Morris traversal**: O(1) space using threading technique

### WHY THIS WORKS:
- Inorder traversal naturally follows left-root-right pattern
- For BSTs, this produces sorted output
- Stack-based approach simulates the call stack of recursion
- Morris traversal modifies tree temporarily to avoid extra space

### EXAMPLE WALKTHROUGH:
```
Tree:    1
          \
           2
          /
         3

Inorder traversal steps:
1. Start at root (1)
2. No left child, process 1
3. Go to right child (2)
4. Go to left child of 2 (which is 3)
5. No left child of 3, process 3
6. No right child of 3, backtrack
7. Process 2
8. No right child of 2

Result: [1, 3, 2]
```

### TIME COMPLEXITY:
O(n)
We visit each node exactly once

### SPACE COMPLEXITY:
- Recursive: O(h) where h is tree height (call stack)
- Iterative: O(h) for explicit stack
- Morris: O(1) constant space

### EDGE CASES:
- **Empty tree**: Return empty list immediately
- **Single node**: Return list with one element
- **Left-skewed tree**: Traversal order is leaf-to-root path
- **Right-skewed tree**: Traversal order is root-to-leaf path
- **BST**: Inorder gives sorted sequence of values

</details>
"""


from typing import Any

class TreeNode:
    def __init__(self, val: Any = 0, left: Any = None, right: Any = None) -> None:
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def inorderTraversal(self, root: TreeNode) -> list[int]:
        """
        Recursive inorder traversal.

        Args:
            root: Root of binary tree

        Returns:
            List of node values in inorder sequence

        Time Complexity: O(n) where n is number of nodes
        Space Complexity: O(h) where h is height of tree (recursion stack)
        """
        result: list[Any] = []

        def inorder(node: Any) -> Any:
            if not node:
                return

            # Left -> Root -> Right
            inorder(node.left)  # Visit left subtree
            result.append(node.val)  # Process current node
            inorder(node.right)  # Visit right subtree

        inorder(root)
        return result

    def inorderTraversalIterative(self, root: TreeNode) -> list[int]:
        """
        Iterative inorder traversal using stack.

        Args:
            root: Root of binary tree

        Returns:
            List of node values in inorder sequence

        Time Complexity: O(n)
        Space Complexity: O(h) for stack
        """
        result = []
        stack: list[Any] = []
        current = root

        while stack or current:
            # Go to the leftmost node
            while current:
                stack.append(current)
                current = current.left

            # Current is None here, so we backtrack
            current = stack.pop()
            result.append(current.val)  # Process current node

            # Move to right subtree
            current = current.right

        return result

    def inorderTraversalMorris(self, root: TreeNode) -> list[int]:
        """
        Morris inorder traversal with O(1) space.

        Args:
            root: Root of binary tree

        Returns:
            List of node values in inorder sequence

        Time Complexity: O(n)
        Space Complexity: O(1) constant space
        """
        result = []
        current = root

        while current:
            if not current.left:
                # No left subtree, process current and go right
                result.append(current.val)
                current = current.right
            else:
                # Find inorder predecessor
                predecessor = current.left
                while predecessor.right and predecessor.right != current:
                    predecessor = predecessor.right

                if not predecessor.right:
                    # Make current as right child of predecessor
                    predecessor.right = current
                    current = current.left
                else:
                    # Revert the changes made
                    predecessor.right = None
                    result.append(current.val)
                    current = current.right

        return result

    def inorderTraversalGenerator(self, root: TreeNode) -> Any:
        """
        Generator version for memory efficiency.

        Args:
            root: Root of binary tree

        Yields:
            Node values in inorder sequence
        """

        def inorder(node: Any) -> Any:
            if node:
                yield from inorder(node.left)
                yield node.val
                yield from inorder(node.right)

        yield from inorder(root)

    def inorderTraversalList(self, root: TreeNode) -> list[int]:
        """
        One-liner using list comprehension with generator.

        Args:
            root: Root of binary tree

        Returns:
            List of node values in inorder sequence
        """
        return list(self.inorderTraversalGenerator(root))


def test_solution() -> None:
    """Test cases for Problem 94."""
    solution = Solution()

    # Test case 1: Example tree [1, null, 2, 3]
    #     1
    #      \
    #       2
    #      /
    #     3
    root1 = TreeNode(1)
    root1.right = TreeNode(2)
    root1.right.left = TreeNode(3)

    result1 = solution.inorderTraversal(root1)
    expected1 = [1, 3, 2]
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Empty tree
    result2 = solution.inorderTraversal(None)  # type: ignore
    expected2: list[Any] = []
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Single node
    root3 = TreeNode(1)
    result3 = solution.inorderTraversal(root3)
    expected3 = [1]
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Complete binary tree
    #       1
    #      / \
    #     2   3
    #    / \
    #   4   5
    root4 = TreeNode(1)
    root4.left = TreeNode(2)
    root4.right = TreeNode(3)
    root4.left.left = TreeNode(4)
    root4.left.right = TreeNode(5)

    result4 = solution.inorderTraversal(root4)
    expected4 = [4, 2, 5, 1, 3]
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Left skewed tree
    #   1
    #  /
    # 2
    # /
    # 3
    root5 = TreeNode(1)
    root5.left = TreeNode(2)
    root5.left.left = TreeNode(3)

    result5 = solution.inorderTraversal(root5)
    expected5 = [3, 2, 1]
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test case 6: Right skewed tree
    # 1
    #  \
    #   2
    #    \
    #     3
    root6 = TreeNode(1)
    root6.right = TreeNode(2)
    root6.right.right = TreeNode(3)

    result6 = solution.inorderTraversal(root6)
    expected6 = [1, 2, 3]
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test iterative approach
    result7 = solution.inorderTraversalIterative(root1)
    assert result7 == expected1, f"Iterative: Expected {expected1}, got {result7}"

    result8 = solution.inorderTraversalIterative(root4)
    assert result8 == expected4, f"Iterative: Expected {expected4}, got {result8}"

    # Test Morris traversal
    result9 = solution.inorderTraversalMorris(root1)
    assert result9 == expected1, f"Morris: Expected {expected1}, got {result9}"

    result10 = solution.inorderTraversalMorris(root4)
    assert result10 == expected4, f"Morris: Expected {expected4}, got {result10}"

    # Test generator approach
    result11 = list(solution.inorderTraversalGenerator(root1))
    assert result11 == expected1, f"Generator: Expected {expected1}, got {result11}"

    # Test list comprehension approach
    result12 = solution.inorderTraversalList(root1)
    assert result12 == expected1, f"List comp: Expected {expected1}, got {result12}"

    print("All test cases passed!")


def create_bst():
    """Create a Binary Search Tree for demonstration."""
    #       4
    #      / \
    #     2   6
    #    / \ / \
    #   1  3 5  7
    root = TreeNode(4)
    root.left = TreeNode(2)
    root.right = TreeNode(6)
    root.left.left = TreeNode(1)
    root.left.right = TreeNode(3)
    root.right.left = TreeNode(5)
    root.right.right = TreeNode(7)
    return root


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 94. Binary Tree Inorder Traversal ===")

    # Example 1: Simple tree
    root1 = TreeNode(1)
    root1.right = TreeNode(2)
    root1.right.left = TreeNode(3)

    print(f"Tree 1 inorder: {solution.inorderTraversal(root1)}")

    # Example 2: BST (should give sorted output)
    bst_root = create_bst()
    print(f"BST inorder (sorted): {solution.inorderTraversal(bst_root)}")

    # Example 3: Compare different approaches
    print(f"\nComparison of approaches on BST:")
    approaches = [
        ("Recursive", solution.inorderTraversal),
        ("Iterative", solution.inorderTraversalIterative),
        ("Morris O(1) space", solution.inorderTraversalMorris),
        ("Generator", lambda x: list(solution.inorderTraversalGenerator(x))),
        ("List comprehension", solution.inorderTraversalList),
    ]

    for name, method in approaches:
        result = method(bst_root)
        print(f"{name}: {result}")

    # Example 4: Empty tree
    print(f"\nEmpty tree: {solution.inorderTraversal(None)}")  # type: ignore

    # Example 5: Single node
    single = TreeNode(42)
    print(f"Single node [42]: {solution.inorderTraversal(single)}")

    print(f"\nKey insights:")
    print(f"1. Inorder: Left -> Root -> Right")
    print(f"2. For BST, inorder gives sorted sequence")
    print(f"3. Recursive: Clean but uses O(h) space")
    print(f"4. Iterative: Explicit stack control")
    print(f"5. Morris: O(1) space using threading")
