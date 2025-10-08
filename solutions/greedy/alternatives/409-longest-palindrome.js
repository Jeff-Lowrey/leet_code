/**
 * 409. Longest Palindrome
 * Easy
 *
 * This problem demonstrates key concepts in Greedy.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * For a palindrome, we can use all characters that appear an even number of times,
 * plus one character with odd count in the middle. Greedy choice: use as many
 * characters as possible while maintaining palindrome property.
 *
 * APPROACH:
 * 1. **Count frequencies**: Use a Set or Map to track character counts
 * 2. **Use pairs**: For each character, use the largest even count <= actual count
 * 3. **Add middle character**: If any character has odd count, add 1 more to result
 * 4. **Sum lengths**: Total is sum of all pairs + optional middle character
 *
 * WHY THIS WORKS:
 * - Palindromes are symmetric, so we can use pairs of characters
 * - Greedy choice: use floor(count/2) * 2 for each character (maximize pairs)
 * - At most one character can have odd count in the middle
 * - This maximizes total length while maintaining palindrome property
 *
 * TIME COMPLEXITY: O(n)
 * SPACE COMPLEXITY: O(1) - at most 52 different characters (a-z, A-Z)
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * s = "abccccdd"
 * Counts: a:1, b:1, c:4, d:2
 *
 * Pairs:
 *   a: floor(1/2)*2 = 0, hasOdd=true
 *   b: floor(1/2)*2 = 0, hasOdd=true
 *   c: floor(4/2)*2 = 4
 *   d: floor(2/2)*2 = 2
 *
 * Total pairs: 0+0+4+2 = 6
 * Has odd: true → add 1
 * Result: 7 (e.g., "dccaccd")
 * ```
 *
 * EDGE CASES:
 * - All characters same: Use all if even count, all-1 if odd count, plus middle
 * - All characters unique: Use 1 (any single character)
 * - Empty string: Length 0
 * - Single character: Length 1
 */

/**
 * Main solution for Problem 409: Longest Palindrome
 *
 * @param {string} s - Input string
 * @return {number} - Length of longest palindrome that can be built
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(s) {
    const charSet = new Set();
    let length = 0;

    // Count pairs using a set
    for (const char of s) {
        if (charSet.has(char)) {
            // Found a pair, add 2 to length
            length += 2;
            charSet.delete(char);
        } else {
            // Add to set, waiting for pair
            charSet.add(char);
        }
    }

    // If there are any unpaired characters, we can use one in the middle
    if (charSet.size > 0) {
        length += 1;
    }

    return length;
}

/**
 * Test cases for Problem 409: Longest Palindrome
 */
function testSolution() {
    console.log('Testing 409. Longest Palindrome');

    // Test case 1: Example from problem
    const result1 = solve("abccccdd");
    const expected1 = 7;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Single character
    const result2 = solve("a");
    const expected2 = 1;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: All unique characters
    const result3 = solve("abcdef");
    const expected3 = 1;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: All same character (even count)
    const result4 = solve("aaaa");
    const expected4 = 4;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: All same character (odd count)
    const result5 = solve("aaaaa");
    const expected5 = 5;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    // Test case 6: Mixed case
    const result6 = solve("Aa");
    const expected6 = 1;
    console.assert(result6 === expected6, `Test 6 failed: expected ${expected6}, got ${result6}`);

    console.log('All test cases passed for 409. Longest Palindrome!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 409. Longest Palindrome ===');
    console.log('Category: Greedy');
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
 * - This solution focuses on greedy concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
