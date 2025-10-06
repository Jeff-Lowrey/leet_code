/**
 * 438. Find All Anagrams In A String
 * Medium
 *
 * Find All Anagrams in a String @param {string} s - The source string to search in @param {string} p - The pattern string to find anagrams of @return {number[]} - Array of starting indices of all anagrams
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Find All Anagrams In A String is to understand the core problem pattern
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
 * Find All Anagrams in a String
 * 
 * @param {string} s - The source string to search in
 * @param {string} p - The pattern string to find anagrams of
 * @return {number[]} - Array of starting indices of all anagrams
 */
function findAnagrams(s, p) {
    // Edge cases
    if (!s || !p || s.length < p.length) {
        return [];
    }

    const result = [];
    const pLen = p.length;
    const sLen = s.length;

    // Create frequency maps for pattern and sliding window
    const pMap = new Array(26).fill(0);
    const windowMap = new Array(26).fill(0);

    // Fill pattern frequency map
    for (let i = 0; i < pLen; i++) {
        pMap[p.charCodeAt(i) - 97]++;
    }

    // Initialize first window
    for (let i = 0; i < pLen; i++) {
        windowMap[s.charCodeAt(i) - 97]++;
    }

    // Check first window
    if (arraysEqual(pMap, windowMap)) {
        result.push(0);
    }

    // Slide the window and check for anagrams
    for (let i = pLen; i < sLen; i++) {
        // Remove leftmost character from window
        windowMap[s.charCodeAt(i - pLen) - 97]--;
        // Add new character to window
        windowMap[s.charCodeAt(i) - 97]++;

        // Check if current window is an anagram
        if (arraysEqual(pMap, windowMap)) {
            result.push(i - pLen + 1);
        }
    }

    return result;
}

/**
 * Helper function to compare two arrays for equality
 * 
 * @param {number[]} arr1 - First array to compare
 * @param {number[]} arr2 - Second array to compare
 * @return {boolean} - True if arrays are equal, false otherwise
 */
function arraysEqual(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

// Example usage and test cases
function runTests() {
    console.log("Running test cases...");

    // Test Case 1: Basic example
    console.log("Test 1:", findAnagrams("cbaebabacd", "abc"));
    // Expected output: [0, 6]

    // Test Case 2: Repeated pattern
    console.log("Test 2:", findAnagrams("abab", "ab"));
    // Expected output: [0, 1, 2]

    // Test Case 3: No anagrams
    console.log("Test 3:", findAnagrams("hello", "world"));
    // Expected output: []

    // Test Case 4: Empty strings
    console.log("Test 4:", findAnagrams("", "abc"));
    // Expected output: []

    // Test Case 5: Pattern longer than string
    console.log("Test 5:", findAnagrams("ab", "abc"));
    // Expected output: []
}

// Export the function for use in other modules
module.exports = {
    findAnagrams,
    arraysEqual
};

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}