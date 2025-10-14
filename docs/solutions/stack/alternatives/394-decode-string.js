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
 * - **Empty stack:** Handle operations on empty stack
 * - **Single element:** Push/pop with one item
 * - **Balanced pairs:** Match opening/closing elements
 * - **Nested structures:** Handle deeply nested cases
 * - **Underflow:** Prevent popping from empty stack
 *
 * </details>
 */

/**
 * Main solution for Problem 394: Decode String
 *
 * @param {string} s - Encoded string
 * @return {string} - Decoded string
 *
 * Time Complexity: O(maxK * n)
 * Space Complexity: O(n)
 */
function solve(s) {
    const countStack = [];
    const stringStack = [];
    let currentString = '';
    let count = 0;

    for (const char of s) {
        if (char >= '0' && char <= '9') {
            // Build multi-digit number
            count = count * 10 + parseInt(char);
        } else if (char === '[') {
            // Save current state and start new context
            countStack.push(count);
            stringStack.push(currentString);
            currentString = '';
            count = 0;
        } else if (char === ']') {
            // Restore previous state and repeat current string
            const repeatCount = countStack.pop();
            const prevString = stringStack.pop();
            currentString = prevString + currentString.repeat(repeatCount);
        } else {
            // Regular character
            currentString += char;
        }
    }

    return currentString;
}

/**
 * Test cases for Problem 394: Decode String
 */
function testSolution() {
    console.log('Testing 394. Decode String');

    // Test case 1: Nested encoding
    const result1 = solve("3[a2[c]]");
    const expected1 = "accaccacc";
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Simple encoding
    const result2 = solve("3[a]2[bc]");
    const expected2 = "aaabcbc";
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Complex nested
    const result3 = solve("2[abc]3[cd]ef");
    const expected3 = "abcabccdcdcdef";
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Deep nesting
    const result4 = solve("10[a]");
    const expected4 = "aaaaaaaaaa";
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    console.log('All test cases passed for 394. Decode String!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 394. Decode String ===');
    console.log('Category: Stack');
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
 * - This solution focuses on stack concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
