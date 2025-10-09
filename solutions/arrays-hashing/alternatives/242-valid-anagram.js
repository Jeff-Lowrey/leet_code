/**
 * Difficulty: Medium
 *
 * [Problem description goes here]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[input description]</dd>
 * <dt>Output:</dt>
 * <dd>[output description]</dd>
 * <dt>Explanation:</dt>
 * <dd>[explanation]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * [High-level insight or key observation]
 *
 * ### APPROACH:
 * [Detailed explanation of the solution approach]
 *
 * ### WHY THIS WORKS:
 * - [Explanation of correctness]
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * [example input]
 * ```
 * **Step 1:** [description]
 * **Step 2:** [description]
 *
 * ### TIME COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### SPACE COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### EDGE CASES:
 * - **[Edge case 1]:** [how it's handled]
 * - **[Edge case 2]:** [how it's handled]
 *
 * </details>
 */

/**
 * Check if two strings are valid anagrams
 *
 * @param {string} s - First string
 * @param {string} t - Second string
 * @return {boolean} - True if strings are anagrams, false otherwise
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1) - at most 26 lowercase letters
 */
function isAnagram(s, t) {
    // Quick length check
    if (s.length !== t.length) {
        return false;
    }

    // Count character frequencies
    const charCount = {};

    // Count characters in first string
    for (let char of s) {
        charCount[char] = (charCount[char] || 0) + 1;
    }

    // Subtract character counts using second string
    for (let char of t) {
        if (!charCount[char]) {
            return false; // Character not in first string or count exhausted
        }
        charCount[char]--;
    }

    return true;
}

/**
 * Alternative solution using sorting
 *
 * @param {string} s - First string
 * @param {string} t - Second string
 * @return {boolean} - True if strings are anagrams, false otherwise
 *
 * Time Complexity: O(n log n) - due to sorting
 * Space Complexity: O(n) - for sorted strings
 */
function isAnagramSort(s, t) {
    if (s.length !== t.length) {
        return false;
    }

    // Sort both strings and compare
    return s.split('').sort().join('') === t.split('').sort().join('');
}

/**
 * Alternative solution using character frequency array (for lowercase letters only)
 *
 * @param {string} s - First string
 * @param {string} t - Second string
 * @return {boolean} - True if strings are anagrams, false otherwise
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1) - fixed size array of 26
 */
function isAnagramArray(s, t) {
    if (s.length !== t.length) {
        return false;
    }

    // Array to count frequency of each letter (a-z)
    const count = new Array(26).fill(0);

    for (let i = 0; i < s.length; i++) {
        count[s.charCodeAt(i) - 'a'.charCodeAt(0)]++; // Increment for s
        count[t.charCodeAt(i) - 'a'.charCodeAt(0)]--; // Decrement for t
    }

    // All counts should be zero for anagrams
    return count.every(c => c === 0);
}

function solve(s, t) {
    return isAnagram(s, t);
}

/**
 * Test cases for Problem 242: Valid Anagram
 */
function testSolution() {
    console.log('Testing 242. Valid Anagram');

    // Test case 1: Basic anagram - "anagram" and "nagaram"
    const result1 = isAnagram("anagram", "nagaram");
    const expected1 = true;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Not anagram - "rat" and "car"
    const result2 = isAnagram("rat", "car");
    const expected2 = false;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Empty strings
    const result3 = isAnagram("", "");
    const expected3 = true;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Different lengths
    const result4 = isAnagram("a", "ab");
    const expected4 = false;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Single character
    const result5 = isAnagram("a", "a");
    const expected5 = true;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    // Test case 6: Test sorting approach
    const result6 = isAnagramSort("listen", "silent");
    const expected6 = true;
    console.assert(result6 === expected6, `Test 6 failed: expected ${expected6}, got ${result6}`);

    // Test case 7: Test array approach (lowercase only)
    const result7 = isAnagramArray("evil", "vile");
    const expected7 = true;
    console.assert(result7 === expected7, `Test 7 failed: expected ${expected7}, got ${result7}`);

    console.log('All test cases passed for 242. Valid Anagram!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 242. Valid Anagram ===');
    console.log('Category: Arrays Hashing');
    console.log('Difficulty: Medium');
    console.log('');

    // Example demonstration would go here
    testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
    demonstrateSolution();
}

// Export for use in other modules
module.exports = {
    isAnagram,
    isAnagramSort,
    isAnagramArray,
    solve,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This solution focuses on arrays hashing concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
