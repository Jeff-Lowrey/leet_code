/**
 * 094. Binary Tree Inorder Traversal
 * Medium
 *
 * This problem demonstrates key concepts in Trees - specifically tree traversal.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Inorder traversal visits nodes in the order: left subtree -> root -> right subtree.
 * This creates a sorted sequence for BSTs. We can implement this recursively,
 * iteratively with a stack, or using Morris traversal for O(1) space.
 *
 * APPROACH:
 * 1. **Recursive**: Simple recursive calls following left -> root -> right pattern
 * 2. **Iterative**: Use explicit stack to simulate recursion
 * 3. **Morris Traversal**: Threading technique for O(1) space complexity
 * 4. **Handle edge cases**: Null tree, single node, skewed trees
 *
 * WHY THIS WORKS:
 * - Recursive approach leverages call stack naturally
 * - Iterative approach gives explicit control over stack
 * - Morris traversal modifies tree temporarily for constant space
 * - All maintain inorder property: left -> root -> right
 *
 * TIME COMPLEXITY: O(n) - visit each node exactly once
 * SPACE COMPLEXITY:
 *   - Recursive: O(h) where h is height (worst case O(n) for skewed tree)
 *   - Iterative: O(h) for explicit stack
 *   - Morris: O(1) constant space
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * Input:     1
 *           / \
 *          2   3
 *         / \
 *        4   5
 *
 * Inorder: Left -> Root -> Right
 * Step 1: Visit left subtree of 1 (which is 2)
 * Step 2: Visit left subtree of 2 (which is 4) -> output 4
 * Step 3: Visit root 2 -> output 2
 * Step 4: Visit right subtree of 2 (which is 5) -> output 5
 * Step 5: Visit root 1 -> output 1
 * Step 6: Visit right subtree of 1 (which is 3) -> output 3
 * Output: [4, 2, 5, 1, 3]
 * ```
 *
 * EDGE CASES:
 * - Empty tree (null root)
 * - Single node tree
 * - Left-skewed tree (worst case for stack space)
 * - Right-skewed tree
 */

/**
 * Definition for a binary tree node.
 */
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

/**
 * Main solution for Problem 094: Binary Tree Inorder Traversal
 * Uses recursive approach for simplicity and readability
 *
 * @param {TreeNode} root - Root of the binary tree
 * @return {number[]} - Array of node values in inorder sequence
 *
 * Time Complexity: O(n) where n is number of nodes
 * Space Complexity: O(h) where h is height of tree (due to recursion stack)
 */
function solve(root) {
    return inorderTraversalRecursive(root);
}

/**
 * Approach 1: Recursive Inorder Traversal
 *
 * @param {TreeNode} root
 * @return {number[]}
 */
function inorderTraversalRecursive(root) {
    const result = [];

    function inorderHelper(node) {
        if (node === null) return;

        inorderHelper(node.left);   // Traverse left subtree
        result.push(node.val);      // Visit root
        inorderHelper(node.right);  // Traverse right subtree
    }

    inorderHelper(root);
    return result;
}

/**
 * Approach 2: Iterative Inorder Traversal using Stack
 *
 * @param {TreeNode} root
 * @return {number[]}
 */
function inorderTraversalIterative(root) {
    const result = [];
    const stack = [];
    let current = root;

    while (current !== null || stack.length > 0) {
        // Go to the leftmost node
        while (current !== null) {
            stack.push(current);
            current = current.left;
        }

        // Current is null, pop from stack
        current = stack.pop();
        result.push(current.val);  // Visit root

        // Go to right subtree
        current = current.right;
    }

    return result;
}

/**
 * Approach 3: Morris Inorder Traversal (O(1) Space)
 * Uses threading to achieve constant space complexity
 *
 * @param {TreeNode} root
 * @return {number[]}
 */
