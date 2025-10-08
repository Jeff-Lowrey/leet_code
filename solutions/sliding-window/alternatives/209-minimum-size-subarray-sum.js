/**
 * 209. Minimum Size Subarray Sum
 * Medium
 *
 * This problem demonstrates key concepts in Sliding Window.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Find the smallest contiguous subarray with sum >= target.
 * Use a variable-size sliding window that expands and contracts.
 *
 * APPROACH:
 * 1. **Analyze the problem**: Find minimum length subarray with sum >= target
 * 2. **Choose the right technique**: Variable-size sliding window with sum tracking
 * 3. **Implement efficiently**: Expand window to include elements, contract when sum is valid
 * 4. **Handle edge cases**: No valid subarray, entire array needed, single element sufficient
 *
 * WHY THIS WORKS:
 * - Expand window by adding elements until sum >= target
 * - Once valid, try to shrink from left to find minimum length
 * - Keep track of smallest valid window found
 * - All elements are positive, so removing elements always decreases sum
 *
 * TIME COMPLEXITY: O(n) - each element visited at most twice (once by right, once by left)
 * SPACE COMPLEXITY: O(1) - only using a few variables
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * Input: target = 7, nums = [2,3,1,2,4,3]
 * Step 1: right=0, sum=2, window=[2]
 * Step 2: right=1, sum=5, window=[2,3]
 * Step 3: right=2, sum=6, window=[2,3,1]
 * Step 4: right=3, sum=8, window=[2,3,1,2], valid! minLen=4
 * Step 5: left=1, sum=6, window=[3,1,2], invalid
 * Step 6: right=4, sum=10, window=[3,1,2,4], valid! continue...
 * Step 7: left=2, sum=7, window=[1,2,4], valid! minLen=3
 * Step 8: left=3, sum=6, window=[2,4], invalid
 * Step 9: right=5, sum=9, window=[2,4,3], valid! continue...
 * Step 10: left=4, sum=7, window=[4,3], valid! minLen=2
 * Output: 2
 * ```
 *
 * EDGE CASES:
 * - No valid subarray: return 0
 * - Single element >= target: return 1
 * - Entire array needed: return array length
 * - Empty array: return 0
 */

/**
 * Main solution for Problem 209: Minimum Size Subarray Sum
 *
 * @param {number} target - Target sum to achieve or exceed
 * @param {number[]} nums - Array of positive integers
 * @return {number} - Minimum length of subarray with sum >= target, or 0 if none exists
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(target, nums) {
    if (!nums || nums.length === 0) return 0;

    let left = 0;
    let sum = 0;
    let minLength = Infinity;

    for (let right = 0; right < nums.length; right++) {
        // Expand window by adding current element
        sum += nums[right];

        // Contract window while sum is still >= target
        while (sum >= target) {
            minLength = Math.min(minLength, right - left + 1);
            sum -= nums[left];
            left++;
        }
    }

    return minLength === Infinity ? 0 : minLength;
}

/**
 * Test cases for Problem 209: Minimum Size Subarray Sum
 */
function testSolution() {
    console.log('Testing 209. Minimum Size Subarray Sum');

    // Test case 1: Basic example
    const result1 = solve(7, [2, 3, 1, 2, 4, 3]);
    const expected1 = 2;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);
    console.log(`Test 1 passed: target=7, nums=[2,3,1,2,4,3] -> ${result1}`);

    // Test case 2: Single element sufficient
    const result2 = solve(4, [1, 4, 4]);
    const expected2 = 1;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);
    console.log(`Test 2 passed: target=4, nums=[1,4,4] -> ${result2}`);

    // Test case 3: No valid subarray
    const result3 = solve(11, [1, 1, 1, 1, 1, 1, 1, 1]);
    const expected3 = 0;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);
    console.log(`Test 3 passed: target=11, nums=[1,1,1,1,1,1,1,1] -> ${result3}`);

    // Test case 4: Entire array needed
    const result4 = solve(15, [1, 2, 3, 4, 5]);
    const expected4 = 5;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);
    console.log(`Test 4 passed: target=15, nums=[1,2,3,4,5] -> ${result4}`);

    // Test case 5: Empty array
    const result5 = solve(5, []);
    const expected5 = 0;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);
    console.log(`Test 5 passed: target=5, nums=[] -> ${result5}`);

    // Test case 6: Single element array - sufficient
    const result6 = solve(3, [5]);
    const expected6 = 1;
    console.assert(result6 === expected6, `Test 6 failed: expected ${expected6}, got ${result6}`);
    console.log(`Test 6 passed: target=3, nums=[5] -> ${result6}`);

    // Test case 7: Single element array - insufficient
    const result7 = solve(10, [5]);
    const expected7 = 0;
    console.assert(result7 === expected7, `Test 7 failed: expected ${expected7}, got ${result7}`);
    console.log(`Test 7 passed: target=10, nums=[5] -> ${result7}`);

    // Test case 8: Large numbers
    const result8 = solve(213, [12, 28, 83, 4, 25, 26, 25, 2, 25, 25, 25, 12]);
    const expected8 = 8;
    console.assert(result8 === expected8, `Test 8 failed: expected ${expected8}, got ${result8}`);
    console.log(`Test 8 passed: target=213, nums=[12,28,83,4,25,26,25,2,25,25,25,12] -> ${result8}`);

    console.log('All test cases passed for 209. Minimum Size Subarray Sum!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 209. Minimum Size Subarray Sum ===');
    console.log('Category: Sliding Window');
    console.log('Difficulty: Medium');
    console.log('');

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
 * - This solution focuses on sliding window concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
