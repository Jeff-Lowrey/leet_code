"""
# Difficulty: Medium

# 102. Binary Tree Level Order Traversal

Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[[3]</dd>
<dt>Output:</dt>
<dd>1</dd>
<dt>Explanation:</dt>
<dd>Level-order traversal groups nodes by depth: [[3], [9,20], [15,7]]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Level order traversal visits nodes level by level from left to right. This is a classic BFS (Breadth-First Search) problem where we use a queue to process nodes level by level, collecting values at each level separately.

### APPROACH:
1. **BFS with Queue**: Use queue to process nodes level by level
2. **Level Separation**: Track level size to separate levels in result
3. **Left-to-Right Processing**: Add children left-to-right to maintain order
4. **Result Structure**: Each level becomes a separate list in the result

### WHY THIS WORKS:
- Queue ensures FIFO processing for level-by-level traversal
- Level size tracking allows us to process exactly one level at a time
- Children are added in left-to-right order for correct traversal
- BFS naturally explores breadth before depth

### EXAMPLE WALKTHROUGH:
```
Input: [3,9,20,null,null,15,7]
       3
      / \
     9  20
       /  \
      15   7

Level 0: [3] → queue: [9, 20]
Level 1: [9, 20] → queue: [15, 7]
Level 2: [15, 7] → queue: []
Output: [[3], [9, 20], [15, 7]]
```

### TIME COMPLEXITY:
O(n)
Each node is visited exactly once

### SPACE COMPLEXITY:
O(w)
Where w is maximum width of the tree (queue size)

### EDGE CASES:
- **Empty tree**: Return empty list immediately
- **Single node**: Return [[value]] (one level, one node)
- **Perfect binary tree**: Each level doubles in size
- **Linear tree (skewed)**: Each level has exactly one node
- **Unbalanced tree**: Level sizes vary based on structure

</details>
"""

class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        """
        Return level order traversal using BFS with queue.

        Args:
            root: Root of binary tree

        Returns:
            List of lists, each containing values at that level

        Time Complexity: O(n) where n is number of nodes
        Space Complexity: O(w) where w is maximum width of tree
        """
        if not root:
            return []

        result = []
        queue = deque([root])

        while queue:
            level_size = len(queue)
            current_level = []

            # Process all nodes at current level
            for _ in range(level_size):
                node = queue.popleft()
                current_level.append(node.val)

                # Add children for next level
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)

            result.append(current_level)

        return result

    def levelOrderRecursive(self, root: Optional[TreeNode]) -> List[List[int]]:
        """
        Return level order traversal using recursive DFS with level tracking.

        Args:
            root: Root of binary tree

        Returns:
            List of lists, each containing values at that level
        """
        result = []

        def dfs(node: Optional[TreeNode], level: int) -> None:
            if not node:
                return

            # Ensure result has enough levels
            if level >= len(result):
                result.append([])

            # Add current node to its level
            result[level].append(node.val)

            # Recurse on children
            dfs(node.left, level + 1)
            dfs(node.right, level + 1)

        dfs(root, 0)
        return result

    def levelOrderIterative(self, root: Optional[TreeNode]) -> List[List[int]]:
        """
        Return level order traversal using iterative approach with level markers.

        Args:
            root: Root of binary tree

        Returns:
            List of lists, each containing values at that level
        """
        if not root:
            return []

        result = []
        queue = [(root, 0)]  # (node, level)

        while queue:
            node, level = queue.pop(0)

            # Ensure result has enough levels
            if level >= len(result):
                result.append([])

            # Add current node to its level
            result[level].append(node.val)

            # Add children with incremented level
            if node.left:
                queue.append((node.left, level + 1))
            if node.right:
                queue.append((node.right, level + 1))

        return result

    def levelOrderBottomUp(self, root: Optional[TreeNode]) -> List[List[int]]:
        """
        Return level order traversal from bottom to top.

        Args:
            root: Root of binary tree

        Returns:
            List of lists from bottom level to top level
        """
        if not root:
            return []

        result = []
        queue = deque([root])

        while queue:
            level_size = len(queue)
            current_level = []

            for _ in range(level_size):
                node = queue.popleft()
                current_level.append(node.val)

                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)

            result.append(current_level)

        # Reverse for bottom-up order
        return result[::-1]

