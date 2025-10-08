/**
 * 438. Find All Anagrams In A String
 * Medium
 *
 * This problem demonstrates key concepts in Sliding Window.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Find all starting indices where a permutation (anagram) of p exists in s.
 * Use a fixed-size sliding window with character frequency comparison.
 *
 * APPROACH:
 * 1. **Analyze the problem**: Find all anagrams of p in s
 * 2. **Choose the right technique**: Fixed-size sliding window with frequency matching
 * 3. **Implement efficiently**: Use frequency maps and match count
 * 4. **Handle edge cases**: p longer than s, no matches, entire s is anagram
 *
 * WHY THIS WORKS:
 * - Anagrams have same character frequencies
 * - Use fixed window of size p.length
 * - Track how many unique characters have matching frequencies
 * - When all characters match, we found an anagram
 * - Slide window one position at a time
 *
 * TIME COMPLEXITY: O(n) where n is length of s
 * SPACE COMPLEXITY: O(1) - at most 26 lowercase letters
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * Input: s = "cbaebabacd", p = "abc"
 * Step 1: Build frequency map for p: {a:1, b:1, c:1}
 * Step 2: Window "cba" -> frequencies match -> index 0
 * Step 3: Slide to "bae" -> no match
 * Step 4: Continue sliding
 * Step 5: Window "bac" -> frequencies match -> index 6
 * Output: [0, 6]
 * ```
 *
 * EDGE CASES:
 * - p longer than s: return []
 * - Empty s or p: return []
 * - s equals p: return [0]
 * - No anagrams found: return []
 */

/**
 * Main solution for Problem 438: Find All Anagrams In A String
 *
 * @param {string} s - Source string to search in
 * @param {string} p - Pattern string whose anagrams to find
 * @return {number[]} - Array of starting indices where anagrams are found
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(s, p) {
    if (!s || !p || s.length < p.length) return [];

    const result = [];
    const pCount = new Map();
    const windowCount = new Map();

    // Build frequency map for p
    for (const char of p) {
        pCount.set(char, (pCount.get(char) || 0) + 1);
    }

    let matches = 0;
    const required = pCount.size;

    // Initialize first window
    for (let i = 0; i < p.length; i++) {
        const char = s[i];
        windowCount.set(char, (windowCount.get(char) || 0) + 1);

        // Check if this character's frequency matches
        if (pCount.has(char) && windowCount.get(char) === pCount.get(char)) {
            matches++;
        }
    }

    // Check if first window is an anagram
    if (matches === required) {
        result.push(0);
    }

    // Slide the window
    for (let i = p.length; i < s.length; i++) {
        // Add new character (right side)
        const newChar = s[i];
        windowCount.set(newChar, (windowCount.get(newChar) || 0) + 1);

        if (pCount.has(newChar)) {
            if (windowCount.get(newChar) === pCount.get(newChar)) {
                matches++;
            } else if (windowCount.get(newChar) === pCount.get(newChar) + 1) {
                matches--;
            }
        }

        // Remove old character (left side)
        const oldChar = s[i - p.length];
        if (pCount.has(oldChar)) {
            if (windowCount.get(oldChar) === pCount.get(oldChar)) {
                matches--;
            } else if (windowCount.get(oldChar) === pCount.get(oldChar) + 1) {
                matches++;
            }
        }

        windowCount.set(oldChar, windowCount.get(oldChar) - 1);
        if (windowCount.get(oldChar) === 0) {
            windowCount.delete(oldChar);
        }

        // Check if current window is an anagram
        if (matches === required) {
            result.push(i - p.length + 1);
        }
    }

    return result;
}

/**
 * Test cases for Problem 438: Find All Anagrams In A String
 */
function testSolution() {
    console.log('Testing 438. Find All Anagrams In A String');

    // Helper function to compare arrays
    const arraysEqual = (a, b) => a.length === b.length && a.every((val, idx) => val === b[idx]);

    // Test case 1: Basic example
    const result1 = solve("cbaebabacd", "abc");
    const expected1 = [0, 6];
    console.assert(arraysEqual(result1, expected1), `Test 1 failed: expected [${expected1}], got [${result1}]`);
    console.log(`Test 1 passed: s="cbaebabacd", p="abc" -> [${result1}]`);

    // Test case 2: Multiple consecutive anagrams
    const result2 = solve("abab", "ab");
    const expected2 = [0, 1, 2];
    console.assert(arraysEqual(result2, expected2), `Test 2 failed: expected [${expected2}], got [${result2}]`);
    console.log(`Test 2 passed: s="abab", p="ab" -> [${result2}]`);

    // Test case 3: No anagrams found
    const result3 = solve("abcdef", "xyz");
    const expected3 = [];
    console.assert(arraysEqual(result3, expected3), `Test 3 failed: expected [${expected3}], got [${result3}]`);
    console.log(`Test 3 passed: s="abcdef", p="xyz" -> [${result3}]`);

    // Test case 4: Entire string is anagram
    const result4 = solve("abc", "abc");
    const expected4 = [0];
    console.assert(arraysEqual(result4, expected4), `Test 4 failed: expected [${expected4}], got [${result4}]`);
    console.log(`Test 4 passed: s="abc", p="abc" -> [${result4}]`);

    // Test case 5: Pattern longer than source
    const result5 = solve("ab", "abc");
    const expected5 = [];
    console.assert(arraysEqual(result5, expected5), `Test 5 failed: expected [${expected5}], got [${result5}]`);
    console.log(`Test 5 passed: s="ab", p="abc" -> [${result5}]`);

    // Test case 6: Single character pattern
    const result6 = solve("aaaa", "a");
    const expected6 = [0, 1, 2, 3];
    console.assert(arraysEqual(result6, expected6), `Test 6 failed: expected [${expected6}], got [${result6}]`);
    console.log(`Test 6 passed: s="aaaa", p="a" -> [${result6}]`);

    // Test case 7: Pattern with duplicates
    const result7 = solve("baa", "aa");
    const expected7 = [1];
    console.assert(arraysEqual(result7, expected7), `Test 7 failed: expected [${expected7}], got [${result7}]`);
    console.log(`Test 7 passed: s="baa", p="aa" -> [${result7}]`);

    console.log('All test cases passed for 438. Find All Anagrams In A String!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 438. Find All Anagrams In A String ===');
    console.log('Category: Sliding Window');
    console.log('Difficulty: Medium');
    console.log('');

    testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
    demonstrateSolution();
}

// Export for use in other modules
module.exports = {
    solve,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This solution focuses on sliding window concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 * - Fixed-size window with frequency matching is a powerful pattern
 */
