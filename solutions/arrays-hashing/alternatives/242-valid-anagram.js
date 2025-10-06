/**
 * 242. Valid Anagram
 * Medium
 *
 * Valid Anagram - Problem 242 Given two strings s and t, return true if t is an anagram of s, and false otherwise. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once. @param {string} s - First input string @param {string} t - Second input string @return {boolean} - Returns true if strings are anagrams, false otherwise
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Valid Anagram is to understand the core problem pattern
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
 * Valid Anagram - Problem 242
 * 
 * Given two strings s and t, return true if t is an anagram of s, and false otherwise.
 * An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
 * typically using all the original letters exactly once.
 * 
 * @param {string} s - First input string
 * @param {string} t - Second input string
 * @return {boolean} - Returns true if strings are anagrams, false otherwise
 */

/**
 * Solution 1: Using character frequency map
 * Time Complexity: O(n) where n is the length of the input strings
 * Space Complexity: O(k) where k is the size of the character set
 */
const isAnagram = function(s, t) {
    // Early return if lengths are different
    if (s.length !== t.length) return false;
    
    // Create a frequency map
    const charMap = new Map();
    
    // Count characters in first string
    for (let char of s) {
        charMap.set(char, (charMap.get(char) || 0) + 1);
    }
    
    // Decrement counts for second string
    for (let char of t) {
        // If character doesn't exist or count becomes negative, not an anagram
        if (!charMap.has(char)) return false;
        
        const newCount = charMap.get(char) - 1;
        if (newCount < 0) return false;
        
        charMap.set(char, newCount);
    }
    
    // Verify all counts are zero
    for (let count of charMap.values()) {
        if (count !== 0) return false;
    }
    
    return true;
};

/**
 * Solution 2: Using sorting (alternative solution)
 * Time Complexity: O(n log n) due to sorting
 * Space Complexity: O(n) for creating new sorted strings
 */
const isAnagramSort = function(s, t) {
    if (s.length !== t.length) return false;
    return s.split('').sort().join('') === t.split('').sort().join('');
};

// Export the functions for testing
module.exports = {
    isAnagram,
    isAnagramSort
};

// Test cases
function runTests() {
    const testCases = [
        { s: "anagram", t: "nagaram", expected: true },
        { s: "rat", t: "car", expected: false },
        { s: "", t: "", expected: true },
        { s: "ab", t: "a", expected: false },
        { s: "aacc", t: "ccac", expected: false }
    ];

    testCases.forEach((test, index) => {
        const result = isAnagram(test.s, test.t);
        console.log(`Test ${index + 1}:`);
        console.log(`Input: s = "${test.s}", t = "${test.t}"`);
        console.log(`Expected: ${test.expected}, Got: ${result}`);
        console.log(`Status: ${result === test.expected ? 'PASSED' : 'FAILED'}\n`);
    });
}

// Uncomment to run tests
// runTests();