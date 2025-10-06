/**
 * 901. Online
 * Medium
 *
 * Online Stock Span Implementation The stock span problem is to calculate span of stock's price for all n days. The span of the stock's price today is defined as the maximum number of consecutive days (starting from today and going backwards) for which the price of the stock was less than or equal to today's price.
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Online is to understand the core problem pattern
 * and apply the most efficient algorithmic approach.
 *
 * ### APPROACH:
 * 1. Analyze the problem requirements
 * 2. Choose the optimal data structure
 * 3. Implement the solution step by step
 * 4. Handle edge cases appropriately
 *
 * ### WHY THIS WORKS:
 * This approach works because it leverages the fundamental properties of the problem
 * to achieve an efficient solution.
 *
 * ### EXAMPLE WALKTHROUGH:
 * For a typical input, the algorithm processes the data systematically
 * to produce the expected output.
 *
 * </details>
 */

/**
 * Online Stock Span Implementation
 * 
 * The stock span problem is to calculate span of stock's price for all n days.
 * The span of the stock's price today is defined as the maximum number of consecutive days 
 * (starting from today and going backwards) for which the price of the stock was less than or equal to today's price.
 */

class StockSpanner {
    /**
     * Initialize your data structure here.
     * Using a stack to store pairs of [price, span]
     */
    constructor() {
        this.stack = [];
    }
    
    /**
     * Calculates the span of the stock's price for the current day
     * @param {number} price - Today's stock price
     * @return {number} - The span of the stock's price today
     */
    next(price) {
        // Initialize span as 1 (counting current day)
        let span = 1;
        
        // While stack is not empty and current price is greater than or equal to
        // the price at the top of the stack
        while (
            this.stack.length > 0 && 
            price >= this.stack[this.stack.length - 1][0]
        ) {
            // Add the span of the previous price to current span
            span += this.stack.pop()[1];
        }
        
        // Push current price and its span to the stack
        this.stack.push([price, span]);
        
        return span;
    }
}

/**
 * Example usage:
 * 
 * const stockSpanner = new StockSpanner();
 * console.log(stockSpanner.next(100)); // returns 1
 * console.log(stockSpanner.next(80));  // returns 1
 * console.log(stockSpanner.next(60));  // returns 1
 * console.log(stockSpanner.next(70));  // returns 2
 * console.log(stockSpanner.next(60));  // returns 1
 * console.log(stockSpanner.next(75));  // returns 4
 * console.log(stockSpanner.next(85));  // returns 6
 */

// Export the class for use in other files
module.exports = StockSpanner;

/**
 * Time Complexity:
 * - Constructor: O(1)
 * - next(): O(n) in worst case, but amortized O(1) because each element can be pushed and popped at most once
 * 
 * Space Complexity:
 * - O(n) where n is the number of days
 * 
 * Note: This implementation uses a monotonic stack pattern where we maintain
 * a stack of prices in decreasing order along with their spans.
 */

// Run test cases if this file is run directly
if (require.main === module) {
    const stockSpanner = new StockSpanner();
    console.log("Test Cases:");
    console.log(stockSpanner.next(100)); // Expected: 1
    console.log(stockSpanner.next(80));  // Expected: 1
    console.log(stockSpanner.next(60));  // Expected: 1
    console.log(stockSpanner.next(70));  // Expected: 2
    console.log(stockSpanner.next(60));  // Expected: 1
    console.log(stockSpanner.next(75));  // Expected: 4
    console.log(stockSpanner.next(85));  // Expected: 6
}