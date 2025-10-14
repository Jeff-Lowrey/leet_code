/**
 * # Difficulty: Medium
 *
 * # 437. Path Sum III
 *
 * Given the root of a binary tree and an integer targetSum, return the number of paths where the sum of the values along the path equals targetSum.
 *
 * The path does not need to start or end at the root or a leaf, but it must go downwards (i.e., traveling only from parent nodes to child nodes).
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[root]</dd>
 * <dt>Output:</dt>
 * <dd>"\nExample 1:"</dd>
 * <dt>Explanation:</dt>
 * <dd>There are 3 paths in the tree that sum to 8: [5->3], [5->2->1], [-3->11]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * This problem extends the prefix sum concept to binary trees. For any path from node A to node B going downwards, if we know the prefix sum from root to A and root to B, then path sum A→B = prefix_sum[B] - prefix_sum[A]. We can use a hashmap to store the frequency of prefix sums as we traverse the tree, similar to the "Subarray Sum Equals K" problem.
 *
 * ### APPROACH:
 * 1. **Use DFS traversal**: Traverse tree in preorder (root, left, right)
 * 2. **Track prefix sums**: Maintain running sum from root to current node
 * 3. **HashMap for counts**: Store frequency of each prefix sum seen
 * 4. **Find valid paths**: At each node, check if (current_sum - targetSum) exists
 * 5. **Backtrack**: Remove current prefix sum when returning from recursion
 *
 * ### WHY THIS WORKS:
 * - Path sum from node A to B = prefix_sum[B] - prefix_sum[A]
 * - If we want path sum = targetSum, we need: prefix_sum[B] - prefix_sum[A] = targetSum
 * - Therefore: prefix_sum[A] = prefix_sum[B] - targetSum
 * - By storing prefix sums in hashmap during DFS, we can find all valid starting points
 * - Backtracking ensures we only count paths that go downwards (no upward paths)
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
 *
 * Tree structure:
 *          10
 *         /  \\
 *        5   -3
 *       / \\    \\
 *      3   2   11
 *     / \\   \\
 *    3  -2   1
 *
 * DFS traversal with prefix sums:
 * Node 10: sum=10, need=10-8=2, count=0, map={0:1, 10:1}
 * Node 5: sum=15, need=15-8=7, count=0, map={0:1, 10:1, 15:1}
 * Node 3: sum=18, need=18-8=10, count=1 (found 10), map={0:1, 10:1, 15:1, 18:1}
 * Node 3: sum=21, need=21-8=13, count=0, map={0:1, 10:1, 15:1, 18:1, 21:1}
 * ... and so on
 *
 * Total paths with sum 8: 3
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)
 * Visit each node exactly once, with O(1) hashmap operations per node
 *
 * ### SPACE COMPLEXITY:
 * O(h)
 * Recursion stack depth is tree height h, hashmap stores at most h entries in any path
 *
 * ### EDGE CASES:
 * - Empty tree (return 0)
 * - Single node tree
 * - Target sum is 0
 * - Negative values in tree
 * - Multiple valid paths through same nodes
 * - Paths that start from root vs internal nodes
 *
 * </details>
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
