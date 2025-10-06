/**
 * 767. Reorganize String
 * Medium
 *
 * Reorganize String - LeetCode 767 Given a string s, rearrange the characters of s so that any two adjacent characters are not the same. Return any possible rearrangement of s or return "" if not possible. @param {string} s @return {string}
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Reorganize String is to understand the core problem pattern
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
 * Reorganize String - LeetCode 767
 * 
 * Given a string s, rearrange the characters of s so that any two adjacent characters are not the same.
 * Return any possible rearrangement of s or return "" if not possible.
 * 
 * @param {string} s
 * @return {string}
 */
function reorganizeString(s) {
    // Edge case: empty string or single character
    if (!s || s.length <= 1) return s;

    // Create frequency map of characters
    const charFreq = new Map();
    for (const char of s) {
        charFreq.set(char, (charFreq.get(char) || 0) + 1);
    }

    // Create max heap (priority queue) based on character frequency
    const maxHeap = [...charFreq.entries()].sort((a, b) => b[1] - a[1]);

    // If the most frequent character appears more than (n+1)/2 times,
    // it's impossible to reorganize
    if (maxHeap[0][1] > Math.floor((s.length + 1) / 2)) {
        return "";
    }

    // Build the result string by alternating characters
    const result = new Array(s.length);
    let index = 0;

    // Fill even indices
    for (let i = 0; i < maxHeap.length && maxHeap[i][1] > 0; i++) {
        while (maxHeap[i][1] > 0 && index < s.length) {
            result[index] = maxHeap[i][0];
            maxHeap[i][1]--;
            index += 2;
        }
    }

    // Reset index for odd indices
    index = 1;

    // Fill odd indices
    for (let i = 0; i < maxHeap.length && maxHeap[i][1] > 0; i++) {
        while (maxHeap[i][1] > 0 && index < s.length) {
            result[index] = maxHeap[i][0];
            maxHeap[i][1]--;
            index += 2;
        }
    }

    return result.join('');
}

/**
 * Test cases
 */
function runTests() {
    const testCases = [
        "aab",          // Expected: "aba"
        "aaab",         // Expected: ""
        "vvvlo",        // Expected: "vlvov"
        "a",            // Expected: "a"
        "aabbcc",       // Expected: "abcabc"
        ""             // Expected: ""
    ];

    console.log("Running test cases:");
    testCases.forEach((test, index) => {
        console.log(`Test ${index + 1}:`);
        console.log(`Input: "${test}"`);
        console.log(`Output: "${reorganizeString(test)}"`);
        console.log("---");
    });
}

// Run tests if this file is executed directly
if (require.main === module) {
    runTests();
}

// Export the function for use in other modules
module.exports = reorganizeString;