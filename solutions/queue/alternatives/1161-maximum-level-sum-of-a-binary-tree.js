/**

 *
 * This problem demonstrates key concepts in Queue.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Use BFS level-order traversal to calculate the sum of values at each level,
 * then track which level has the maximum sum.
 *
 * APPROACH:





 *
 * WHY THIS WORKS:
 * BFS processes nodes level by level, allowing us to calculate level sums
 * naturally. By tracking the maximum sum and its level, we find the answer.
 *
 * TIME COMPLEXITY: O(n) - Visit each node once
 * SPACE COMPLEXITY: O(w) - Queue holds at most one level width
 *
 * EXAMPLE WALKTHROUGH:
 * Input: root = [1,7,0,7,-8,null,null]
 *          1
 *        /   \
 *       7     0
 *      / \
 *     7  -8
 *
 * Level 1: sum = 1
 * Level 2: sum = 7 + 0 = 7
 * Level 3: sum = 7 + (-8) = -1
 * Maximum sum is 7 at level 2
 * Output: 2
 *
 * EDGE CASES:
 * - Single node tree
 * - Negative values
 * - Multiple levels with same sum (return smallest level)
 */

// Definition for a binary tree node
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

/**
 * Main solution for Problem 1161: Maximum Level Sum Of A Binary Tree
 *
 * @param {TreeNode} root - Root of the binary tree
 * @return {number} - Level (1-indexed) with maximum sum
 *
 * Time Complexity: O(n)
 * Space Complexity: O(w) where w is maximum width
 */
function solve(root) {
    if (!root) return 0;

    const queue = [root];
    let maxSum = -Infinity;
    let maxLevel = 1;
    let currentLevel = 1;

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

        // Update max sum and level
        if (levelSum > maxSum) {
            maxSum = levelSum;
            maxLevel = currentLevel;
        }

        currentLevel++;
    }

    return maxLevel;
}

/**
 * Test cases for Problem 1161: Maximum Level Sum Of A Binary Tree
 */
function testSolution() {
    console.log('Testing 1161. Maximum Level Sum Of A Binary Tree');

    // Test case 1: Example from problem
    const tree1 = new TreeNode(1,
        new TreeNode(7, new TreeNode(7), new TreeNode(-8)),
        new TreeNode(0)
    );
    const result1 = solve(tree1);
    const expected1 = 2;
    console.assert(result1 === expected1,
        `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Single node
    const tree2 = new TreeNode(1);
    const result2 = solve(tree2);
    const expected2 = 1;
    console.assert(result2 === expected2,
        `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Maximum at deeper level
    const tree3 = new TreeNode(1,
        new TreeNode(2, new TreeNode(10), new TreeNode(11)),
        new TreeNode(3)
    );
    const result3 = solve(tree3);
    const expected3 = 3;
    console.assert(result3 === expected3,
        `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Negative values
    const tree4 = new TreeNode(-100,
        new TreeNode(-200),
        new TreeNode(-300)
    );
    const result4 = solve(tree4);
    const expected4 = 1;
    console.assert(result4 === expected4,
        `Test 4 failed: expected ${expected4}, got ${result4}`);

    console.log('All test cases passed for 1161. Maximum Level Sum Of A Binary Tree!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 1161. Maximum Level Sum Of A Binary Tree ===');
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
