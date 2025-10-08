/**
 * 231. Power of Two
 * Easy
 *
 * This problem demonstrates key concepts in Bit Manipulation.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * A number is a power of two if it has exactly one bit set in its binary representation.
 * Powers of 2: 1(0001), 2(0010), 4(0100), 8(1000), 16(10000)
 * The trick: n & (n-1) removes the rightmost set bit. For powers of 2, this results in 0.
 *
 * APPROACH:
 * 1. Check if n is positive (powers of 2 must be positive)
 * 2. Check if n & (n-1) equals 0
 * 3. Both conditions must be true
 *
 * WHY THIS WORKS:
 * - Powers of 2 have exactly one bit set: 8 = 1000
 * - n-1 flips all bits after the set bit: 7 = 0111
 * - n & (n-1) = 1000 & 0111 = 0000
 * - Non-powers have multiple bits set, so n & (n-1) != 0
 * - Must check n > 0 to exclude 0 and negative numbers
 *
 * TIME COMPLEXITY: O(1) - constant time operation
 * SPACE COMPLEXITY: O(1)
 *
 * EXAMPLE WALKTHROUGH:
 * ```
Input: 16 (binary: 10000)
Step 1: n > 0 ✓ (16 > 0)
Step 2: 16 & 15 = 10000 & 01111 = 00000 ✓
Output: true

Input: 18 (binary: 10010)
Step 1: n > 0 ✓ (18 > 0)
Step 2: 18 & 17 = 10010 & 10001 = 10000 ✗
Output: false
```
 *
 * EDGE CASES:
 * - Zero: not a power of 2
 * - Negative numbers: not powers of 2
 * - One: 2^0 = 1, is a power of 2
 */

/**
 * Main solution for Problem 231: Power of Two
 *
 * @param {number} n - An integer
 * @return {boolean} - True if n is a power of two, false otherwise
 *
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
function solve(n) {
    // Power of 2 has exactly one bit set
    // n & (n-1) removes the rightmost set bit
    // If n is power of 2, this results in 0
    // Also check n > 0 to handle negative numbers and zero
    return n > 0 && (n & (n - 1)) === 0;
}

/**
 * Test cases for Problem 231: Power
 */
function testSolution() {
    console.log('Testing 231. Power');

    // Test case 1: Power of 2
    const result1 = solve(1);
    const expected1 = true;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Power of 2
    const result2 = solve(16);
    const expected2 = true;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Not power of 2
    const result3 = solve(3);
    const expected3 = false;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Zero
    const result4 = solve(0);
    const expected4 = false;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Negative number
    const result5 = solve(-16);
    const expected5 = false;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    // Test case 6: Large power of 2
    const result6 = solve(1024);
    const expected6 = true;
    console.assert(result6 === expected6, `Test 6 failed: expected ${expected6}, got ${result6}`);

    console.log('All test cases passed for 231. Power!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 231. Power ===');
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