function inorderTraversalMorris(root) {
    const result = [];
    let current = root;

    while (current !== null) {
        if (current.left === null) {
            // No left subtree, visit current and go right
            result.push(current.val);
            current = current.right;
        } else {
            // Find inorder predecessor
            let predecessor = current.left;
            while (predecessor.right !== null && predecessor.right !== current) {
                predecessor = predecessor.right;
            }

            if (predecessor.right === null) {
                // Make current the right child of its inorder predecessor
                predecessor.right = current;
                current = current.left;
            } else {
                // Revert the changes: remove the right child pointer
                predecessor.right = null;
                result.push(current.val);
                current = current.right;
            }
        }
    }

    return result;
}

/**
 * Test cases for Problem 094: Binary Tree Inorder Traversal
 */
function testSolution() {
    console.log('Testing 094. Binary Tree Inorder Traversal');

    // Test case 1: Standard tree
    //       1
    //      / \
    //     2   3
    //    / \
    //   4   5
    const tree1 = new TreeNode(1,
        new TreeNode(2,
            new TreeNode(4),
            new TreeNode(5)
        ),
        new TreeNode(3)
    );
    const result1 = solve(tree1);
    const expected1 = [4, 2, 5, 1, 3];
    console.assert(JSON.stringify(result1) === JSON.stringify(expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);

    // Test case 2: Empty tree
    const result2 = solve(null);
    const expected2 = [];
    console.assert(JSON.stringify(result2) === JSON.stringify(expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);

    // Test case 3: Single node
    const tree3 = new TreeNode(42);
    const result3 = solve(tree3);
    const expected3 = [42];
    console.assert(JSON.stringify(result3) === JSON.stringify(expected3),
        `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`);

    // Test case 4: Left-skewed tree
    const tree4 = new TreeNode(3,
        new TreeNode(2,
            new TreeNode(1),
            null
        ),
        null
    );
    const result4 = solve(tree4);
    const expected4 = [1, 2, 3];
    console.assert(JSON.stringify(result4) === JSON.stringify(expected4),
        `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`);

    // Test case 5: Right-skewed tree
    const tree5 = new TreeNode(1,
        null,
        new TreeNode(2,
            null,
            new TreeNode(3)
        )
    );
    const result5 = solve(tree5);
    const expected5 = [1, 2, 3];
    console.assert(JSON.stringify(result5) === JSON.stringify(expected5),
        `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`);

    // Test case 6: Complex tree
    //       4
    //      / \
    //     2   6
    //    / \ / \
    //   1  3 5  7
    const tree6 = new TreeNode(4,
        new TreeNode(2,
            new TreeNode(1),
            new TreeNode(3)
        ),
        new TreeNode(6,
            new TreeNode(5),
            new TreeNode(7)
        )
    );
    const result6 = solve(tree6);
    const expected6 = [1, 2, 3, 4, 5, 6, 7];
    console.assert(JSON.stringify(result6) === JSON.stringify(expected6),
        `Test 6 failed: expected ${JSON.stringify(expected6)}, got ${JSON.stringify(result6)}`);

    // Test all approaches give same results
    const resultRecursive = inorderTraversalRecursive(tree1);
    const resultIterative = inorderTraversalIterative(tree1);
    const resultMorris = inorderTraversalMorris(tree1);
    console.assert(JSON.stringify(resultRecursive) === JSON.stringify(resultIterative) &&
                   JSON.stringify(resultIterative) === JSON.stringify(resultMorris),
        'All approaches should give the same result');

    console.log('All test cases passed for 094. Binary Tree Inorder Traversal!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 094. Binary Tree Inorder Traversal ===');
    console.log('Category: Trees');
    console.log('Difficulty: Medium');
    console.log('');

    // Example demonstration would go here
    testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
    demonstrateSolution();
}

// Export for use in other modules
module.exports = {
    solve,
    inorderTraversalRecursive,
    inorderTraversalIterative,
    inorderTraversalMorris,
    TreeNode,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - Three different approaches: Recursive, Iterative, and Morris
 * - Recursive: O(h) space due to call stack, most intuitive
 * - Iterative: O(h) space using explicit stack, good for avoiding stack overflow
 * - Morris: O(1) space using threading, most space-efficient but modifies tree temporarily
 * - All approaches maintain O(n) time complexity
 * - For BSTs, inorder traversal produces sorted sequence
 * - Edge cases include null tree, single node, and skewed trees
 */
