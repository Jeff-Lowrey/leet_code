/**
 * 1221. Split A String In Balanced Strings
 * Easy
 *
 * This problem demonstrates key concepts in Greedy.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Use a greedy approach to count balanced substrings. Every time we reach a balanced
 * state (equal L's and R's), we can split there. The greedy choice is to split as
 * soon as we reach balance to maximize the count.
 *
 * APPROACH:
 * 1. **Track balance**: Use a counter that increments for 'L' and decrements for 'R'
 * 2. **Detect balance**: When counter reaches 0, we have equal L's and R's
 * 3. **Greedy split**: Count this as a balanced substring immediately
 * 4. **Continue scanning**: Keep looking for more balanced substrings
 *
 * WHY THIS WORKS:
 * - The greedy choice: split as early as possible when balanced
 * - Splitting early maximizes count (two small balanced strings > one large)
 * - Balance counter naturally tracks the state
 * - We're guaranteed the string is balanced, so greedy approach is safe
 *
 * TIME COMPLEXITY: O(n)
 * SPACE COMPLEXITY: O(1)
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * s = "RLRRLLRLRL"
 * i=0, R: balance=-1
 * i=1, L: balance=0 → count=1 (RL)
 * i=2, R: balance=-1
 * i=3, R: balance=-2
 * i=4, L: balance=-1
 * i=5, L: balance=0 → count=2 (RRLL)
 * i=6, R: balance=-1
 * i=7, L: balance=0 → count=3 (RL)
 * i=8, R: balance=-1
 * i=9, L: balance=0 → count=4 (RL)
 * Result: 4
 * ```
 *
 * EDGE CASES:
 * - Minimum case: "RL" → 1 balanced string
 * - All L's then all R's: "LLRR" → 1 balanced string
 * - Alternating: "RLRL" → 2 balanced strings
 */

/**
 * Main solution for Problem 1221: Split A String In Balanced Strings
 *
 * @param {string} s - Balanced string containing only 'L' and 'R'
 * @return {number} - Maximum number of balanced substrings
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(s) {
    let balance = 0;
    let count = 0;

    for (const char of s) {
        // Increment for L, decrement for R (or vice versa)
        balance += char === 'L' ? 1 : -1;

        // When balanced, we found a split point
        if (balance === 0) {
            count++;
        }
    }

    return count;
}

/**
 * Test cases for Problem 1221: Split A String In Balanced Strings
 */
function testSolution() {
    console.log('Testing 1221. Split A String In Balanced Strings');

    // Test case 1: Example from problem
    const result1 = solve("RLRRLLRLRL");
    const expected1 = 4;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: All L's then all R's
    const result2 = solve("RLLLLRRRLR");
    const expected2 = 3;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Minimum case
    const result3 = solve("RL");
    const expected3 = 1;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Alternating pattern
    const result4 = solve("RLRLRLRL");
    const expected4 = 4;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Larger groups
    const result5 = solve("LLLLRRRR");
    const expected5 = 1;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 1221. Split A String In Balanced Strings!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 1221. Split A String In Balanced Strings ===');
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
