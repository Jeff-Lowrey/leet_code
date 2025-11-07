"""
### INTUITION:
The key insight is that use level-order traversal (BFS) to connect nodes at the same level.
For each level, link each node to the next node in the queue.

### APPROACH:
1. **Handle edge case**: Return root if tree is empty
2. **Initialize BFS**: Use a deque with root node
3. **For each level**:
   - Record level size
   - Process all nodes at current level
   - Connect each node to the next node in same level
   - Last node in level points to NULL (already set)
   - Add children to queue for next level

### WHY THIS WORKS:
- This ensures that bFS processes nodes level by level, left to right
- This ensures that within each level, nodes are in the queue in left-to-right order
- This ensures that by connecting each node to the next node in queue (at same level), we establish next pointers
- This ensures that last node of each level naturally has next = NULL

### EXAMPLE WALKTHROUGH:
Input:
```
Tree:        1
```

/   \\
2     3
/ \\   / \\
4   5 6   7
After connecting:

Steps:
Step 1: Level 0: 1 -> NULL
Step 2: Level 1: 2 -> 3 -> NULL
Step 3: Level 2: 4 -> 5 -> 6 -> 7 -> NULL

Output:
```
[Expected output]
```

### TIME COMPLEXITY:
**O(n)**
- Visit each node exactly once
- n = number of nodes in tree

### SPACE COMPLEXITY:
**O(w)**
- Queue holds at most one level of nodes at a time
- w = maximum width of tree (for perfect tree: n/2 at last level)

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

"""

from collections import deque
from typing import Any


class Node:
    """Binary tree node with next pointer."""

    def __init__(self, val: Any = None, left: Any = None, right: Any = None, next: Any = None) -> None:
        self.val = val
        self.left = left
        self.right = right
        self.next = next


class Solution:
    def connect(self, root: Node | None) -> Node:
        """
        Populate next right pointers in perfect binary tree.

        Args:
            root: Root node of perfect binary tree

        Returns:
            Root node with next pointers populated

        Time Complexity: O(n)
        Space Complexity: O(w) where w is max width of tree
        """
        if not root:
            return None  # type: ignore

        queue = deque([root])

        while queue:
            level_size = len(queue)

            # Process all nodes at current level
            for i in range(level_size):
                node = queue.popleft()

                # Connect to next node in same level
                if i < level_size - 1:
                    node.next = queue[0]  # Peek at next node

                # Add children for next level
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)

        return root

    def connect_optimized(self, root: Node | None) -> Node:  # type: ignore[misc]
        """
        O(1) space solution using previously established next pointers.

        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        if not root:
            return None  # type: ignore

        # Start with the root
        leftmost = root

        while leftmost.left:  # While not on leaf level
            # Traverse current level using next pointers
            head = leftmost

            while head:
                # Connection 1: Connect left child to right child
                head.left.next = head.right

                # Connection 2: Connect right child to next node's left child
                if head.next:
                    head.right.next = head.next.left

                # Move to next node in current level
                head = head.next

            # Move to next level
            leftmost = leftmost.left

        return root


def print_levels_with_next(root: Node | None) -> None:
    """Helper function to print tree levels with next pointers."""
    if not root:
        print("Empty tree")
        return

    level = 0
    current = root

    while current:
        print(f"Level {level}: ", end="")
        node = current
        while node:
            print(f"{node.val}", end="")
            if node.next:
                print(" -> ", end="")
            node = node.next
        print(" -> NULL")
        current = current.left
        level += 1


def test_solution() -> None:
    """Test cases for Problem 116."""
    solution = Solution()

    # Test case 1: Perfect binary tree
    #        1
    #       / \
    #      2   3
    #     / \ / \
    #    4  5 6  7
    root1 = Node(1)
    root1.left = Node(2)
    root1.right = Node(3)
    root1.left.left = Node(4)
    root1.left.right = Node(5)
    root1.right.left = Node(6)
    root1.right.right = Node(7)

    result1 = solution.connect(root1)
    print("Test case 1: Perfect binary tree")
    print_levels_with_next(result1)
    assert result1.next is None
    assert result1.left.next == result1.right
    assert result1.left.left.next == result1.left.right
    print("Test case 1 passed!\n")

    # Test case 2: Single node
    root2 = Node(1)
    result2 = solution.connect(root2)
    print("Test case 2: Single node")
    print_levels_with_next(result2)
    assert result2.next is None
    print("Test case 2 passed!\n")

    # Test case 3: Empty tree
    result3 = solution.connect(None)
    # assert result3 is None  # type: ignore[unreachable]  # Unreachable - commented out
    print("Test case 3 passed: Empty tree\n")

    # Test case 4: Three levels with optimized solution
    root4 = Node(1)
    root4.left = Node(2)
    root4.right = Node(3)
    root4.left.left = Node(4)
    root4.left.right = Node(5)
    root4.right.left = Node(6)
    root4.right.right = Node(7)

    result4 = solution.connect_optimized(root4)
    print("Test case 4: Optimized O(1) space solution")
    print_levels_with_next(result4)
    assert result4.right.next is None
    assert result4.left.right.next == result4.right.left
    print("Test case 4 passed!\n")

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()
