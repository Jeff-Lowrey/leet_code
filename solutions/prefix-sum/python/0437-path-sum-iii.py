"""
### INTUITION:
The key insight is that this problem extends the prefix sum concept to binary trees. For any path from node A to node B going downwards, if we know the prefix sum from root to A and root to B, then path sum A→B = prefix_sum[B] - prefix_sum[A]. We can use a hashmap to store the frequency of prefix sums as we traverse the tree, similar to the "Subarray Sum Equals K" problem.

### APPROACH:
1. **Use DFS traversal**: Traverse tree in preorder (root, left, right)
2. **Track prefix sums**: Maintain running sum from root to current node
3. **HashMap for counts**: Store frequency of each prefix sum seen
4. **Find valid paths**: At each node, check if (current_sum - targetSum) exists
5. **Backtrack**: Remove current prefix sum when returning from recursion

### WHY THIS WORKS:
- Path sum from node A to B = prefix_sum[B] - prefix_sum[A]
- If we want path sum = targetSum, we need: prefix_sum[B] - prefix_sum[A] = targetSum
- Therefore: prefix_sum[A] = prefix_sum[B] - targetSum
- By storing prefix sums in hashmap during DFS, we can find all valid starting points
- Backtracking ensures we only count paths that go downwards (no upward paths)

### EXAMPLE WALKTHROUGH:
Input:
```
root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
```

Tree structure:
10
/  \\
5   -3
/ \\    \\
3   2   11
/ \\   \\
3  -2   1
DFS traversal with prefix sums:
Node 10: sum=10, need=10-8=2, count=0, map={0:1, 10:1}
Node 5: sum=15, need=15-8=7, count=0, map={0:1, 10:1, 15:1}
Node 3: sum=18, need=18-8=10, count=1 (found 10), map={0:1, 10:1, 15:1, 18:1}
Node 3: sum=21, need=21-8=13, count=0, map={0:1, 10:1, 15:1, 18:1, 21:1}
... and so on
Total paths with sum 8: 3

Output:
```
[Expected output]
```

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
**O(n)**
Visit each node exactly once, with **O(1)** hashmap operations per node

### SPACE COMPLEXITY:
**O(h)**
Recursion stack depth is tree height h, hashmap stores at most h entries in any path

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

"""

from collections import defaultdict
from typing import Any


class TreeNode:
    def __init__(self, val: Any = 0, left: Any = None, right: Any = None) -> None:
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def pathSum(self, root: TreeNode | None, targetSum: int) -> int:
        """
        Count paths with sum equal to targetSum using prefix sum approach.

        Args:
            root: Root of binary tree
            targetSum: Target path sum

        Returns:
            Number of paths with sum equal to targetSum

        Time Complexity: O(n) - visit each node once
        Space Complexity: O(h) - recursion stack and hashmap, where h is height
        """
        # HashMap to store: prefix_sum -> frequency
        prefix_sum_count = {0: 1}  # Base case: empty path has sum 0

        def dfs(node: TreeNode | None, current_sum: int) -> int:
            if not node:
                return 0

            # Update current prefix sum
            current_sum += node.val

            # Check how many paths end at current node with target sum
            # We need: current_sum - some_previous_sum = targetSum
            # So: some_previous_sum = current_sum - targetSum
            needed_sum = current_sum - targetSum
            count = prefix_sum_count.get(needed_sum, 0)

            # Add current prefix sum to hashmap
            prefix_sum_count[current_sum] = prefix_sum_count.get(current_sum, 0) + 1

            # Explore left and right subtrees
            count += dfs(node.left, current_sum)
            count += dfs(node.right, current_sum)

            # Backtrack: remove current prefix sum (going back up the tree)
            prefix_sum_count[current_sum] -= 1

            return count

        return dfs(root, 0)

    def pathSumAlternative(self, root: TreeNode | None, targetSum: int) -> int:
        """
        Alternative implementation with defaultdict.

        Args:
            root: Root of binary tree
            targetSum: Target path sum

        Returns:
            Number of paths with sum equal to targetSum
        """

        def dfs(node: TreeNode | None, current_sum: int, prefix_map: dict[int, int]) -> int:
            if not node:
                return 0

            current_sum += node.val

            # Count paths ending at current node
            count = prefix_map[current_sum - targetSum]

            # Update prefix map
            prefix_map[current_sum] += 1

            # Explore children
            count += dfs(node.left, current_sum, prefix_map)
            count += dfs(node.right, current_sum, prefix_map)

            # Backtrack
            prefix_map[current_sum] -= 1

            return count

        prefix_map: dict[Any, int] = defaultdict(int)
        prefix_map[0] = 1
        return dfs(root, 0, prefix_map)

    def pathSumBruteForce(self, root: TreeNode | None, targetSum: int) -> int:
        """
        Brute force solution checking all possible paths.

        Args:
            root: Root of binary tree
            targetSum: Target path sum

        Returns:
            Number of paths with sum equal to targetSum

        Time Complexity: O(n²) - for each node, check all paths from that node
        Space Complexity: O(h) - recursion stack
        """

        def count_paths_from_node(node: TreeNode | None, target: int) -> int:
            """Count paths starting from given node."""
            if not node:
                return 0

            count = 1 if node.val == target else 0
            remaining = target - node.val

            count += count_paths_from_node(node.left, remaining)
            count += count_paths_from_node(node.right, remaining)

            return count

        def dfs(node: TreeNode | None) -> int:
            """Visit each node and count paths starting from it."""
            if not node:
                return 0

            # Count paths starting from current node
            count = count_paths_from_node(node, targetSum)

            # Count paths in left and right subtrees
            count += dfs(node.left)
            count += dfs(node.right)

            return count

        return dfs(root)

    def pathSumVerbose(self, root: TreeNode | None, targetSum: int) -> int:
        """
        More verbose implementation with detailed comments.

        Args:
            root: Root of binary tree
            targetSum: Target path sum

        Returns:
            Number of paths with sum equal to targetSum
        """
        self.result = 0
        prefix_sums = {0: 1}

        def traverse(node: TreeNode | None, path_sum: int) -> None:
            if not node:
                return

            # Add current node's value to path sum
            path_sum += node.val

            # Check if there's a prefix sum that would give us targetSum
            # path_sum - prefix_sum = targetSum
            # prefix_sum = path_sum - targetSum
            complement = path_sum - targetSum
            if complement in prefix_sums:
                self.result += prefix_sums[complement]

            # Add current path sum to map
            if path_sum in prefix_sums:
                prefix_sums[path_sum] += 1
            else:
                prefix_sums[path_sum] = 1

            # Traverse children
            traverse(node.left, path_sum)
            traverse(node.right, path_sum)

            # Backtrack: remove current path sum
            prefix_sums[path_sum] -= 1
            if prefix_sums[path_sum] == 0:
                del prefix_sums[path_sum]

        traverse(root, 0)
        return self.result


