"""
### INTUITION:
The key insight is that a full binary tree has an odd number of nodes (impossible with even n). For each tree,
we pick a root and divide the remaining n-1 nodes between left and right subtrees.
We recursively generate all possible left subtrees with i nodes and all possible right
subtrees with n-1-i nodes, then combine them.

### APPROACH:
The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

**Data structures: Binary tree (node structure), Dictionary (for memoization), List (for results)**
1. Base case: n=1 returns single binary tree node
2. If n is even, return empty list (impossible)
3. For odd n, try all ways to split n-1 nodes between left and right
4. Recursively generate all left and right binary tree subtrees
5. Combine each left subtree with each right subtree into a list
6. Use dictionary-based memoization to avoid recomputing same subproblems

### WHY THIS WORKS:
Full binary trees must have odd number of nodes. By systematically trying all possible
distributions of nodes between left and right subtrees, and combining all possibilities,
we generate all valid full binary trees.

This solution uses recursion for efficient implementation.

### EXAMPLE WALKTHROUGH:
**Input:** n = 7

**Step 1:** Check base case - n=7 is odd, proceed (n=1 would return single node)

**Step 2:** Check if even - 7 is odd, continue (even n returns empty list)

**Step 3:** Try all ways to split n-1=6 nodes between left and right
- Possible splits: (1,5), (3,3), (5,1)

**Step 4:** Recursively generate subtrees for each split
- For (1,5): left has 1 tree, right has allPossibleFBT(5) trees
- For (3,3): left has allPossibleFBT(3), right has allPossibleFBT(3)
- For (5,1): left has allPossibleFBT(5), right has 1 tree

**Step 5:** Combine each left with each right subtree
- (1,5): 1 × 2 = 2 trees
- (3,3): 1 × 1 = 1 tree
- (5,1): 2 × 1 = 2 trees

**Step 6:** Use memoization to avoid recomputing (n=5, n=3 computed once)
- Total for n=7: 2 + 1 + 2 = 5 different full binary trees

Output:
```
5 different tree structures
```

### TIME COMPLEXITY:
**O(2^n)** - Generating all possible trees, exponential growth in number of trees

### SPACE COMPLEXITY:
**O(2^n)** - Storing all generated trees - [Add explanation of why this complexity]

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

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
