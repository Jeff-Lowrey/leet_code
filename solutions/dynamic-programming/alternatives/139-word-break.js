/**
 * 139. Word Break
 * Medium
 *
 * Word Break - Dynamic Programming Solution LeetCode 139: https://leetcode.com/problems/word-break/ Problem: Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words. @param {string} s - The input string to be segmented @param {string[]} wordDict - Array of dictionary words @return {boolean} - Returns true if the string can be segmented using dictionary words
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Word Break is to understand the core problem pattern
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
 * Word Break - Dynamic Programming Solution
 * LeetCode 139: https://leetcode.com/problems/word-break/
 * 
 * Problem: Given a string s and a dictionary of strings wordDict, 
 * return true if s can be segmented into a space-separated sequence of one or more dictionary words.
 * 
 * @param {string} s - The input string to be segmented
 * @param {string[]} wordDict - Array of dictionary words
 * @return {boolean} - Returns true if the string can be segmented using dictionary words
 */

const wordBreak = function(s, wordDict) {
    // Edge cases
    if (!s || !wordDict || wordDict.length === 0) {
        return false;
    }

    // Convert wordDict array to Set for O(1) lookup
    const dictionary = new Set(wordDict);
    
    // Create DP array: dp[i] represents whether s.substring(0,i) can be segmented
    const dp = new Array(s.length + 1).fill(false);
    
    // Empty string is always valid
    dp[0] = true;
    
    // Iterate through all possible lengths of the string
    for (let i = 1; i <= s.length; i++) {
        // For each length i, check all possible splits from j to i
        for (let j = 0; j < i; j++) {
            // If previous part is valid (dp[j] is true) and
            // current substring exists in dictionary
            if (dp[j] && dictionary.has(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }
    
    // Return whether the entire string can be segmented
    return dp[s.length];
};

/**
 * Helper function to test the implementation
 * @param {string} s - Input string
 * @param {string[]} wordDict - Dictionary of words
 */
function testWordBreak(s, wordDict) {
    console.log(`Testing string: "${s}"`);
    console.log(`Dictionary: [${wordDict.join(', ')}]`);
    const result = wordBreak(s, wordDict);
    console.log(`Result: ${result}\n`);
}

// Test cases
function runTests() {
    // Test Case 1
    testWordBreak("leetcode", ["leet", "code"]);
    
    // Test Case 2
    testWordBreak("applepenapple", ["apple", "pen"]);
    
    // Test Case 3
    testWordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"]);
    
    // Test Case 4 - Edge case: empty string
    testWordBreak("", ["test"]);
    
    // Test Case 5 - Edge case: single character
    testWordBreak("a", ["a"]);
}

// Run the tests
runTests();

// Export the function for potential module usage
module.exports = wordBreak;