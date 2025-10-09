/**

 *
 * This problem demonstrates key concepts in Sliding Window.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Check if any permutation of s1 exists as a substring in s2.
 * Use a fixed-size sliding window with character frequency matching.
 *
 * APPROACH:




 *
 * WHY THIS WORKS:
 * - Permutations have the same character frequencies
 * - Use a fixed window of size s1.length in s2
 * - Track how many characters have matching frequencies
 * - If all match, we found a permutation
 * - Slide window through s2
 *
 * TIME COMPLEXITY: O(n) where n is length of s2
 * SPACE COMPLEXITY: O(1) - at most 26 lowercase letters
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * Input: s1 = "ab", s2 = "eidbaooo"
 * Step 1: Build frequency for s1: {a:1, b:1}
 * Step 2: Window "ei" -> no match
 * Step 3: Window "id" -> no match
 * Step 4: Window "db" -> no match
 * Step 5: Window "ba" -> frequencies match! -> return true
 * Output: true
 * ```
 *
 * EDGE CASES:
 * - s1 longer than s2: return false
 * - Empty strings: return false
 * - s1 equals s2: return true
 * - No permutation found: return false
 */

/**
 * Main solution for Problem 567: Permutation In String
 *
 * @param {string} s1 - Pattern string
 * @param {string} s2 - Source string to search in
 * @return {boolean} - True if any permutation of s1 exists in s2
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(s1, s2) {
    if (!s1 || !s2 || s1.length > s2.length) return false;

    const s1Count = new Map();
    const windowCount = new Map();

    // Build frequency map for s1
    for (const char of s1) {
        s1Count.set(char, (s1Count.get(char) || 0) + 1);
    }

    let matches = 0;
    const required = s1Count.size;

    // Initialize first window
    for (let i = 0; i < s1.length; i++) {
        const char = s2[i];
        windowCount.set(char, (windowCount.get(char) || 0) + 1);

        if (s1Count.has(char) && windowCount.get(char) === s1Count.get(char)) {
            matches++;
        }
    }

    // Check if first window matches
    if (matches === required) return true;

    // Slide the window
    for (let i = s1.length; i < s2.length; i++) {
        // Add new character (right side)
        const newChar = s2[i];
        windowCount.set(newChar, (windowCount.get(newChar) || 0) + 1);

        if (s1Count.has(newChar)) {
            if (windowCount.get(newChar) === s1Count.get(newChar)) {
                matches++;
            } else if (windowCount.get(newChar) === s1Count.get(newChar) + 1) {
                matches--;
            }
        }

        // Remove old character (left side)
        const oldChar = s2[i - s1.length];
        if (s1Count.has(oldChar)) {
            if (windowCount.get(oldChar) === s1Count.get(oldChar)) {
                matches--;
            } else if (windowCount.get(oldChar) === s1Count.get(oldChar) + 1) {
                matches++;
            }
        }

        windowCount.set(oldChar, windowCount.get(oldChar) - 1);
        if (windowCount.get(oldChar) === 0) {
            windowCount.delete(oldChar);
        }

        // Check if current window is a permutation
        if (matches === required) return true;
    }

    return false;
}

/**
 * Test cases for Problem 567: Permutation In String
 */
function testSolution() {
    console.log('Testing 567. Permutation In String');

    // Test case 1: Basic example - permutation exists
    const result1 = solve("ab", "eidbaooo");
    const expected1 = true;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);
    console.log(`Test 1 passed: s1="ab", s2="eidbaooo" -> ${result1}`);

    // Test case 2: No permutation exists
    const result2 = solve("ab", "eidboaoo");
    const expected2 = false;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);
    console.log(`Test 2 passed: s1="ab", s2="eidboaoo" -> ${result2}`);

    // Test case 3: Identical strings
    const result3 = solve("abc", "abc");
    const expected3 = true;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);
    console.log(`Test 3 passed: s1="abc", s2="abc" -> ${result3}`);

    // Test case 4: s1 longer than s2
    const result4 = solve("abcd", "abc");
    const expected4 = false;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);
    console.log(`Test 4 passed: s1="abcd", s2="abc" -> ${result4}`);

    // Test case 5: Single character match
    const result5 = solve("a", "a");
    const expected5 = true;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);
    console.log(`Test 5 passed: s1="a", s2="a" -> ${result5}`);

    // Test case 6: Permutation at the end
    const result6 = solve("ab", "cccba");
    const expected6 = true;
    console.assert(result6 === expected6, `Test 6 failed: expected ${expected6}, got ${result6}`);
    console.log(`Test 6 passed: s1="ab", s2="cccba" -> ${result6}`);

    // Test case 7: Pattern with duplicates
    const result7 = solve("aab", "baa");
    const expected7 = true;
    console.assert(result7 === expected7, `Test 7 failed: expected ${expected7}, got ${result7}`);
    console.log(`Test 7 passed: s1="aab", s2="baa" -> ${result7}`);

    // Test case 8: No match with similar characters
    const result8 = solve("aab", "abb");
    const expected8 = false;
    console.assert(result8 === expected8, `Test 8 failed: expected ${expected8}, got ${result8}`);
    console.log(`Test 8 passed: s1="aab", s2="abb" -> ${result8}`);

    console.log('All test cases passed for 567. Permutation In String!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 567. Permutation In String ===');
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
 * - Very similar to problem 438, but returns boolean instead of indices
 */
