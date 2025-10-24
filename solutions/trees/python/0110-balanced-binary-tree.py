"""
# Difficulty: Easy

# 110. Balanced Binary Tree

Given a binary tree, determine if it is height-balanced.

A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than 1.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[3,9,20,null,null,15,7]</dd>
        ("Alternative recursive", solution.isBalancedAlternative),
        ("Iterative", solution.isBalancedIterative)]</dd>
<dt>Output:</dt>
<dd>"{name}: {result}"</dd>
<dt>Explanation:</dt>
<dd>The tree is balanced because the height difference between left and right subtrees is at most 1 at every node</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
**Techniques**: Hash Table Lookup, Two Pointers, Sliding Window
**Data Structures**: Array, Stack, Queue
**Patterns**: Two Pointers Pattern, Sliding Window Pattern
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(h)

### INTUITION:
A balanced binary tree requires that for every node, the heights of its left and right subtrees differ by at most 1. The key insight is to check this condition recursively while computing heights bottom-up.

### APPROACH:
1. **Recursive Height Calculation**: Calculate height of each subtree recursively
2. **Balance Check**: For each node, check if |left_height - right_height| ≤ 1
3. **Early Termination**: If any subtree is unbalanced, immediately return False
4. **Bottom-Up**: Check balance condition while returning heights

### WHY THIS WORKS:
- Height-balanced property must hold for ALL nodes, not just root
- Recursive structure naturally checks every node
- Bottom-up approach avoids redundant height calculations
- Early termination optimizes for unbalanced trees

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
1. Check node 9: height = 1, balanced ✓
2. Check node 15: height = 1, balanced ✓
3. Check node 7: height = 1, balanced ✓
4. Check node 20: left_height = 1, right_height = 1, |1-1| = 0 ≤ 1 ✓
5. Check node 3: left_height = 1, right_height = 2, |1-2| = 1 ≤ 1 ✓

Output:
```
True
```

### TIME COMPLEXITY:
O(n)
Each node is visited exactly once

### SPACE COMPLEXITY:
O(h)
Where h is height of tree (recursion stack)

### EDGE CASES:
- **Empty tree**: Return True (null tree is balanced)
- **Single node**: Return True (height-balanced by definition)
- **Perfect binary tree**: All levels completely filled, always balanced
- **Linear tree (skewed)**: Height difference > 1, return False
- **Subtree unbalanced**: Early termination returns -1 immediately

</details>
"""

from typing import Any


class TreeNode:
    def __init__(self, val: Any = 0, left: Any = None, right: Any = None) -> None:
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def isBalanced(self, root: TreeNode) -> bool:
        """
        Check if binary tree is height-balanced.

        Args:
            root: Root of binary tree

        Returns:
            True if tree is balanced, False otherwise

        Time Complexity: O(n) where n is number of nodes
        Space Complexity: O(h) where h is height of tree
        """

        def checkHeight(node: TreeNode) -> int:
            """
            Return height if balanced, -1 if unbalanced.

            Args:
                node: Current tree node

            Returns:
                Height of subtree if balanced, -1 if unbalanced
            """
            if not node:
                return 0

            # Check left subtree
            left_height = checkHeight(node.left)
            if left_height == -1:
                return -1  # Left subtree is unbalanced

            # Check right subtree
            right_height = checkHeight(node.right)
            if right_height == -1:
                return -1  # Right subtree is unbalanced

            # Check balance condition for current node
            if abs(left_height - right_height) > 1:
                return -1  # Current node is unbalanced

            # Return height of current subtree
            return max(left_height, right_height) + 1

        return checkHeight(root) != -1

    def isBalancedAlternative(self, root: TreeNode) -> bool:
        """
        Alternative approach using separate height function.

        Args:
            root: Root of binary tree

        Returns:
            True if tree is balanced, False otherwise
        """

        def getHeight(node: TreeNode) -> int:
            """Get height of subtree."""
            if not node:
                return 0
            return max(getHeight(node.left), getHeight(node.right)) + 1

        def isBalancedHelper(node: TreeNode) -> bool:
            """Check if subtree is balanced."""
            if not node:
                return True

            # Check balance condition for current node
            left_height = getHeight(node.left)
            right_height = getHeight(node.right)

            if abs(left_height - right_height) > 1:
                return False

            # Recursively check subtrees
            return isBalancedHelper(node.left) and isBalancedHelper(node.right)

        return isBalancedHelper(root)

    def isBalancedIterative(self, root: TreeNode) -> bool:
        """
        Iterative approach using stack and height calculation.

        Args:
            root: Root of binary tree

        Returns:
            True if tree is balanced, False otherwise
        """
        if not root:
            return True

        def getHeight(node: TreeNode) -> int:
            """Calculate height iteratively."""
            if not node:
                return 0

            stack = [(node, 1)]
            max_height = 0

            while stack:
                current, height = stack.pop()
                max_height = max(max_height, height)

                if current.left:
                    stack.append((current.left, height + 1))
                if current.right:
                    stack.append((current.right, height + 1))

            return max_height

        # Check each node iteratively
        stack = [root]
        while stack:
            node = stack.pop()

            left_height = getHeight(node.left)
            right_height = getHeight(node.right)

            if abs(left_height - right_height) > 1:
                return False

            if node.left:
                stack.append(node.left)
            if node.right:
                stack.append(node.right)

        return True


