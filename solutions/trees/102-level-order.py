"""
102. Binary Tree Level Order Traversal
Medium

Given the root of a binary tree, return the level order traversal of its nodes' values.
(i.e., from left to right, level by level).

Example:
Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]
"""

from typing import Optional, List
from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        """
        Approach: BFS with queue
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        if not root:
            return []

        result = []
        queue = deque([root])

        while queue:
            level_size = len(queue)
            level_nodes = []

            for _ in range(level_size):
                node = queue.popleft()
                level_nodes.append(node.val)

                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)

            result.append(level_nodes)

        return result

    def levelOrderDFS(self, root: Optional[TreeNode]) -> List[List[int]]:
        """
        Approach: DFS with level tracking
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        if not root:
            return []

        result = []

        def dfs(node, level):
            if not node:
                return

            # Ensure we have a list for this level
            if len(result) == level:
                result.append([])

            result[level].append(node.val)

            dfs(node.left, level + 1)
            dfs(node.right, level + 1)

        dfs(root, 0)
        return result


"""
98. Validate Binary Search Tree
Medium

Given the root of a binary tree, determine if it is a valid binary search tree (BST).

A valid BST is defined as follows:
- The left subtree of a node contains only nodes with keys less than the node's key.
- The right subtree of a node contains only nodes with keys greater than the node's key.
- Both the left and right subtrees must also be binary search trees.

Example:
Input: root = [2,1,3]
Output: true
"""

class SolutionValidateBST:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        """
        Approach: Recursion with bounds
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        def validate(node, min_val, max_val):
            if not node:
                return True

            if node.val <= min_val or node.val >= max_val:
                return False

            return (validate(node.left, min_val, node.val) and
                   validate(node.right, node.val, max_val))

        return validate(root, float('-inf'), float('inf'))

    def isValidBSTInorder(self, root: Optional[TreeNode]) -> bool:
        """
        Approach: Inorder traversal
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        def inorder(node):
            if not node:
                return []
            return inorder(node.left) + [node.val] + inorder(node.right)

        values = inorder(root)
        for i in range(1, len(values)):
            if values[i] <= values[i-1]:
                return False
        return True

    def isValidBSTIterative(self, root: Optional[TreeNode]) -> bool:
        """
        Approach: Iterative inorder traversal
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        stack = []
        prev = float('-inf')
        current = root

        while stack or current:
            while current:
                stack.append(current)
                current = current.left

            current = stack.pop()

            if current.val <= prev:
                return False

            prev = current.val
            current = current.right

        return True


"""
230. Kth Smallest Element in a BST
Medium

Given the root of a binary search tree, and an integer k, return the kth smallest
value (1-indexed) of all the values of the nodes in the tree.

Example:
Input: root = [3,1,4,null,2], k = 1
Output: 1
"""

class SolutionKthSmallest:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        """
        Approach: Iterative inorder traversal
        Time Complexity: O(k)
        Space Complexity: O(h)
        """
        stack = []
        current = root
        count = 0

        while stack or current:
            while current:
                stack.append(current)
                current = current.left

            current = stack.pop()
            count += 1

            if count == k:
                return current.val

            current = current.right

        return -1  # Should not reach here

    def kthSmallestRecursive(self, root: Optional[TreeNode], k: int) -> int:
        """
        Approach: Recursive inorder with early termination
        Time Complexity: O(n) worst case
        Space Complexity: O(n)
        """
        self.k = k
        self.result = None

        def inorder(node):
            if not node or self.result is not None:
                return

            inorder(node.left)

            self.k -= 1
            if self.k == 0:
                self.result = node.val
                return

            inorder(node.right)

        inorder(root)
        return self.result


# Helper functions
def create_tree(values):
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


# Test cases
if __name__ == "__main__":
    # Test Level Order Traversal
    solution = Solution()

    print("Binary Tree Level Order Traversal:")
    test_cases = [
        [3, 9, 20, None, None, 15, 7],
        [1],
        []
    ]

    for values in test_cases:
        root = create_tree(values)
        result = solution.levelOrder(root)
        print(f"Tree: {values}")
        print(f"Level order: {result}\n")

    # Test Validate BST
    solution_bst = SolutionValidateBST()

    print("Validate Binary Search Tree:")
    bst_cases = [
        [2, 1, 3],
        [5, 1, 4, None, None, 3, 6],
        [1, 1]
    ]

    for values in bst_cases:
        root = create_tree(values)
        result = solution_bst.isValidBST(root)
        print(f"Tree: {values}")
        print(f"Is valid BST: {result}\n")

    # Test Kth Smallest
    solution_kth = SolutionKthSmallest()

    print("Kth Smallest Element in BST:")
    kth_cases = [
        ([3, 1, 4, None, 2], 1),
        ([5, 3, 6, 2, 4, None, None, 1], 3)
    ]

    for values, k in kth_cases:
        root = create_tree(values)
        result = solution_kth.kthSmallest(root, k)
        print(f"Tree: {values}, k={k}")
        print(f"Kth smallest: {result}\n")
