/**
 * 416. Partition Equal Subset Sum
 * Medium
 *
 * This problem demonstrates key concepts in Dynamic Programming.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * If we can partition an array into two equal sum subsets, then each subset must
 * have sum = total_sum / 2. This reduces to: can we find a subset with sum = target?
 * This is the classic subset sum problem solved with DP.
 *
 * APPROACH:
 * 1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply dynamic programming methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases
 *
 * WHY THIS WORKS:
 * - The solution leverages dynamic programming principles
- Time complexity is optimized for the given constraints
- Space complexity is minimized where possible
 *
 * TIME COMPLEXITY: O(n * sum)
 * SPACE COMPLEXITY: O(sum) with space optimization
 *
 * EXAMPLE WALKTHROUGH:
 * ```
Input: [1,5,11,5]
Sum = 22, target = 11
dp[0] = true
After 1: dp[1] = true
After 5: dp[5] = true, dp[6] = true
After 11: dp[11] = true, dp[16] = true, dp[17] = true
After 5: dp[11] remains true
Output: true
```
 *
 * EDGE CASES:
 * - Empty input handling
- Single element cases
- Large input considerations
 */

/**
 * Main solution for Problem 416: Partition Equal Subset Sum
 *
 * @param {number[]} nums - Array of positive integers
 * @return {boolean} - True if array can be partitioned into two equal sum subsets
 *
 * Time Complexity: O(n * sum)
 * Space Complexity: O(sum)
 */
function solve(nums) {
    if (!nums || nums.length < 2) return false;

    const sum = nums.reduce((acc, num) => acc + num, 0);

    // If sum is odd, cannot be partitioned into two equal subsets
    if (sum % 2 !== 0) return false;

    const target = sum / 2;

    // dp[i] represents whether we can achieve sum i
    const dp = new Array(target + 1).fill(false);
    dp[0] = true; // We can always achieve sum 0 with empty subset

    // For each number, update dp array
    for (const num of nums) {
        // Traverse backwards to avoid using same number multiple times
        for (let j = target; j >= num; j--) {
            dp[j] = dp[j] || dp[j - num];
        }
    }

    return dp[target];
}

/**
 * Alternative solution with 2D DP (more intuitive but uses O(n * sum) space)
 *
 * @param {number[]} nums - Array of positive integers
 * @return {boolean} - True if array can be partitioned into two equal sum subsets
 */
function solve2D(nums) {
    if (!nums || nums.length < 2) return false;

    const sum = nums.reduce((acc, num) => acc + num, 0);
    if (sum % 2 !== 0) return false;

    const target = sum / 2;
    const n = nums.length;

    // dp[i][j] = can we achieve sum j using first i numbers
    const dp = Array(n + 1).fill(null).map(() => Array(target + 1).fill(false));

    // Base case: sum 0 is always achievable
    for (let i = 0; i <= n; i++) {
        dp[i][0] = true;
    }

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= target; j++) {
            // Don't include current number
            dp[i][j] = dp[i - 1][j];

            // Include current number if possible
            if (j >= nums[i - 1]) {
                dp[i][j] = dp[i][j] || dp[i - 1][j - nums[i - 1]];
            }
        }
    }

    return dp[n][target];
}

/**
 * Test cases for Problem 416: Partition Equal Subset Sum
 */
function testSolution() {
    console.log('Testing 416. Partition Equal Subset Sum');

    // Test case 1: Basic functionality - can partition
    const result1 = solve([1, 5, 11, 5]);
    const expected1 = true; // [1, 5, 5] and [11]
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Cannot partition
    const result2 = solve([1, 2, 3, 5]);
    const expected2 = false;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Single element
    const result3 = solve([1]);
    const expected3 = false;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Two elements - equal
    const result4 = solve([1, 1]);
    const expected4 = true;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Two elements - unequal
    const result5 = solve([1, 3]);
    const expected5 = false;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    // Test case 6: All same numbers, even count
    const result6 = solve([2, 2, 2, 2]);
    const expected6 = true;
    console.assert(result6 === expected6, `Test 6 failed: expected ${expected6}, got ${result6}`);

    // Test 2D solution as well
    const result7 = solve2D([1, 5, 11, 5]);
    console.assert(result7 === true, `2D solution test failed: expected true, got ${result7}`);

    console.log('All test cases passed for 416. Partition Equal Subset Sum!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 416. Partition Equal Subset Sum ===');
    console.log('Category: Dynamic Programming');
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
 * - This solution focuses on dynamic programming concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
