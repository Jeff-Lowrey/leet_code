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
 * Main solution for Problem 541: Reverse String Ii
 *
 * @param {string} s - Input string
 * @param {number} k - Number of characters to reverse in each 2k chunk
 * @return {string} - Modified string
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function solve(s, k) {
    // Convert to array for easier manipulation
    const arr = s.split('');

    // Process in chunks of 2k
    for (let i = 0; i < arr.length; i += 2 * k) {
        // Reverse first k characters (or remaining if less than k)
        let left = i;
        let right = Math.min(i + k - 1, arr.length - 1);

        // Reverse the substring
        while (left < right) {
            [arr[left], arr[right]] = [arr[right], arr[left]];
            left++;
            right--;
        }
    }

    return arr.join('');
}

/**
 * Test cases for Problem 541: Reverse String Ii
 */
function testSolution() {
    console.log('Testing 541. Reverse String Ii');

    // Test case 1: Basic functionality
    const result1 = solve("abcdefg", 2);
    const expected1 = "bacdfeg";
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: k equals string length
    const result2 = solve("abcd", 2);
    const expected2 = "bacd";
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: k = 1
    const result3 = solve("abcdefg", 1);
    const expected3 = "abcdefg";
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: String shorter than k
    const result4 = solve("ab", 4);
    const expected4 = "ba";
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Exact multiple of 2k
    const result5 = solve("abcdefgh", 2);
    const expected5 = "bacdfegh";
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 541. Reverse String Ii!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 541. Reverse String Ii ===');
    console.log('Category: String Manipulation');
    console.log('Difficulty: Easy');
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
 * - This solution focuses on string manipulation concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
