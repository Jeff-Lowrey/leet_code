I'll help you create a complete JavaScript implementation for finding the Lowest Common Ancestor (LCA) in a Binary Search Tree (BST). Here's the solution:

```javascript
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
 * Find the Lowest Common Ancestor of two nodes in a Binary Search Tree
 * @param {TreeNode} root - The root node of the BST
 * @param {TreeNode} p - First node
 * @param {TreeNode} q - Second node
 * @return {TreeNode} - The LCA node
 */
function lowestCommonAncestor(root, p, q) {
    // Base cases
    if (!root) return null;
    if (!p || !q) return null;

    // Get the values for comparison
    const rootVal = root.val;
    const pVal = p.val;
    const qVal = q.val;

    // If both p and q are greater than root,
    // LCA must be in right subtree
    if (pVal > rootVal && qVal > rootVal) {
        return lowestCommonAncestor(root.right, p, q);
    }
    
    // If both p and q are smaller than root,
    // LCA must be in left subtree
    if (pVal < rootVal && qVal < rootVal) {
        return lowestCommonAncestor(root.left, p, q);
    }
    
    // If one node is smaller and other is greater,
    // or one of the nodes equals the root,
    // then current node is the LCA
    return root;
}

/**
 * Iterative version of LCA finding
 * @param {TreeNode} root - The root node of the BST
 * @param {TreeNode} p - First node
 * @param {TreeNode} q - Second node
 * @return {TreeNode} - The LCA node
 */
function lowestCommonAncestorIterative(root, p, q) {
    // Base cases
    if (!root || !p || !q) return null;

    let current = root;

    while (current) {
        // Get the values for comparison
        const currentVal = current.val;
        const pVal = p.val;
        const qVal = q.val;

        if (pVal > currentVal && qVal > currentVal) {
            // Both nodes are in right subtree
            current = current.right;
        } else if (pVal < currentVal && qVal < currentVal) {
            // Both nodes are in left subtree
            current = current.left;
        } else {
            // We found the split point or one of the nodes
            return current;
        }
    }

    return null;
}

/**
 * Helper function to create a BST from an array
 * @param {number[]} arr - Array of numbers
 * @return {TreeNode} - Root of created BST
 */
function createBST(arr) {
    if (!arr || arr.length === 0) return null;

    const root = new TreeNode(arr[0]);
    
    for (let i = 1; i < arr.length; i++) {
        insertIntoBST(root, arr[i]);
    }
    
    return root;
}

/**
 * Helper function to insert a value into BST
 * @param {TreeNode} root - Root node of BST
 * @param {number} val - Value to insert
 */
function insertIntoBST(root, val) {
    if (val < root.val) {
        if (root.left === null) {
            root.left = new TreeNode(val);
        } else {
            insertIntoBST(root.left, val);
        }
    } else {
        if (root.right === null) {
            root.right = new TreeNode(val);
        } else {
            insertIntoBST(root.right, val);
        }
    }
}

// Example usage and test cases
function runTests() {
    // Test Case 1: Basic BST
    const bst1 = createBST([6, 2, 8, 0, 4, 7, 9, 3, 5]);
    const p1 = new TreeNode(2);
    const q1 = new TreeNode(8);
    console.log("Test 1 Result:", lowestCommonAncestor(bst1, p1, q1).val); // Should output 6

    // Test Case 2: LCA is one of the nodes
    const p2 = new TreeNode(2);
    const q2 = new TreeNode(4);
    console.log("Test 2 Result:", lowestCommonAncestor(bst1, p2, q2).val); // Should output 2

    // Test Case 3: Using iterative method
    console.log("Test 3 Result (Iterative):", lowestCommonAncestorIterative(bst1, p1, q1).val); // Should output 6
}

// Run the tests
runTests();

// Export functions for external use
module.exports = {
    TreeNode,
    lowestCommonAncestor,
    lowestCommonAncestorIterative,
    createBST
};
```

This implementation includes:

1. A `TreeNode` class for creating BST nodes
2. Both recursive and iterative implementations of the LCA finding algorithm
3. Helper functions to create a BST from an array
4. Test cases to demonstrate functionality
5. Proper error handling for edge cases
6. Clear comments explaining the code
7. Module exports for external use

The solution provides two approaches to find the LCA:
- Recursive approach (`lowestCommonAncestor`)
- Iterative approach (`lowestCommonAncestorIterative`)

Both methods utilize the BST property where:
- All nodes in the left subtree are smaller than the current node
- All nodes in the right subtree are greater than the current node

The time complexity for both approaches is O(h), where h is the height of the tree.
The space complexity is O(h) for recursive and O(1) for iterative approach.

The code includes test cases and can be run directly or imported as a module in other files.