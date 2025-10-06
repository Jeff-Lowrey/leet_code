/**
 * 173. Bst
 * Medium
 *
 * Definition for a binary tree node. function TreeNode(val, left, right) { this.val = (val===undefined ? 0 : val) this.left = (left===undefined ? null : left) this.right = (right===undefined ? null : right) }
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Bst is to understand the core problem pattern
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
 * BSTIterator Class - Implements an iterator over a binary search tree (BST)
 * Uses controlled inorder traversal to achieve O(1) average time complexity for next()
 * and O(h) memory where h is the height of the tree
 */
class BSTIterator {
    /**
     * Initialize your data structure here
     * @param {TreeNode} root - Root node of the BST
     */
    constructor(root) {
        // Stack to store nodes during traversal
        this.stack = [];
        
        // Initialize the iterator by pushing all left nodes onto stack
        this.pushLeftNodes(root);
    }

    /**
     * Helper method to push all left nodes of a given node onto the stack
     * @param {TreeNode} node - Current node being processed
     */
    pushLeftNodes(node) {
        while (node !== null) {
            this.stack.push(node);
            node = node.left;
        }
    }

    /**
     * @return {number} - Returns the next smallest number in the BST
     */
    next() {
        // Pop the next smallest element from stack
        const currentNode = this.stack.pop();
        
        // If the node has a right child, push all its left nodes onto stack
        if (currentNode.right !== null) {
            this.pushLeftNodes(currentNode.right);
        }
        
        return currentNode.val;
    }

    /**
     * @return {boolean} - Returns whether we have a next smallest number
     */
    hasNext() {
        return this.stack.length > 0;
    }
}

/** 
 * Example usage:
 * const obj = new BSTIterator(root)
 * const param_1 = obj.next()
 * const param_2 = obj.hasNext()
 */

// Export the class for use in other files
module.exports = BSTIterator;

/**
 * Time Complexity Analysis:
 * - Constructor: O(h) where h is the height of the tree
 * - next(): O(1) amortized
 * - hasNext(): O(1)
 * 
 * Space Complexity:
 * - O(h) where h is the height of the tree
 * 
 * The implementation uses a stack to maintain the state of traversal.
 * It follows the principle of controlled inorder traversal where we only
 * process nodes when needed, making it memory efficient compared to
 * storing all values in an array.
 */