/**
 * 050. Pow X N
 * Medium
 *
 * This problem demonstrates key concepts in Math.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Naive approach of multiplying x by itself `n` times is O(n). We can do better
using **binary exponentiation** - repeatedly squaring and halving the exponent.
 *
 * APPROACH:
 * 1. **Handle negative exponents**: Convert to positive and invert result
 * 2. **Binary exponentiation**: Use bits of n to determine which powers to multiply
 * 3. **Iterative squaring**: Square base and halve exponent each iteration
 * 4. **Accumulate result**: Multiply result when exponent bit is 1
 *
 * WHY THIS WORKS:
 * - Any exponent can be represented as sum of powers of 2 (binary representation)
 * - x^n = x^(2^a + 2^b + ...) = x^(2^a) * x^(2^b) * ...
 * - Each power of 2 can be computed by repeated squaring
 * - Reduces O(n) multiplications to O(log n)
 *
 * TIME COMPLEXITY: O(log n)
 * SPACE COMPLEXITY: O(log n) recursive, O(1) iterative
 *
 * EXAMPLE WALKTHROUGH:
 * ```
pow(2, 10):
`10 = 1010` in binary
`Result = 1`

Bit 1 (position 1): `result` *= 2^`2 = 4`
Bit 0 (position 2): skip
Bit 1 (position 3): `result` *= 2^`8 = 256`
Bit 0 (position 4): skip

Final: `4 * 256` = 1024
```
 *
 * EDGE CASES:
 * - n = 0: Return 1 (anything to power 0 is 1)
 * - n < 0: Convert to positive exponent and invert result
 * - x = 0: Return 0 (except when n = 0, which is undefined but usually 1)
 * - x = 1: Always return 1
 * - x = -1: Alternate between 1 and -1 based on even/odd n
 */

/**
 * Main solution for Problem 050: Pow X N
 *
 * @param {number} x - Base number
 * @param {number} n - Exponent
 * @return {number} - x raised to the power n
 *
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
function solve(x, n) {
    // Handle edge cases
    if (n === 0) return 1;
    if (x === 0) return 0;
    if (x === 1) return 1;
    if (x === -1) return n % 2 === 0 ? 1 : -1;

    // Handle negative exponents
    if (n < 0) {
        x = 1 / x;
        n = -n;
    }

    let result = 1;
    let base = x;

    // Binary exponentiation (iterative)
    while (n > 0) {
        // If current bit is 1, multiply result by current base
        if (n % 2 === 1) {
            result *= base;
        }
        // Square the base for next bit position
        base *= base;
        // Move to next bit
        n = Math.floor(n / 2);
    }

    return result;
}

/**
 * Test cases for Problem 050: Pow X N
 */
function testSolution() {
    console.log('Testing 050. Pow X N');

    // Test case 1: Positive base and exponent
    const result1 = solve(2, 10);
    const expected1 = 1024;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Negative exponent
    const result2 = solve(2, -2);
    const expected2 = 0.25;
    console.assert(Math.abs(result2 - expected2) < 0.00001, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Fractional base
    const result3 = solve(2.1, 3);
    const expected3 = 9.261;
    console.assert(Math.abs(result3 - expected3) < 0.001, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Exponent is zero
    const result4 = solve(5, 0);
    const expected4 = 1;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Base is 1
    const result5 = solve(1, 100);
    const expected5 = 1;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    // Test case 6: Negative base, even exponent
    const result6 = solve(-2, 2);
    const expected6 = 4;
    console.assert(result6 === expected6, `Test 6 failed: expected ${expected6}, got ${result6}`);

    // Test case 7: Negative base, odd exponent
    const result7 = solve(-2, 3);
    const expected7 = -8;
    console.assert(result7 === expected7, `Test 7 failed: expected ${expected7}, got ${result7}`);

    console.log('All test cases passed for 050. Pow X N!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 050. Pow X N ===');
    console.log('Category: Math');
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
 * - This solution focuses on math concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
