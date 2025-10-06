/**
 * 297. Serialize And Deserialize Binary Tree
 * Medium
 *
 * Definition for a binary tree node. function TreeNode(val) { this.val = val; this.left = this.right = null; }
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Serialize And Deserialize Binary Tree is to understand the core problem pattern
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
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

// TreeNode constructor for reference
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

/**
 * Encodes a tree to a single string.
 * Uses preorder traversal with null markers for serialization.
 * @param {TreeNode} root - The root of the binary tree
 * @return {string} - Serialized string representation of the tree
 */
function serialize(root) {
    // Handle empty tree
    if (!root) return "null";
    
    const result = [];
    
    // Helper function for preorder traversal
    function serializeHelper(node) {
        if (!node) {
            result.push("null");
            return;
        }
        
        // Preorder: root -> left -> right
        result.push(node.val.toString());
        serializeHelper(node.left);
        serializeHelper(node.right);
    }
    
    serializeHelper(root);
    return result.join(',');
}

/**
 * Decodes your encoded data to tree.
 * @param {string} data - Serialized string representation of the tree
 * @return {TreeNode} - The root of the reconstructed binary tree
 */
function deserialize(data) {
    // Convert string to array of values
    const values = data.split(',');
    let index = 0;
    
    // Helper function for building tree from preorder sequence
    function deserializeHelper() {
        // Base case: null node or end of input
        if (index >= values.length || values[index] === "null") {
            index++;
            return null;
        }
        
        // Create new node with current value
        const node = new TreeNode(parseInt(values[index]));
        index++;
        
        // Recursively build left and right subtrees
        node.left = deserializeHelper();
        node.right = deserializeHelper();
        
        return node;
    }
    
    return deserializeHelper();
}

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

// Test cases
function runTests() {
    // Test Case 1: Normal binary tree
    const root1 = new TreeNode(1);
    root1.left = new TreeNode(2);
    root1.right = new TreeNode(3);
    root1.right.left = new TreeNode(4);
    root1.right.right = new TreeNode(5);
    
    console.log("Test Case 1:");
    const serialized1 = serialize(root1);
    console.log("Serialized:", serialized1);
    const deserialized1 = deserialize(serialized1);
    console.log("Deserialized and serialized again:", serialize(deserialized1));
    
    // Test Case 2: Empty tree
    console.log("\nTest Case 2:");
    const serialized2 = serialize(null);
    console.log("Serialized:", serialized2);
    const deserialized2 = deserialize(serialized2);
    console.log("Deserialized and serialized again:", serialize(deserialized2));
    
    // Test Case 3: Single node tree
    const root3 = new TreeNode(1);
    console.log("\nTest Case 3:");
    const serialized3 = serialize(root3);
    console.log("Serialized:", serialized3);
    const deserialized3 = deserialize(serialized3);
    console.log("Deserialized and serialized again:", serialize(deserialized3));
}

// Run tests
runTests();

// Export functions for external use
module.exports = {
    serialize,
    deserialize,
    TreeNode
};