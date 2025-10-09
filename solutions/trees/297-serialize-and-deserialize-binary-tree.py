"""
# Difficulty: Hard

# 297. Serialize and Deserialize Binary Tree

Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.

Clarification: The input/output format is the same as how LeetCode serializes a binary tree. You do not necessarily need to follow this format, so please be creative and come up with different approaches yourself.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[input description]</dd>
<dt>Output:</dt>
<dd>[output description]</dd>
<dt>Explanation:</dt>
<dd>[explanation]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
We need to serialize a binary tree to a string and then deserialize it back. The key insight is to use a traversal order (like preorder) and include null markers to preserve the tree structure.

### APPROACH:
1. **Serialize**: Use preorder traversal with null markers
2. **Deserialize**: Reconstruct tree using the serialized string
3. **Delimiter**: Use commas to separate values
4. **Null marker**: Use "#" or "null" to represent empty nodes

### WHY THIS WORKS:
- Preorder traversal visits root first, then left, then right
- Including null markers preserves the exact tree structure
- During deserialization, we can reconstruct by following the same order
- The serialized string uniquely represents the tree

### EXAMPLE WALKTHROUGH:
```
Input tree:     1
               / \
              2   3
                 / \
                4   5

Serialize: "1,2,#,#,3,4,#,#,5,#,#"
- Visit 1, add "1"
- Visit 2, add "2"
- Visit left child of 2 (null), add "#"
- Visit right child of 2 (null), add "#"
- Visit 3, add "3"
- Visit 4, add "4"
- Visit left child of 4 (null), add "#"
- Visit right child of 4 (null), add "#"
- Visit 5, add "5"
- Visit left child of 5 (null), add "#"
- Visit right child of 5 (null), add "#"

Deserialize: Split by comma and reconstruct using preorder
```

### TIME COMPLEXITY:
O(n)
Where n is the number of nodes in the tree

### SPACE COMPLEXITY:
O(n)
For the serialized string and recursion stack

### EDGE CASES:
- **[Edge case 1]:** [how it's handled]
- **[Edge case 2]:** [how it's handled]

</details>
"""


