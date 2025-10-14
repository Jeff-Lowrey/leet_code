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
 * - **Empty string:** Handle s.length == 0
 * - **Single character:** Minimal string input
 * - **All same characters:** Check duplicate handling
 * - **Special characters:** Handle non-alphanumeric
 * - **Case sensitivity:** Consider uppercase vs lowercase
 *
 * </details>
 */

/**
 * Main solution for Problem 009: Palindrome Number
 *
 * @param {number} x - Integer to check
 * @return {boolean} - True if x is a palindrome, false otherwise
 *
 * Time Complexity: O(log(x))
 * Space Complexity: O(1)
 */
function solve(x) {
    // Negative numbers and numbers ending in 0 (except 0) are not palindromes
    if (x < 0 || (x % 10 === 0 && x !== 0)) {
        return false;
    }

    // Single digit numbers are palindromes
    if (x < 10) {
        return true;
    }

    let reversedHalf = 0;

    // Reverse the second half of the number
    while (x > reversedHalf) {
        reversedHalf = reversedHalf * 10 + (x % 10);
        x = Math.floor(x / 10);
    }

    // For even length: x === reversedHalf
    // For odd length: x === Math.floor(reversedHalf / 10) (ignore middle digit)
    return x === reversedHalf || x === Math.floor(reversedHalf / 10);
}

/**
 * Test cases for Problem 009: Palindrome Number
 */
function testSolution() {
    console.log('Testing 009. Palindrome Number');

    // Test case 1: Positive palindrome (even length)
    const result1 = solve(1221);
    const expected1 = true;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Positive palindrome (odd length)
    const result2 = solve(12321);
    const expected2 = true;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Not a palindrome
    const result3 = solve(123);
    const expected3 = false;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Negative number
    const result4 = solve(-121);
    const expected4 = false;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Number ending in zero
    const result5 = solve(10);
    const expected5 = false;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    // Test case 6: Single digit
    const result6 = solve(7);
    const expected6 = true;
    console.assert(result6 === expected6, `Test 6 failed: expected ${expected6}, got ${result6}`);

    // Test case 7: Zero
    const result7 = solve(0);
    const expected7 = true;
    console.assert(result7 === expected7, `Test 7 failed: expected ${expected7}, got ${result7}`);

    console.log('All test cases passed for 009. Palindrome Number!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 009. Palindrome ===');
    console.log('Category: Math');
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
    solve,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This solution focuses on math concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