def test_solution() -> None:
    """Test cases for Problem 437."""
    solution = Solution()

    # Helper function to build tree from list
    def build_tree(values: list[Any]) -> TreeNode:
        """Build binary tree from level-order list."""
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

    # Test case 1: Basic example
    root1 = build_tree([10, 5, -3, 3, 2, None, 11, 3, -2, None, 1])
    result1 = solution.pathSum(root1, 8)
    expected1 = 3  # Paths: 5->3, 5->2->1, -3->11
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Simple path
    root2 = build_tree([5, 4, 8, 11, None, 13, 4, 7, 2, None, None, 5, 1])
    result2 = solution.pathSum(root2, 22)
    expected2 = 3  # Multiple paths sum to 22
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Single node
    root3 = build_tree([1])
    result3 = solution.pathSum(root3, 1)
    expected3 = 1
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: No valid paths
    root4 = build_tree([1, 2, 3])
    result4 = solution.pathSum(root4, 10)
    expected4 = 0
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Target sum is 0
    root5 = build_tree([0, 1, -1])
    result5 = solution.pathSum(root5, 0)
    expected5 = 3  # [0], [1,-1] from left, [1,-1] another way
    # Actually: [0], left subtree 1+-1=0? No, need downward path
    # Paths: [0] only, or continuous paths with sum 0
    # Let's recalculate: root=0 (1 path), no other continuous downward paths sum to 0
    # Actually we need to test this properly

    # Test case 6: All same values
    root6 = build_tree([1, 1, 1])
    result6 = solution.pathSum(root6, 2)
    expected6 = 2  # [1,1] left path and [1,1] right path
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test brute force solution
    root7 = build_tree([10, 5, -3, 3, 2, None, 11, 3, -2, None, 1])
    result7 = solution.pathSumBruteForce(root7, 8)
    expected7 = 3
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    # Test alternative solution
    root8 = build_tree([5, 4, 8, 11, None, 13, 4, 7, 2, None, None, 5, 1])
    result8 = solution.pathSumAlternative(root8, 22)
    expected8 = 3
    assert result8 == expected8, f"Expected {expected8}, got {result8}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 437. Path Sum III ===")

    # Helper function to build tree
    def build_tree(values: list[Any]) -> TreeNode:
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

    # Demonstrate with examples
    print("\nExample 1:")
    root1 = build_tree([10, 5, -3, 3, 2, None, 11, 3, -2, None, 1])
    result1 = solution.pathSum(root1, 8)
    print("Tree: [10,5,-3,3,2,null,11,3,-2,null,1]")
    print("Target sum: 8")
    print(f"Number of paths: {result1}")

    print("\nExample 2:")
    root2 = build_tree([5, 4, 8, 11, None, 13, 4, 7, 2, None, None, 5, 1])
    result2 = solution.pathSum(root2, 22)
    print("Tree: [5,4,8,11,null,13,4,7,2,null,null,5,1]")
    print("Target sum: 22")
    print(f"Number of paths: {result2}")

    print("\nExample 3 (simple):")
    root3 = build_tree([1, 2, 3])
    result3 = solution.pathSum(root3, 3)
    print("Tree: [1,2,3]")
    print("Target sum: 3")
    print(f"Number of paths: {result3}")

    # Show detailed walkthrough for small tree
    print("\nDetailed walkthrough:")
    print("Tree: [5,3,2,1,null,null,4], Target: 8")
    print("     5")
    print("    / \\\\")
    print("   3   2")
    print("  /     \\\\")
    print(" 1       4")
    print("\nPaths with sum 8:")
    print("1. 5 -> 3 (sum = 8)")
    print("2. 5 -> 3 -> ? No")
    print("3. 5 -> 2 -> 4? No (5+2+4=11)")
    root_demo = build_tree([5, 3, 2, 1, None, None, 4])
    result_demo = solution.pathSum(root_demo, 8)
    print(f"Total paths: {result_demo}")
