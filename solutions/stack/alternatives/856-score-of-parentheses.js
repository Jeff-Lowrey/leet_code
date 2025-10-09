/**

 *
 * This problem demonstrates key concepts in Stack.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Calculate parentheses score where "()" = 1 and "(A)" = 2*score(A), and
 * adjacent groups AB = score(A) + score(B). Use a stack to track scores at
 * each nesting level.
 *
 * APPROACH:


 *    - '(': Push 0 to start new nesting level
 *    - ')': Pop current level score:
 *      - If 0 (empty pair): score = 1
 *      - Otherwise: score = 2 * current
 *      - Add to new top of stack

 *
 * WHY THIS WORKS:
 * - Stack tracks scores at different nesting depths
 * - Empty pair "()" creates score of 1
 * - Nested pair doubles the inner score
 * - Adjacent pairs add their scores (handled by accumulating on stack top)
 *
 * TIME COMPLEXITY: O(n) - single pass through string
 * SPACE COMPLEXITY: O(n) - stack depth equals max nesting
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * Input: "(()(()))"
 * Step 1: '(' → stack: [0]
 * Step 2: '(' → stack: [0,0]
 * Step 3: ')' → pop 0 → score=1 → add to top → stack: [0,1]
 * Step 4: '(' → stack: [0,1,0]
 * Step 5: '(' → stack: [0,1,0,0]
 * Step 6: ')' → pop 0 → score=1 → add to top → stack: [0,1,0,1]
 * Step 7: ')' → pop 1 → score=2*1=2 → add to top → stack: [0,1,2]
 * Step 8: ')' → pop 3 → score=2*3=6 → add to top → stack: [0,6]
 * Output: 6
 * ```
 *
 * EDGE CASES:
 * - Single pair "()": returns 1
 * - Nested pairs: correctly doubles
 * - Adjacent pairs: correctly adds
 */

/**
 * Main solution for Problem 856: Score Of Parentheses
 *
 * @param {string} s - Balanced parentheses string
 * @return {number} - Calculated score
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function solve(s) {
    const stack = [0]; // Initialize with 0 for the base level

    for (const char of s) {
        if (char === '(') {
            // Start a new nesting level
            stack.push(0);
        } else {
            // Close current level
            const current = stack.pop();
            const score = current === 0 ? 1 : 2 * current;

            // Add score to the new top (parent level)
            stack[stack.length - 1] += score;
        }
    }

    return stack[0];
}

/**
 * Test cases for Problem 856: Score Of Parentheses
 */
function testSolution() {
    console.log('Testing 856. Score Of Parentheses');

    // Test case 1: Single pair
    const result1 = solve("()");
    const expected1 = 1;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Nested pair
    const result2 = solve("(())");
    const expected2 = 2;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Adjacent pairs
    const result3 = solve("()()");
    const expected3 = 2;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Complex nesting
    const result4 = solve("(()(()))");
    const expected4 = 6;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    console.log('All test cases passed for 856. Score Of Parentheses!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 856. Score Of Parentheses ===');
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
