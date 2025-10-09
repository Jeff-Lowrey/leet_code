/**

 *
 * This problem demonstrates key concepts in Stack.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Decode strings with nested patterns like "3[a2[c]]" → "accaccacc". Use a
 * stack to handle nested brackets. When we hit '[', save current state. When
 * we hit ']', pop state and repeat the enclosed string.
 *
 * APPROACH:


 *    - Digit: build the repeat count
 *    - '[': push count and current string to stacks, reset
 *    - ']': pop count and prev string, repeat current, append to prev
 *    - Letter: append to current string

 *
 * WHY THIS WORKS:
 * - Stacks naturally handle nested structures
 * - Saving state on '[' and restoring on ']' handles nesting
 * - Building strings incrementally avoids complex string manipulation
 *
 * TIME COMPLEXITY: O(maxK * n) where maxK is max repeat count
 * SPACE COMPLEXITY: O(n) - stacks store intermediate states
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * Input: "3[a2[c]]"
 * Step 1: '3' → count=3
 * Step 2: '[' → push(3,[]) → current=""
 * Step 3: 'a' → current="a"
 * Step 4: '2' → count=2
 * Step 5: '[' → push(2,"a") → current=""
 * Step 6: 'c' → current="c"
 * Step 7: ']' → pop(2,"a") → current="a"+"cc"="acc"
 * Step 8: ']' → pop(3,"") → current=""+"accaccacc"="accaccacc"
 * Output: "accaccacc"
 * ```
 *
 * EDGE CASES:
 * - No brackets: return original string
 * - Nested brackets: handled by stack
 * - Multiple digit counts: build number correctly
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
