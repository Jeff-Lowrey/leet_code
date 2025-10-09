/**

 *
 * This problem demonstrates key concepts in Queue.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Use BFS level-order traversal to process nodes level by level.
 * Calculate the average of node values at each level.
 *
 * APPROACH:





 *
 * WHY THIS WORKS:
 * BFS naturally groups nodes by level. By calculating the sum and count
 * for each level, we can compute the average efficiently.
 *
 * TIME COMPLEXITY: O(n) - Visit each node once
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
 * Level 0: sum = 3, count = 1, avg = 3.0
 * Level 1: sum = 29, count = 2, avg = 14.5
 * Level 2: sum = 22, count = 2, avg = 11.0
 * Output: [3.0, 14.5, 11.0]
 *
 * EDGE CASES:
 * - Empty tree (null root)
 * - Single node tree
 * - Negative values
 * - Large values that may cause overflow
 */

// Definition for a binary tree node
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

/**
 * Main solution for Problem 637: Average Of Levels In Binary Tree
 *
 * @param {TreeNode} root - Root of the binary tree
 * @return {number[]} - Average of values at each level
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
        let levelSum = 0;

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            levelSum += node.val;

            // Add children to queue
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        // Calculate and add average for this level
        result.push(levelSum / levelSize);
    }

    return result;
}

/**
 * Test cases for Problem 637: Average Of Levels In Binary Tree
 */
function testSolution() {
    console.log('Testing 637. Average Of Levels In Binary Tree');

    // Helper function to compare arrays with floating point tolerance
    const arraysEqual = (a, b, tolerance = 0.00001) => {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (Math.abs(a[i] - b[i]) > tolerance) return false;
        }
        return true;
    };

    // Test case 1: Standard tree
    const tree1 = new TreeNode(3,
        new TreeNode(9),
        new TreeNode(20, new TreeNode(15), new TreeNode(7))
    );
    const result1 = solve(tree1);
    const expected1 = [3.0, 14.5, 11.0];
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
    const expected3 = [1.0];
    console.assert(arraysEqual(result3, expected3),
        `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`);

    // Test case 4: Unbalanced tree
    const tree4 = new TreeNode(1,
        new TreeNode(2, new TreeNode(3, new TreeNode(4))),
        null
    );
    const result4 = solve(tree4);
    const expected4 = [1.0, 2.0, 3.0, 4.0];
    console.assert(arraysEqual(result4, expected4),
        `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`);

    // Test case 5: Negative values
    const tree5 = new TreeNode(-1,
        new TreeNode(-2),
        new TreeNode(-3)
    );
    const result5 = solve(tree5);
    const expected5 = [-1.0, -2.5];
    console.assert(arraysEqual(result5, expected5),
        `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`);

    console.log('All test cases passed for 637. Average Of Levels In Binary Tree!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 637. Average Of Levels In Binary Tree ===');
    console.log('Category: Queue');
    console.log('Difficulty: Easy');
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
 * - Division is done after summing to maintain precision
 * - The approach naturally handles trees of any shape
 * - Can be easily modified to calculate other statistics per level
 */
