/**
 * # Difficulty: Medium
 *
 * # 901. Online Stock Span
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
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Stack Operations
 * **Data Structures**: Hash Set, Array, String
 * **Patterns**: Hash Table Pattern
 * **Time Complexity**: O(n)
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Maintain monotonic decreasing stack of (price, span) pairs. When new price comes, pop all lower prices and sum their spans. Current span = 1 + sum of popped spans. Push (price, span).
 *
 * ### APPROACH:
 * 1. **Initialize in __init__**: Set self.stack = []
 * 2. **In next method**: Initialize span = 1
 * 3. **Process stack**: While stack and price >= stack[-1][0], span += stack.pop()[1]
 * 4. **Push current**: Append (price, span) to stack
 * 5. **Return span**: Return calculated span
 *
 * ### WHY THIS WORKS:
 * - Monotonic stack tracks (price, span) pairs in decreasing order
 * - When new price >= stack top, accumulate spans (those days included in current span)
 * - Pop and sum spans while price >= stack_top to get continuous span
 * - Amortized O(1) per call: each price pushed/popped at most once
 * - Stack maintains decreasing prices, enabling efficient span calculation
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
 * 60=1, stack=[(100,1),(80,1),(70,2),(60,1)]
 * 75: pop 60, pop 70, span=1+1+2=4, stack=[(100,1),(80,1),(75,4)]
 * 85: pop 75, pop 80, span=1+4+1=6, stack=[(100,1),(85,6)]
 *
 * Output:
 * ```
 * [1,1,1,2,1,4,6]
 * ```

### TIME COMPLEXITY:
 * O(n)
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 *
 * ### EDGE CASES:
 * - Empty input handling
 * - Single element cases
 * - Large input considerations
 *
 * </details>
 */

class StockSpanner {
  private stack: Array<[number, number]>; // [price, span]

  constructor() {
    this.stack = [];
  }

  /**
   * Calculate span for current price.
   *
   * Time Complexity: O(1) amortized
   * Space Complexity: O(n)
   */
  next(price: number): number {
    let span = 1;

    while (this.stack.length > 0 && price >= this.stack[this.stack.length - 1][0]) {
      span += this.stack.pop()![1];
    }

    this.stack.push([price, span]);
    return span;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { StockSpanner };
}

function runTests(): void {
  // Test case 1: Classic example
  const spanner1 = new StockSpanner();
  const results1: number[] = [];
  results1.push(spanner1.next(100)); // 1
  results1.push(spanner1.next(80));  // 1
  results1.push(spanner1.next(60));  // 1
  results1.push(spanner1.next(70));  // 2
  results1.push(spanner1.next(60));  // 1
  results1.push(spanner1.next(75));  // 4
  results1.push(spanner1.next(85));  // 6
  console.log(`Test 1: ${JSON.stringify(results1) === JSON.stringify([1, 1, 1, 2, 1, 4, 6]) ? "PASS" : "FAIL"}`);

  // Test case 2: Increasing prices
  const spanner2 = new StockSpanner();
  const results2: number[] = [];
  results2.push(spanner2.next(10)); // 1
  results2.push(spanner2.next(20)); // 2
  results2.push(spanner2.next(30)); // 3
  results2.push(spanner2.next(40)); // 4
  console.log(`Test 2: ${JSON.stringify(results2) === JSON.stringify([1, 2, 3, 4]) ? "PASS" : "FAIL"}`);

  // Test case 3: Decreasing prices
  const spanner3 = new StockSpanner();
  const results3: number[] = [];
  results3.push(spanner3.next(40)); // 1
  results3.push(spanner3.next(30)); // 1
  results3.push(spanner3.next(20)); // 1
  results3.push(spanner3.next(10)); // 1
  console.log(`Test 3: ${JSON.stringify(results3) === JSON.stringify([1, 1, 1, 1]) ? "PASS" : "FAIL"}`);

  // Test case 4: All same price
  const spanner4 = new StockSpanner();
  const results4: number[] = [];
  results4.push(spanner4.next(50)); // 1
  results4.push(spanner4.next(50)); // 2
  results4.push(spanner4.next(50)); // 3
  console.log(`Test 4: ${JSON.stringify(results4) === JSON.stringify([1, 2, 3]) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export { StockSpanner };
