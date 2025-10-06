/**
 * 005. Longest Palindrome
 * DP
 *
 * This problem demonstrates key concepts in Dynamic Programming.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * A palindrome reads the same forwards and backwards. We can find palindromes
by expanding around `centers - either` single characters or between characters.
 *
 * APPROACH:
 * 1. **Expand around centers**: For each possible center, expand outward
 * 2. **Two types of centers**: Single character (odd length) and between characters (even length)
 * 3. **Track maximum**: Keep track of the longest palindrome found so far
 * 4. **Early termination**: Stop expanding when characters don't match
 *
 * WHY THIS WORKS:
 * - Every palindrome has a center
- We can check all possible centers systematically
- Expanding is more efficient than checking all substrings
 *
 * TIME COMPLEXITY: O(n²)
 * SPACE COMPLEXITY: O(1)
 *
 * EXAMPLE WALKTHROUGH:
 * ```
s = "babad"
Centers: b, ba, a, ab, b, ba, a, ad, d

Center at 'a' (index 1): expand to "bab"
Center at 'a' (index 3): expand to "aba"
Both have length 3, return either
```
 *
 * EDGE CASES:
 * - Empty string: Return empty string
 * - Single character: The character itself is a palindrome
 * - No palindromes longer than 1: Return any single character
 * - All characters same: Entire string is palindrome
 * - Multiple palindromes of same max length: Return any valid one
 */

/**
 * Main solution for Problem 005: Longest Palindromic Substring
 *
 * @param {string} s - Input string
 * @return {string} - Longest palindromic substring
 *
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 */
function solve(s) {
    if (!s || s.length === 0) return "";
    if (s.length === 1) return s;

    let start = 0;
    let maxLength = 1;

    // Helper function to expand around center
    function expandAroundCenter(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            const currentLength = right - left + 1;
            if (currentLength > maxLength) {
                maxLength = currentLength;
                start = left;
            }
            left--;
            right++;
        }
    }

    for (let i = 0; i < s.length; i++) {
        // Check for odd-length palindromes (center at i)
        expandAroundCenter(i, i);

        // Check for even-length palindromes (center between i and i+1)
        expandAroundCenter(i, i + 1);
    }

    return s.substring(start, start + maxLength);
}

/**
 * Test cases for Problem 005: Longest Palindromic Substring
 */
function testSolution() {
    console.log('Testing 005. Longest Palindromic Substring');

    // Test case 1: Basic functionality - odd length palindrome
    const result1 = solve("babad");
    const expected1 = "bab"; // or "aba" - both are valid
    console.assert(result1 === "bab" || result1 === "aba", `Test 1 failed: expected "bab" or "aba", got ${result1}`);

    // Test case 2: Even length palindrome
    const result2 = solve("cbbd");
    const expected2 = "bb";
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Single character
    const result3 = solve("a");
    const expected3 = "a";
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Empty string
    const result4 = solve("");
    const expected4 = "";
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: All same characters
    const result5 = solve("aaaa");
    const expected5 = "aaaa";
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    // Test case 6: No palindrome longer than 1
    const result6 = solve("abc");
    const expected6 = "a"; // Any single character is valid
    console.assert(result6.length === 1, `Test 6 failed: expected length 1, got ${result6}`);

    console.log('All test cases passed for 005. Longest Palindromic Substring!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 005. Longest Palindrome ===');
    console.log('Category: Dynamic Programming');
    console.log('Difficulty: DP');
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
