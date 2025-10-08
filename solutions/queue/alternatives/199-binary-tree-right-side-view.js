/**
 * 199. Binary Tree Right Side View
 * Medium
 *
 * This problem demonstrates key concepts in Queue.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Use BFS level-order traversal to visit nodes level by level.
 * The rightmost node at each level is what we see from the right side.
 *
 * APPROACH:
 * 1. Use a queue for BFS traversal
 * 2. Process nodes level by level
 * 3. The last node processed at each level is the rightmost node
 * 4. Add each rightmost node to the result
 *
 * WHY THIS WORKS:
 * BFS processes nodes left to right at each level. The last node
 * processed at each level is the rightmost visible node from the right side.
 *
 * TIME COMPLEXITY: O(n) - Visit each node once
 * SPACE COMPLEXITY: O(w) - Queue holds at most one level width
 *
 * EXAMPLE WALKTHROUGH:
 * Input: root = [1,2,3,null,5,null,4]
 *        1         <- visible (rightmost at level 0)
 *       / \
 *      2   3       <- 3 visible (rightmost at level 1)
 *       \   \
 *        5   4     <- 4 visible (rightmost at level 2)
 *
 * Output: [1, 3, 4]
 *
 * EDGE CASES:
 * - Empty tree (null root)
 * - Single node tree
 * - Left-skewed tree (only left children)
 */

// Definition for a binary tree node
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

/**
 * Main solution for Problem 199: Binary Tree Right Side View
 *
 * @param {TreeNode} root - Root of the binary tree
 * @return {number[]} - Values visible from right side
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
        let rightmost = null;

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            rightmost = node.val; // Last node at this level

            // Add children to queue
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        // Add the rightmost value of this level
        result.push(rightmost);
    }

    return result;
}

/**
 * Test cases for Problem 199: Binary Tree Right Side View
 */
function testSolution() {
    console.log('Testing 199. Binary Tree Right Side View');

    // Helper function to compare arrays
    const arraysEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

    // Test case 1: Standard tree
    const tree1 = new TreeNode(1,
        new TreeNode(2, null, new TreeNode(5)),
        new TreeNode(3, null, new TreeNode(4))
    );
    const result1 = solve(tree1);
    const expected1 = [1, 3, 4];
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
    const expected3 = [1];
    console.assert(arraysEqual(result3, expected3),
        `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`);

    // Test case 4: Left-skewed tree
    const tree4 = new TreeNode(1, new TreeNode(2, new TreeNode(3)));
    const result4 = solve(tree4);
    const expected4 = [1, 2, 3];
    console.assert(arraysEqual(result4, expected4),
        `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`);

    console.log('All test cases passed for 199. Binary Tree Right Side View!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 199. Binary Tree Right Side View ===');
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
