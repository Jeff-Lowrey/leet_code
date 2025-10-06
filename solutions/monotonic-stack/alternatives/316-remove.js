/**
 * 316. Remove
 * Medium
 *
 * Remove Duplicate - JavaScript Implementation This file contains multiple approaches to remove duplicates from arrays and objects
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Remove is to understand the core problem pattern
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
 * Remove Duplicate - JavaScript Implementation
 * This file contains multiple approaches to remove duplicates from arrays and objects
 */

/**
 * Removes duplicates from an array using Set
 * @param {Array} arr - Input array with possible duplicates
 * @returns {Array} - Array with duplicates removed
 */
function removeDuplicatesUsingSet(arr) {
    if (!Array.isArray(arr)) {
        throw new Error('Input must be an array');
    }
    return [...new Set(arr)];
}

/**
 * Removes duplicates from an array using filter
 * @param {Array} arr - Input array with possible duplicates
 * @returns {Array} - Array with duplicates removed
 */
function removeDuplicatesUsingFilter(arr) {
    if (!Array.isArray(arr)) {
        throw new Error('Input must be an array');
    }
    return arr.filter((item, index) => arr.indexOf(item) === index);
}

/**
 * Removes duplicates from an array of objects based on a key
 * @param {Array} arr - Array of objects
 * @param {string} key - Key to check for duplicates
 * @returns {Array} - Array with duplicate objects removed
 */
function removeDuplicateObjects(arr, key) {
    if (!Array.isArray(arr) || !key) {
        throw new Error('Invalid input');
    }
    
    const seen = new Set();
    return arr.filter(item => {
        const value = item[key];
        if (!seen.has(value)) {
            seen.add(value);
            return true;
        }
        return false;
    });
}

/**
 * Removes duplicate characters from a string
 * @param {string} str - Input string
 * @returns {string} - String with duplicate characters removed
 */
function removeDuplicateChars(str) {
    if (typeof str !== 'string') {
        throw new Error('Input must be a string');
    }
    return [...new Set(str)].join('');
}

/**
 * Removes duplicate words from a sentence
 * @param {string} sentence - Input sentence
 * @returns {string} - Sentence with duplicate words removed
 */
function removeDuplicateWords(sentence) {
    if (typeof sentence !== 'string') {
        throw new Error('Input must be a string');
    }
    return sentence
        .split(' ')
        .filter((word, index, arr) => arr.indexOf(word) === index)
        .join(' ');
}

// Example usage and test cases
function runTests() {
    try {
        // Test array duplicates
        console.log(removeDuplicatesUsingSet([1, 2, 2, 3, 4, 4, 5]));
        // Expected output: [1, 2, 3, 4, 5]

        // Test object duplicates
        const users = [
            { id: 1, name: 'John' },
            { id: 2, name: 'Jane' },
            { id: 1, name: 'John' }
        ];
        console.log(removeDuplicateObjects(users, 'id'));
        // Expected output: [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]

        // Test string duplicates
        console.log(removeDuplicateChars('hello'));
        // Expected output: 'helo'

        // Test sentence duplicates
        console.log(removeDuplicateWords('hello world hello'));
        // Expected output: 'hello world'

    } catch (error) {
        console.error('Test failed:', error.message);
    }
}

// Export functions for external use
module.exports = {
    removeDuplicatesUsingSet,
    removeDuplicatesUsingFilter,
    removeDuplicateObjects,
    removeDuplicateChars,
    removeDuplicateWords,
    runTests
};

// Uncomment to run tests
// runTests();