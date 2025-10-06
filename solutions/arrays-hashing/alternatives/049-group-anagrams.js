/**
 * 49. Group Anagrams
 * Medium
 *
 * Group Anagrams - JavaScript Implementation This solution groups strings that are anagrams of each other. An anagram is a word formed by rearranging the letters of another word. Time Complexity: O(n k log k) where n is the number of strings and k is the maximum length of a string Space Complexity: O(n k) to store the grouped anagrams @param {string[]} strs - Array of strings to be grouped @return {string[][]} - Array of grouped anagrams
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Group Anagrams is to understand the core problem pattern
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
 * Group Anagrams - JavaScript Implementation
 * 
 * This solution groups strings that are anagrams of each other.
 * An anagram is a word formed by rearranging the letters of another word.
 * 
 * Time Complexity: O(n * k * log k) where n is the number of strings and k is the maximum length of a string
 * Space Complexity: O(n * k) to store the grouped anagrams
 * 
 * @param {string[]} strs - Array of strings to be grouped
 * @return {string[][]} - Array of grouped anagrams
 */

/**
 * Main function to group anagrams
 * @param {string[]} strs - Input array of strings
 * @return {string[][]} - Grouped anagrams
 */
function groupAnagrams(strs) {
    // Handle edge cases
    if (!strs || strs.length === 0) {
        return [];
    }
    
    if (strs.length === 1) {
        return [strs];
    }

    // Create a Map to store sorted string as key and array of anagrams as value
    const anagramMap = new Map();

    // Process each string in the input array
    for (const str of strs) {
        // Sort the characters of the string to create a key
        const sortedStr = sortString(str);
        
        // If the sorted string exists in map, add current string to its group
        // Otherwise, create a new group
        if (anagramMap.has(sortedStr)) {
            anagramMap.get(sortedStr).push(str);
        } else {
            anagramMap.set(sortedStr, [str]);
        }
    }

    // Convert map values to array and return
    return Array.from(anagramMap.values());
}

/**
 * Helper function to sort characters in a string
 * @param {string} str - Input string
 * @return {string} - Sorted string
 */
function sortString(str) {
    return str.split('').sort().join('');
}

// Example usage and test cases
function runTests() {
    const testCases = [
        {
            input: ["eat", "tea", "tan", "ate", "nat", "bat"],
            expected: [["eat","tea","ate"], ["tan","nat"], ["bat"]]
        },
        {
            input: [""],
            expected: [[""]]
        },
        {
            input: ["a"],
            expected: [["a"]]
        }
    ];

    for (let i = 0; i < testCases.length; i++) {
        const result = groupAnagrams(testCases[i].input);
        console.log(`Test Case ${i + 1}:`);
        console.log('Input:', testCases[i].input);
        console.log('Output:', result);
        console.log('Expected:', testCases[i].expected);
        console.log('---');
    }
}

// Export the function for use in other modules
module.exports = {
    groupAnagrams,
    sortString
};

// Uncomment the following line to run tests
// runTests();