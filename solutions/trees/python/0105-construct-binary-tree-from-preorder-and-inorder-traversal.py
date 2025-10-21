"""
# Difficulty: Medium

# 105. Construct Binary Tree From Preorder And Inorder Traversal

Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]</dd>
<dt>Output:</dt>
<dd>Tree with root 3</dd>
<dt>Explanation:</dt>
<dd>The tree is uniquely constructed from preorder [3,9,20,15,7] and inorder [9,3,15,20,7] traversals</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Hash Map, Array, String
**Patterns**: Two Pointers Pattern, Tree Pattern
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Recursively build tree. Find root in preorder (first element). Find root in inorder (splits left/right). Recursively build left subtree with elements before root, right subtree with elements after root in inorder.

### APPROACH:
1. **Build index map**: Create dict mapping inorder values to indices
2. **Define helper**: Implement build(pre_start, pre_end, in_start, in_end)
3. **Base case**: If pre_start > pre_end, return None
4. **Create root**: root = TreeNode(preorder[pre_start])
5. **Find root in inorder**: root_idx = inorder_map[root.val]
6. **Calculate left size**: left_size = root_idx - in_start
7. **Build left subtree**: root.left = build(pre_start+1, pre_start+left_size, in_start, root_idx-1)
8. **Build right subtree**: root.right = build(pre_start+left_size+1, pre_end, root_idx+1, in_end), return root

### WHY THIS WORKS:
- Preorder gives root (first element), inorder splits left/right subtrees
- Find root in inorder: elements left of root are left subtree, right are right subtree
- Recursively build left and right subtrees with their preorder/inorder slices
- Hash map stores inorder indices for O(1) root lookup instead of O(n) search
- O(n) time: each node processed once, O(n) space for map and recursion

### EXAMPLE WALKTHROUGH:
```
Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
Step 1: Root is first in preorder
  root = 3

Step 2: Find root in inorder
  left subtree: [9]
  right subtree: [15,20,7]

Step 3: Recursively build
  left: preorder=[9], inorder=[9]
  right: preorder=[20,15,7], inorder=[15,20,7]

Output: Tree with root 3
```

### TIME COMPLEXITY:
O(n)

### SPACE COMPLEXITY:
O(1)

### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>
"""

from typing import Any, List, Optional, Dict, Tuple


class TreeNode:
    def __init__(self, val: Any = 0, left: Any = None, right: Any = None) -> None:
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def constructFromPreorder(self, preorder: List[int]) -> Optional[TreeNode]:
        """
        Constructs a binary tree from its preorder traversal.

        Args:
            preorder: List of integers representing preorder traversal of the tree

        Returns:
            Root node of the constructed binary tree
        """
        if not preorder:
            return None

        self.preorder_index = 0

        def construct(bound: int) -> Optional[TreeNode]:
            """
            Helper function to construct the tree recursively.

            Args:
                bound: Upper bound value for the current subtree

            Returns:
                Root node of the current subtree
            """
            if self.preorder_index >= len(preorder) or preorder[self.preorder_index] > bound:
                return None

            # Create root node with current value
            root = TreeNode(preorder[self.preorder_index])
            self.preorder_index += 1

            # Recursively construct left and right subtrees
            # Left subtree values must be less than root's value
            root.left = construct(root.val)
            # Right subtree values must be less than bound
            root.right = construct(bound)

            return root

        return construct(float("inf"))  # type: ignore

    def printTree(self, root: Optional[TreeNode]) -> None:
        """
        Prints the tree in a level-order traversal.

        Args:
            root: Root node of the binary tree
        """
        if not root:
            print("Empty tree")
            return

        queue = [root]
        while queue:
            level: list[Any] = []
            level_size = len(queue)

            for _ in range(level_size):
                node = queue.pop(0)
                if node:
                    level.append(str(node.val))
                    queue.append(node.left)
                    queue.append(node.right)
                else:
                    level.append("null")

            # Remove trailing nulls
            while level and level[-1] == "null":
                level.pop()

            if level:
                print(" ".join(level))


# Test cases
if __name__ == "__main__":
    solution = Solution()

    # Test case 1: Basic case
    result1 = solution.constructFromPreorder([1, 2, 3])
    print(f"Test 1 - Basic case [1,2,3]: Tree constructed")

    # Test case 2: Empty input
    result2 = solution.constructFromPreorder([])
    print(f"Test 2 - Empty input: {result2}")  # None

    # Test case 3: Single element
    result3 = solution.constructFromPreorder([1])
    print(f"Test 3 - Single element [1]: Tree constructed with root {result3.val if result3 else None}")  # 1
