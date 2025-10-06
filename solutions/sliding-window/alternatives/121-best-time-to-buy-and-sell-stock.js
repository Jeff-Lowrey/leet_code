/**
 * 121. Best Time To Buy And Sell Stock
 * Medium
 *
 * Buy Sell Stock - JavaScript Implementation Problem: Given an array of stock prices where prices[i] is the price of a given stock on day i, find the maximum profit that can be achieved by buying and selling once. Note that you must buy before you can sell. Time Complexity: O(n) Space Complexity: O(1)
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Best Time To Buy And Sell Stock is to understand the core problem pattern
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
 * Buy Sell Stock - JavaScript Implementation
 * 
 * Problem: Given an array of stock prices where prices[i] is the price of a given stock on day i,
 * find the maximum profit that can be achieved by buying and selling once.
 * Note that you must buy before you can sell.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

/**
 * Calculates the maximum profit that can be obtained by buying and selling a stock once
 * @param {number[]} prices - Array of stock prices where prices[i] is the price on day i
 * @returns {number} - Maximum profit possible. Returns 0 if no profit can be made
 */
function maxProfit(prices) {
    // Handle edge cases
    if (!prices || prices.length < 2) {
        return 0;
    }

    let minPrice = Infinity;    // Track the minimum price seen so far
    let maxProfit = 0;         // Track the maximum profit possible

    // Iterate through each price
    for (let i = 0; i < prices.length; i++) {
        // Update minimum price if current price is lower
        if (prices[i] < minPrice) {
            minPrice = prices[i];
        }
        // Calculate potential profit and update maxProfit if higher
        else {
            const currentProfit = prices[i] - minPrice;
            maxProfit = Math.max(maxProfit, currentProfit);
        }
    }

    return maxProfit;
}

// Test cases
const testCases = [
    {
        input: [7, 1, 5, 3, 6, 4],
        expected: 5,
        description: "Normal case with profit"
    },
    {
        input: [7, 6, 4, 3, 1],
        expected: 0,
        description: "Decreasing prices - no profit"
    },
    {
        input: [2, 4, 1],
        expected: 2,
        description: "Small array"
    },
    {
        input: [],
        expected: 0,
        description: "Empty array"
    },
    {
        input: [1],
        expected: 0,
        description: "Single element"
    }
];

// Run test cases
function runTests() {
    console.log("Running Buy Sell Stock Tests:");
    console.log("-----------------------------");
    
    testCases.forEach((test, index) => {
        const result = maxProfit(test.input);
        const passed = result === test.expected;
        
        console.log(`Test ${index + 1}: ${test.description}`);
        console.log(`Input: [${test.input}]`);
        console.log(`Expected: ${test.expected}`);
        console.log(`Got: ${result}`);
        console.log(`Status: ${passed ? 'PASSED' : 'FAILED'}`);
        console.log("-----------------------------");
    });
}

// Execute tests
runTests();

// Export the function for potential use in other modules
module.exports = {
    maxProfit
};