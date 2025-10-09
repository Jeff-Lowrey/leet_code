/**

 *
 * This problem demonstrates advanced tree traversal with global optimization.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * A path can go through any node and doesn't have to go through the root.
 * For each node, we can consider it as a "turning point" where paths from
 * left and right subtrees meet. The maximum path sum is either:



 *
 * APPROACH:




 *
 * WHY THIS WORKS:
 * - Every possible path is considered exactly once
 * - Global variable tracks the maximum across all possible paths
 * - Negative paths are pruned to avoid reducing the sum
 * - Post-order traversal ensures children are processed before parent
 *
 * TIME COMPLEXITY: O(n) where n is number of nodes
 * Each node is visited exactly once
 *
 * SPACE COMPLEXITY: O(h) where h is height of tree
 * Recursion stack depth equals tree height
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * Input: [1,2,3]
 *        1
 *       / \
 *      2   3
 *
 * Step 1: Process leaf 2: max_ending_here = 2, global_max = 2
 * Step 2: Process leaf 3: max_ending_here = 3, global_max = 3
 * Step 3: Process root 1:
 *         - Left contribution: 2
 *         - Right contribution: 3
 *         - Path through node 1: 2 + 1 + 3 = 6
 *         - global_max = max(3, 6) = 6
 *         - Return: 1 + max(2, 3) = 4 (best path ending at 1)
 * Output: 6
 * ```
 *
 * EDGE CASES:
 * - Single node tree
 * - All negative values (return single largest value)
 * - Mixed positive/negative values
 * - Linear trees (left or right skewed)
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
 * Main solution for Problem 124: Binary Tree Maximum Path Sum
 *
 * @param {TreeNode} root - Root of binary tree
 * @return {number} - Maximum path sum
 *
 * Time Complexity: O(n) where n is number of nodes
 * Space Complexity: O(h) where h is height of tree
 */
function solve(root) {
    return maxPathSum(root);
}

/**
 * Find maximum path sum in binary tree
 *
 * @param {TreeNode} root
 * @return {number}
 */
function maxPathSum(root) {
    let globalMax = -Infinity;

    function maxGain(node) {
        if (!node) return 0;

        // Calculate maximum gain from left and right subtrees
        // Ignore negative gains (use 0 instead)
        const leftGain = Math.max(maxGain(node.left), 0);
        const rightGain = Math.max(maxGain(node.right), 0);

        // Calculate maximum path sum passing through current node
        const pathThroughNode = node.val + leftGain + rightGain;

        // Update global maximum
        globalMax = Math.max(globalMax, pathThroughNode);

        // Return maximum gain if we start path from current node
        // (can only use one child to extend the path upward)
        return node.val + Math.max(leftGain, rightGain);
    }

    maxGain(root);
    return globalMax;
}

/**
 * Alternative approach using class to encapsulate state
 *
 * @param {TreeNode} root
 * @return {number}
 */
function maxPathSumClass(root) {
    class PathSumCalculator {
        constructor() {
            this.maxSum = -Infinity;
        }

        findMaxPath(node) {
            if (!node) return 0;

            const leftMax = Math.max(0, this.findMaxPath(node.left));
            const rightMax = Math.max(0, this.findMaxPath(node.right));

            this.maxSum = Math.max(this.maxSum, node.val + leftMax + rightMax);

            return node.val + Math.max(leftMax, rightMax);
        }

        getMaxPathSum(root) {
            this.findMaxPath(root);
            return this.maxSum;
        }
    }

    const calculator = new PathSumCalculator();
    return calculator.getMaxPathSum(root);
}

/**
 * Iterative approach using post-order traversal
 *
 * @param {TreeNode} root
 * @return {number}
 */
function maxPathSumIterative(root) {
    if (!root) return 0;

    const stack = [];
    const gainMap = new Map();
    let node = root;
    let lastVisited = null;
    let maxSum = -Infinity;

    while (stack.length > 0 || node) {
        if (node) {
            stack.push(node);
            node = node.left;
        } else {
            const peekNode = stack[stack.length - 1];
            if (peekNode.right && lastVisited !== peekNode.right) {
                node = peekNode.right;
            } else {
                // Process current node
                const current = stack.pop();
                const leftGain = Math.max(0, gainMap.get(current.left) || 0);
                const rightGain = Math.max(0, gainMap.get(current.right) || 0);

                maxSum = Math.max(maxSum, current.val + leftGain + rightGain);
                gainMap.set(current, current.val + Math.max(leftGain, rightGain));

                lastVisited = current;
            }
        }
    }

    return maxSum;
}

/**
 * Test cases for Problem 124: Binary Tree Maximum Path Sum
 */
function testSolution() {
    console.log('Testing 124. Binary Tree Maximum Path Sum');

    // Test case 1: Standard case
    const tree1 = new TreeNode(1,
        new TreeNode(2),
        new TreeNode(3)
    );
    const result1 = solve(tree1);
    const expected1 = 6; // 2 + 1 + 3
    console.assert(result1 === expected1,
        `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Negative values
    const tree2 = new TreeNode(-10,
        new TreeNode(9),
        new TreeNode(20,
            new TreeNode(15),
            new TreeNode(7)
        )
    );
    const result2 = solve(tree2);
    const expected2 = 42; // 15 + 20 + 7
    console.assert(result2 === expected2,
        `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Single node
    const tree3 = new TreeNode(5);
    const result3 = solve(tree3);
    const expected3 = 5;
    console.assert(result3 === expected3,
        `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: All negative values
    const tree4 = new TreeNode(-3,
        new TreeNode(-1),
        new TreeNode(-4)
    );
    const result4 = solve(tree4);
    const expected4 = -1; // Single node with highest value
    console.assert(result4 === expected4,
        `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Linear tree
    const tree5 = new TreeNode(1,
        new TreeNode(2,
            new TreeNode(3),
            null
        ),
        null
    );
    const result5 = solve(tree5);
    const expected5 = 6; // 3 + 2 + 1
    console.assert(result5 === expected5,
        `Test 5 failed: expected ${expected5}, got ${result5}`);

    // Test case 6: Complex tree
    const tree6 = new TreeNode(5,
        new TreeNode(4,
            new TreeNode(11,
                new TreeNode(7),
                new TreeNode(2)
            ),
            null
        ),
        new TreeNode(8,
            new TreeNode(13),
            new TreeNode(4,
                null,
                new TreeNode(1)
            )
        )
    );
    const result6 = solve(tree6);
    const expected6 = 48; // 7 + 11 + 2 + 4 + 5 + 8 + 13 (or similar optimal path)
    console.assert(result6 === expected6,
        `Test 6 failed: expected ${expected6}, got ${result6}`);

    // Test alternative approaches give same results
    const resultClass = maxPathSumClass(tree1);
    console.assert(resultClass === expected1,
        'Class approach should give same result');

    const resultIterative = maxPathSumIterative(tree1);
    console.assert(resultIterative === expected1,
        'Iterative approach should give same result');

    console.log('All test cases passed for 124. Binary Tree Maximum Path Sum!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 124. Binary Tree Maximum Path Sum ===');
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
    maxPathSum,
    maxPathSumClass,
    maxPathSumIterative,
    TreeNode,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - Three different approaches with same time complexity:



 * - Key insight: each node can be a "turning point" for maximum path
 * - Global maximum tracking is essential since optimal path may not go through root
 * - Negative path pruning (using max(0, gain)) is crucial for optimization
 * - Post-order traversal ensures children are processed before parent
 * - Time: O(n), Space: O(h) for all approaches
 */
