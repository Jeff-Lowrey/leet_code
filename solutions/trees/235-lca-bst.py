"""
235. Lowest Common Ancestor of a Binary Search Tree
Medium

Given a binary search tree (BST), find the lowest common ancestor (LCA) `node` of
two given nodes in the BST.

According to the definition of LCA on Wikipedia: "The lowest common ancestor is
defined between two nodes p and q as the lowest `node` in T that has both p and q
as descendants (where we allow a node to be a descendant of itself)."

Example:
Input: `root` = [6,2,8,0,4,7,9,null,null,3,5], `p = 2`, `q = 8`
Output: 6
Explanation: The LCA of nodes 2 and 8 is 6.
"""

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
In a BST, we can use the ordered property to efficiently find the LCA. The LCA is the first node where the paths to p and q diverge. This happens when one target is in the left subtree and the other is in the right subtree.

### APPROACH:
1. **Leverage BST Property**: Use the fact that left < root < right
2. **Path Divergence**: Find where paths to p and q split
3. **Three Cases**:
   - Both p and q < current → go left
   - Both p and q > current → go right
   - Otherwise → current is LCA (paths diverge here)

### WHY THIS WORKS:
The BST property ensures that if both nodes are on the same side of current node, their LCA must be further down that side. The first node where they're on different sides (or one equals the node) is their LCA.

### TIME COMPLEXITY: O(h)
- h is the height of the tree
- In worst case (skewed tree): O(n)
- In balanced tree: O(log n)

### SPACE COMPLEXITY: O(1)
- Iterative solution uses constant space
- Recursive solution: O(h) for call stack

### EXAMPLE WALKTHROUGH:
For tree [6,2,8,0,4,7,9], finding LCA of 2 and 8:
```
      6
    /   \
   2     8
  / \   / \
 0   4 7   9
```

1. Start at 6: p=2 < 6, q=8 > 6 → paths diverge → LCA is 6

For LCA of 0 and 4:
1. Start at 6: both 0,4 < 6 → go left to 2
2. At 2: 0 < 2, 4 > 2 → paths diverge → LCA is 2

### EDGE CASES:
- One node is ancestor of other: that node is the LCA
- Both nodes are the same: that node is the LCA
- Root is one of the target nodes: root is the LCA

</details>

class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        """
        Approach: Utilize BST properties
        Time Complexity: O(h) where h is height of tree
        Space Complexity: O(1)
        """
        current = root

        while current:
            # If both nodes are greater than current, go right
            if p.val > current.val and q.val > current.val:
                current = current.right
            # If both nodes are less than current, go left
            elif p.val < current.val and q.val < current.val:
                current = current.left
            # Otherwise, we've found the LCA
            else:
                return current

        return None

    def lowestCommonAncestorRecursive(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        """
        Approach: Recursive utilizing BST properties
        Time Complexity: O(h)
        Space Complexity: O(h) for recursion stack
        """
        # If both are on the right
        if p.val > root.val and q.val > root.val:
            return self.lowestCommonAncestorRecursive(root.right, p, q)
        # If both are on the left
        elif p.val < root.val and q.val < root.val:
            return self.lowestCommonAncestorRecursive(root.left, p, q)
        # Found the split point (LCA)
        else:
            return root


"""
236. Lowest Common Ancestor of a Binary Tree
Medium

Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

Example:
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: 3
"""

class SolutionBinaryTree:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        """
        Approach: DFS Recursive
        Time Complexity: O(n)
        Space Complexity: O(h)
        """
        # Base case
        if not root or root == p or root == q:
            return root

        # Search in left and right subtrees
        left = self.lowestCommonAncestor(root.left, p, q)
        right = self.lowestCommonAncestor(root.right, p, q)

        # If both left and right are non-null, root is LCA
        if left and right:
            return root

        # Otherwise return the non-null value
        return left if left else right

    def lowestCommonAncestorIterative(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        """
        Approach: Iterative with parent pointers
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        # Dictionary to store parent pointers
        parent = {root: None}
        stack = [root]

        # Iterate until we find both nodes
        while p not in parent or q not in parent:
            node = stack.pop()

            if node.left:
                parent[node.left] = node
                stack.append(node.left)
            if node.right:
                parent[node.right] = node
                stack.append(node.right)

        # Get all ancestors of p
        ancestors = set()
        while p:
            ancestors.add(p)
            p = parent[p]

        # Find first common ancestor of q
        while q not in ancestors:
            q = parent[q]

        return q


# Helper functions for testing
def create_bst(values):
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

def find_node(root, val):
    """Find node with given value in tree"""
    if not root:
        return None
    if root.val == val:
        return root

    left = find_node(root.left, val)
    if left:
        return left
    return find_node(root.right, val)


# Test cases
if __name__ == "__main__":
    # Test BST LCA
    solution_bst = Solution()

    # Create BST: [6,2,8,0,4,7,9,null,null,3,5]
    root_bst = create_bst([6, 2, 8, 0, 4, 7, 9, None, None, 3, 5])
    p_bst = find_node(root_bst, 2)
    q_bst = find_node(root_bst, 8)

    lca_bst = solution_bst.lowestCommonAncestor(root_bst, p_bst, q_bst)
    print(f"BST LCA of nodes 2 and 8: {lca_bst.val}")  # 6

    # Test Binary Tree LCA
    solution_bt = SolutionBinaryTree()

    # Create Binary Tree: [3,5,1,6,2,0,8,null,null,7,4]
    root_bt = create_bst([3, 5, 1, 6, 2, 0, 8, None, None, 7, 4])
    p_bt = find_node(root_bt, 5)
    q_bt = find_node(root_bt, 1)

    lca_bt = solution_bt.lowestCommonAncestor(root_bt, p_bt, q_bt)
    print(f"Binary Tree LCA of nodes 5 and 1: {lca_bt.val}")  # 3
