/**

 *
 * This problem demonstrates key concepts in Math.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Determine if an integer is a palindrome without converting to a string.
 * A palindrome reads the same forwards and backwards (e.g., 121, 12321).
 * Negative numbers are not palindromes due to the minus sign.
 *
 * APPROACH:




 *
 * WHY THIS WORKS:
 * - Only need to reverse half the number to check palindrome property
 * - Avoids string conversion overhead and stays in mathematical domain
 * - Efficient: processes only log(n) digits
 *
 * TIME COMPLEXITY: O(log(x)) - process half the digits
 * SPACE COMPLEXITY: O(1)
 *
 * EXAMPLE WALKTHROUGH:
 * ```
Input: 12321
Step 1: x = 12321, reversed = 0
Step 2: x = 1232, reversed = 1 (extracted 1)
Step 3: x = 123, reversed = 12 (extracted 2)
Step 4: x = 12, reversed = 123 (extracted 3)
Step 5: x = 12, reversed = 123 -> x < reversed, stop
Output: true (12 === 123/10)
```
 *
 * EDGE CASES:
 * - Negative numbers: Always false
 * - Numbers ending in 0: False (except 0 itself)
 * - Single digit: Always true
 * - Odd vs even length: Handle middle digit for odd length
 */

/**
 * Main solution for Problem 009: Palindrome Number
 *
 * @param {number} x - Integer to check
 * @return {boolean} - True if x is a palindrome, false otherwise
 *
 * Time Complexity: O(log(x))
 * Space Complexity: O(1)
 */
function solve(x) {
    // Negative numbers and numbers ending in 0 (except 0) are not palindromes
    if (x < 0 || (x % 10 === 0 && x !== 0)) {
        return false;
    }

    // Single digit numbers are palindromes
    if (x < 10) {
        return true;
    }

    let reversedHalf = 0;

    // Reverse the second half of the number
    while (x > reversedHalf) {
        reversedHalf = reversedHalf * 10 + (x % 10);
        x = Math.floor(x / 10);
    }

    // For even length: x === reversedHalf
    // For odd length: x === Math.floor(reversedHalf / 10) (ignore middle digit)
    return x === reversedHalf || x === Math.floor(reversedHalf / 10);
}

/**
 * Test cases for Problem 009: Palindrome Number
 */
function testSolution() {
    console.log('Testing 009. Palindrome Number');

    // Test case 1: Positive palindrome (even length)
    const result1 = solve(1221);
    const expected1 = true;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Positive palindrome (odd length)
    const result2 = solve(12321);
    const expected2 = true;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Not a palindrome
    const result3 = solve(123);
    const expected3 = false;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Negative number
    const result4 = solve(-121);
    const expected4 = false;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Number ending in zero
    const result5 = solve(10);
    const expected5 = false;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    // Test case 6: Single digit
    const result6 = solve(7);
    const expected6 = true;
    console.assert(result6 === expected6, `Test 6 failed: expected ${expected6}, got ${result6}`);

    // Test case 7: Zero
    const result7 = solve(0);
    const expected7 = true;
    console.assert(result7 === expected7, `Test 7 failed: expected ${expected7}, got ${result7}`);

    console.log('All test cases passed for 009. Palindrome Number!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 009. Palindrome ===');
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
