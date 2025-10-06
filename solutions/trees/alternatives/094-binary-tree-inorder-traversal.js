/**
 * 94. Binary Tree Inorder Traversal
 * Medium
 *
 * Definition for a binary tree node. function TreeNode(val, left, right) { this.val = (val===undefined ? 0 : val) this.left = (left===undefined ? null : left) this.right = (right===undefined ? null : right) }
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Binary Tree Inorder Traversal is to understand the core problem pattern
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
 * Inorder Traversal Implementation
 * Time Complexity: O(n) where n is the number of nodes
 * Space Complexity: O(h) where h is the height of the tree
 */

// TreeNode class definition for reference
class TreeNode {
    constructor(val, left, right) {
        this.val = (val === undefined ? 0 : val);
        this.left = (left === undefined ? null : left);
        this.right = (right === undefined ? null : right);
    }
}

/**
 * Recursive implementation of inorder traversal
 * @param {TreeNode} root - The root node of the binary tree
 * @return {number[]} - Array containing nodes in inorder sequence
 */
function inorderTraversalRecursive(root) {
    const result = [];
    
    function traverse(node) {
        if (node === null) return;
        
        // Visit left subtree
        traverse(node.left);
        
        // Visit current node
        result.push(node.val);
        
        // Visit right subtree
        traverse(node.right);
    }
    
    traverse(root);
    return result;
}

/**
 * Iterative implementation of inorder traversal using a stack
 * @param {TreeNode} root - The root node of the binary tree
 * @return {number[]} - Array containing nodes in inorder sequence
 */
function inorderTraversalIterative(root) {
    const result = [];
    const stack = [];
    let current = root;
    
    while (current !== null || stack.length > 0) {
        // Reach the leftmost node of the current subtree
        while (current !== null) {
            stack.push(current);
            current = current.left;
        }
        
        // Process current node and move to right subtree
        current = stack.pop();
        result.push(current.val);
        current = current.right;
    }
    
    return result;
}

/**
 * Morris Traversal implementation (threaded binary tree)
 * Space Complexity: O(1)
 * @param {TreeNode} root - The root node of the binary tree
 * @return {number[]} - Array containing nodes in inorder sequence
 */
function morrisTraversal(root) {
    const result = [];
    let current = root;
    
    while (current !== null) {
        if (current.left === null) {
            result.push(current.val);
            current = current.right;
        } else {
            // Find the inorder predecessor
            let predecessor = current.left;
            while (predecessor.right !== null && predecessor.right !== current) {
                predecessor = predecessor.right;
            }
            
            if (predecessor.right === null) {
                // Create thread
                predecessor.right = current;
                current = current.left;
            } else {
                // Remove thread
                predecessor.right = null;
                result.push(current.val);
                current = current.right;
            }
        }
    }
    
    return result;
}

// Example usage and test cases
function runTests() {
    // Create a sample binary tree
    //       1
    //      / \
    //     2   3
    //    / \
    //   4   5
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    
    console.log("Recursive Inorder:", inorderTraversalRecursive(root));  // Expected: [4,2,5,1,3]
    console.log("Iterative Inorder:", inorderTraversalIterative(root)); // Expected: [4,2,5,1,3]
    console.log("Morris Traversal:", morrisTraversal(root));           // Expected: [4,2,5,1,3]
    
    // Test empty tree
    console.log("Empty tree:", inorderTraversalRecursive(null));       // Expected: []
    
    // Test single node tree
    console.log("Single node:", inorderTraversalRecursive(new TreeNode(1))); // Expected: [1]
}

// Export functions for external use
module.exports = {
    inorderTraversalRecursive,
    inorderTraversalIterative,
    morrisTraversal,
    TreeNode
};

// Uncomment to run tests
// runTests();