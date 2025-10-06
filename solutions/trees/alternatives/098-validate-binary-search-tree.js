/**
 * 98. Validate Binary Search Tree
 * Medium
 *
 * Definition for a binary tree node. function TreeNode(val, left, right) { this.val = (val===undefined ? 0 : val) this.left = (left===undefined ? null : left) this.right = (right===undefined ? null : right) }
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Validate Binary Search Tree is to understand the core problem pattern
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
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * Validates if a binary tree is a valid Binary Search Tree (BST)
 * A valid BST is defined as follows:
 * - The left subtree of a node contains only nodes with keys less than the node's key.
 * - The right subtree of a node contains only nodes with keys greater than the node's key.
 * - Both the left and right subtrees must also be binary search trees.
 * 
 * @param {TreeNode} root - The root node of the binary tree
 * @return {boolean} - Returns true if the tree is a valid BST, false otherwise
 */
function isValidBST(root) {
    // Helper function to validate BST with min and max boundaries
    function isValidBSTHelper(node, min, max) {
        // Base case: empty node is valid
        if (node === null) {
            return true;
        }
        
        // Check if current node's value is within the valid range
        if ((min !== null && node.val <= min) || 
            (max !== null && node.val >= max)) {
            return false;
        }
        
        // Recursively check left and right subtrees
        // Left subtree values must be less than current node's value
        // Right subtree values must be greater than current node's value
        return isValidBSTHelper(node.left, min, node.val) && 
               isValidBSTHelper(node.right, node.val, max);
    }
    
    // Start the validation with no min/max boundaries
    return isValidBSTHelper(root, null, null);
}

/**
 * Test cases
 */
// Helper function to create a tree node
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

// Test case 1: Valid BST
//      2
//     / \
//    1   3
function testCase1() {
    const root1 = new TreeNode(2);
    root1.left = new TreeNode(1);
    root1.right = new TreeNode(3);
    console.log("Test Case 1:", isValidBST(root1)); // Should return true
}

// Test case 2: Invalid BST
//      5
//     / \
//    1   4
//       / \
//      3   6
function testCase2() {
    const root2 = new TreeNode(5);
    root2.left = new TreeNode(1);
    root2.right = new TreeNode(4);
    root2.right.left = new TreeNode(3);
    root2.right.right = new TreeNode(6);
    console.log("Test Case 2:", isValidBST(root2)); // Should return false
}

// Test case 3: Single node
function testCase3() {
    const root3 = new TreeNode(1);
    console.log("Test Case 3:", isValidBST(root3)); // Should return true
}

// Test case 4: Empty tree
function testCase4() {
    console.log("Test Case 4:", isValidBST(null)); // Should return true
}

// Run test cases
testCase1();
testCase2();
testCase3();
testCase4();

// Export the function for use in other modules
module.exports = {
    isValidBST,
    TreeNode
};