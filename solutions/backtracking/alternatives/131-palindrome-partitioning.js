/**
 * 131. Palindrome Partitioning
 * Medium
 *
 * Palindrome Partition - JavaScript Implementation Problem: Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s. Example: Input: s = "aab" Output: [["a","a","b"],["aa","b"]]
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Palindrome Partitioning is to understand the core problem pattern
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
 * Palindrome Partition - JavaScript Implementation
 * 
 * Problem: Given a string s, partition s such that every substring of the partition 
 * is a palindrome. Return all possible palindrome partitioning of s.
 * 
 * Example:
 * Input: s = "aab"
 * Output: [["a","a","b"],["aa","b"]]
 */

/**
 * @param {string} s
 * @return {string[][]}
 */
const partition = function(s) {
    // Edge case: empty string
    if (!s || s.length === 0) {
        return [];
    }

    const result = [];
    
    /**
     * Helper function to check if a string is palindrome
     * @param {string} str - String to check
     * @param {number} start - Start index
     * @param {number} end - End index
     * @return {boolean}
     */
    const isPalindrome = (str, start, end) => {
        while (start < end) {
            if (str[start] !== str[end]) {
                return false;
            }
            start++;
            end--;
        }
        return true;
    };

    /**
     * Backtracking function to find all palindrome partitions
     * @param {number} start - Start index
     * @param {string[]} current - Current partition
     */
    const backtrack = (start, current) => {
        // Base case: if we've reached the end of the string
        if (start >= s.length) {
            result.push([...current]);
            return;
        }

        // Try all possible substrings starting from 'start'
        for (let end = start; end < s.length; end++) {
            // If current substring is palindrome, add it to current partition
            if (isPalindrome(s, start, end)) {
                current.push(s.substring(start, end + 1));
                backtrack(end + 1, current);
                current.pop(); // backtrack
            }
        }
    };

    backtrack(0, []);
    return result;
};

// Test cases
const testCases = [
    "aab",
    "a",
    "abc",
    "aaaa"
];

// Run test cases
testCases.forEach(test => {
    console.log(`Input: "${test}"`);
    console.log("Output:", partition(test));
    console.log("---");
});

// Export the function for potential module usage
module.exports = {
    partition
};