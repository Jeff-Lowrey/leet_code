"""
# Difficulty: Medium

# 173. Binary Search Tree Iterator

Implement the BSTIterator class that represents an iterator over the in-order traversal of a binary search tree (BST).

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>Input: [7, 3, 15, null, null, 9, 20]</dd>
<dt>Output:</dt>
<dd>Stack after init: [7, 3]</dd>
<dt>Explanation:</dt>
<dd>The iterator initializes by traversing left from the root (7), pushing nodes 7 and 3 onto the stack, with 3 on top as it's the leftmost (smallest) node</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
We need to implement an iterator that traverses a BST in in-order (left -> root -> right).
The challenge is to do this without storing all values upfront, but instead using a controlled stack-based approach.

### APPROACH:
1. **Use a stack**: Maintain a stack to simulate the in-order traversal
2. **Push all left nodes**: Starting from root, push all left children onto the stack
3. **next()**: Pop from stack, return value, then push all left children of the popped node's right child
4. **hasNext()**: Simply check if the stack is empty

### WHY THIS WORKS:
- The stack maintains nodes in the order they need to be visited
- By pushing all left nodes first, we ensure the smallest unvisited node is always on top
- Time complexity is optimized - each node is pushed and popped exactly once
- Space complexity is O(h) where h is the height of the tree

### EXAMPLE WALKTHROUGH:
```
Input: [7, 3, 15, null, null, 9, 20]
Stack after init: [7, 3]
next() -> 3, stack: [7, 15, 9]
next() -> 7, stack: [15, 9]
hasNext() -> true
next() -> 9, stack: [15, 20]
```

### TIME COMPLEXITY:
- Constructor: O(h) where h is height
- next(): Amortized O(1)
- hasNext(): O(1)

### SPACE COMPLEXITY:
O(h) for the stack

### EDGE CASES:
- Single node tree
- Left-skewed or right-skewed trees
- Empty tree handling

</details>
"""


class TreeNode:
    """Definition for a binary tree node."""
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


