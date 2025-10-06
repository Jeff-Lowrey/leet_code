/**
 * 76. Minimum Window Substring
 * Medium
 *
 * Minimum Window Substring Implementation Time Complexity: O(n), where n is the length of string s Space Complexity: O(k), where k is the size of character set
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Minimum Window Substring is to understand the core problem pattern
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
 * Minimum Window Substring Implementation
 * Time Complexity: O(n), where n is the length of string s
 * Space Complexity: O(k), where k is the size of character set
 */

/**
 * @param {string} s - The source string
 * @param {string} t - The target string
 * @return {string} - The minimum window substring containing all characters from t
 */
function minWindow(s, t) {
    // Handle edge cases
    if (!s || !t || s.length < t.length) return "";
    
    // Initialize frequency maps
    const targetMap = new Map();
    const windowMap = new Map();
    
    // Build frequency map for target string
    for (const char of t) {
        targetMap.set(char, (targetMap.get(char) || 0) + 1);
    }
    
    let required = targetMap.size;  // Number of unique characters needed
    let formed = 0;  // Number of unique characters matched
    
    // Initialize window pointers and result tracking
    let left = 0;
    let right = 0;
    let minLen = Infinity;
    let minWindow = [-1, -1];  // [start, end] indices of minimum window
    
    while (right < s.length) {
        // Add character from right pointer
        const char = s[right];
        windowMap.set(char, (windowMap.get(char) || 0) + 1);
        
        // Check if we've matched a required character count
        if (targetMap.has(char) && windowMap.get(char) === targetMap.get(char)) {
            formed++;
        }
        
        // Try to minimize window by moving left pointer
        while (left <= right && formed === required) {
            // Update minimum window if current is smaller
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minWindow = [left, right];
            }
            
            // Remove character from left pointer
            const leftChar = s[left];
            windowMap.set(leftChar, windowMap.get(leftChar) - 1);
            
            // Check if we've broken a required character count
            if (targetMap.has(leftChar) && 
                windowMap.get(leftChar) < targetMap.get(leftChar)) {
                formed--;
            }
            
            left++;
        }
        
        right++;
    }
    
    // Return result
    return minLen === Infinity ? "" : s.slice(minWindow[0], minWindow[1] + 1);
}

// Test cases
function runTests() {
    const testCases = [
        { s: "ADOBECODEBANC", t: "ABC", expected: "BANC" },
        { s: "a", t: "a", expected: "a" },
        { s: "a", t: "aa", expected: "" },
        { s: "", t: "", expected: "" },
        { s: "ADOBECODEBANC", t: "", expected: "" }
    ];
    
    for (let i = 0; i < testCases.length; i++) {
        const { s, t, expected } = testCases[i];
        const result = minWindow(s, t);
        console.log(`Test ${i + 1}:`);
        console.log(`Input: s = "${s}", t = "${t}"`);
        console.log(`Expected: "${expected}"`);
        console.log(`Result: "${result}"`);
        console.log(`Status: ${result === expected ? 'PASSED' : 'FAILED'}\n`);
    }
}

// Export the function for use in other modules
module.exports = minWindow;

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}