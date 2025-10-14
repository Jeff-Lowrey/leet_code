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
 * Main solution for Problem 424: Longest Repeating Character Replacement
 *
 * @param {string} s - Input string containing uppercase English letters
 * @param {number} k - Maximum number of characters that can be replaced
 * @return {number} - Length of longest substring after replacements
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(s, k) {
    if (!s || s.length === 0) return 0;
    if (k >= s.length - 1) return s.length;

    const charCount = new Map();
    let left = 0;
    let maxFreq = 0;
    let maxLength = 0;

    for (let right = 0; right < s.length; right++) {
        const char = s[right];

        // Update character frequency
        charCount.set(char, (charCount.get(char) || 0) + 1);

        // Update max frequency seen in current window
        maxFreq = Math.max(maxFreq, charCount.get(char));

        // Check if current window is valid
        // windowLength - maxFreq = number of replacements needed
        const windowLength = right - left + 1;
        const replacementsNeeded = windowLength - maxFreq;

        // If invalid, shrink window from left
        if (replacementsNeeded > k) {
            const leftChar = s[left];
            charCount.set(leftChar, charCount.get(leftChar) - 1);
            left++;
        }

        // Update max length (window is guaranteed valid here)
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}

/**
 * Test cases for Problem 424: Longest Repeating Character Replacement
 */
function testSolution() {
    console.log('Testing 424. Longest Repeating Character Replacement');

    // Test case 1: Basic example
    const result1 = solve("ABAB", 2);
    const expected1 = 4;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);
    console.log(`Test 1 passed: s="ABAB", k=2 -> ${result1}`);

    // Test case 2: More complex case
    const result2 = solve("AABABBA", 1);
    const expected2 = 4;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);
    console.log(`Test 2 passed: s="AABABBA", k=1 -> ${result2}`);

    // Test case 3: k = 0
    const result3 = solve("AAABBB", 0);
    const expected3 = 3;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);
    console.log(`Test 3 passed: s="AAABBB", k=0 -> ${result3}`);

    // Test case 4: All same characters
    const result4 = solve("AAAA", 2);
    const expected4 = 4;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);
    console.log(`Test 4 passed: s="AAAA", k=2 -> ${result4}`);

    // Test case 5: k larger than needed
    const result5 = solve("ABC", 5);
    const expected5 = 3;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);
    console.log(`Test 5 passed: s="ABC", k=5 -> ${result5}`);

    // Test case 6: Single character
    const result6 = solve("A", 0);
    const expected6 = 1;
    console.assert(result6 === expected6, `Test 6 failed: expected ${expected6}, got ${result6}`);
    console.log(`Test 6 passed: s="A", k=0 -> ${result6}`);

    // Test case 7: Empty string
    const result7 = solve("", 2);
    const expected7 = 0;
    console.assert(result7 === expected7, `Test 7 failed: expected ${expected7}, got ${result7}`);
    console.log(`Test 7 passed: s="", k=2 -> ${result7}`);

    // Test case 8: Complex pattern
    const result8 = solve("ABBB", 2);
    const expected8 = 4;
    console.assert(result8 === expected8, `Test 8 failed: expected ${expected8}, got ${result8}`);
    console.log(`Test 8 passed: s="ABBB", k=2 -> ${result8}`);

    console.log('All test cases passed for 424. Longest Repeating Character Replacement!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 424. Longest Repeating Character Replacement ===');
    console.log('Category: Sliding Window');
    console.log('Difficulty: Medium');
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
 * - The key insight is: replacements_needed = window_length - max_frequency
 */
