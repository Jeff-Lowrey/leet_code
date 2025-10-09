"""
# 173. Binary Search Tree Iterator
# Difficulty: Medium
Implement the BSTIterator class that represents an iterator over the in-order traversal of a binary search tree (BST).

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
We need to implement an iterator that traverses a BST in in-order (left -> root -> right).
The challenge is to do this without storing all values upfront, but instead using a controlled stack-based approach.

### APPROACH:
1. **Use a stack**: Maintain a stack to simulate the in-order traversal
2. **Push all left nodes**: Starting from root, push all left children onto the stack
3. **next()**: Pop from stack, return value, then push all left children of the popped node's right child
4. **hasNext()**: Simply check if the stack is empty

### WHY THIS WORKS:
- The stack maintains nodes in the order they need to be visited
- By pushing all left nodes first, we ensure the smallest unvisited node is always on top
- Time complexity is optimized - each node is pushed and popped exactly once
- Space complexity is O(h) where h is the height of the tree

### TIME COMPLEXITY:
- Constructor: O(h) where h is height
- next(): Amortized O(1)
- hasNext(): O(1)

### SPACE COMPLEXITY: O(h) for the stack

### EXAMPLE WALKTHROUGH:
```
Input: [7, 3, 15, null, null, 9, 20]
Stack after init: [7, 3]
next() -> 3, stack: [7, 15, 9]
next() -> 7, stack: [15, 9]
hasNext() -> true
next() -> 9, stack: [15, 20]
```

### EDGE CASES:
- Single node tree
- Left-skewed or right-skewed trees
- Empty tree handling

</details>

<details>
<summary><b>💡 APPROACH</b></summary>

The approach uses a stack-based controlled iteration to simulate in-order traversal.

### Algorithm Steps:
1. Initialize stack and push all left nodes from root
2. For next(), pop stack top, process right subtree's left nodes
3. For hasNext(), check if stack is non-empty

</details>
"""

class TreeNode:
    """Definition for a binary tree node."""
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class BSTIterator:
    """
    Binary Search Tree Iterator with O(h) space complexity.

    Implements in-order traversal using a stack.
    """

    def __init__(self, root: TreeNode):
        """
        Initialize the iterator with the BST root.

        Args:
            root: Root of the binary search tree

        Time Complexity: O(h) where h is the height
        Space Complexity: O(h) for the stack
        """
        self.stack = []
        self._push_left_nodes(root)

    def _push_left_nodes(self, node: TreeNode) -> None:
        """
        Helper method to push all left children of a node onto the stack.

        Args:
            node: Starting node to push left children from
        """
        while node:
            self.stack.append(node)
            node = node.left

    def next(self) -> int:
        """
        Returns the next smallest number in the BST.

        Returns:
            int: The next value in in-order traversal

        Time Complexity: Amortized O(1)
        Space Complexity: O(1)
        """
        # Pop the top node (next smallest)
        node = self.stack.pop()

        # If it has a right child, push all left nodes of right subtree
        if node.right:
            self._push_left_nodes(node.right)

        return node.val

    def hasNext(self) -> bool:
        """
        Returns whether there are more nodes to visit.

        Returns:
            bool: True if there are more nodes, False otherwise

        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        return len(self.stack) > 0

def test_solution():
    """
    Test cases for BST Iterator.
    """
    # Helper function to build tree
    def build_tree(values, index=0):
        """Build tree from level-order array representation."""
        if index >= len(values) or values[index] is None:
            return None

        node = TreeNode(values[index])
        node.left = build_tree(values, 2 * index + 1)
        node.right = build_tree(values, 2 * index + 2)
        return node

    # Test case 1: Example from problem
    #       7
    #      / \
    #     3   15
    #        /  \
    #       9   20
    root1 = TreeNode(7)
    root1.left = TreeNode(3)
    root1.right = TreeNode(15)
    root1.right.left = TreeNode(9)
    root1.right.right = TreeNode(20)

    iterator1 = BSTIterator(root1)
    result1 = []
    while iterator1.hasNext():
        result1.append(iterator1.next())
    expected1 = [3, 7, 9, 15, 20]
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Left-skewed tree
    #     5
    #    /
    #   3
    #  /
    # 1
    root2 = TreeNode(5)
    root2.left = TreeNode(3)
    root2.left.left = TreeNode(1)

    iterator2 = BSTIterator(root2)
    result2 = []
    while iterator2.hasNext():
        result2.append(iterator2.next())
    expected2 = [1, 3, 5]
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Right-skewed tree
    # 1
    #  \
    #   3
    #    \
    #     5
    root3 = TreeNode(1)
    root3.right = TreeNode(3)
    root3.right.right = TreeNode(5)

    iterator3 = BSTIterator(root3)
    result3 = []
    while iterator3.hasNext():
        result3.append(iterator3.next())
    expected3 = [1, 3, 5]
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Single node
    root4 = TreeNode(42)
    iterator4 = BSTIterator(root4)
    assert iterator4.hasNext() == True
    assert iterator4.next() == 42
    assert iterator4.hasNext() == False

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    root = TreeNode(7)
    root.left = TreeNode(3)
    root.right = TreeNode(15)
    root.right.left = TreeNode(9)
    root.right.right = TreeNode(20)

    iterator = BSTIterator(root)
    print("BST Iterator demonstration:")
    print(f"next() = {iterator.next()}")     # 3
    print(f"next() = {iterator.next()}")     # 7
    print(f"hasNext() = {iterator.hasNext()}")  # True
    print(f"next() = {iterator.next()}")     # 9
    print(f"hasNext() = {iterator.hasNext()}")  # True
    print(f"next() = {iterator.next()}")     # 15
    print(f"hasNext() = {iterator.hasNext()}")  # True
    print(f"next() = {iterator.next()}")     # 20
    print(f"hasNext() = {iterator.hasNext()}")  # False
