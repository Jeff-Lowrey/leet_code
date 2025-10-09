/**

 *
 * This problem demonstrates key concepts in Queue.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Perform level-order traversal using BFS with a queue, but alternate the direction
 * of processing nodes at each level (left-to-right, then right-to-left).
 *
 * APPROACH:





 *
 * WHY THIS WORKS:
 * BFS naturally processes nodes level by level. By tracking the level number,
 * we can reverse the order of values for alternate levels to create a zigzag pattern.
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
 * Level 0 (left-to-right): [3]
 * Level 1 (right-to-left): [20, 9]
 * Level 2 (left-to-right): [15, 7]
 * Output: [[3], [20, 9], [15, 7]]
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
 * Main solution for Problem 103: Binary Tree Zigzag Level Order Traversal
 *
 * @param {TreeNode} root - Root of the binary tree
 * @return {number[][]} - Zigzag level order traversal
 *
 * Time Complexity: O(n)
 * Space Complexity: O(w) where w is maximum width
 */
function solve(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];
    let leftToRight = true;

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();

            // Add value based on direction
            if (leftToRight) {
                currentLevel.push(node.val);
            } else {
                currentLevel.unshift(node.val);
            }

            // Add children to queue
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.push(currentLevel);
        leftToRight = !leftToRight;
    }

    return result;
}

/**
 * Test cases for Problem 103: Binary Tree Zigzag Level Order Traversal
 */
function testSolution() {
    console.log('Testing 103. Binary Tree Zigzag Level Order Traversal');

    // Helper function to compare arrays
    const arraysEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

    // Test case 1: Standard tree
    const tree1 = new TreeNode(3,
        new TreeNode(9),
        new TreeNode(20, new TreeNode(15), new TreeNode(7))
    );
    const result1 = solve(tree1);
    const expected1 = [[3], [20, 9], [15, 7]];
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

    // Test case 4: Left-skewed tree
    const tree4 = new TreeNode(1, new TreeNode(2, new TreeNode(3)));
    const result4 = solve(tree4);
    const expected4 = [[1], [2], [3]];
    console.assert(arraysEqual(result4, expected4),
        `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`);

    console.log('All test cases passed for 103. Binary Tree Zigzag Level Order Traversal!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 103. Binary Tree Zigzag Level Order Traversal ===');
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
