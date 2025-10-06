/**
 * 3. Longest Substring Without Repeating Characters
 * Medium
 *
 * Longest Substring Without Repeating Characters Time Complexity: O(n) where n is the length of the string Space Complexity: O(min(m,n)) where m is the size of the character set
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Longest Substring Without Repeating Characters is to understand the core problem pattern
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
 * Longest Substring Without Repeating Characters
 * Time Complexity: O(n) where n is the length of the string
 * Space Complexity: O(min(m,n)) where m is the size of the character set
 */

/**
 * @param {string} s
 * @return {number}
 */
const lengthOfLongestSubstring = function(s) {
    // Handle edge cases
    if (!s) return 0;
    if (s.length === 1) return 1;

    // Initialize variables
    let maxLength = 0;
    let start = 0;
    let charMap = new Map();

    // Iterate through the string using sliding window technique
    for (let end = 0; end < s.length; end++) {
        const currentChar = s[end];

        // If we've seen this character before and it's in our current window
        if (charMap.has(currentChar) && charMap.get(currentChar) >= start) {
            // Move start pointer to position after the last occurrence
            start = charMap.get(currentChar) + 1;
        }

        // Update the character's position in our map
        charMap.set(currentChar, end);

        // Update maxLength if current window is larger
        maxLength = Math.max(maxLength, end - start + 1);
    }

    return maxLength;
};

// Test cases
const testCases = [
    "abcabcbb",    // Expected: 3 ("abc")
    "bbbbb",       // Expected: 1 ("b")
    "pwwkew",      // Expected: 3 ("wke")
    "",            // Expected: 0
    " ",           // Expected: 1
    "au",          // Expected: 2
    "dvdf"         // Expected: 3 ("vdf")
];

// Run test cases
console.log("Testing Longest Substring Without Repeating Characters:");
testCases.forEach((test, index) => {
    console.log(`Test ${index + 1}:`);
    console.log(`Input: "${test}"`);
    console.log(`Output: ${lengthOfLongestSubstring(test)}`);
    console.log("---");
});

// Export the function for potential use in other modules
module.exports = {
    lengthOfLongestSubstring
};