/**
 * 389. Find
 * Medium
 *
 * Find Difference - JavaScript Implementation This implementation solves the problem of finding the additional character in string t compared to string s, where t is formed by shuffling string s and adding one more letter at a random position. Time Complexity: O(n) where n is the length of the input strings Space Complexity: O(1) as we use fixed size arrays
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Find is to understand the core problem pattern
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
 * Find Difference - JavaScript Implementation
 * 
 * This implementation solves the problem of finding the additional character
 * in string t compared to string s, where t is formed by shuffling string s
 * and adding one more letter at a random position.
 * 
 * Time Complexity: O(n) where n is the length of the input strings
 * Space Complexity: O(1) as we use fixed size arrays
 */

/**
 * @param {string} s - First string
 * @param {string} t - Second string with one additional character
 * @return {character} - Returns the additional character in string t
 */
const findTheDifference = function(s, t) {
    // Edge cases
    if (!s) return t;
    if (!t) return '';
    
    // Initialize character count array (26 lowercase letters)
    const charCount = new Array(26).fill(0);
    
    // Count characters in string s (subtract)
    for (let i = 0; i < s.length; i++) {
        charCount[s.charCodeAt(i) - 97]--;
    }
    
    // Count characters in string t (add)
    for (let i = 0; i < t.length; i++) {
        charCount[t.charCodeAt(i) - 97]++;
    }
    
    // Find the extra character (will have count of 1)
    for (let i = 0; i < 26; i++) {
        if (charCount[i] === 1) {
            return String.fromCharCode(i + 97);
        }
    }
    
    return '';
};

/**
 * Alternative solution using XOR operation
 * This solution is more space-efficient
 * 
 * @param {string} s - First string
 * @param {string} t - Second string with one additional character
 * @return {character} - Returns the additional character in string t
 */
const findTheDifferenceXOR = function(s, t) {
    let result = 0;
    
    // XOR all characters in string s
    for (let char of s) {
        result ^= char.charCodeAt(0);
    }
    
    // XOR all characters in string t
    for (let char of t) {
        result ^= char.charCodeAt(0);
    }
    
    // Convert the remaining value back to character
    return String.fromCharCode(result);
};

// Test cases
function runTests() {
    const testCases = [
        { s: "abcd", t: "abcde", expected: "e" },
        { s: "", t: "y", expected: "y" },
        { s: "ae", t: "aea", expected: "a" }
    ];
    
    console.log("Running tests...");
    testCases.forEach((test, index) => {
        const result1 = findTheDifference(test.s, test.t);
        const result2 = findTheDifferenceXOR(test.s, test.t);
        
        console.log(`Test ${index + 1}:`);
        console.log(`Input: s = "${test.s}", t = "${test.t}"`);
        console.log(`Expected: "${test.expected}"`);
        console.log(`Result (Count method): "${result1}"`);
        console.log(`Result (XOR method): "${result2}"`);
        console.log(`Status: ${result1 === test.expected ? 'PASSED' : 'FAILED'}\n`);
    });
}

// Run tests if not in production
if (process.env.NODE_ENV !== 'production') {
    runTests();
}

// Export functions for external use
module.exports = {
    findTheDifference,
    findTheDifferenceXOR
};