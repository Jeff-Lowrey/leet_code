"""
# 297. Serialize and Deserialize Binary Tree
# Difficulty: Hard
Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.

Clarification: The input/output format is the same as how LeetCode serializes a binary tree. You do not necessarily need to follow this format, so please be creative and come up with different approaches yourself.

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

### TIME COMPLEXITY: O(n)
Where n is the number of nodes in the tree

### SPACE COMPLEXITY: O(n)
For the serialized string and recursion stack

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

### KEY INSIGHTS:
- Preorder traversal with null markers preserves structure
- Both serialize and deserialize use O(n) time and space
- Alternative: Use level-order (BFS) traversal
- Can also use postorder with modifications

</details>
"""

# Definition for a binary tree node
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

class Codec:
    def serialize(self, root):
        """
        Encodes a tree to a single string using preorder traversal.

        Args:
            root: Root of binary tree

        Returns:
            Serialized string representation

        Time Complexity: O(n) where n is number of nodes
        Space Complexity: O(n) for result string and recursion
        """
        def preorder(node):
            if not node:
                return "#"

            # Preorder: root, left, right
            return str(node.val) + "," + preorder(node.left) + "," + preorder(node.right)

        return preorder(root)

    def deserialize(self, data):
        """
        Decodes your encoded data to tree using preorder reconstruction.

        Args:
            data: Serialized string

        Returns:
            Root of reconstructed binary tree

        Time Complexity: O(n) where n is number of nodes
        Space Complexity: O(n) for recursion stack
        """
        def build_tree():
            val = next(values)
            if val == "#":
                return None

            # Build node and recursively build left and right subtrees
            node = TreeNode(int(val))
            node.left = build_tree()
            node.right = build_tree()
            return node

        values = iter(data.split(","))
        return build_tree()

    def serializeBFS(self, root):
        """
        Alternative BFS/level-order serialization.

        Args:
            root: Root of binary tree

        Returns:
            Serialized string using BFS
        """
        if not root:
            return ""

        result = []
        queue = [root]

        while queue:
            node = queue.pop(0)
            if node:
                result.append(str(node.val))
                queue.append(node.left)
                queue.append(node.right)
            else:
                result.append("#")

        return ",".join(result)

    def deserializeBFS(self, data):
        """
        Alternative BFS/level-order deserialization.

        Args:
            data: Serialized string

        Returns:
            Root of reconstructed binary tree
        """
        if not data:
            return None

        values = data.split(",")
        root = TreeNode(int(values[0]))
        queue = [root]
        i = 1

        while queue and i < len(values):
            node = queue.pop(0)

            # Process left child
            if values[i] != "#":
                node.left = TreeNode(int(values[i]))
                queue.append(node.left)
            i += 1

            # Process right child
            if i < len(values) and values[i] != "#":
                node.right = TreeNode(int(values[i]))
                queue.append(node.right)
            i += 1

        return root

def test_solution():
    """Test cases for Problem 297."""
    codec = Codec()

    # Test case 1: Regular tree
    #     1
    #    / \
    #   2   3
    #      / \
    #     4   5
    root1 = TreeNode(1)
    root1.left = TreeNode(2)
    root1.right = TreeNode(3)
    root1.right.left = TreeNode(4)
    root1.right.right = TreeNode(5)

    # Serialize and deserialize
    serialized1 = codec.serialize(root1)
    deserialized1 = codec.deserialize(serialized1)

    # Verify by re-serializing
    re_serialized1 = codec.serialize(deserialized1)
    assert serialized1 == re_serialized1, f"Serialization mismatch: {serialized1} != {re_serialized1}"

    # Test case 2: Empty tree
    serialized2 = codec.serialize(None)
    deserialized2 = codec.deserialize(serialized2)
    assert deserialized2 is None, "Empty tree deserialization failed"

    # Test case 3: Single node
    root3 = TreeNode(1)
    serialized3 = codec.serialize(root3)
    deserialized3 = codec.deserialize(serialized3)
    re_serialized3 = codec.serialize(deserialized3)
    assert serialized3 == re_serialized3, f"Single node mismatch: {serialized3} != {re_serialized3}"

    # Test case 4: Left skewed tree
    root4 = TreeNode(1)
    root4.left = TreeNode(2)
    root4.left.left = TreeNode(3)

    serialized4 = codec.serialize(root4)
    deserialized4 = codec.deserialize(serialized4)
    re_serialized4 = codec.serialize(deserialized4)
    assert serialized4 == re_serialized4, f"Left skewed mismatch: {serialized4} != {re_serialized4}"

    # Test case 5: Right skewed tree
    root5 = TreeNode(1)
    root5.right = TreeNode(2)
    root5.right.right = TreeNode(3)

    serialized5 = codec.serialize(root5)
    deserialized5 = codec.deserialize(serialized5)
    re_serialized5 = codec.serialize(deserialized5)
    assert serialized5 == re_serialized5, f"Right skewed mismatch: {serialized5} != {re_serialized5}"

    print("All test cases passed!")

def tree_to_list_bfs(root):
    """Helper function to convert tree to list for display."""
    if not root:
        return []

    result = []
    queue = [root]

    while queue:
        node = queue.pop(0)
        if node:
            result.append(node.val)
            queue.append(node.left)
            queue.append(node.right)
        else:
            result.append(None)

    # Remove trailing Nones
    while result and result[-1] is None:
        result.pop()

    return result

if __name__ == "__main__":
    test_solution()

    # Example usage
    codec = Codec()
    print("=== 297. Serialize and Deserialize Binary Tree ===")

    # Create example tree:    1
    #                       / \
    #                      2   3
    #                         / \
    #                        4   5
    root = TreeNode(1)
    root.left = TreeNode(2)
    root.right = TreeNode(3)
    root.right.left = TreeNode(4)
    root.right.right = TreeNode(5)

    print(f"Original tree: {tree_to_list_bfs(root)}")

    # Serialize
    serialized = codec.serialize(root)
    print(f"Serialized: {serialized}")

    # Deserialize
    deserialized = codec.deserialize(serialized)
    print(f"Deserialized tree: {tree_to_list_bfs(deserialized)}")

    # Verify round-trip
    re_serialized = codec.serialize(deserialized)
    print(f"Re-serialized: {re_serialized}")
    print(f"Round-trip successful: {serialized == re_serialized}")

    # Example with empty tree
    print(f"\nEmpty tree serialized: '{codec.serialize(None)}'")

    # Example with single node
    single = TreeNode(42)
    print(f"Single node [42] serialized: '{codec.serialize(single)}'")