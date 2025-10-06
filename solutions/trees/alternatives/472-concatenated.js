/**
 * 472. Concatenated
 * Medium
 *
 * Concatenated Words - JavaScript Implementation This solution finds all concatenated words in a given array of words. A concatenated word is a word that can be formed by concatenating other words from the array. Time Complexity: O(n l^2) where n is number of words and l is average length of words Space Complexity: O(n) for the Set and recursion stack
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Concatenated is to understand the core problem pattern
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
 * Concatenated Words - JavaScript Implementation
 * 
 * This solution finds all concatenated words in a given array of words.
 * A concatenated word is a word that can be formed by concatenating other words from the array.
 * 
 * Time Complexity: O(n * l^2) where n is number of words and l is average length of words
 * Space Complexity: O(n) for the Set and recursion stack
 */

/**
 * @param {string[]} words
 * @return {string[]}
 */
const findAllConcatenatedWordsInADict = function(words) {
    // Edge case: empty or invalid input
    if (!words || words.length === 0) {
        return [];
    }

    // Create a Set for O(1) lookup of words
    const dictionary = new Set(words);
    const result = [];

    /**
     * Helper function to check if a word can be formed by concatenating other words
     * @param {string} word - Word to check
     * @param {number} start - Starting index for current segment
     * @param {number} count - Count of concatenated words found
     * @returns {boolean}
     */
    const canForm = (word, start = 0, count = 0) => {
        // If we reached the end and found at least one concatenation
        if (start === word.length) {
            return count >= 2;
        }

        // Try all possible prefixes from current position
        for (let end = start + 1; end <= word.length; end++) {
            const prefix = word.slice(start, end);
            
            // Skip the word itself from dictionary when checking
            if (dictionary.has(prefix) && prefix !== word) {
                if (canForm(word, end, count + 1)) {
                    return true;
                }
            }
        }
        return false;
    };

    // Check each word if it can be formed by concatenating other words
    for (const word of words) {
        if (word.length > 0 && canForm(word)) {
            result.push(word);
        }
    }

    return result;
};

// Example usage and test cases
function runTests() {
    const testCases = [
        {
            input: ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"],
            expected: ["catsdogcats","dogcatsdog","ratcatdogcat"]
        },
        {
            input: ["cat","dog","catdog"],
            expected: ["catdog"]
        },
        {
            input: [],
            expected: []
        },
        {
            input: ["a", "b", "ab"],
            expected: ["ab"]
        }
    ];

    for (let i = 0; i < testCases.length; i++) {
        const result = findAllConcatenatedWordsInADict(testCases[i].input);
        console.log(`Test Case ${i + 1}:`);
        console.log('Input:', testCases[i].input);
        console.log('Output:', result);
        console.log('Expected:', testCases[i].expected);
        console.log('Passed:', JSON.stringify(result) === JSON.stringify(testCases[i].expected));
        console.log('---');
    }
}

// Run tests if not in production
if (process.env.NODE_ENV !== 'production') {
    runTests();
}

// Export the function for use in other modules
module.exports = findAllConcatenatedWordsInADict;