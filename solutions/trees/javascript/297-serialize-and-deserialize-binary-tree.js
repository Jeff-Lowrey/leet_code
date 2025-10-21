/**
 * Difficulty: Hard
 *
 * # 297. Serialize and Deserialize Binary Tree
 *
 * Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.
 *
 * Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.
 *
 * Clarification: The input/output format is the same as how LeetCode serializes a binary tree. You do not necessarily need to follow this format, so please be creative and come up with different approaches yourself.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>Input tree:     1</dd>
 * <dt>Output:</dt>
 * <dd>/ \</dd>
 * <dt>Explanation:</dt>
 * <dd>The tree [1,2,3,null,null,4,5] is serialized as '1,2,3,null,null,4,5'</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 *

 * ### METADATA:
 * **Techniques**: Tree Traversal (Inorder/Preorder/Postorder), DFS/BFS
 * **Data Structures**: Binary Tree, BST, N-ary Tree
 * **Patterns**: Tree Traversal Pattern, Recursive Tree Processing
 * **Time Complexity**: **O(n)
 * **Space Complexity**: **O(n)

 *
 * ### INTUITION:
 * We need to serialize a binary tree to a string and then deserialize it back. The key insight is to use a traversal order (like preorder) and include null markers to preserve the tree structure.
 *
 * ### APPROACH:
 * 1. **Serialize**: Use preorder traversal with null markers
 * 2. **Deserialize**: Reconstruct tree using the serialized string
 * 3. **Delimiter**: Use commas to separate values
 * 4. **Null marker**: Use "#" or "null" to represent empty nodes
 *
 * ### WHY THIS WORKS:
 * - Preorder traversal visits root first, then left, then right
 * - Including null markers preserves the exact tree structure
 * - During deserialization, we can reconstruct by following the same order
 * - The serialized string uniquely represents the tree
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input tree:     1
 *                / \
 *               2   3
 *                  / \
 *                 4   5
 *
 * Serialize: "1,2,#,#,3,4,#,#,5,#,#"
 * - Visit 1, add "1"
 * - Visit 2, add "2"
 * - Visit left child of 2 (null), add "#"
 * - Visit right child of 2 (null), add "#"
 * - Visit 3, add "3"
 * - Visit 4, add "4"
 * - Visit left child of 4 (null), add "#"
 * - Visit right child of 4 (null), add "#"
 * - Visit 5, add "5"
 * - Visit left child of 5 (null), add "#"
 * - Visit right child of 5 (null), add "#"
 *
 * Deserialize: Split by comma and reconstruct using preorder
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)
 * Where n is the number of nodes in the tree
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 * For the serialized string and recursion stack
 *
 * ### EDGE CASES:
 * - **Empty tree**: Serialize to single null marker, deserialize returns None
 * - **Single node**: Serialize to "val,#,#", deserialize creates single node
 * - **Left-skewed tree**: Only left children, nulls for all right children
 * - **Right-skewed tree**: Only right children, nulls for all left children
 * - **Complete binary tree**: All levels filled, minimal nulls in serialization
 *
 * </details>
 */

/**
 * Definition for a binary tree node.
 */
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * Main solution returns the Codec object
 * Your functions will be called as:
 * deserialize(serialize(root));
 */
function solve() {
  return new Codec();
}

/**
 * Codec class for serialization and deserialization
 */
class Codec {
  /**
   * Encodes a tree to a single string.
   *
   * @param {TreeNode} root
   * @return {string}
   */
  serialize(root) {
    const result = [];

    function preorder(node) {
      if (!node) {
        result.push("null");
        return;
      }

      result.push(node.val.toString());
      preorder(node.left);
      preorder(node.right);
    }

    preorder(root);
    return result.join(",");
  }

  /**
   * Decodes your encoded data to tree.
   *
   * @param {string} data
   * @return {TreeNode}
   */
  deserialize(data) {
    const values = data.split(",");
    let index = 0;

    function buildTree() {
      if (index >= values.length || values[index] === "null") {
        index++;
        return null;
      }

      const node = new TreeNode(parseInt(values[index++]));
      node.left = buildTree();
      node.right = buildTree();
      return node;
    }

    return buildTree();
  }
}

