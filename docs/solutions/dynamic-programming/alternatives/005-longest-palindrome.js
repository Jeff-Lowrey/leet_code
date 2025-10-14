/**
 * Difficulty: Medium
 *
 * [Problem description goes here]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[input description]</dd>
 * <dt>Output:</dt>
 * <dd>[output description]</dd>
 * <dt>Explanation:</dt>
 * <dd>[explanation]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * [High-level insight or key observation]
 *
 * ### APPROACH:
 * [Detailed explanation of the solution approach]
 *
 * ### WHY THIS WORKS:
 * - [Explanation of correctness]
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * [example input]
 * ```
 * **Step 1:** [description]
 * **Step 2:** [description]
 *
 * ### TIME COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### SPACE COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### EDGE CASES:
 * - **Pointers meet:** Handle when left == right
 * - **Empty input:** Check for null or empty arrays
 * - **Single element:** One pointer scenario
 * - **All duplicates:** Pointer movement with same values
 * - **Boundary crossing:** Prevent left > right
 *
 * </details>
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
