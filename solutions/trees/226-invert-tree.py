"""
226. Invert Binary Tree
Easy

Given the root of a binary tree, invert the tree, and return its root.

Example:
Input: root = [4,2,7,1,3,6,9]
Output: [4,7,2,9,6,3,1]
"""

from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        """
        Approach: Recursive DFS
        Time Complexity: O(n)
        Space Complexity: O(h) where h is height of tree
        """
        if not root:
            return None

        # Swap left and right children
        root.left, root.right = root.right, root.left

        # Recursively invert subtrees
        self.invertTree(root.left)
        self.invertTree(root.right)

        return root

    def invertTreeIterative(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        """
        Approach: Iterative BFS using queue
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        if not root:
            return None

        from collections import deque
        queue = deque([root])

        while queue:
            node = queue.popleft()

            # Swap children
            node.left, node.right = node.right, node.left

            # Add children to queue
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        return root


# Helper functions for testing
def create_tree(values):
    if not values:
        return None

    from collections import deque
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

def tree_to_list(root):
    if not root:
        return []

    from collections import deque
    result = []
    queue = deque([root])

    while queue:
        node = queue.popleft()
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


# Test cases
if __name__ == "__main__":
    solution = Solution()

    # Test case 1
    root1 = create_tree([4, 2, 7, 1, 3, 6, 9])
    print(f"Input: [4,2,7,1,3,6,9]")
    inverted1 = solution.invertTree(root1)
    print(f"Output: {tree_to_list(inverted1)}")  # [4,7,2,9,6,3,1]
