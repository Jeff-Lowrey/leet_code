/**
 * 739. Daily Temperatures
 * Medium
 *
 * Daily Temperatures - LeetCode 739 Problem: Given an array of daily temperatures, return an array where each element represents how many days you would have to wait until a warmer temperature. If there is no future day with a warmer temperature, put 0 instead. @param {number[]} temperatures - Array of daily temperatures @return {number[]} - Array where each element represents days until warmer temperature
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Daily Temperatures is to understand the core problem pattern
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
 * Daily Temperatures - LeetCode 739
 * 
 * Problem: Given an array of daily temperatures, return an array where each element
 * represents how many days you would have to wait until a warmer temperature.
 * If there is no future day with a warmer temperature, put 0 instead.
 * 
 * @param {number[]} temperatures - Array of daily temperatures
 * @return {number[]} - Array where each element represents days until warmer temperature
 */

/**
 * Solution using monotonic stack approach
 * Time Complexity: O(n) where n is the length of temperatures array
 * Space Complexity: O(n) for the stack in worst case
 */
function dailyTemperatures(temperatures) {
    // Handle edge cases
    if (!temperatures || temperatures.length === 0) {
        return [];
    }

    const n = temperatures.length;
    const result = new Array(n).fill(0);
    
    // Stack will store indices of temperatures
    const stack = [];

    // Iterate through each temperature
    for (let currentDay = 0; currentDay < n; currentDay++) {
        const currentTemp = temperatures[currentDay];

        // While stack is not empty and current temperature is warmer
        // than temperature at top of stack
        while (
            stack.length > 0 && 
            temperatures[stack[stack.length - 1]] < currentTemp
        ) {
            const prevDay = stack.pop();
            // Calculate days difference and store in result
            result[prevDay] = currentDay - prevDay;
        }

        // Push current day's index onto stack
        stack.push(currentDay);
    }

    return result;
}

// Example test cases
const testCases = [
    [73, 74, 75, 71, 69, 72, 76, 73],
    [30, 40, 50, 60],
    [30, 60, 90],
    [89],
    [],
];

// Test function to run examples
function runTests() {
    testCases.forEach((temperatures, index) => {
        console.log(`Test Case ${index + 1}:`);
        console.log('Input:', temperatures);
        console.log('Output:', dailyTemperatures(temperatures));
        console.log('---');
    });
}

// Run tests if not in production
if (process.env.NODE_ENV !== 'production') {
    runTests();
}

// Export the function for use in other modules
module.exports = dailyTemperatures;