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
 * Main solution for Problem 3: Longest Substring Without Repeating Characters
 *
 * @param {string} s - The input string
 * @return {number} - Length of the longest substring without repeating characters
 *
 * Time Complexity: O(n) where n is the length of the string
 * Space Complexity: O(min(n, m)) where m is the character set size
 */
function solve(s) {
    const charIndex = new Map();
    let maxLength = 0;
    let left = 0;

    for (let right = 0; right < s.length; right++) {
        const char = s[right];

        // If character is already in window, move left pointer
        if (charIndex.has(char) && charIndex.get(char) >= left) {
            left = charIndex.get(char) + 1;
        }

        // Update character index
        charIndex.set(char, right);

        // Update max length
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}

/**
 * Test cases for Problem 3: Longest Substring Without Repeating Characters
 */
function testSolution() {
    console.log('Testing 3. Longest Substring Without Repeating Characters');

    // Test case 1: "abc" has length 3
    const result1 = solve("abcabcbb");
    console.assert(result1 === 3, `Test 1 failed: expected 3, got ${result1}`);

    // Test case 2: All same characters
    const result2 = solve("bbbbb");
    console.assert(result2 === 1, `Test 2 failed: expected 1, got ${result2}`);

    // Test case 3: "wke" has length 3
    const result3 = solve("pwwkew");
    console.assert(result3 === 3, `Test 3 failed: expected 3, got ${result3}`);

    // Test case 4: Empty string
    const result4 = solve("");
    console.assert(result4 === 0, `Test 4 failed: expected 0, got ${result4}`);

    // Test case 5: All unique characters
    const result5 = solve("abcdef");
    console.assert(result5 === 6, `Test 5 failed: expected 6, got ${result5}`);

    console.log('All test cases passed for 3. Longest Substring Without Repeating Characters!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 3. Longest Substring Without Repeating Characters ===');
    console.log('Category: Strings');
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
 * - This solution focuses on strings concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
