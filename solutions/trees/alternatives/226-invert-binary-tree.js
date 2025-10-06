/**
 * 226. Invert Binary Tree
 * Medium
 *
 * Definition for a binary tree node. function TreeNode(val, left, right) { this.val = (val===undefined ? 0 : val) this.left = (left===undefined ? null : left) this.right = (right===undefined ? null : right) }
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Invert Binary Tree is to understand the core problem pattern
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
 * Inverts a binary tree by swapping all left and right child nodes recursively.
 * @param {TreeNode} root - The root node of the binary tree
 * @return {TreeNode} - The root node of the inverted binary tree
 */
function invertTree(root) {
    // Base case: if root is null, return null
    if (root === null) {
        return null;
    }
    
    // Store the left and right children
    const leftChild = root.left;
    const rightChild = root.right;
    
    // Swap the children
    root.left = invertTree(rightChild);
    root.right = invertTree(leftChild);
    
    // Return the root node
    return root;
}

/**
 * Alternative iterative solution using a queue
 * @param {TreeNode} root - The root node of the binary tree
 * @return {TreeNode} - The root node of the inverted binary tree
 */
function invertTreeIterative(root) {
    // If tree is empty, return null
    if (root === null) {
        return null;
    }
    
    // Create a queue and add root node
    const queue = [root];
    
    // Process nodes in the queue
    while (queue.length > 0) {
        // Get the current node
        const current = queue.shift();
        
        // Swap the left and right children
        const temp = current.left;
        current.left = current.right;
        current.right = temp;
        
        // Add non-null children to the queue
        if (current.left !== null) {
            queue.push(current.left);
        }
        if (current.right !== null) {
            queue.push(current.right);
        }
    }
    
    // Return the root node
    return root;
}

/**
 * Helper function to create a binary tree node
 * @param {number} val - The value of the node
 * @param {TreeNode} left - The left child node
 * @param {TreeNode} right - The right child node
 * @return {TreeNode} - A new TreeNode instance
 */
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

// Example usage:
function example() {
    // Create a sample binary tree
    const root = new TreeNode(4);
    root.left = new TreeNode(2);
    root.right = new TreeNode(7);
    root.left.left = new TreeNode(1);
    root.left.right = new TreeNode(3);
    root.right.left = new TreeNode(6);
    root.right.right = new TreeNode(9);
    
    // Invert the tree using recursive method
    const invertedTree = invertTree(root);
    
    // Create another tree for iterative method
    const root2 = new TreeNode(4);
    root2.left = new TreeNode(2);
    root2.right = new TreeNode(7);
    root2.left.left = new TreeNode(1);
    root2.left.right = new TreeNode(3);
    root2.right.left = new TreeNode(6);
    root2.right.right = new TreeNode(9);
    
    // Invert the tree using iterative method
    const invertedTree2 = invertTreeIterative(root2);
    
    return {
        recursive: invertedTree,
        iterative: invertedTree2
    };
}

// Export the functions for use in other modules
module.exports = {
    invertTree,
    invertTreeIterative,
    TreeNode
};