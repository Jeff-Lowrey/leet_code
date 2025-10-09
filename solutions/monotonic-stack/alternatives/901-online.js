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
 *
 * **Step 1:** [description]
 *
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
 * Stock Span Calculator using Monotonic Stack
 */
class StockSpanner {
    constructor() {
        this.stack = []; // Store [price, span] pairs
    }

    /**
     * Calculate span for next price
     * @param {number} price - Today's stock price
     * @return {number} - Stock span (consecutive days <= price)
     */
    next(price) {
        let span = 1;

        // Pop prices <= current price and accumulate their spans
        while (this.stack.length > 0 && this.stack[this.stack.length - 1][0] <= price) {
            const [prevPrice, prevSpan] = this.stack.pop();
            span += prevSpan;
        }

        // Push current price and its span
        this.stack.push([price, span]);
        return span;
    }
}

/**
 * Helper function for testing - creates StockSpanner and processes sequence
 * @param {number[]} prices - Sequence of prices
 * @return {number[]} - Sequence of spans
 */
function solve(prices) {
    const spanner = new StockSpanner();
    return prices.map(price => spanner.next(price));
}

/**
 * Helper function to compare arrays
 */
function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

/**
 * Test cases for Problem 901: Online Stock Span
 */
function testSolution() {
    console.log('Testing 901. Online Stock Span');

    // Test case 1: Example from problem
    const result1 = solve([100,80,60,70,60,75,85]);
    const expected1 = [1,1,1,2,1,4,6];
    console.assert(arraysEqual(result1, expected1), `Test 1 failed: expected [${expected1}], got [${result1}]`);

    // Test case 2: All increasing
    const result2 = solve([10,20,30,40,50]);
    const expected2 = [1,2,3,4,5];
    console.assert(arraysEqual(result2, expected2), `Test 2 failed: expected [${expected2}], got [${result2}]`);

    // Test case 3: All decreasing
    const result3 = solve([50,40,30,20,10]);
    const expected3 = [1,1,1,1,1];
    console.assert(arraysEqual(result3, expected3), `Test 3 failed: expected [${expected3}], got [${result3}]`);

    // Test case 4: All same price
    const result4 = solve([30,30,30,30]);
    const expected4 = [1,2,3,4];
    console.assert(arraysEqual(result4, expected4), `Test 4 failed: expected [${expected4}], got [${result4}]`);

    // Test case 5: Single price
    const result5 = solve([100]);
    const expected5 = [1];
    console.assert(arraysEqual(result5, expected5), `Test 5 failed: expected [${expected5}], got [${result5}]`);

    // Test case 6: Complex pattern
    const result6 = solve([31,41,48,59,79]);
    const expected6 = [1,2,3,4,5];
    console.assert(arraysEqual(result6, expected6), `Test 6 failed: expected [${expected6}], got [${result6}]`);

    console.log('All test cases passed for 901. Online Stock Span!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 901. Online ===');
    console.log('Category: Monotonic Stack');
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
 * - This solution focuses on monotonic stack concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
