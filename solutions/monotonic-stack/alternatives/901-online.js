/**

 *
 * This problem demonstrates key concepts in Monotonic Stack.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * The stock span is the number of consecutive days (including today) where the price was less than
 * or equal to today's price. A monotonic decreasing stack helps track previous prices and their spans.
 * When we see a higher price, we can merge spans of lower prices.
 *
 * APPROACH:





 *
 * WHY THIS WORKS:
 * - Stack maintains prices in decreasing order from bottom to top
 * - When we see price >= stack top, those days are included in current span
 * - By storing spans, we efficiently accumulate counts without recounting
 * - Each price is pushed once and popped at most once - amortized O(1) per call
 *
 * TIME COMPLEXITY: O(1) amortized per next() call, O(n) total for n calls
 * SPACE COMPLEXITY: O(n) - stack can grow with number of calls
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * Input sequence: [100,80,60,70,60,75,85]
 *
 * next(100): stack=[], span=1, push [100,1], return 1, stack=[[100,1]]
 * next(80):  80<100, span=1, push [80,1], return 1, stack=[[100,1],[80,1]]
 * next(60):  60<80, span=1, push [60,1], return 1, stack=[[100,1],[80,1],[60,1]]
 * next(70):  70>60, pop [60,1], span=1+1=2
 *            70<80, push [70,2], return 2, stack=[[100,1],[80,1],[70,2]]
 * next(60):  60<70, span=1, push [60,1], return 1, stack=[[100,1],[80,1],[70,2],[60,1]]
 * next(75):  75>60, pop [60,1], span=1+1=2
 *            75>70, pop [70,2], span=2+2=4
 *            75<80, push [75,4], return 4, stack=[[100,1],[80,1],[75,4]]
 * next(85):  85>75, pop [75,4], span=1+4=5
 *            85>80, pop [80,1], span=5+1=6
 *            85<100, push [85,6], return 6, stack=[[100,1],[85,6]]
 *
 * Results: [1,1,1,2,1,4,6]
 * ```
 *
 * EDGE CASES:
 * - First call: always returns 1
 * - All increasing prices: each accumulates all previous
 * - All decreasing prices: each returns 1
 * - Price plateau: equal prices extend span
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
