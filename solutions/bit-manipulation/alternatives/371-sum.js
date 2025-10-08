/**
 * 371. Sum of Two Integers
 * Medium
 *
 * This problem demonstrates key concepts in Bit Manipulation.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Add two integers without using + or - operators. Use XOR for addition without carry,
 * and AND with left shift for calculating the carry. Repeat until there's no carry.
 *
 * APPROACH:
 * 1. While b is not zero:
 *    - Calculate carry: (a & b) << 1
 *    - Calculate sum without carry: a ^ b
 *    - Update a to sum, b to carry
 * 2. Return a when no carry remains
 *
 * WHY THIS WORKS:
 * - XOR (^) performs addition without considering carry
 *   Example: 5 ^ 3 = 101 ^ 011 = 110 (but this ignores carries)
 * - AND (&) finds positions where both bits are 1 (need carry)
 * - Left shift (<<) moves carry to the next position
 * - Repeat until no carry remains
 * - This simulates how binary addition works in hardware
 *
 * TIME COMPLEXITY: O(1) - limited by 32-bit integer representation
 * SPACE COMPLEXITY: O(1)
 *
 * EXAMPLE WALKTHROUGH:
 * ```
Input: a=1, b=2
Iteration 1:
  carry = (1 & 2) << 1 = (001 & 010) << 1 = 000 << 1 = 0
  a = 1 ^ 2 = 001 ^ 010 = 011 = 3
  b = 0
Loop ends (b == 0)
Output: 3

Input: a=2, b=3
Iteration 1:
  carry = (2 & 3) << 1 = (010 & 011) << 1 = 010 << 1 = 100 = 4
  a = 2 ^ 3 = 010 ^ 011 = 001 = 1
  b = 4
Iteration 2:
  carry = (1 & 4) << 1 = (001 & 100) << 1 = 000 << 1 = 0
  a = 1 ^ 4 = 001 ^ 100 = 101 = 5
  b = 0
Output: 5
```
 *
 * EDGE CASES:
 * - Zero values: handled naturally
 * - Negative numbers: works due to two's complement
 * - Overflow: limited by 32-bit representation
 */

/**
 * Main solution for Problem 371: Sum of Two Integers
 *
 * @param {number} a - First integer
 * @param {number} b - Second integer
 * @return {number} - Sum of a and b without using + or -
 *
 * Time Complexity: O(1) - limited by 32-bit integer size
 * Space Complexity: O(1)
 */
function solve(a, b) {
    // Use XOR for addition without carry
    // Use AND + left shift for carry
    while (b !== 0) {
        // Calculate carry
        const carry = (a & b) << 1;

        // Sum without carry
        a = a ^ b;

        // Update b to carry
        b = carry;
    }

    return a;
}

/**
 * Test cases for Problem 371: Sum
 */
function testSolution() {
    console.log('Testing 371. Sum');

    // Test case 1: Basic positive numbers
    const result1 = solve(1, 2);
    const expected1 = 3;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: One zero
    const result2 = solve(2, 0);
    const expected2 = 2;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Both zeros
    const result3 = solve(0, 0);
    const expected3 = 0;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Negative and positive
    const result4 = solve(-1, 1);
    const expected4 = 0;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Larger numbers
    const result5 = solve(20, 30);
    const expected5 = 50;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 371. Sum!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 371. Sum ===');
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
