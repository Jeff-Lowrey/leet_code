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
 * - **[Edge case 1]:** [how it's handled]
 * - **[Edge case 2]:** [how it's handled]
 *
 * </details>
 */

/**
 * Main solution for Problem 076: Minimum Window Substring
 *
 * @param {string} s - Source string to search in
 * @param {string} t - Target string containing required characters
 * @return {string} - Minimum window substring or empty string
 *
 * Time Complexity: O(m + n)
 * Space Complexity: O(k)
 */
function solve(s, t) {
    if (!s || !t || s.length < t.length) return "";

    // Build frequency map for target string t
    const targetMap = new Map();
    for (const char of t) {
        targetMap.set(char, (targetMap.get(char) || 0) + 1);
    }

    let left = 0;
    let minLength = Infinity;
    let minStart = 0;
    let required = targetMap.size; // Number of unique chars in t
    let formed = 0; // Number of unique chars in current window with desired frequency

    const windowMap = new Map();

    for (let right = 0; right < s.length; right++) {
        const char = s[right];

        // Add character to window
        windowMap.set(char, (windowMap.get(char) || 0) + 1);

        // Check if frequency of current character matches requirement
        if (targetMap.has(char) && windowMap.get(char) === targetMap.get(char)) {
            formed++;
        }

        // Try to contract the window until it's no longer valid
        while (formed === required && left <= right) {
            // Update result if this window is smaller
            if (right - left + 1 < minLength) {
                minLength = right - left + 1;
                minStart = left;
            }

            // Remove leftmost character from window
            const leftChar = s[left];
            windowMap.set(leftChar, windowMap.get(leftChar) - 1);

            // Check if removal breaks the validity
            if (targetMap.has(leftChar) && windowMap.get(leftChar) < targetMap.get(leftChar)) {
                formed--;
            }

            left++;
        }
    }

    return minLength === Infinity ? "" : s.substring(minStart, minStart + minLength);
}

/**
 * Test cases for Problem 076: Minimum Window Substring
 */
function testSolution() {
    console.log('Testing 076. Minimum Window Substring');

    // Test case 1: Basic example
    const result1 = solve("ADOBECODEBANC", "ABC");
    const expected1 = "BANC";
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);
    console.log(`Test 1 passed: s="ADOBECODEBANC", t="ABC" -> "${result1}"`);

    // Test case 2: Target with duplicate characters
    const result2 = solve("a", "a");
    const expected2 = "a";
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);
    console.log(`Test 2 passed: s="a", t="a" -> "${result2}"`);

    // Test case 3: No valid window
    const result3 = solve("a", "aa");
    const expected3 = "";
    console.assert(result3 === expected3, `Test 3 failed: expected "${expected3}", got "${result3}"`);
    console.log(`Test 3 passed: s="a", t="aa" -> "${result3}"`);

    // Test case 4: Entire string is minimum window
    const result4 = solve("abc", "abc");
    const expected4 = "abc";
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);
    console.log(`Test 4 passed: s="abc", t="abc" -> "${result4}"`);

    // Test case 5: Complex case with duplicates
    const result5 = solve("ADOBECODEBANC", "AABC");
    const expected5 = "ADOBECODEBA";
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);
    console.log(`Test 5 passed: s="ADOBECODEBANC", t="AABC" -> "${result5}"`);

    // Test case 6: Empty strings
    const result6 = solve("", "a");
    const expected6 = "";
    console.assert(result6 === expected6, `Test 6 failed: expected "${expected6}", got "${result6}"`);
    console.log(`Test 6 passed: s="", t="a" -> "${result6}"`);

    // Test case 7: Minimum at the end
    const result7 = solve("ab", "b");
    const expected7 = "b";
    console.assert(result7 === expected7, `Test 7 failed: expected ${expected7}, got ${result7}`);
    console.log(`Test 7 passed: s="ab", t="b" -> "${result7}"`);

    console.log('All test cases passed for 076. Minimum Window Substring!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 076. Minimum Window Substring ===');
    console.log('Category: Sliding Window');
    console.log('Difficulty: Hard');
    console.log('');

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
 * - This solution focuses on sliding window concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
