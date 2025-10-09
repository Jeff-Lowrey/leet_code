/**

 *
 * This problem demonstrates key concepts in Design.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Implement an iterator that performs in-order traversal of a BST. The key insight is to use
 * a stack to simulate the recursive in-order traversal iteratively. We only push left nodes
 * initially, then process nodes one at a time.
 *
 * APPROACH:




 *
 * WHY THIS WORKS:
 * - Stack maintains nodes to be visited in correct in-order sequence
 * - Only stores nodes along the path to current position (O(h) space)
 * - Each node is pushed and popped exactly once (amortized O(1) per operation)
 *
 * TIME COMPLEXITY: O(1) average for next() and hasNext()
 * SPACE COMPLEXITY: O(h) where h is the height of the tree
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * Input: root = [7,3,15,null,null,9,20]
 *        7
 *       / \
 *      3  15
 *         / \
 *        9  20
 *
 * Step 1: Initialize - push 7, 3 onto stack (all left nodes)
 * Step 2: next() returns 3 (leftmost, no right child)
 * Step 3: next() returns 7, push 15, 9
 * Step 4: next() returns 9
 * Step 5: next() returns 15, push 20
 * Step 6: next() returns 20
 * Output: [3, 7, 9, 15, 20]
 * ```
 *
 * EDGE CASES:
 * - Single node tree
 * - Left-skewed tree (essentially a linked list)
 * - Right-skewed tree
 */

/**
 * Definition for a binary tree node.
 */
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

/**
 * Binary Search Tree Iterator
 * Supports in-order traversal with next() and hasNext() operations
 *
 * Time Complexity: O(1) average for next() and hasNext()
 * Space Complexity: O(h) where h is the height of the tree
 */
class BSTIterator {
    constructor(root) {
        this.stack = [];
        this._pushLeft(root);
    }

    /**
     * Helper method to push all left children onto the stack
     * @param {TreeNode} node - Starting node
     */
    _pushLeft(node) {
        while (node !== null) {
            this.stack.push(node);
            node = node.left;
        }
    }

    /**
     * Returns the next smallest number in the BST
     * @return {number}
     */
    next() {
        const node = this.stack.pop();
        // If the node has a right child, push all its left descendants
        this._pushLeft(node.right);
        return node.val;
    }

    /**
     * Returns whether there are more elements to iterate
     * @return {boolean}
     */
    hasNext() {
        return this.stack.length > 0;
    }
}

/**
 * Factory function for creating BSTIterator instances
 * @param {TreeNode} root - Root of the BST
 * @return {BSTIterator}
 */
function solve(root) {
    return new BSTIterator(root);
}

/**
 * Test cases for Problem 173: Binary Search Tree Iterator
 */
function testSolution() {
    console.log('Testing 173. Binary Search Tree Iterator');

    // Test case 1: Standard BST
    const root1 = new TreeNode(7);
    root1.left = new TreeNode(3);
    root1.right = new TreeNode(15);
    root1.right.left = new TreeNode(9);
    root1.right.right = new TreeNode(20);

    const iterator1 = new BSTIterator(root1);
    const result1 = [];
    while (iterator1.hasNext()) {
        result1.push(iterator1.next());
    }
    console.assert(JSON.stringify(result1) === JSON.stringify([3, 7, 9, 15, 20]),
        `Test 1 failed: expected [3, 7, 9, 15, 20], got ${JSON.stringify(result1)}`);

    // Test case 2: Single node
    const root2 = new TreeNode(1);
    const iterator2 = new BSTIterator(root2);
    const result2 = [];
    while (iterator2.hasNext()) {
        result2.push(iterator2.next());
    }
    console.assert(JSON.stringify(result2) === JSON.stringify([1]),
        `Test 2 failed: expected [1], got ${JSON.stringify(result2)}`);

    // Test case 3: Left-skewed tree
    const root3 = new TreeNode(5);
    root3.left = new TreeNode(3);
    root3.left.left = new TreeNode(1);
    const iterator3 = new BSTIterator(root3);
    const result3 = [];
    while (iterator3.hasNext()) {
        result3.push(iterator3.next());
    }
    console.assert(JSON.stringify(result3) === JSON.stringify([1, 3, 5]),
        `Test 3 failed: expected [1, 3, 5], got ${JSON.stringify(result3)}`);

    // Test case 4: Right-skewed tree
    const root4 = new TreeNode(1);
    root4.right = new TreeNode(3);
    root4.right.right = new TreeNode(5);
    const iterator4 = new BSTIterator(root4);
    const result4 = [];
    while (iterator4.hasNext()) {
        result4.push(iterator4.next());
    }
    console.assert(JSON.stringify(result4) === JSON.stringify([1, 3, 5]),
        `Test 4 failed: expected [1, 3, 5], got ${JSON.stringify(result4)}`);

    console.log('All test cases passed for 173. Binary Search Tree Iterator!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 173. Binary Search Tree Iterator ===');
    console.log('Category: Design');
    console.log('Difficulty: Medium');
    console.log('');

    // Example: Create a BST and iterate through it
    console.log('Example: BST = [7,3,15,null,null,9,20]');
    const root = new TreeNode(7);
    root.left = new TreeNode(3);
    root.right = new TreeNode(15);
    root.right.left = new TreeNode(9);
    root.right.right = new TreeNode(20);

    const iterator = new BSTIterator(root);
    console.log('Iterating in-order:');
    const values = [];
    while (iterator.hasNext()) {
        values.push(iterator.next());
    }
    console.log(`Result: [${values.join(', ')}]`);
    console.log('Expected: [3, 7, 9, 15, 20]\n');

    testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
    demonstrateSolution();
}

// Export for use in other modules
module.exports = {
    TreeNode,
    BSTIterator,
    solve,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This solution uses controlled iteration with O(h) space instead of O(n)
 * - Stack-based approach provides O(1) average time for next() and hasNext()
 * - Ideal for scenarios where you don't need to iterate through entire tree
 * - The approach mimics recursive in-order traversal but with explicit control
 * - Each node is visited exactly once, making it efficient for large trees
 */
