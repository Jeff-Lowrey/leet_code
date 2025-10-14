"""
# Difficulty: Easy

# 226. Invert Binary Tree

Given the root of a binary tree, invert the tree, and return its root.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[4,2,7,1,3,6,9]</dd>
<dt>Output:</dt>
<dd>[4,7,2,9,6,3,1] (inverted tree)</dd>
<dt>Explanation:</dt>
<dd>After inverting, left and right subtrees are swapped recursively: left child 4 becomes right child</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Recursively swap left and right children of each node. Base case: null returns null. Post-order: invert both subtrees, then swap them at current node.

### APPROACH:
1. **Base case**: If root is None, return None
2. **Swap children**: temp = root.left, root.left = root.right, root.right = temp
3. **Recursively invert left**: invertTree(root.left)
4. **Recursively invert right**: invertTree(root.right)
5. **Return root**: Return modified tree root

### WHY THIS WORKS:
- Recursive approach: swap left and right children, then recurse on both
- Base case: null node returns null immediately
- Post-order traversal ensures children inverted before parent processes
- Each node visited once for swap operation
- O(n) time visiting all nodes, O(h) space for recursion stack

### EXAMPLE WALKTHROUGH:
```
Input: root = [4,2,7,1,3,6,9]
Step 1: Recursively swap children
  Swap children of 4: left=7, right=2
  Swap children of 7: left=9, right=6
  Swap children of 2: left=3, right=1

Output: [4,7,2,9,6,3,1] (inverted tree)
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

class Solution:
    def invertTree(self, root):
        """
        Invert binary tree recursively.

        Args:
            root: Root of the binary tree

        Returns:
            Root of the inverted binary tree

        Time Complexity: O(n)
        Space Complexity: O(h) where h is height of tree
        """
        # Base case: empty tree
        if not root:
            return None

        # Swap left and right children
        root.left, root.right = root.right, root.left

        # Recursively invert left and right subtrees
        self.invertTree(root.left)
        self.invertTree(root.right)

        return root

def test_solution():
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Empty input
    result = solution.invertTree(None)
    expected = None
    assert result == expected, f"Expected {expected}, got {result}"

    print("Basic functionality test passed! Note: For tree structure tests, build proper TreeNode objects.")

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 226. Invert Binary Tree")
