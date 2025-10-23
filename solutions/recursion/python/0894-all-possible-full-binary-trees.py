"""
LeetCode Problem 894: All Possible Full Binary Trees
Difficulty: Medium
Category: Recursion

Problem Description:
Given an integer n, return a list of all possible full binary trees with n nodes. Each node
of each tree in the answer must have Node.val == 0.

Each element of the answer is the root node of one possible tree. You may return the final
list of trees in any order.

A full binary tree is a binary tree where each node has exactly 0 or 2 children.

Example 1:
Input: n = 7
Output: [[0,0,0,null,null,0,0,null,null,0,0],[0,0,0,null,null,0,0,0,0],[0,0,0,0,0,0,0],
         [0,0,0,0,0,null,null,null,null,0,0],[0,0,0,0,0,null,null,0,0]]

Example 2:
Input: n = 3
Output: [[0,0,0]]

Constraints:
- 1 <= n <= 20

METADATA:
Techniques:
- Recursion
- Memoization
- Tree construction
- Combinatorial generation

Data Structures:
- Binary tree
- Dictionary (for memoization)
- List

Patterns:
- Divide and conquer
- Recursive tree building
- Memoization

Time Complexity: O(2^n) - generating all possible trees
Space Complexity: O(2^n) - storing all trees

Intuition:
A full binary tree has an odd number of nodes (impossible with even n). For each tree,
we pick a root and divide the remaining n-1 nodes between left and right subtrees.
We recursively generate all possible left subtrees with i nodes and all possible right
subtrees with n-1-i nodes, then combine them.

Approach:
1. Base case: n=1 returns single node tree
2. If n is even, return empty list (impossible)
3. For odd n, try all ways to split n-1 nodes between left and right
4. Recursively generate all left and right subtrees
5. Combine each left subtree with each right subtree
6. Use memoization to avoid recomputing same subproblems

Why This Works:
Full binary trees must have odd number of nodes. By systematically trying all possible
distributions of nodes between left and right subtrees, and combining all possibilities,
we generate all valid full binary trees.

Example Walkthrough:
n = 3:
- Root uses 1 node, leaving 2 for children
- Only split: left=1, right=1
- Each subtree is a single node
- Result: one tree with root and two children

n = 5:
- Root uses 1 node, leaving 4 for children
- Splits: (1,3) or (3,1)
- For (1,3): left is single node, right has 2 possible trees
- For (3,1): left has 2 possible trees, right is single node
- Total: 2 + 2 = 4 different trees (but some may be duplicates in structure)
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
