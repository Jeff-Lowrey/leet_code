/**
 * 17. Letter Combinations Of A Phone Number
 * Medium
 *
 * Letter Combinations of a Phone Number This implementation generates all possible letter combinations that a phone number could represent, similar to old phone keypads where each digit maps to multiple letters. Time Complexity: O(4^n), where n is the length of input digits Space Complexity: O(4^n) to store all combinations
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Letter Combinations Of A Phone Number is to understand the core problem pattern
 * and apply the most efficient algorithmic approach.
 *
 * ### APPROACH:
 * 1. Analyze the problem requirements
 * 2. Choose the optimal data structure
 * 3. Implement the solution step by step
 * 4. Handle edge cases appropriately
 *
 * ### WHY THIS WORKS:
 * This approach works because it leverages the fundamental properties of the problem
 * to achieve an efficient solution.
 *
 * ### EXAMPLE WALKTHROUGH:
 * For a typical input, the algorithm processes the data systematically
 * to produce the expected output.
 *
 * </details>
 */

/**
 * Letter Combinations of a Phone Number
 * 
 * This implementation generates all possible letter combinations that a phone number
 * could represent, similar to old phone keypads where each digit maps to multiple letters.
 * 
 * Time Complexity: O(4^n), where n is the length of input digits
 * Space Complexity: O(4^n) to store all combinations
 */

/**
 * @param {string} digits - Input string containing digits (2-9)
 * @return {string[]} Array of all possible letter combinations
 */
const letterCombinations = function(digits) {
    // Handle empty input
    if (!digits || digits.length === 0) {
        return [];
    }

    // Mapping of digits to letters (phone keypad)
    const digitMap = {
        '2': 'abc',
        '3': 'def',
        '4': 'ghi',
        '5': 'jkl',
        '6': 'mno',
        '7': 'pqrs',
        '8': 'tuv',
        '9': 'wxyz'
    };

    // Result array to store all combinations
    const result = [];

    /**
     * Recursive helper function to generate combinations
     * @param {string} currentCombination - Current combination being built
     * @param {number} currentIndex - Current index in digits string
     */
    const backtrack = (currentCombination, currentIndex) => {
        // Base case: if we've processed all digits
        if (currentIndex === digits.length) {
            result.push(currentCombination);
            return;
        }

        // Get the current digit and its corresponding letters
        const currentDigit = digits[currentIndex];
        const letters = digitMap[currentDigit];

        // Generate combinations for each letter
        for (let i = 0; i < letters.length; i++) {
            backtrack(currentCombination + letters[i], currentIndex + 1);
        }
    };

    // Start the recursive process
    backtrack('', 0);
    return result;
};

// Example usage and test cases
const testCases = [
    "23",
    "234",
    "",
    "2"
];

// Run test cases
testCases.forEach(test => {
    console.log(`Input: "${test}"`);
    console.log(`Output:`, letterCombinations(test));
    console.log('---');
});

// Export the function for potential module usage
module.exports = letterCombinations;