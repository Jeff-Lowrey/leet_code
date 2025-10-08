/**
 * 260. Single Number III
 * Medium
 *
 * This problem demonstrates key concepts in Bit Manipulation.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Given an array where two elements appear exactly once and all other elements appear twice,
 * find the two unique elements. XOR all numbers to get the XOR of the two unique numbers.
 * Then use a differentiating bit to separate numbers into two groups.
 *
 * APPROACH:
 * 1. XOR all numbers to get xor = a ^ b (where a and b are the two unique numbers)
 * 2. Find any bit that is set in xor (this bit differs between a and b)
 * 3. Use this bit to partition all numbers into two groups
 * 4. XOR each group separately to find a and b
 *
 * WHY THIS WORKS:
 * - XOR of all numbers gives us a ^ b
 * - Any set bit in (a ^ b) means a and b differ at that position
 * - Numbers with that bit set form one group containing a
 * - Numbers without that bit form another group containing b
 * - XORing each group cancels duplicate pairs, leaving a and b
 *
 * TIME COMPLEXITY: O(n) - two passes through the array
 * SPACE COMPLEXITY: O(1) - only using a few variables
 *
 * EXAMPLE WALKTHROUGH:
 * ```
Input: [1,2,1,3,2,5]
Step 1: XOR all = 1^2^1^3^2^5 = 3^5 = 6 (binary: 110)
Step 2: Rightmost bit of 6 is at position 1 (binary: 010)
Step 3: Group by bit 1:
        Group 1 (bit set): 2,3,2 → XOR = 3
        Group 2 (bit not set): 1,1,5 → XOR = 5
Output: [3,5]
```
 *
 * EDGE CASES:
 * - Exactly two unique numbers
 * - Negative numbers handled correctly
 * - Order of output doesn't matter
 */

/**
 * Main solution for Problem 260: Single Number III
 *
 * @param {number[]} nums - Array where two elements appear once, rest appear twice
 * @return {number[]} - Array of the two single numbers
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(nums) {
    // Step 1: XOR all numbers to get XOR of the two unique numbers
    let xor = 0;
    for (const num of nums) {
        xor ^= num;
    }

    // Step 2: Find a bit that is set in xor (differs between the two numbers)
    // This isolates the rightmost set bit
    const rightmostBit = xor & (-xor);

    // Step 3: Separate numbers into two groups based on this bit
    let num1 = 0;
    let num2 = 0;

    for (const num of nums) {
        if (num & rightmostBit) {
            num1 ^= num;
        } else {
            num2 ^= num;
        }
    }

    return [num1, num2];
}

/**
 * Test cases for Problem 260: Single
 */
function testSolution() {
    console.log('Testing 260. Single');

    // Test case 1: Basic case
    const result1 = solve([1, 2, 1, 3, 2, 5]);
    const expected1 = [3, 5];
    const matches1 = (result1.includes(3) && result1.includes(5)) ||
                     (result1[0] === 5 && result1[1] === 3);
    console.assert(matches1, `Test 1 failed: expected [3, 5], got [${result1}]`);

    // Test case 2: Negative numbers
    const result2 = solve([-1, 0]);
    const matches2 = (result2.includes(-1) && result2.includes(0));
    console.assert(matches2, `Test 2 failed: expected [-1, 0], got [${result2}]`);

    // Test case 3: Mix of positives
    const result3 = solve([1, 2, 3, 4, 1, 2]);
    const matches3 = (result3.includes(3) && result3.includes(4));
    console.assert(matches3, `Test 3 failed: expected [3, 4], got [${result3}]`);

    // Test case 4: Large numbers
    const result4 = solve([100, 200, 100, 300]);
    const matches4 = (result4.includes(200) && result4.includes(300));
    console.assert(matches4, `Test 4 failed: expected [200, 300], got [${result4}]`);

    console.log('All test cases passed for 260. Single!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 260. Single ===');
    console.log('Category: Bit Manipulation');
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
 * - This solution focuses on bit manipulation concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
