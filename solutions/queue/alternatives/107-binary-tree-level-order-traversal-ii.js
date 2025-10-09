/**

 *
 * This problem demonstrates key concepts in Queue.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Perform standard level-order traversal using BFS with a queue, then reverse
 * the result to get bottom-up ordering.
 *
 * APPROACH:




 *
 * WHY THIS WORKS:
 * BFS naturally processes nodes level by level from top to bottom. By reversing
 * the final result, we efficiently convert it to bottom-up order.
 *
 * TIME COMPLEXITY: O(n) - Visit each node once, plus O(h) for reversal
 * SPACE COMPLEXITY: O(w) - Queue holds at most one level width
 *
 * EXAMPLE WALKTHROUGH:
 * Input: root = [3,9,20,null,null,15,7]
 *        3
 *       / \
 *      9  20
 *        /  \
 *       15   7
 *
 * BFS traversal: [[3], [9, 20], [15, 7]]
 * After reverse: [[15, 7], [9, 20], [3]]
 *
 * EDGE CASES:
 * - Empty tree (null root)
 * - Single node tree
 * - Unbalanced tree
 */

// Definition for a binary tree node
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

/**
 * Main solution for Problem 107: Binary Tree Level Order Traversal II
 *
 * @param {TreeNode} root - Root of the binary tree
 * @return {number[][]} - Bottom-up level order traversal
 *
 * Time Complexity: O(n)
 * Space Complexity: O(w) where w is maximum width
 */
function solve(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);

            // Add children to queue
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.push(currentLevel);
    }

    // Reverse to get bottom-up order
    return result.reverse();
}

/**
 * Test cases for Problem 107: Binary Tree Level Order Traversal II
 */
function testSolution() {
    console.log('Testing 107. Binary Tree Level Order Traversal II');

    // Helper function to compare arrays
    const arraysEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

    // Test case 1: Standard tree
    const tree1 = new TreeNode(3,
        new TreeNode(9),
        new TreeNode(20, new TreeNode(15), new TreeNode(7))
    );
    const result1 = solve(tree1);
    const expected1 = [[15, 7], [9, 20], [3]];
    console.assert(arraysEqual(result1, expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);

    // Test case 2: Empty tree
    const result2 = solve(null);
    const expected2 = [];
    console.assert(arraysEqual(result2, expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);

    // Test case 3: Single node
    const tree3 = new TreeNode(1);
    const result3 = solve(tree3);
    const expected3 = [[1]];
    console.assert(arraysEqual(result3, expected3),
        `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`);

    console.log('All test cases passed for 107. Binary Tree Level Order Traversal II!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 107. Binary Tree Level Order Traversal Ii ===');
    console.log('Category: Queue');
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
    testSolution,
    demonstrateSolution,
    TreeNode
};

/**
 * Additional Notes:
 * - This solution focuses on queue concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
