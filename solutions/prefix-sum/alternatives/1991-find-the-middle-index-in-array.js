/**
 * 1991. Find The Middle Index In Array
 * Easy
 *
 * This problem demonstrates key concepts in Prefix Sum.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Find an index where the sum of elements to the left equals the sum to the right.
 * This is a classic prefix sum problem - we maintain a running sum from the left
 * and compare it with the remaining sum on the right.
 *
 * APPROACH:
 * 1. Calculate the total sum of the array
 * 2. Iterate through array maintaining leftSum
 * 3. At each index, rightSum = totalSum - leftSum - nums[i]
 * 4. If leftSum == rightSum, return current index
 * 5. Add current element to leftSum for next iteration
 *
 * WHY THIS WORKS:
 * At index i, if sum(0..i-1) = sum(i+1..n-1), then:
 * leftSum = sum(i+1..n-1) = totalSum - leftSum - nums[i]
 *
 * TIME COMPLEXITY: O(n) - two passes (one for total, one for finding index)
 * SPACE COMPLEXITY: O(1) - only using constant extra space
 *
 * EXAMPLE WALKTHROUGH:
 * Input: nums = [2,3,-1,8,4]
 * Step 1: totalSum = 16
 * Step 2: i=0, leftSum=0, rightSum=16-0-2=14 (not equal)
 * Step 3: i=1, leftSum=2, rightSum=16-2-3=11 (not equal)
 * Step 4: i=2, leftSum=5, rightSum=16-5-(-1)=12 (not equal)
 * Step 5: i=3, leftSum=4, rightSum=16-4-8=4 (equal!)
 * Output: 3
 *
 * EDGE CASES:
 * - Single element: always return 0 (left and right are both empty)
 * - No middle index exists: return -1
 * - Multiple valid indices: return leftmost (first found)
 */

/**
 * Main solution for Problem 1991: Find The Middle Index In Array
 *
 * @param {number[]} nums - Array of integers
 * @return {number} - Middle index, or -1 if none exists
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(nums) {
    // Calculate total sum
    const totalSum = nums.reduce((sum, num) => sum + num, 0);

    let leftSum = 0;

    for (let i = 0; i < nums.length; i++) {
        // Right sum = total - left - current
        const rightSum = totalSum - leftSum - nums[i];

        if (leftSum === rightSum) {
            return i;
        }

        // Add current element to left sum for next iteration
        leftSum += nums[i];
    }

    return -1;
}

/**
 * Test cases for Problem 1991: Find The Middle Index In Array
 */
function testSolution() {
    console.log('Testing 1991. Find The Middle Index In Array');

    // Test case 1: Example 1
    const result1 = solve([2,3,-1,8,4]);
    const expected1 = 3;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Example 2 - no middle index
    const result2 = solve([1,-1,4]);
    const expected2 = 2;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Example 3 - first index is middle
    const result3 = solve([2,5]);
    const expected3 = -1;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Single element
    const result4 = solve([1]);
    const expected4 = 0;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: All zeros
    const result5 = solve([0,0,0]);
    const expected5 = 0;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 1991. Find The Middle Index In Array!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 1991. Find The Middle Index In Array ===');
    console.log('Category: Prefix Sum');
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
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This solution focuses on prefix sum concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