/**
 * Helper function to compare trees for equality
 * @param {TreeNode} tree1
 * @param {TreeNode} tree2
 * @return {boolean}
 */
function treesEqual(tree1, tree2) {
  if (!tree1 && !tree2) return true;
  if (!tree1 || !tree2) return false;
  if (tree1.val !== tree2.val) return false;
  return (
    treesEqual(tree1.left, tree2.left) && treesEqual(tree1.right, tree2.right)
  );
}

/**
 * Test cases for Problem 297: Serialize And Deserialize Binary Tree
 */
function testSolution() {
  console.log("Testing 297. Serialize And Deserialize Binary Tree");

  const codec = solve();

  // Test case 1: Standard tree
  const tree1 = new TreeNode(
    1,
    new TreeNode(2),
    new TreeNode(3, new TreeNode(4), new TreeNode(5)),
  );
  const serialized1 = codec.serialize(tree1);
  const deserialized1 = codec.deserialize(serialized1);
  console.assert(
    treesEqual(tree1, deserialized1),
    `Test 1 failed: trees are not equal after serialization/deserialization`,
  );

  // Test case 2: Empty tree
  const tree2 = null;
  const serialized2 = codec.serialize(tree2);
  const deserialized2 = codec.deserialize(serialized2);
  console.assert(
    treesEqual(tree2, deserialized2),
    `Test 2 failed: empty tree test`,
  );

  // Test case 3: Single node
  const tree3 = new TreeNode(42);
  const serialized3 = codec.serialize(tree3);
  const deserialized3 = codec.deserialize(serialized3);
  console.assert(
    treesEqual(tree3, deserialized3),
    `Test 3 failed: single node test`,
  );

  // Test case 4: Left-skewed tree
  const tree4 = new TreeNode(1, new TreeNode(2, new TreeNode(3), null), null);
  const serialized4 = codec.serialize(tree4);
  const deserialized4 = codec.deserialize(serialized4);
  console.assert(
    treesEqual(tree4, deserialized4),
    `Test 4 failed: left-skewed tree test`,
  );

  // Test case 5: Right-skewed tree
  const tree5 = new TreeNode(1, null, new TreeNode(2, null, new TreeNode(3)));
  const serialized5 = codec.serialize(tree5);
  const deserialized5 = codec.deserialize(serialized5);
  console.assert(
    treesEqual(tree5, deserialized5),
    `Test 5 failed: right-skewed tree test`,
  );

  // Test case 6: Negative values
  const tree6 = new TreeNode(-1, new TreeNode(-2), new TreeNode(-3));
  const serialized6 = codec.serialize(tree6);
  const deserialized6 = codec.deserialize(serialized6);
  console.assert(
    treesEqual(tree6, deserialized6),
    `Test 6 failed: negative values test`,
  );

  console.log(
    "All test cases passed for 297. Serialize And Deserialize Binary Tree!",
  );
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 297. Serialize And Deserialize Binary Tree ===");
  console.log("Category: Trees");
  console.log("Difficulty: Medium");
  console.log("");

  // Example demonstration would go here
  testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
  demonstrateSolution();
}

// Export for use in other modules
module.exports = {
  solve,
  Codec,
  TreeNode,
  treesEqual,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - Preorder traversal with null markers enables efficient serialization
 * - String format: "1,2,null,null,3,4,null,null,5,null,null"
 * - Key design decisions:
 *   - Delimiter choice ("," vs other characters)
 *   - Null representation ("null" vs "#" vs "x")
 *   - Value encoding (toString vs JSON.stringify for complex types)
 * - Time complexity: O(n) for both serialize and deserialize
 * - Space complexity: O(n) for string storage plus O(h) for recursion
 * - Alternative approaches: level-order BFS, JSON with structure preservation
 * - The solution preserves exact tree structure including null positions
 * - Handles edge cases: empty tree, single node, negative values
 */
