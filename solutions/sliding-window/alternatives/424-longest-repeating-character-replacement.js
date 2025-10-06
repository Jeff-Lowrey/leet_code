/**
 * 424. Longest Repeating Character Replacement
 * Medium
 *
 * Longest Repeating Character Replacement This implementation finds the length of the longest substring containing the same letter after performing at most k character replacements. Time Complexity: O(n) where n is the length of the string Space Complexity: O(1) since we use a fixed size array for character count
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Longest Repeating Character Replacement is to understand the core problem pattern
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
 * Longest Repeating Character Replacement
 * 
 * This implementation finds the length of the longest substring containing the same letter 
 * after performing at most k character replacements.
 * 
 * Time Complexity: O(n) where n is the length of the string
 * Space Complexity: O(1) since we use a fixed size array for character count
 */

/**
 * @param {string} s - Input string
 * @param {number} k - Maximum number of character replacements allowed
 * @return {number} - Length of the longest substring after at most k replacements
 */
function characterReplacement(s, k) {
    // Edge cases
    if (!s || s.length === 0) return 0;
    if (k >= s.length) return s.length;

    // Initialize character frequency map
    const charCount = new Array(26).fill(0);
    
    let maxLength = 0;        // Track the maximum length found
    let maxCount = 0;         // Track the count of most frequent character
    let start = 0;           // Start of sliding window
    
    // Iterate through the string using sliding window
    for (let end = 0; end < s.length; end++) {
        // Convert character to index (0-25) and increment count
        const currentChar = s[end].charCodeAt(0) - 'A'.charCodeAt(0);
        charCount[currentChar]++;
        
        // Update the count of most frequent character
        maxCount = Math.max(maxCount, charCount[currentChar]);
        
        // Calculate current window length and required replacements
        const windowLength = end - start + 1;
        const replacementsNeeded = windowLength - maxCount;
        
        // If we need more replacements than allowed, shrink window
        if (replacementsNeeded > k) {
            // Remove the character at start from count
            const startChar = s[start].charCodeAt(0) - 'A'.charCodeAt(0);
            charCount[startChar]--;
            start++;
        }
        
        // Update maxLength with current window size
        maxLength = Math.max(maxLength, end - start + 1);
    }
    
    return maxLength;
}

// Export the function for testing/usage
module.exports = characterReplacement;

// Test cases
const testCases = [
    { input: ["ABAB", 2], expected: 4 },
    { input: ["AABABBA", 1], expected: 4 },
    { input: ["AAAA", 2], expected: 4 },
    { input: ["", 2], expected: 0 },
    { input: ["ABC", 5], expected: 3 }
];

// Run test cases
console.log("Running test cases:");
testCases.forEach((test, index) => {
    const result = characterReplacement(...test.input);
    console.log(`Test ${index + 1}:`);
    console.log(`Input: "${test.input[0]}", k=${test.input[1]}`);
    console.log(`Expected: ${test.expected}`);
    console.log(`Result: ${result}`);
    console.log(`Status: ${result === test.expected ? 'PASSED' : 'FAILED'}`);
    console.log('---');
});