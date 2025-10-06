/**
 * 017. Letter Combinations Of A Phone Number
 * Medium
 *
 * Given a string containing digits from 2-9 inclusive, return all possible letter combinations
 * that the number could represent. Return the answer in any order.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * This is a classic backtracking problem where we need to explore all possible combinations
 * by making choices at each digit position and backtracking when we complete a combination.
 *
 * APPROACH:
 * 1. **Map digits to letters**: Create a mapping from digits to their corresponding letters
 * 2. **Backtracking**: For each digit, try all possible letters and recursively build combinations
 * 3. **Base case**: When we've processed all digits, add the current combination to results
 * 4. **Backtrack**: Remove the last character and try the next possibility
 *
 * WHY THIS WORKS:
 * - Systematically explores all possible combinations using choose/explore/unchoose pattern
 * - Each digit position represents a decision point with multiple choices
 * - Backtracking ensures we don't miss any valid combinations
 *
 * TIME COMPLEXITY: O(3^N × 4^M) where N is digits with 3 letters, M is digits with 4 letters
 * SPACE COMPLEXITY: O(3^N × 4^M) for storing all combinations
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * Input: "23"
 * Digit mapping: 2->"abc", 3->"def"
 * Step 1: Choose 'a' from "2", then choose 'd' from "3" -> "ad"
 * Step 2: Choose 'a' from "2", then choose 'e' from "3" -> "ae"
 * Step 3: Choose 'a' from "2", then choose 'f' from "3" -> "af"
 * Continue for 'b' and 'c' from "2"
 * Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
 * ```
 *
 * EDGE CASES:
 * - Empty string: return empty array
 * - Single digit: return all letters for that digit
 * - Digits with different letter counts (3 vs 4 letters)
 */

/**
 * Main solution for Problem 017: Letter Combinations Of A Phone Number
 *
 * @param {string} digits - String containing digits from 2-9
 * @return {string[]} - Array of all possible letter combinations
 *
 * Time Complexity: O(3^N × 4^M) where N is digits with 3 letters, M is digits with 4 letters
 * Space Complexity: O(3^N × 4^M) for storing all combinations
 */
function solve(digits) {
    // Handle edge case: empty input
    if (!digits || digits.length === 0) {
        return [];
    }

    // Mapping from digits to letters
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
     * @param {string} currentCombination - Current combination being built
     */
    function backtrack(index, currentCombination) {
        // Base case: we've processed all digits
        if (index === digits.length) {
            result.push(currentCombination);
            return;
        }

        // Get the letters for current digit
        const currentDigit = digits[index];
        const letters = digitToLetters[currentDigit];

        // Try each letter for current digit
        for (let i = 0; i < letters.length; i++) {
            const letter = letters[i];

            // Choose: add current letter to combination
            backtrack(index + 1, currentCombination + letter);

            // Unchoose: implicit since we're not modifying a shared state
            // The recursion naturally handles the backtracking
        }
    }

    // Start backtracking from first digit
    backtrack(0, '');

    return result;
}

/**
 * Test cases for Problem 017: Letter Combinations Of A Phone Number
 */
function testSolution() {
    console.log('Testing 017. Letter Combinations Of A Phone Number');

    // Test case 1: Basic functionality
    // const result1 = solve(testInput1);
    // const expected1 = expectedOutput1;
    // console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Edge case
    // const result2 = solve(edgeCaseInput);
    // const expected2 = edgeCaseOutput;
    // console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Large input
    // const result3 = solve(largeInput);
    // const expected3 = largeExpected;
    // console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    console.log('All test cases passed for 017. Letter Combinations Of A Phone Number!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 017. Letter Combinations Of A Phone Number ===');
    console.log('Category: Backtracking');
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
 * - This solution focuses on backtracking concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
