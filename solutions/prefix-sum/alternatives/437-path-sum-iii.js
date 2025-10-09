/**

 *
 * This problem demonstrates key concepts in Prefix Sum.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Find the number of paths in a binary tree that sum to a target value.
 * Paths don't need to start at root or end at leaf, but must go downward.
 * Use prefix sum with hash map to track cumulative sums from root to current node.
 *
 * APPROACH:






 *
 * WHY THIS WORKS:
 * If prefix[node_j] - prefix[node_i] = targetSum, then the path from
 * node_i's child to node_j has sum equal to targetSum.
 * By storing all prefix sums in hash map, we can find all valid paths efficiently.
 *
 * TIME COMPLEXITY: O(n) - visit each node once
 * SPACE COMPLEXITY: O(h) - recursion depth and map size, where h is tree height
 *
 * EXAMPLE WALKTHROUGH:
 * Input: root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
 * Using prefix sum map, we track cumulative sums and find:
 * - Path [5,3] = 8
 * - Path [5,2,1] = 8
 * - Path [-3,11] = 8
 * Output: 3
 *
 * EDGE CASES:
 * - Empty tree: return 0
 * - Single node: check if value equals target
 * - Negative values in tree
 * - Path can be a single node
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
 * Main solution for Problem 437: Path Sum III
 *
 * @param {TreeNode} root - Root of binary tree
 * @param {number} targetSum - Target sum
 * @return {number} - Number of paths that sum to target
 *
 * Time Complexity: O(n)
 * Space Complexity: O(h) where h is height
 */
function solve(root, targetSum) {
    // Map to store frequency of each prefix sum
    const prefixSumCount = new Map();
    prefixSumCount.set(0, 1); // Base case: empty path

    function dfs(node, currentSum) {
        if (!node) {
            return 0;
        }

        // Update current path sum
        currentSum += node.val;

        // Check if there's a prefix sum that makes a valid path
        // currentSum - targetSum gives us the prefix we need
        const pathCount = prefixSumCount.get(currentSum - targetSum) || 0;

        // Add current sum to map
        prefixSumCount.set(currentSum, (prefixSumCount.get(currentSum) || 0) + 1);

        // Recurse on left and right children
        const totalPaths = pathCount +
                          dfs(node.left, currentSum) +
                          dfs(node.right, currentSum);

        // Backtrack: remove current sum from map
        prefixSumCount.set(currentSum, prefixSumCount.get(currentSum) - 1);

        return totalPaths;
    }

    return dfs(root, 0);
}

/**
 * Test cases for Problem 437: Path Sum III
 */
function testSolution() {
    console.log('Testing 437. Path Sum III');

    // Test case 1: Example 1
    const root1 = new TreeNode(10);
    root1.left = new TreeNode(5);
    root1.right = new TreeNode(-3);
    root1.left.left = new TreeNode(3);
    root1.left.right = new TreeNode(2);
    root1.right.right = new TreeNode(11);
    root1.left.left.left = new TreeNode(3);
    root1.left.left.right = new TreeNode(-2);
    root1.left.right.right = new TreeNode(1);

    const result1 = solve(root1, 8);
    const expected1 = 3;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Example 2
    const root2 = new TreeNode(5);
    root2.left = new TreeNode(4);
    root2.right = new TreeNode(8);
    root2.left.left = new TreeNode(11);
    root2.right.left = new TreeNode(13);
    root2.right.right = new TreeNode(4);
    root2.left.left.left = new TreeNode(7);
    root2.left.left.right = new TreeNode(2);
    root2.right.right.left = new TreeNode(5);
    root2.right.right.right = new TreeNode(1);

    const result2 = solve(root2, 22);
    const expected2 = 3;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Single node
    const root3 = new TreeNode(1);
    const result3 = solve(root3, 1);
    const expected3 = 1;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Empty tree
    const result4 = solve(null, 0);
    const expected4 = 0;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    console.log('All test cases passed for 437. Path Sum III!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 437. Path Sum Iii ===');
    console.log('Category: Prefix Sum');
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
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This solution focuses on prefix sum concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
