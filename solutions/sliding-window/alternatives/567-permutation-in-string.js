/**
 * 567. Permutation In String
 * Medium
 *
 * Permutation in String - LeetCode 567 Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise. In other words, return true if one of s1's permutations is the substring of s2. @param {string} s1 - The string to find permutation of @param {string} s2 - The string to search in @return {boolean} - True if s2 contains a permutation of s1
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Permutation In String is to understand the core problem pattern
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
 * Permutation in String - LeetCode 567
 * 
 * Given two strings s1 and s2, return true if s2 contains a permutation of s1,
 * or false otherwise.
 * 
 * In other words, return true if one of s1's permutations is the substring of s2.
 * 
 * @param {string} s1 - The string to find permutation of
 * @param {string} s2 - The string to search in
 * @return {boolean} - True if s2 contains a permutation of s1
 */

const checkInclusion = function(s1, s2) {
    // Edge cases
    if (s1.length > s2.length) return false;
    if (s1.length === 0) return true;

    // Create character frequency maps
    const s1map = new Array(26).fill(0);
    const s2map = new Array(26).fill(0);

    // Fill initial window of size s1.length
    for (let i = 0; i < s1.length; i++) {
        s1map[s1.charCodeAt(i) - 'a'.charCodeAt(0)]++;
        s2map[s2.charCodeAt(i) - 'a'.charCodeAt(0)]++;
    }

    // Check if initial window is a match
    if (arraysEqual(s1map, s2map)) return true;

    // Slide window and check each position
    for (let i = s1.length; i < s2.length; i++) {
        // Add new character to window
        s2map[s2.charCodeAt(i) - 'a'.charCodeAt(0)]++;
        // Remove character from start of window
        s2map[s2.charCodeAt(i - s1.length) - 'a'.charCodeAt(0)]--;

        // Check if current window is a match
        if (arraysEqual(s1map, s2map)) return true;
    }

    return false;
};

/**
 * Helper function to compare two arrays for equality
 * @param {Array} arr1 - First array to compare
 * @param {Array} arr2 - Second array to compare
 * @return {boolean} - True if arrays are equal
 */
function arraysEqual(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

// Example usage and test cases
const testCases = [
    { s1: "ab", s2: "eidbaooo", expected: true },
    { s1: "ab", s2: "eidboaoo", expected: false },
    { s1: "abc", s2: "bbbca", expected: true },
    { s1: "", s2: "anything", expected: true },
    { s1: "hello", s2: "world", expected: false }
];

// Run test cases
testCases.forEach((test, index) => {
    const result = checkInclusion(test.s1, test.s2);
    console.log(`Test Case ${index + 1}:`);
    console.log(`s1: "${test.s1}", s2: "${test.s2}"`);
    console.log(`Expected: ${test.expected}, Got: ${result}`);
    console.log(`Result: ${result === test.expected ? 'PASS' : 'FAIL'}\n`);
});

module.exports = checkInclusion;