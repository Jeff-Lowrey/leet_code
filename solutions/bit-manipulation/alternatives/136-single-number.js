/**
 * 136. Single Number
 * Easy
 *
 * This problem demonstrates key concepts in Bit Manipulation.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Given an array where every element appears twice except for one, we need to find that single element.
 * The XOR operation has a special property: a ^ a = 0 and a ^ 0 = a.
 * This means if we XOR all elements together, duplicate pairs cancel out to 0,
 * leaving only the single number.
 *
 * APPROACH:
 * 1. Initialize result to 0
 * 2. XOR all elements in the array
 * 3. Return the result
 *
 * WHY THIS WORKS:
 * XOR is commutative and associative: [2,2,1] becomes (2^2^1) = (0^1) = 1
 * All duplicate pairs XOR to 0, and 0 XOR with the single number returns that number.
 *
 * TIME COMPLEXITY: O(n) - single pass through array
 * SPACE COMPLEXITY: O(1) - only using one variable
 *
 * EXAMPLE WALKTHROUGH:
 * Input: [4,1,2,1,2]
 * Step 1: result = 0
 * Step 2: result = 0 ^ 4 = 4
 * Step 3: result = 4 ^ 1 = 5
 * Step 4: result = 5 ^ 2 = 7
 * Step 5: result = 7 ^ 1 = 6
 * Step 6: result = 6 ^ 2 = 4
 * Output: 4
 *
 * EDGE CASES:
 * - Single element array: returns that element
 * - All positive numbers
 * - Mix of positive and negative numbers
 */

/**
 * Main solution for Problem 136: Single Number
 *
 * @param {number[]} nums - Array of integers where every element appears twice except one
 * @return {number} - The single number that appears only once
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(nums) {
    let result = 0;

    // XOR all numbers together
    // Duplicate pairs will cancel out to 0
    for (const num of nums) {
        result ^= num;
    }

    return result;
}

/**
 * Test cases for Problem 136: Single Number
 */
function testSolution() {
    console.log('Testing 136. Single Number');

    // Test case 1: Basic case with odd positioned single
    const result1 = solve([2, 2, 1]);
    const expected1 = 1;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Single number at different position
    const result2 = solve([4, 1, 2, 1, 2]);
    const expected2 = 4;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Single element array
    const result3 = solve([1]);
    const expected3 = 1;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Negative numbers
    const result4 = solve([-1, -1, -2]);
    const expected4 = -2;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Larger numbers
    const result5 = solve([1000, 999, 1000]);
    const expected5 = 999;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 136. Single Number!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 136. Single Number ===');
    console.log('Category: Bit Manipulation');
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
 * - This solution focuses on bit manipulation concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
