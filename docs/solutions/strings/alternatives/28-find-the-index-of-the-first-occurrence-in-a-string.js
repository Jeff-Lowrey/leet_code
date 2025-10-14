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
 * - **Empty string:** Handle s.length == 0
 * - **Single character:** Minimal string input
 * - **All same characters:** Check duplicate handling
 * - **Special characters:** Handle non-alphanumeric
 * - **Case sensitivity:** Consider uppercase vs lowercase
 *
 * </details>
 */

/**
 * Main solution for Problem 28: Find The Index Of The First Occurrence In A String
 *
 * @param {string} haystack - The string to search in
 * @param {string} needle - The substring to find
 * @return {number} - Index of first occurrence, or -1 if not found
 *
 * Time Complexity: O(n * m) where n is haystack length, m is needle length
 * Space Complexity: O(1)
 */
function solve(haystack, needle) {
    // Edge case: empty needle
    if (needle.length === 0) {
        return 0;
    }

    // Check if needle can fit in remaining haystack
    for (let i = 0; i <= haystack.length - needle.length; i++) {
        // Check if substring matches needle
        let match = true;
        for (let j = 0; j < needle.length; j++) {
            if (haystack[i + j] !== needle[j]) {
                match = false;
                break;
            }
        }
        if (match) {
            return i;
        }
    }

    return -1;
}

/**
 * Test cases for Problem 28: Find The Index Of The First Occurrence In A String
 */
function testSolution() {
    console.log('Testing 28. Find The Index Of The First Occurrence In A String');

    // Test case 1: Found at index 0
    const result1 = solve("sadbutsad", "sad");
    console.assert(result1 === 0, `Test 1 failed: expected 0, got ${result1}`);

    // Test case 2: Not found
    const result2 = solve("leetcode", "leeto");
    console.assert(result2 === -1, `Test 2 failed: expected -1, got ${result2}`);

    // Test case 3: Found in middle
    const result3 = solve("hello", "ll");
    console.assert(result3 === 2, `Test 3 failed: expected 2, got ${result3}`);

    // Test case 4: Needle equals haystack
    const result4 = solve("a", "a");
    console.assert(result4 === 0, `Test 4 failed: expected 0, got ${result4}`);

    console.log('All test cases passed for 28. Find The Index Of The First Occurrence In A String!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 28. Find The Index Of The First Occurrence In A String ===');
    console.log('Category: Strings');
    console.log('Difficulty: Easy');
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
