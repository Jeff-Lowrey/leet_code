"""
# Difficulty: Medium

# 0173. Binary Search Tree Iterator

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
### METADATA:
**Techniques**: Two Pointers, Stack Operations, Graph Traversal
**Data Structures**: Stack, Tree, Linked List
**Patterns**: Two Pointers Pattern, Hash Table Pattern
**Time Complexity**: - Constructor: O(h) where h is height
**Space Complexity**: O(h) for the stack

### INTUITION:
The key insight is that we need to implement an iterator that traverses a BST in in-order (left -> root -> right).
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
Input:
```
[7, 3, 15, null, null, 9, 20]
```

Stack after init: [7, 3]

Steps:
Step 1: next() -> 3, stack: [7, 15, 9]
Step 2: next() -> 7, stack: [15, 9]
Step 3: hasNext() -> true
Step 4: next() -> 9, stack: [15, 20]

Output:
```
[Expected output]
```

### TIME COMPLEXITY:
- Constructor: O(h) where h is height
- next(): Amortized O(1)
- hasNext(): O(1)

### SPACE COMPLEXITY:
O(h) for the stack where h is height

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>
"""

from typing import Any


class TreeNode:
    """Definition for a binary tree node."""

    def __init__(self, val: Any = 0, left: Any = None, right: Any = None) -> None:
        self.val = val
        self.left = left
        self.right = right
