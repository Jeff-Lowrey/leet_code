/**
 * Difficulty: Medium
 *
 * [Problem description goes here]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[input description]</dd>
 * <dt>Output:</dt>
 * <dd>[output description]</dd>
 * <dt>Explanation:</dt>
 * <dd>[explanation]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * [High-level insight or key observation]
 *
 * ### APPROACH:
 * [Detailed explanation of the solution approach]
 *
 * ### WHY THIS WORKS:
 * - [Explanation of correctness]
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * [example input]
 * ```
 *
 * **Step 1:** [description]
 *
 * **Step 2:** [description]
 *
 * ### TIME COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### SPACE COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### EDGE CASES:
 * - **[Edge case 1]:** [how it's handled]
 * - **[Edge case 2]:** [how it's handled]
 *
 * </details>
 */

/**
 * Definition for a binary tree node.
 */
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
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
    return treesEqual(tree1.left, tree2.left) && treesEqual(tree1.right, tree2.right);
}

/**
 * Test cases for Problem 297: Serialize And Deserialize Binary Tree
 */
function testSolution() {
    console.log('Testing 297. Serialize And Deserialize Binary Tree');

    const codec = solve();

    // Test case 1: Standard tree
    const tree1 = new TreeNode(1,
        new TreeNode(2),
        new TreeNode(3,
            new TreeNode(4),
            new TreeNode(5)
        )
    );
    const serialized1 = codec.serialize(tree1);
    const deserialized1 = codec.deserialize(serialized1);
    console.assert(treesEqual(tree1, deserialized1),
        `Test 1 failed: trees are not equal after serialization/deserialization`);

    // Test case 2: Empty tree
    const tree2 = null;
    const serialized2 = codec.serialize(tree2);
    const deserialized2 = codec.deserialize(serialized2);
    console.assert(treesEqual(tree2, deserialized2),
        `Test 2 failed: empty tree test`);

    // Test case 3: Single node
    const tree3 = new TreeNode(42);
    const serialized3 = codec.serialize(tree3);
    const deserialized3 = codec.deserialize(serialized3);
    console.assert(treesEqual(tree3, deserialized3),
        `Test 3 failed: single node test`);

    // Test case 4: Left-skewed tree
    const tree4 = new TreeNode(1,
        new TreeNode(2,
            new TreeNode(3),
            null
        ),
        null
    );
    const serialized4 = codec.serialize(tree4);
    const deserialized4 = codec.deserialize(serialized4);
    console.assert(treesEqual(tree4, deserialized4),
        `Test 4 failed: left-skewed tree test`);

    // Test case 5: Right-skewed tree
    const tree5 = new TreeNode(1,
        null,
        new TreeNode(2,
            null,
            new TreeNode(3)
        )
    );
    const serialized5 = codec.serialize(tree5);
    const deserialized5 = codec.deserialize(serialized5);
    console.assert(treesEqual(tree5, deserialized5),
        `Test 5 failed: right-skewed tree test`);

    // Test case 6: Negative values
    const tree6 = new TreeNode(-1,
        new TreeNode(-2),
        new TreeNode(-3)
    );
    const serialized6 = codec.serialize(tree6);
    const deserialized6 = codec.deserialize(serialized6);
    console.assert(treesEqual(tree6, deserialized6),
        `Test 6 failed: negative values test`);

    console.log('All test cases passed for 297. Serialize And Deserialize Binary Tree!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 297. Serialize And Deserialize Binary Tree ===');
    console.log('Category: Trees');
    console.log('Difficulty: Medium');
    console.log('');

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
    demonstrateSolution
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
