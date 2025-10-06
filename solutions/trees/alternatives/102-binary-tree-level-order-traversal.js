/**
 * 102. Binary Tree Level Order Traversal
 * Medium
 *
 * Definition for a binary tree node. function TreeNode(val, left, right) { this.val = (val===undefined ? 0 : val) this.left = (left===undefined ? null : left) this.right = (right===undefined ? null : right) }
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Binary Tree Level Order Traversal is to understand the core problem pattern
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
 * Level Order Traversal of Binary Tree
 * Time Complexity: O(n) where n is the number of nodes
 * Space Complexity: O(w) where w is the maximum width of the tree
 * @param {TreeNode} root - Root node of the binary tree
 * @return {number[][]} - Array of arrays containing values at each level
 */
function levelOrder(root) {
    // Handle edge case of empty tree
    if (!root) {
        return [];
    }

    const result = [];
    const queue = [root];

    // Process nodes level by level
    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];

        // Process all nodes at current level
        for (let i = 0; i < levelSize; i++) {
            const currentNode = queue.shift();
            currentLevel.push(currentNode.val);

            // Add left child to queue if exists
            if (currentNode.left) {
                queue.push(currentNode.left);
            }

            // Add right child to queue if exists
            if (currentNode.right) {
                queue.push(currentNode.right);
            }
        }

        // Add current level values to result
        result.push(currentLevel);
    }

    return result;
}

/**
 * Helper function to create a binary tree from array
 * @param {number[]} arr - Array representation of binary tree
 * @return {TreeNode} - Root node of created binary tree
 */
function createBinaryTree(arr) {
    if (!arr || arr.length === 0) {
        return null;
    }

    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;

    while (queue.length > 0 && i < arr.length) {
        const current = queue.shift();

        // Create left child
        if (i < arr.length && arr[i] !== null) {
            current.left = new TreeNode(arr[i]);
            queue.push(current.left);
        }
        i++;

        // Create right child
        if (i < arr.length && arr[i] !== null) {
            current.right = new TreeNode(arr[i]);
            queue.push(current.right);
        }
        i++;
    }

    return root;
}

/**
 * TreeNode class definition
 */
class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

// Example usage and test cases
function runTests() {
    // Test Case 1: Normal binary tree
    const tree1 = createBinaryTree([3, 9, 20, null, null, 15, 7]);
    console.log("Test 1:", levelOrder(tree1));
    // Expected output: [[3], [9,20], [15,7]]

    // Test Case 2: Empty tree
    console.log("Test 2:", levelOrder(null));
    // Expected output: []

    // Test Case 3: Single node tree
    const tree3 = createBinaryTree([1]);
    console.log("Test 3:", levelOrder(tree3));
    // Expected output: [[1]]

    // Test Case 4: Complete binary tree
    const tree4 = createBinaryTree([1, 2, 3, 4, 5, 6, 7]);
    console.log("Test 4:", levelOrder(tree4));
    // Expected output: [[1], [2,3], [4,5,6,7]]
}

// Run the tests
runTests();

module.exports = {
    levelOrder,
    TreeNode,
    createBinaryTree
};