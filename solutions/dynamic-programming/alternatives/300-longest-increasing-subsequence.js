/**
 * 300. Longest Increasing Subsequence
 * Medium
 *
 * This problem demonstrates key concepts in Dynamic Programming.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * For each position i, we need to find the length of the longest increasing subsequence
 * ending at position i. We can build this by checking all previous elements and
 * extending the best subsequence that ends with a smaller value.
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
 * TIME COMPLEXITY: O(n²) for DP approach, O(n log n) for binary search approach
 * SPACE COMPLEXITY: O(n)
 *
 * EXAMPLE WALKTHROUGH:
 * ```
Input: [10,9,2,5,3,7,101,18]
dp[0] = 1 (10)
dp[1] = 1 (9)
dp[2] = 1 (2)
dp[3] = 2 (2,5)
dp[4] = 2 (2,3)
dp[5] = 3 (2,3,7 or 2,5,7)
dp[6] = 4 (2,3,7,101 or 2,5,7,101)
dp[7] = 4 (2,3,7,18)
Output: 4
```
 *
 * EDGE CASES:
 * - Empty input handling
- Single element cases
- Large input considerations
 */

/**
 * Main solution for Problem 300: Longest Increasing Subsequence
 *
 * @param {number[]} nums - Array of integers
 * @return {number} - Length of longest increasing subsequence
 *
 * Time Complexity: O(n²) for DP approach
 * Space Complexity: O(n)
 */
function solve(nums) {
    if (!nums || nums.length === 0) return 0;

    const n = nums.length;
    const dp = new Array(n).fill(1); // dp[i] = length of LIS ending at position i

    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }

    return Math.max(...dp);
}

/**
 * Alternative O(n log n) solution using binary search
 *
 * @param {number[]} nums - Array of integers
 * @return {number} - Length of longest increasing subsequence
 */
function solveBinarySearch(nums) {
    if (!nums || nums.length === 0) return 0;

    const tails = []; // tails[i] = smallest tail for LIS of length i+1

    for (const num of nums) {
        let left = 0;
        let right = tails.length;

        // Binary search for the position to insert/replace
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (tails[mid] < num) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        // If left == tails.length, append to extend LIS
        // Otherwise, replace to maintain smallest tail property
        if (left === tails.length) {
            tails.push(num);
        } else {
            tails[left] = num;
        }
    }

    return tails.length;
}

/**
 * Test cases for Problem 300: Longest Increasing Subsequence
 */
function testSolution() {
    console.log('Testing 300. Longest Increasing Subsequence');

    // Test case 1: Basic functionality
    const result1 = solve([10, 9, 2, 5, 3, 7, 101, 18]);
    const expected1 = 4; // [2,3,7,18] or [2,3,7,101]
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Strictly decreasing
    const result2 = solve([7, 7, 7, 7, 7, 7, 7]);
    const expected2 = 1;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Strictly increasing
    const result3 = solve([1, 2, 3, 4, 5]);
    const expected3 = 5;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Single element
    const result4 = solve([1]);
    const expected4 = 1;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Empty array
    const result5 = solve([]);
    const expected5 = 0;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    // Test binary search solution as well
    const result6 = solveBinarySearch([10, 9, 2, 5, 3, 7, 101, 18]);
    console.assert(result6 === 4, `Binary search test failed: expected 4, got ${result6}`);

    console.log('All test cases passed for 300. Longest Increasing Subsequence!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 300. Longest Increasing Subsequence ===');
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
