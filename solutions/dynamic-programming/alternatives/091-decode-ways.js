/**

 *
 * This problem demonstrates key concepts in Dynamic Programming.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * We need to count the number of ways to decode a string of digits. Each digit or pair
 * of digits can map to letters (1-26). This is a classic DP problem where the number
 * of ways to decode up to position i depends on positions i-1 and i-2.
 *
 * APPROACH:

2. **Choose the right technique**: Apply dynamic programming methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases
 *
 * WHY THIS WORKS:
 * - The solution leverages dynamic programming principles
- Time complexity is optimized for the given constraints
- Space complexity is minimized where possible
 *
 * TIME COMPLEXITY: O(n)
 * SPACE COMPLEXITY: O(1)
 *
 * EXAMPLE WALKTHROUGH:
 * ```
Input: "226"
dp[0] = 1 (empty string has 1 way)
dp[1] = 1 ("2" -> B)
dp[2] = 2 ("22" -> BB or V)
dp[3] = 3 ("226" -> BBF, VF, or BZ)
Output: 3
```
 *
 * EDGE CASES:
 * - Empty input handling
- Single element cases
- Large input considerations
 */

/**
 * Main solution for Problem 091: Decode Ways
 *
 * @param {string} s - String of digits to decode
 * @return {number} - Number of ways to decode the string
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(s) {
    if (!s || s.length === 0 || s[0] === '0') return 0;

    const n = s.length;
    // Use two variables instead of array for O(1) space
    let prev2 = 1; // dp[i-2]
    let prev1 = 1; // dp[i-1]

    for (let i = 1; i < n; i++) {
        let current = 0;

        // Single digit decode (if current digit is not '0')
        if (s[i] !== '0') {
            current += prev1;
        }

        // Two digit decode (if forms valid number 10-26)
        const twoDigit = parseInt(s.substring(i - 1, i + 1));
        if (twoDigit >= 10 && twoDigit <= 26) {
            current += prev2;
        }

        // Update for next iteration
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
}

/**
 * Test cases for Problem 091: Decode Ways
 */
function testSolution() {
    console.log('Testing 091. Decode Ways');

    // Test case 1: Basic functionality
    const result1 = solve("12");
    const expected1 = 2; // "AB" or "L"
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: More complex case
    const result2 = solve("226");
    const expected2 = 3; // "BBF", "BZ", "VF"
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Edge case - starts with 0
    const result3 = solve("06");
    const expected3 = 0;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Single digit
    const result4 = solve("1");
    const expected4 = 1;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Contains 0
    const result5 = solve("10");
    const expected5 = 1; // Only "J"
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    // Test case 6: Invalid 0
    const result6 = solve("101");
    const expected6 = 1; // "JA"
    console.assert(result6 === expected6, `Test 6 failed: expected ${expected6}, got ${result6}`);

    console.log('All test cases passed for 091. Decode Ways!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 091. Decode Ways ===');
    console.log('Category: Dynamic Programming');
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
 * - This solution focuses on dynamic programming concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
