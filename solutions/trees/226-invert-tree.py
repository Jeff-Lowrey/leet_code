"""
226. Invert Binary Tree
Easy

Given the root of a binary tree, invert the tree, and return its root.

Example:
Input: `root` = [4,2,7,1,3,6,9]
Output: [4,7,2,9,6,3,1]
"""

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Invert a binary tree by swapping left and right children of every node. This can be done recursively (DFS) or iteratively (BFS).

### APPROACH (Recursive DFS):
1. **Base case**: If node is null, return null
2. **Swap children**: Exchange left and right children
3. **Recurse**: Invert left and right subtrees
4. **Return**: The current node (now inverted)

### WHY THIS WORKS:
- Swapping children at each node inverts the tree structure
- Recursion ensures all nodes are processed
- Post-order traversal ensures children are processed before parent

### TIME COMPLEXITY: O(n) - visit each node once
### SPACE COMPLEXITY: O(h) where h is tree height (recursion stack)

### TWO APPROACHES:

#### Approach 1: Recursive DFS (Elegant)
```python
root.left, root.right = root.right, root.left
invertTree(root.left)
invertTree(root.right)
```

#### Approach 2: Iterative BFS (Space-efficient for balanced trees)
```python
queue = [root]
while queue:
    node = queue.pop(0)
    node.left, node.right = node.right, node.left
    if node.left: queue.append(node.left)
    if node.right: queue.append(node.right)
```

### EXAMPLE WALKTHROUGH:
```
Original:    4
           /   \
          2     7
         / \   / \
        1   3 6   9

Step 1: Swap 2 and 7 at root
Step 2: Recursively invert left subtree (rooted at 7)
Step 3: Recursively invert right subtree (rooted at 2)

Inverted:    4
           /   \
          7     2
         / \   / \
        9   6 3   1
```

### KEY INSIGHT:
Tree inversion is a classic example of how recursion naturally handles tree structure. Each recursive call handles one level of swapping.

</details>



class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def invertTree(self, root: TreeNode | None) -> TreeNode | None:
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

    def invertTreeIterative(self, root: TreeNode | None) -> TreeNode | None:
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
    print("Input: [4,2,7,1,3,6,9]")
    inverted1 = solution.invertTree(root1)
    print(f"Output: {tree_to_list(inverted1)}")  # [4,7,2,9,6,3,1]
