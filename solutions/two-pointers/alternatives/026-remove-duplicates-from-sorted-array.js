/**
 * 26. Remove Duplicates From Sorted Array
 * Medium
 *
 * Remove Duplicates - JavaScript Implementation This file provides multiple methods to remove duplicates from arrays and demonstrates their usage with different data types.
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Remove Duplicates From Sorted Array is to understand the core problem pattern
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
 * Remove Duplicates - JavaScript Implementation
 * This file provides multiple methods to remove duplicates from arrays
 * and demonstrates their usage with different data types.
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
 * Removes duplicates using filter method
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
 * @returns {Array} - Array with duplicates removed
 */
function removeDuplicatesByKey(arr, key) {
    if (!Array.isArray(arr) || !key) {
        throw new Error('Invalid input parameters');
    }
    return Array.from(
        new Map(arr.map(item => [item[key], item])).values()
    );
}

/**
 * Removes duplicates while maintaining order using reduce
 * @param {Array} arr - Input array with possible duplicates
 * @returns {Array} - Array with duplicates removed
 */
function removeDuplicatesUsingReduce(arr) {
    if (!Array.isArray(arr)) {
        throw new Error('Input must be an array');
    }
    return arr.reduce((unique, item) => {
        return unique.includes(item) ? unique : [...unique, item];
    }, []);
}

// Example usage and test cases
function runTests() {
    // Test case 1: Simple array of numbers
    const numbers = [1, 2, 2, 3, 4, 4, 5];
    console.log('Original numbers:', numbers);
    console.log('Using Set:', removeDuplicatesUsingSet(numbers));
    console.log('Using Filter:', removeDuplicatesUsingFilter(numbers));
    console.log('Using Reduce:', removeDuplicatesUsingReduce(numbers));

    // Test case 2: Array of strings
    const strings = ['apple', 'banana', 'apple', 'cherry', 'banana'];
    console.log('\nOriginal strings:', strings);
    console.log('Using Set:', removeDuplicatesUsingSet(strings));

    // Test case 3: Array of objects
    const objects = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
        { id: 1, name: 'John' },
        { id: 3, name: 'Bob' }
    ];
    console.log('\nOriginal objects:', objects);
    console.log('Using key "id":', removeDuplicatesByKey(objects, 'id'));

    // Test case 4: Mixed data types
    const mixed = [1, '1', true, true, 1, '1', false];
    console.log('\nOriginal mixed:', mixed);
    console.log('Using Set:', removeDuplicatesUsingSet(mixed));
}

// Error handling demonstration
function demonstrateErrorHandling() {
    try {
        removeDuplicatesUsingSet(null);
    } catch (error) {
        console.error('\nError handling demonstration:', error.message);
    }
}

// Export functions for external use
module.exports = {
    removeDuplicatesUsingSet,
    removeDuplicatesUsingFilter,
    removeDuplicatesByKey,
    removeDuplicatesUsingReduce
};

// Run demonstrations if not being imported as a module
if (require.main === module) {
    console.log('Running duplicate removal demonstrations:');
    runTests();
    demonstrateErrorHandling();
}