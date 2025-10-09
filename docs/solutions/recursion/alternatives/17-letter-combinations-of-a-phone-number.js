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
 * Main solution for Problem 17: Letter Combinations Of A Phone Number
 *
 * @param {string} digits - String of digits from 2-9
 * @return {string[]} - Array of all possible letter combinations
 *
 * Time Complexity: O(4^n * n)
 * Space Complexity: O(n)
 */
function solve(digits) {
    // Edge case: empty input
    if (!digits || digits.length === 0) {
        return [];
    }

    // Mapping of digits to letters (like phone keypad)
    const digitToLetters = {
        '2': 'abc',
        '3': 'def',
        '4': 'ghi',
        '5': 'jkl',
        '6': 'mno',
        '7': 'pqrs',
        '8': 'tuv',
        '9': 'wxyz'
    };

    const result = [];

    /**
     * Backtracking helper function
     * @param {number} index - Current position in digits string
     * @param {string} current - Current combination being built
     */
    function backtrack(index, current) {
        // Base case: if we've processed all digits, add combination to results
        if (index === digits.length) {
            result.push(current);
            return;
        }

        // Get letters for current digit
        const letters = digitToLetters[digits[index]];

        // Try each letter
        for (const letter of letters) {
            // Choose: add letter to current combination
            backtrack(index + 1, current + letter);
            // Backtrack: happens automatically when function returns
        }
    }

    // Start backtracking from first digit
    backtrack(0, '');

    return result;
}

/**
 * Test cases for Problem 17: Letter Combinations Of A Phone Number
 */
function testSolution() {
    console.log('Testing 17. Letter Combinations Of A Phone Number');

    // Helper function to compare arrays (order doesn't matter)
    function arraysEqual(a, b) {
        if (a.length !== b.length) return false;
        const sortedA = [...a].sort();
        const sortedB = [...b].sort();
        for (let i = 0; i < sortedA.length; i++) {
            if (sortedA[i] !== sortedB[i]) return false;
        }
        return true;
    }

    // Test case 1: Two digits
    const result1 = solve("23");
    const expected1 = ["ad","ae","af","bd","be","bf","cd","ce","cf"];
    console.assert(arraysEqual(result1, expected1),
        `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Empty string
    const result2 = solve("");
    const expected2 = [];
    console.assert(arraysEqual(result2, expected2),
        `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Single digit
    const result3 = solve("2");
    const expected3 = ["a","b","c"];
    console.assert(arraysEqual(result3, expected3),
        `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Three digits
    const result4 = solve("234");
    console.assert(result4.length === 27, // 3 * 3 * 3
        `Test 4 failed: expected 27 combinations, got ${result4.length}`);

    // Test case 5: Digit with 4 letters (7 or 9)
    const result5 = solve("79");
    console.assert(result5.length === 16, // 4 * 4
        `Test 5 failed: expected 16 combinations, got ${result5.length}`);

    console.log('All test cases passed for 17. Letter Combinations Of A Phone Number!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 17. Letter Combinations Of A Phone Number ===');
    console.log('Category: Recursion');
    console.log('Difficulty: Medium');
    console.log('');

    const example1 = "23";
    console.log(`Input: "${example1}"`);
    console.log('Output:', solve(example1));
    console.log('');

    const example2 = "2";
    console.log(`Input: "${example2}"`);
    console.log('Output:', solve(example2));

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
 * - This is a classic backtracking problem
 * - The solution explores all possible combinations systematically
 * - Can be visualized as a tree where each level represents a digit
 * - Each branch represents choosing a letter for that digit
 */
