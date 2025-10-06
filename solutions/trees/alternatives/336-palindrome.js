/**
 * 336. Palindrome
 * Medium
 *
 * Palindrome Pairs - JavaScript Implementation This solution finds all pairs of words in an array that can form palindromes when concatenated. Time Complexity: O(n k^2) where n is the number of words and k is the average length of words Space Complexity: O(n k) for the storage of results and temporary strings
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Palindrome is to understand the core problem pattern
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
 * Palindrome Pairs - JavaScript Implementation
 * 
 * This solution finds all pairs of words in an array that can form palindromes when concatenated.
 * Time Complexity: O(n * k^2) where n is the number of words and k is the average length of words
 * Space Complexity: O(n * k) for the storage of results and temporary strings
 */

/**
 * Checks if a string is a palindrome between start and end indices
 * @param {string} str - String to check
 * @param {number} start - Starting index
 * @param {number} end - Ending index
 * @returns {boolean} - True if palindrome, false otherwise
 */
function isPalindrome(str, start, end) {
    while (start < end) {
        if (str[start] !== str[end]) {
            return false;
        }
        start++;
        end--;
    }
    return true;
}

/**
 * Finds all palindrome pairs in an array of words
 * @param {string[]} words - Array of words to check
 * @returns {number[][]} - Array of pairs of indices that form palindromes
 */
function findPalindromePairs(words) {
    if (!Array.isArray(words) || words.length === 0) {
        return [];
    }

    const result = [];
    const wordMap = new Map();

    // Create a map of word to index for O(1) lookup
    for (let i = 0; i < words.length; i++) {
        wordMap.set(words[i], i);
    }

    // Check each word
    for (let i = 0; i < words.length; i++) {
        const currentWord = words[i];
        
        // Handle empty string case
        if (currentWord === "") {
            for (let j = 0; j < words.length; j++) {
                if (i !== j && isPalindrome(words[j], 0, words[j].length - 1)) {
                    result.push([i, j]);
                    result.push([j, i]);
                }
            }
            continue;
        }

        // Check reverse of current word
        const reversedWord = currentWord.split('').reverse().join('');
        if (wordMap.has(reversedWord) && wordMap.get(reversedWord) !== i) {
            result.push([i, wordMap.get(reversedWord)]);
        }

        // Check all prefixes
        for (let j = 1; j < currentWord.length; j++) {
            if (isPalindrome(currentWord, j, currentWord.length - 1)) {
                const prefix = currentWord.slice(0, j).split('').reverse().join('');
                if (wordMap.has(prefix)) {
                    result.push([i, wordMap.get(prefix)]);
                }
            }
        }

        // Check all suffixes
        for (let j = 0; j < currentWord.length; j++) {
            if (isPalindrome(currentWord, 0, j)) {
                const suffix = currentWord.slice(j + 1).split('').reverse().join('');
                if (wordMap.has(suffix)) {
                    result.push([wordMap.get(suffix), i]);
                }
            }
        }
    }

    return result;
}

/**
 * Example usage and test cases
 */
function runTests() {
    // Test case 1: Basic palindrome pairs
    console.log(findPalindromePairs(["abcd", "dcba", "lls", "s", "sssll"]));
    // Expected: [[0,1], [1,0], [2,4], [3,2]]

    // Test case 2: Empty array
    console.log(findPalindromePairs([]));
    // Expected: []

    // Test case 3: Single word
    console.log(findPalindromePairs(["abc"]));
    // Expected: []

    // Test case 4: Empty string included
    console.log(findPalindromePairs(["", "abc", "cba"]));
    // Expected: [[0,2], [2,0]]
}

// Export the function for use in other modules
module.exports = {
    findPalindromePairs,
    isPalindrome
};

// Uncomment to run tests
// runTests();