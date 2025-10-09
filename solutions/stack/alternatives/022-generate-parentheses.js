/**

 *
 * This problem demonstrates key concepts in Stack.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Generate all valid combinations of n pairs of parentheses using backtracking.
 * We can only add '(' if we have remaining open parens, and ')' if it won't
 * create an invalid sequence (open count > close count).
 *
 * APPROACH:




 *
 * WHY THIS WORKS:
 * - By tracking open/close counts, we ensure validity at each step
 * - Backtracking explores all valid combinations
 * - Pruning invalid branches early optimizes the search space
 *
 * TIME COMPLEXITY: O(4^n / √n) - Catalan number for valid parentheses combinations
 * SPACE COMPLEXITY: O(n) - recursion stack depth
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * Input: n = 3
 * Step 1: Start with empty string, open=0, close=0
 * Step 2: Try adding '(' → "(", open=1, close=0
 * Step 3: Continue building: "((", "(()", "(())", "((()))", etc.
 * Output: ["((()))","(()())","(())()","()(())","()()()"]
 * ```
 *
 * EDGE CASES:
 * - n = 0: return [""] (empty string is valid)
 * - n = 1: return ["()"]
 * - Large n: exponential growth but pruned by constraints
 */

/**
 * Main solution for Problem 022: Generate Parentheses
 *
 * @param {number} n - Number of pairs of parentheses
 * @return {string[]} - All valid combinations of parentheses
 *
 * Time Complexity: O(4^n / √n)
 * Space Complexity: O(n)
 */
function solve(n) {
    const result = [];

    function backtrack(current, open, close) {
        // Base case: we've used all n pairs
        if (current.length === 2 * n) {
            result.push(current);
            return;
        }

        // Add opening parenthesis if we haven't used all n
        if (open < n) {
            backtrack(current + '(', open + 1, close);
        }

        // Add closing parenthesis if it won't create invalid sequence
        if (close < open) {
            backtrack(current + ')', open, close + 1);
        }
    }

    backtrack('', 0, 0);
    return result;
}

/**
 * Test cases for Problem 022: Generate Parentheses
 */
function testSolution() {
    console.log('Testing 022. Generate Parentheses');

    // Test case 1: n = 3
    const result1 = solve(3);
    const expected1 = ["((()))","(()())","(())()","()(())","()()()"];
    console.assert(
        JSON.stringify(result1.sort()) === JSON.stringify(expected1.sort()),
        `Test 1 failed: expected ${expected1}, got ${result1}`
    );

    // Test case 2: n = 1
    const result2 = solve(1);
    const expected2 = ["()"];
    console.assert(
        JSON.stringify(result2) === JSON.stringify(expected2),
        `Test 2 failed: expected ${expected2}, got ${result2}`
    );

    // Test case 3: n = 2
    const result3 = solve(2);
    const expected3 = ["(())","()()"];
    console.assert(
        JSON.stringify(result3.sort()) === JSON.stringify(expected3.sort()),
        `Test 3 failed: expected ${expected3}, got ${result3}`
    );

    console.log('All test cases passed for 022. Generate Parentheses!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 022. Generate Parentheses ===');
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