def build_tree_from_list(values: List) -> Optional[TreeNode]:
    """Helper function to build tree from list representation."""
    if not values:
        return None

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

def test_solution():
    """Test cases for Problem 102."""
    solution = Solution()

    # Test case 1: Normal binary tree
    tree1 = build_tree_from_list([3, 9, 20, None, None, 15, 7])
    result1 = solution.levelOrder(tree1)
    expected1 = [[3], [9, 20], [15, 7]]
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Single node
    tree2 = TreeNode(1)
    result2 = solution.levelOrder(tree2)
    expected2 = [[1]]
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Empty tree
    tree3 = None
    result3 = solution.levelOrder(tree3)
    expected3 = []
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Linear tree (left skewed)
    tree4 = build_tree_from_list([1, 2, None, 3, None, 4])
    result4 = solution.levelOrder(tree4)
    expected4 = [[1], [2], [3], [4]]
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Linear tree (right skewed)
    tree5 = build_tree_from_list([1, None, 2, None, 3, None, 4])
    result5 = solution.levelOrder(tree5)
    expected5 = [[1], [2], [3], [4]]
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test case 6: Perfect binary tree
    tree6 = build_tree_from_list([1, 2, 3, 4, 5, 6, 7])
    result6 = solution.levelOrder(tree6)
    expected6 = [[1], [2, 3], [4, 5, 6, 7]]
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test alternative implementations
    result7 = solution.levelOrderRecursive(tree1)
    assert result7 == expected1, f"Recursive: Expected {expected1}, got {result7}"

    result8 = solution.levelOrderIterative(tree1)
    assert result8 == expected1, f"Iterative: Expected {expected1}, got {result8}"

    result9 = solution.levelOrderBottomUp(tree1)
    expected9 = [[15, 7], [9, 20], [3]]
    assert result9 == expected9, f"Bottom-up: Expected {expected9}, got {result9}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 102. Binary Tree Level Order Traversal ===")

    # Example 1: Normal tree
    tree1 = build_tree_from_list([3, 9, 20, None, None, 15, 7])
    result1 = solution.levelOrder(tree1)
    print(f"levelOrder([3,9,20,null,null,15,7]) -> {result1}")
    print("Tree structure:")
    print("       3")
    print("      / \\")
    print("     9  20")
    print("       /  \\")
    print("      15   7")
    print("Processing:")
    print("Level 0: [3]")
    print("Level 1: [9, 20]")
    print("Level 2: [15, 7]")

    # Example 2: Single node
    tree2 = TreeNode(1)
    result2 = solution.levelOrder(tree2)
    print(f"\nlevelOrder([1]) -> {result2}")

    # Example 3: Perfect binary tree
    tree3 = build_tree_from_list([1, 2, 3, 4, 5, 6, 7])
    result3 = solution.levelOrder(tree3)
    print(f"\nlevelOrder([1,2,3,4,5,6,7]) -> {result3}")

    # Example 4: Algorithm comparison
    print(f"\nAlgorithm comparison:")
    approaches = [
        ("BFS with queue", solution.levelOrder),
        ("Recursive DFS", solution.levelOrderRecursive),
        ("Iterative with levels", solution.levelOrderIterative),
        ("Bottom-up BFS", solution.levelOrderBottomUp)
    ]

    for name, method in approaches:
        result = method(tree1)
        if name == "Bottom-up BFS":
            print(f"{name}: {result} (reversed order)")
        else:
            print(f"{name}: {result}")

    print(f"\nKey insights:")
    print(f"1. BFS with queue naturally processes level by level")
    print(f"2. Level size tracking separates levels in the result")
    print(f"3. Children added left-to-right maintain correct order")
    print(f"4. Recursive DFS can achieve same result with level parameter")
    print(f"5. Time: O(n), Space: O(w) where w is maximum tree width")
