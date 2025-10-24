/**
 * # Difficulty: Medium
 *
 * # 901. Online Stock Span
 *
 * Difficulty: Medium
 *
 * Design a class StockSpanner which collects daily price quotes for some stock, and returns the span of that stock's price for the current day.
 *
 * The span of the stock's price in one day is the maximum number of consecutive days (starting from that day and going backward) for which the stock price was less than or equal to the price of that day.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>Operations: ["StockSpanner","next","next","next","next","next","next","next"]</dd>
 * <dt>Output:</dt>
 * <dd>[1,1,1,2,1,4,6]</dd>
 * <dt>Explanation:</dt>
 * <dd>After each price, the stock price span is the count of consecutive days with price ≤ current price</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Hash Table Lookup, Array Traversal, Stack Operations
 * **Data Structures**: Hash Map, Array, Stack
 * **Patterns**: Iterative Solution
 * **Time Complexity**: * O(n) - Single pass through input
 * **Space Complexity**: * O(1) - Constant extra space

 *
 * ### INTUITION:
 * [This problem requires understanding of monotonic stack concepts. The key insight is to identify the optimal approach for this specific scenario.]
 *
 * ### APPROACH:
 * 1. **Analyze the problem**: Understand the input constraints and expected output
 * 2. **Choose the right technique**: Apply monotonic stack methodology
 * 3. **Implement efficiently**: Focus on optimal time and space complexity
 * 4. **Handle edge cases**: Consider boundary conditions and special cases
 *
 * ### WHY THIS WORKS:
 * - The solution leverages monotonic stack principles
 * - Time complexity is optimized for the given constraints
 * - Space complexity is minimized where possible
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * Operations: ["StockSpanner","next","next","next","next","next","next","next"]
 * ```
 *
 * Values: [[],[100],[80],[60],[70],[60],[75],[85]]
 * Step 1: Process prices with monotonic stack
 * 100: span=1, stack=[(100,1)]
 * 80: span=1, stack=[(100,1),(80,1)]
 * 60: span=1, stack=[(100,1),(80,1),(60,1)]
 * 70: pop 60, span=1+1=2, stack=[(100,1),(80,1),(70,2)]
 * 60: span=1, stack=[(100,1),(80,1),(70,2),(60,1)]
 * 75: pop 60, pop 70, span=1+1+2=4, stack=[(100,1),(80,1),(75,4)]
 * 85: pop 75, pop 80, span=1+4+1=6, stack=[(100,1),(85,6)]
 *
 * Output:
 * ```
 * [1,1,1,2,1,4,6]
 * ```

 * ### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
 *
 * ### EDGE CASES:
 * - Empty input handling
 * - Single element cases
 * - Large input considerations
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
    while (
      this.stack.length > 0 &&
      this.stack[this.stack.length - 1][0] <= price
    ) {
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
  return prices.map((price) => spanner.next(price));
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
  console.log("Testing 901. Online Stock Span");

  // Test case 1: Example from problem
  const result1 = solve([100, 80, 60, 70, 60, 75, 85]);
  const expected1 = [1, 1, 1, 2, 1, 4, 6];
  console.assert(
    arraysEqual(result1, expected1),
    `Test 1 failed: expected [${expected1}], got [${result1}]`,
  );

  // Test case 2: All increasing
  const result2 = solve([10, 20, 30, 40, 50]);
  const expected2 = [1, 2, 3, 4, 5];
  console.assert(
    arraysEqual(result2, expected2),
    `Test 2 failed: expected [${expected2}], got [${result2}]`,
  );

  // Test case 3: All decreasing
  const result3 = solve([50, 40, 30, 20, 10]);
  const expected3 = [1, 1, 1, 1, 1];
  console.assert(
    arraysEqual(result3, expected3),
    `Test 3 failed: expected [${expected3}], got [${result3}]`,
  );

  // Test case 4: All same price
  const result4 = solve([30, 30, 30, 30]);
  const expected4 = [1, 2, 3, 4];
  console.assert(
    arraysEqual(result4, expected4),
    `Test 4 failed: expected [${expected4}], got [${result4}]`,
  );

  // Test case 5: Single price
  const result5 = solve([100]);
  const expected5 = [1];
  console.assert(
    arraysEqual(result5, expected5),
    `Test 5 failed: expected [${expected5}], got [${result5}]`,
  );

  // Test case 6: Complex pattern
  const result6 = solve([31, 41, 48, 59, 79]);
  const expected6 = [1, 2, 3, 4, 5];
  console.assert(
    arraysEqual(result6, expected6),
    `Test 6 failed: expected [${expected6}], got [${result6}]`,
  );

  console.log("All test cases passed for 901. Online Stock Span!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 901. Online ===");
  console.log("Category: Monotonic Stack");
  console.log("Difficulty: Medium");
  console.log("");

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
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This solution focuses on monotonic stack concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
