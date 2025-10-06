/**
 * 110. Balanced Binary Tree
 * Medium
 *
 * Balanced Binary Tree Implementation A balanced tree is one where the heights of the left and right subtrees of every node differ by at most one.
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Balanced Binary Tree is to understand the core problem pattern
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
 * Balanced Binary Tree Implementation
 * A balanced tree is one where the heights of the left and right subtrees 
 * of every node differ by at most one.
 */

// Node class for the tree
class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class BalancedTree {
    constructor() {
        this.root = null;
    }

    /**
     * Checks if the binary tree is balanced
     * @param {TreeNode} root - The root node of the tree
     * @returns {boolean} - True if the tree is balanced, false otherwise
     */
    isBalanced(root = this.root) {
        // Base case: empty tree is balanced
        if (!root) return true;

        // Get the height difference between left and right subtrees
        let heightDiff = this.getHeightDifference(root);

        // Tree is unbalanced if difference is more than 1
        if (heightDiff === -1) return false;

        return true;
    }

    /**
     * Helper function to get height difference between subtrees
     * Returns -1 if tree is unbalanced, otherwise returns height
     * @param {TreeNode} node - Current node being checked
     * @returns {number} - Height difference or -1 if unbalanced
     */
    getHeightDifference(node) {
        if (!node) return 0;

        // Get heights of left and right subtrees
        let leftHeight = this.getHeightDifference(node.left);
        if (leftHeight === -1) return -1;

        let rightHeight = this.getHeightDifference(node.right);
        if (rightHeight === -1) return -1;

        // Check if current node is balanced
        if (Math.abs(leftHeight - rightHeight) > 1) return -1;

        // Return height of current subtree
        return Math.max(leftHeight, rightHeight) + 1;
    }

    /**
     * Inserts a new value into the tree while maintaining balance
     * @param {*} val - Value to insert
     */
    insert(val) {
        this.root = this._insertRec(this.root, val);
    }

    /**
     * Helper function for recursive insertion
     * @param {TreeNode} node - Current node
     * @param {*} val - Value to insert
     * @returns {TreeNode} - Updated node
     */
    _insertRec(node, val) {
        // Base case: if node is null, create new node
        if (!node) return new TreeNode(val);

        // Recursive insertion
        if (val < node.val) {
            node.left = this._insertRec(node.left, val);
        } else {
            node.right = this._insertRec(node.right, val);
        }

        return this.balance(node);
    }

    /**
     * Balances a node if necessary
     * @param {TreeNode} node - Node to balance
     * @returns {TreeNode} - Balanced node
     */
    balance(node) {
        // Get balance factor
        let balance = this.getHeight(node.left) - this.getHeight(node.right);

        // Left heavy
        if (balance > 1) {
            if (this.getHeight(node.left.left) >= this.getHeight(node.left.right)) {
                return this.rightRotate(node);
            } else {
                node.left = this.leftRotate(node.left);
                return this.rightRotate(node);
            }
        }

        // Right heavy
        if (balance < -1) {
            if (this.getHeight(node.right.right) >= this.getHeight(node.right.left)) {
                return this.leftRotate(node);
            } else {
                node.right = this.rightRotate(node.right);
                return this.leftRotate(node);
            }
        }

        return node;
    }

    /**
     * Gets height of a node
     * @param {TreeNode} node - Node to get height of
     * @returns {number} - Height of node
     */
    getHeight(node) {
        if (!node) return 0;
        return Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    }

    /**
     * Performs left rotation
     * @param {TreeNode} node - Node to rotate
     * @returns {TreeNode} - New root after rotation
     */
    leftRotate(node) {
        let rightChild = node.right;
        let leftOfRight = rightChild.left;

        rightChild.left = node;
        node.right = leftOfRight;

        return rightChild;
    }

    /**
     * Performs right rotation
     * @param {TreeNode} node - Node to rotate
     * @returns {TreeNode} - New root after rotation
     */
    rightRotate(node) {
        let leftChild = node.left;
        let rightOfLeft = leftChild.right;

        leftChild.right = node;
        node.left = rightOfLeft;

        return leftChild;
    }
}

// Example usage
function testBalancedTree() {
    let tree = new BalancedTree();
    
    // Insert some values
    [10, 5, 15, 3, 7, 12, 18].forEach(val => tree.insert(val));

    // Check if tree is balanced
    console.log("Is tree balanced?", tree.isBalanced());

    // Add more values to test balance
    [1, 2].forEach(val => tree.insert(val));
    
    console.log("Is tree still balanced after more insertions?", tree.isBalanced());
}

// Run the test
testBalancedTree();

module.exports = {
    TreeNode,
    BalancedTree
};