def build_tree_from_list(values: list) -> TreeNode:
    """Helper function to build tree from list representation."""
    if not values:
        return None  # type: ignore

    root = TreeNode(values[0])
    queue = [root]
    i = 1

    while queue and i < len(values):
        node = queue.pop(0)

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
    """Test cases for Problem 110."""
    solution = Solution()

    # Test case 1: Balanced tree
    tree1 = build_tree_from_list([3, 9, 20, None, None, 15, 7])
    result1 = solution.isBalanced(tree1)
    expected1 = True
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Unbalanced tree
    tree2 = build_tree_from_list([1, 2, 2, 3, 3, None, None, 4, 4])
    result2 = solution.isBalanced(tree2)
    expected2 = False
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Empty tree
    tree3 = None
    result3 = solution.isBalanced(tree3)  # type: ignore
    expected3 = True
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Single node
    tree4 = TreeNode(1)
    result4 = solution.isBalanced(tree4)
    expected4 = True
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Linear tree (unbalanced)
    tree5 = build_tree_from_list([1, 2, None, 3, None, 4])
    result5 = solution.isBalanced(tree5)
    expected5 = False
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test case 6: Perfect binary tree
    tree6 = build_tree_from_list([1, 2, 3, 4, 5, 6, 7])
    result6 = solution.isBalanced(tree6)
    expected6 = True
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test alternative implementations
    result7 = solution.isBalancedAlternative(tree1)
    assert result7 == expected1, f"Alternative: Expected {expected1}, got {result7}"

    result8 = solution.isBalancedIterative(tree1)
    assert result8 == expected1, f"Iterative: Expected {expected1}, got {result8}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 110. Balanced Binary Tree ===")

    # Example 1: Balanced tree
    tree1 = build_tree_from_list([3, 9, 20, None, None, 15, 7])
    result1 = solution.isBalanced(tree1)
    print(f"isBalanced([3,9,20,null,null,15,7]) -> {result1}")
    print("Tree structure:")
    print("       3")
    print("      / \\")
    print("     9  20")
    print("       /  \\")
    print("      15   7")
    print("Heights: 9=1, 15=1, 7=1, 20=2, 3=3. All differences ≤ 1 ✓")

    # Example 2: Unbalanced tree
    tree2 = build_tree_from_list([1, 2, 2, 3, 3, None, None, 4, 4])
    result2 = solution.isBalanced(tree2)
    print(f"\nisBalanced([1,2,2,3,3,null,null,4,4]) -> {result2}")
    print("Tree structure:")
    print("         1")
    print("       /   \\")
    print("      2     2")
    print("     / \\")
    print("    3   3")
    print("   / \\")
    print("  4   4")
    print("Left subtree height = 4, Right subtree height = 1. |4-1| = 3 > 1 ✗")

    # Example 3: Algorithm comparison
    print(f"\nAlgorithm comparison:")
    approaches = [
        ("Optimized recursive", solution.isBalanced),
        ("Alternative recursive", solution.isBalancedAlternative),
        ("Iterative", solution.isBalancedIterative),
    ]

    for name, method in approaches:
        result = method(tree1)
        print(f"{name}: {result}")

    print(f"\nKey insights:")
    print(f"1. Balance condition: |left_height - right_height| ≤ 1 for ALL nodes")
    print(f"2. Recursive approach with early termination is most efficient")
    print(f"3. Bottom-up calculation avoids redundant height computations")
    print(f"4. Empty trees and single nodes are always balanced")
    print(f"5. Time complexity: O(n), Space complexity: O(h)")
