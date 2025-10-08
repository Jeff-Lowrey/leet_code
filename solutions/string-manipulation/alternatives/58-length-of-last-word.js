/**
 * 58. Length Of Last Word
 * Easy
 *
 * This problem demonstrates key concepts in String Manipulation.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Find the length of the last word by traversing from the end of the string,
 * skipping trailing spaces, then counting characters until we hit a space or
 * the beginning of the string.
 *
 * APPROACH:
 * 1. Start from the end of the string
 * 2. Skip any trailing spaces
 * 3. Count characters until we hit another space or reach the beginning
 * 4. Return the count
 *
 * WHY THIS WORKS:
 * By starting from the end, we directly locate the last word without needing
 * to process the entire string or split into words.
 *
 * TIME COMPLEXITY: O(n)
 * - In worst case, we might traverse the entire string
 * SPACE COMPLEXITY: O(1)
 * - Only using a counter variable
 *
 * EXAMPLE WALKTHROUGH:
 * Input: "Hello World"
 * Step 1: Start at 'd' (end)
 * Step 2: Count back: d, l, r, o, W = 5 characters
 * Step 3: Hit space, stop
 * Output: 5
 *
 * EDGE CASES:
 * - Trailing spaces: Skip them before counting
 * - Single word: Return its length
 * - Multiple spaces between words: Stop at first space encountered
 */

/**
 * Main solution for Problem 58: Length Of Last Word
 *
 * @param {string} s - Input string
 * @return {number} - Length of the last word
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(s) {
    let length = 0;
    let i = s.length - 1;

    // Skip trailing spaces
    while (i >= 0 && s[i] === ' ') {
        i--;
    }

    // Count characters in the last word
    while (i >= 0 && s[i] !== ' ') {
        length++;
        i--;
    }

    return length;
}

/**
 * Test cases for Problem 58: Length Of Last Word
 */
function testSolution() {
    console.log('Testing 58. Length Of Last Word');

    // Test case 1: Basic functionality
    const result1 = solve("Hello World");
    const expected1 = 5;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Trailing spaces
    const result2 = solve("   fly me   to   the moon  ");
    const expected2 = 4;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Single word
    const result3 = solve("luffy");
    const expected3 = 5;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Single word with spaces
    const result4 = solve("   word   ");
    const expected4 = 4;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Two words
    const result5 = solve("a b");
    const expected5 = 1;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 58. Length Of Last Word!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 58. Length Of Last Word ===');
    console.log('Category: String Manipulation');
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
 * - This solution focuses on string manipulation concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
