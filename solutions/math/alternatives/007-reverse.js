/**
 * 007. Reverse Integer
 * Medium
 *
 * This problem demonstrates key concepts in Math.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Reverse the digits of a signed 32-bit integer. The key challenge is handling
 * integer overflow - if the reversed integer exceeds 32-bit bounds, return 0.
 *
 * APPROACH:
 * 1. **Handle sign**: Track if number is negative, work with absolute value
 * 2. **Extract digits**: Use modulo 10 to get last digit, divide by 10 to remove it
 * 3. **Build reversed number**: Multiply result by 10 and add the digit
 * 4. **Check overflow**: Verify result stays within 32-bit signed integer range
 *
 * WHY THIS WORKS:
 * - Mathematical digit extraction avoids string conversion overhead
 * - Building number digit-by-digit allows overflow checking at each step
 * - Time complexity is based on number of digits (log10 of the number)
 *
 * TIME COMPLEXITY: O(log(x)) - where x is the input number
 * SPACE COMPLEXITY: O(1)
 *
 * EXAMPLE WALKTHROUGH:
 * ```
Input: 123
Step 1: result = 0, x = 123, digit = 3, result = 3, x = 12
Step 2: result = 3, x = 12, digit = 2, result = 32, x = 1
Step 3: result = 32, x = 1, digit = 1, result = 321, x = 0
Output: 321
```
 *
 * EDGE CASES:
 * - Negative numbers: Handle sign separately
 * - Overflow: Return 0 if result exceeds 2^31 - 1 or falls below -2^31
 * - Trailing zeros: Naturally handled (e.g., 120 becomes 21)
 */

/**
 * Main solution for Problem 007: Reverse Integer
 *
 * @param {number} x - Integer to reverse
 * @return {number} - Reversed integer, or 0 if overflow occurs
 *
 * Time Complexity: O(log(x))
 * Space Complexity: O(1)
 */
function solve(x) {
    const INT_MAX = Math.pow(2, 31) - 1;  // 2147483647
    const INT_MIN = -Math.pow(2, 31);     // -2147483648

    let result = 0;
    let num = Math.abs(x);
    const isNegative = x < 0;

    while (num > 0) {
        const digit = num % 10;
        num = Math.floor(num / 10);

        // Check for overflow before adding the digit
        if (result > Math.floor(INT_MAX / 10) ||
            (result === Math.floor(INT_MAX / 10) && digit > 7)) {
            return 0;
        }

        result = result * 10 + digit;
    }

    result = isNegative ? -result : result;

    // Final overflow check
    if (result > INT_MAX || result < INT_MIN) {
        return 0;
    }

    return result;
}

/**
 * Test cases for Problem 007: Reverse Integer
 */
function testSolution() {
    console.log('Testing 007. Reverse Integer');

    // Test case 1: Positive number
    const result1 = solve(123);
    const expected1 = 321;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Negative number
    const result2 = solve(-123);
    const expected2 = -321;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Number with trailing zeros
    const result3 = solve(120);
    const expected3 = 21;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Overflow case
    const result4 = solve(1534236469);
    const expected4 = 0;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Single digit
    const result5 = solve(5);
    const expected5 = 5;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 007. Reverse Integer!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 007. Reverse ===');
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
