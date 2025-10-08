/**
 * 387. First Unique Character In A String
 * Easy
 *
 * This problem demonstrates key concepts in Strings.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * This problem requires understanding of strings concepts.
 *
 * APPROACH:
 * Apply strings methodology to solve efficiently.
 *
 * WHY THIS WORKS:
 * The solution leverages strings principles for optimal performance.
 *
 * TIME COMPLEXITY: O(n)
 * SPACE COMPLEXITY: O(1)
 *
 * EXAMPLE WALKTHROUGH:
 * Input: [example input]\nStep 1: [explain first step]\nOutput: [expected output]
 *
 * EDGE CASES:
 * - Empty input handling\n- Single element cases\n- Large input considerations
 */

/**
 * Main solution for Problem 387: First Unique Character In A String
 *
 * @param {string} s - The input string
 * @return {number} - Index of first unique character, or -1 if none exists
 *
 * Time Complexity: O(n) - two passes through the string
 * Space Complexity: O(1) - limited to 26 lowercase letters
 */
function solve(s) {
    // Count character frequencies
    const charCount = new Map();

    for (const char of s) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }

    // Find first character with count of 1
    for (let i = 0; i < s.length; i++) {
        if (charCount.get(s[i]) === 1) {
            return i;
        }
    }

    return -1;
}

/**
 * Test cases for Problem 387: First Unique Character In A String
 */
function testSolution() {
    console.log('Testing 387. First Unique Character In A String');

    // Test case 1: First unique is 'l' at index 0
    const result1 = solve("leetcode");
    console.assert(result1 === 0, `Test 1 failed: expected 0, got ${result1}`);

    // Test case 2: First unique is 'v' at index 2
    const result2 = solve("loveleetcode");
    console.assert(result2 === 2, `Test 2 failed: expected 2, got ${result2}`);

    // Test case 3: No unique character
    const result3 = solve("aabb");
    console.assert(result3 === -1, `Test 3 failed: expected -1, got ${result3}`);

    // Test case 4: Single character
    const result4 = solve("z");
    console.assert(result4 === 0, `Test 4 failed: expected 0, got ${result4}`);

    console.log('All test cases passed for 387. First Unique Character In A String!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 387. First Unique Character In A String ===');
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
