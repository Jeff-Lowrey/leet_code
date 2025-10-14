/**
 * # Difficulty: Medium
 *
 * Implement pow(x, n), which calculates x raised to the power `n` (`i`.e., x^n).
 *
 * Example:
 * Input: `x = 2`.00000, `n` = 10
 * Output: 1024.00000
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>x = 2`.00000, `n` = 10</dd>
 * <dt>Output:</dt>
 * <dd>1024.00000</dd>
 * <dt>Explanation:</dt>
 * <dd>Computing 2^10 = 1024 efficiently</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * Naive approach of multiplying x by itself `n` times is O(n). We can do better
 * using **binary exponentiation** - repeatedly squaring and halving the exponent.
 *
 * ### APPROACH:
 * 1. **Handle base cases**: Return 1 if n is 0, handle negative exponents by inverting x and making n positive
 * 2. **Initialize variables**: Set result to 1 and current_product to x for iterative computation
 * 3. **Process exponent bits**: While n > 0, check if current bit is 1 using n % 2
 * 4. **Multiply when bit is 1**: If n is odd (bit is 1), multiply result by current_product
 * 5. **Square and halve**: Square the current_product (for next bit position) and halve n (shift to next bit)
 * 6. **Continue until n is 0**: Repeat steps 3-5 until all bits of n are processed
 * 7. **Return result**: Final result contains x^n computed in O(log n) time using binary exponentiation
 *
 * ### WHY THIS WORKS:
 * By repeatedly dividing the search space in half, we eliminate half of the remaining elements in each iteration. Since the array is sorted, we can determine which half contains the target by comparing with the middle element. This guarantees we find the target (if it exists) in O(log n) time because each step reduces the problem size by a factor of 2.
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * pow(2, 10):
 * `10 = 1010` in binary
 * `Result = 1`
 *
 * Bit 1 (position 1): `result` *= 2^`2 = 4`
 * Bit 0 (position 2): skip
 * Bit 1 (position 3): `result` *= 2^`8 = 256`
 * Bit 0 (position 4): skip
 *
 * Final: `4 * 256` = 1024
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(log n)
 *
 * ### SPACE COMPLEXITY:
 * O(log n) recursive, O(1) iterative
 *
 * ### EDGE CASES:
 * - **n = 0**: Return 1 (any number to power 0 is 1)
 * - **x = 0**: Return 0 for n > 0, undefined for n = 0
 * - **Negative n**: Return 1 / pow(x, -n)
 * - **x = 1**: Return 1 for any n
 * - **Large n**: Binary exponentiation prevents overflow
 *
 * </details>
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
