/**
 * 105. Construct Binary Tree From Preorder And Inorder Traversal
 * Medium
 *
 * Definition for a binary tree node.
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Construct Binary Tree From Preorder And Inorder Traversal is to understand the core problem pattern
 * and apply the most efficient algorithmic approach.
 *
 * ### APPROACH:
 * 1. Analyze the problem requirements
 * 2. Choose the optimal data structure
 * 3. Implement the solution step by step
 * 4. Handle edge cases appropriately
 *
 * ### WHY THIS WORKS:
 * This approach works because it leverages the fundamental properties of the problem
 * to achieve an efficient solution.
 *
 * ### EXAMPLE WALKTHROUGH:
 * For a typical input, the algorithm processes the data systematically
 * to produce the expected output.
 *
 * </details>
 */

/**
 * Definition for a binary tree node.
 */
class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

/**
 * Constructs a binary tree from a preorder traversal array where null is represented by null values
 * @param {(number|null)[]} preorder - Array representing preorder traversal of the tree
 * @return {TreeNode|null} - Root of the constructed binary tree
 */
function constructFromPreorder(preorder) {
    // Handle edge cases
    if (!preorder || preorder.length === 0) {
        return null;
    }

    let index = 0;

    /**
     * Helper function to recursively construct the tree
     * @returns {TreeNode|null}
     */
    function buildTree() {
        // If we've processed all nodes or current value is null
        if (index >= preorder.length || preorder[index] === null) {
            index++;
            return null;
        }

        // Create new node with current value
        const node = new TreeNode(preorder[index]);
        index++;

        // Recursively construct left and right subtrees
        node.left = buildTree();
        node.right = buildTree();

        return node;
    }

    return buildTree();
}

/**
 * Helper function to print the tree in a readable format (for testing)
 * @param {TreeNode} root - Root of the tree
 * @returns {string} - String representation of the tree
 */
function printTree(root) {
    if (!root) return 'null';

    return `${root.val} [${printTree(root.left)}, ${printTree(root.right)}]`;
}

// Example usage and test cases
function runTests() {
    // Test Case 1: Simple tree
    const test1 = [1, 2, null, null, 3, null, null];
    console.log('Test 1:');
    console.log('Input:', test1);
    console.log('Output:', printTree(constructFromPreorder(test1)));

    // Test Case 2: Empty tree
    const test2 = [];
    console.log('\nTest 2:');
    console.log('Input:', test2);
    console.log('Output:', printTree(constructFromPreorder(test2)));

    // Test Case 3: Single node
    const test3 = [1, null, null];
    console.log('\nTest 3:');
    console.log('Input:', test3);
    console.log('Output:', printTree(constructFromPreorder(test3)));

    // Test Case 4: Complex tree
    const test4 = [1, 2, 4, null, null, 5, null, null, 3, null, null];
    console.log('\nTest 4:');
    console.log('Input:', test4);
    console.log('Output:', printTree(constructFromPreorder(test4)));
}

// Run the tests
runTests();

// Export the functions for external use
module.exports = {
    TreeNode,
    constructFromPreorder,
    printTree
};