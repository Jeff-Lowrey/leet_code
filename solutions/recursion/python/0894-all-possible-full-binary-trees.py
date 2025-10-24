"""
# 894. All Possible Full Binary Trees

# Difficulty: Medium

Solve problem #894: All Possible Full Binary Trees

**Example:**
 *
<dl class="example-details">
<dt>Input:</dt>
<dd>input data here</dd>
<dt>Output:</dt>
<dd>output data here</dd>
<dt>Explanation:</dt>
<dd>Explanation of the solution</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
### METADATA:
**Techniques**: - Recursion
**Data Structures**: - Binary tree
**Patterns**: - Divide and conquer
**Time Complexity**: **O(n²)**
**Space Complexity**: **O(n)**
 *
### INTUITION:
The key insight is to solve this problem efficiently.
 *
### APPROACH:
We solve this problem by implementing the required algorithm.
 *
### WHY THIS WORKS:
This approach works because it correctly implements the problem requirements.
 *
### EXAMPLE WALKTHROUGH:
Input:
```
example input
```

Output:
```
example output
```

### TIME COMPLEXITY:
**O(n²)** - Analysis of time complexity
 *
### SPACE COMPLEXITY:
**O(n)** - Analysis of space complexity
 *
### EDGE CASES:
- Handle empty input
- Handle boundary conditions
 *
</details>
"""

from typing import List, Optional


class TreeNode:
    """Definition for a binary tree node."""

    def __init__(self, val: int = 0, left: 'Optional[TreeNode]' = None, right: 'Optional[TreeNode]' = None):
        self.val = val
        self.left = left
        self.right = right


def allPossibleFBT(n: int) -> List[Optional[TreeNode]]:
    """
    Generate all possible full binary trees with n nodes.

    Args:
        n: Number of nodes (must be odd for full binary tree)

    Returns:
        List of root nodes for all possible full binary trees
    """
    # Memoization cache
    memo = {}

    def helper(nodes: int) -> List[Optional[TreeNode]]:
        """Helper function to generate FBTs with given number of nodes."""
        if nodes in memo:
            return memo[nodes]

        # Base case: single node
        if nodes == 1:
            return [TreeNode(0)]

        # Impossible to make full binary tree with even nodes
        if nodes % 2 == 0:
            return []

        result = []
        # Try all possible splits of remaining nodes
        # We need nodes-1 for children (1 for root)
        for left_nodes in range(1, nodes, 2):  # Left must be odd
            right_nodes = nodes - 1 - left_nodes  # Right must also be odd

            # Get all possible left and right subtrees
            left_trees = helper(left_nodes)
            right_trees = helper(right_nodes)

            # Combine each left subtree with each right subtree
            for left in left_trees:
                for right in right_trees:
                    root = TreeNode(0)
                    root.left = left
                    root.right = right
                    result.append(root)

        memo[nodes] = result
        return result

    return helper(n)


def tree_to_list(root: Optional[TreeNode]) -> List[Optional[int]]:
    """Convert tree to list representation for testing."""
    if not root:
        return []

    result = []
    queue = [root]

    while queue:
        node = queue.pop(0)
        if node:
            result.append(node.val)
            queue.append(node.left)
            queue.append(node.right)
        else:
            result.append(None)

    # Remove trailing None values
    while result and result[-1] is None:
        result.pop()

    return result


if __name__ == "__main__":
    # Test cases
    test_cases = [
        (1, 1),   # n=1 should give 1 tree
        (3, 1),   # n=3 should give 1 tree
        (5, 2),   # n=5 should give 2 trees
        (7, 5),   # n=7 should give 5 trees
    ]

    print("Testing allPossibleFBT:")
    for n, expected_count in test_cases:
        result = allPossibleFBT(n)
        count = len(result)
        status = "✓" if count == expected_count else "✗"
        print(f"{status} allPossibleFBT({n}) returned {count} trees, expected {expected_count}")

        # Show first tree structure for small n
        if n <= 5 and result:
            print(f"  First tree for n={n}: {tree_to_list(result[0])}")

    # Even numbers should return empty
    print("\nTesting even n (should return empty list):")
    for n in [2, 4, 6]:
        result = allPossibleFBT(n)
        status = "✓" if len(result) == 0 else "✗"
        print(f"{status} allPossibleFBT({n}) returned {len(result)} trees (expected 0)")
