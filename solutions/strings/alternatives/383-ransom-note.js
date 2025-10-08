/**
 * 383. Ransom Note
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
 * Main solution for Problem 383: Ransom Note
 *
 * @param {string} ransomNote - The ransom note to construct
 * @param {string} magazine - The magazine to cut letters from
 * @return {boolean} - True if ransom note can be constructed from magazine
 *
 * Time Complexity: O(m + n) where m is magazine length, n is ransomNote length
 * Space Complexity: O(1) - limited to 26 lowercase letters
 */
function solve(ransomNote, magazine) {
    // Count character frequencies in magazine
    const charCount = new Map();

    for (const char of magazine) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }

    // Check if we can construct the ransom note
    for (const char of ransomNote) {
        const count = charCount.get(char) || 0;
        if (count === 0) {
            return false;
        }
        charCount.set(char, count - 1);
    }

    return true;
}

/**
 * Test cases for Problem 383: Ransom Note
 */
function testSolution() {
    console.log('Testing 383. Ransom Note');

    // Test case 1: Cannot construct - not enough 'a'
    const result1 = solve("a", "b");
    console.assert(result1 === false, `Test 1 failed: expected false, got ${result1}`);

    // Test case 2: Cannot construct - not enough of each letter
    const result2 = solve("aa", "ab");
    console.assert(result2 === false, `Test 2 failed: expected false, got ${result2}`);

    // Test case 3: Can construct
    const result3 = solve("aa", "aab");
    console.assert(result3 === true, `Test 3 failed: expected true, got ${result3}`);

    // Test case 4: Empty ransom note
    const result4 = solve("", "abc");
    console.assert(result4 === true, `Test 4 failed: expected true, got ${result4}`);

    console.log('All test cases passed for 383. Ransom Note!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 383. Ransom Note ===');
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
