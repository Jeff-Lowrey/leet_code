/**
 * 1047. Remove All Adjacent Duplicates In String
 * Easy
 *
 * This problem demonstrates key concepts in Stack.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Use a stack to track characters. When we see a character that matches the
 * top of the stack, it means we found adjacent duplicates - pop the stack.
 * Otherwise, push the new character. This handles cascading removals naturally.
 *
 * APPROACH:
 * 1. **Initialize stack**: Use an array to store characters
 * 2. **Iterate through string**: For each character:
 *    - If stack top equals current char: pop (remove duplicate pair)
 *    - Otherwise: push current char
 * 3. **Build result**: Join stack to form final string
 *
 * WHY THIS WORKS:
 * - Stack naturally handles the "most recent" character comparison
 * - Popping handles removal of duplicate pairs
 * - Cascading removals work because we always check the new top after popping
 *
 * TIME COMPLEXITY: O(n) - single pass through string
 * SPACE COMPLEXITY: O(n) - stack stores characters in worst case
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * Input: "abbaca"
 * Step 1: 'a' → stack: ['a']
 * Step 2: 'b' → stack: ['a','b']
 * Step 3: 'b' → matches top, pop → stack: ['a']
 * Step 4: 'a' → matches top, pop → stack: []
 * Step 5: 'c' → stack: ['c']
 * Step 6: 'a' → stack: ['c','a']
 * Output: "ca"
 * ```
 *
 * EDGE CASES:
 * - Empty string: returns ""
 * - All duplicates: returns ""
 * - No duplicates: returns original string
 */

/**
 * Main solution for Problem 1047: Remove All Adjacent Duplicates In String
 *
 * @param {string} s - Input string
 * @return {string} - String after removing all adjacent duplicates
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function solve(s) {
    const stack = [];

    for (const char of s) {
        // If current char matches top of stack, remove the pair
        if (stack.length > 0 && stack[stack.length - 1] === char) {
            stack.pop();
        } else {
            // Otherwise, add current char to stack
            stack.push(char);
        }
    }

    return stack.join('');
}

/**
 * Test cases for Problem 1047: Remove All Adjacent Duplicates In String
 */
function testSolution() {
    console.log('Testing 1047. Remove All Adjacent Duplicates In String');

    // Test case 1: Basic with cascading removals
    const result1 = solve("abbaca");
    const expected1 = "ca";
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: All duplicates removed
    const result2 = solve("azxxzy");
    const expected2 = "ay";
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: No duplicates
    const result3 = solve("abc");
    const expected3 = "abc";
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Empty after all removals
    const result4 = solve("aa");
    const expected4 = "";
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    console.log('All test cases passed for 1047. Remove All Adjacent Duplicates In String!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 1047. Remove All Adjacent Duplicates In String ===');
    console.log('Category: Stack');
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
 * - This solution focuses on stack concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
