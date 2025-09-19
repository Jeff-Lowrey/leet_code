"""
104. Maximum Depth of Binary Tree
Easy

Given the root of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from
the root node down to the farthest leaf node.

Example:
Input: root = [3,9,20,null,null,15,7]
Output: 3
"""

from collections import deque


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def maxDepth(self, root: TreeNode | None) -> int:
        """
        Approach: Recursive DFS
        Time Complexity: O(n)
        Space Complexity: O(h) where h is height of tree
        """
        if not root:
            return 0

        left_depth = self.maxDepth(root.left)
        right_depth = self.maxDepth(root.right)

        return 1 + max(left_depth, right_depth)

    def maxDepthIterativeBFS(self, root: TreeNode | None) -> int:
        """
        Approach: Level-order traversal (BFS)
        Time Complexity: O(n)
        Space Complexity: O(w) where w is max width of tree
        """
        if not root:
            return 0

        queue = deque([root])
        depth = 0

        while queue:
            depth += 1
            level_size = len(queue)

            for _ in range(level_size):
                node = queue.popleft()
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)

        return depth

    def maxDepthIterativeDFS(self, root: TreeNode | None) -> int:
        """
        Approach: Iterative DFS using stack
        Time Complexity: O(n)
        Space Complexity: O(h)
        """
        if not root:
            return 0

        stack = [(root, 1)]
        max_depth = 0

        while stack:
            node, depth = stack.pop()
            max_depth = max(max_depth, depth)

            if node.right:
                stack.append((node.right, depth + 1))
            if node.left:
                stack.append((node.left, depth + 1))

        return max_depth


# Helper function for testing
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
    solution = Solution()

    # Test case 1
    root1 = create_tree([3, 9, 20, None, None, 15, 7])
    print("Input: [3,9,20,null,null,15,7]")
    print(f"Output: {solution.maxDepth(root1)}")  # 3

    # Test case 2
    root2 = create_tree([1, None, 2])
    print("Input: [1,null,2]")
    print(f"Output: {solution.maxDepth(root2)}")  # 2
