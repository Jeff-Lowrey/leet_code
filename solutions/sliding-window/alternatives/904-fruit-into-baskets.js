/**
 * 904. Fruit Into Baskets
 * Medium
 *
 * Fruit Baskets - JavaScript Implementation This solution implements the fruit baskets problem where we need to find the longest sequence of fruits that contains at most two different types. Time Complexity: O(n) where n is the length of the input array Space Complexity: O(1) as we only use a fixed-size map
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Fruit Into Baskets is to understand the core problem pattern
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
 * Fruit Baskets - JavaScript Implementation
 * 
 * This solution implements the fruit baskets problem where we need to find
 * the longest sequence of fruits that contains at most two different types.
 * 
 * Time Complexity: O(n) where n is the length of the input array
 * Space Complexity: O(1) as we only use a fixed-size map
 */

/**
 * @param {number[]} fruits - Array of integers representing different types of fruits
 * @return {number} - Length of longest sequence containing at most 2 different fruit types
 */
function totalFruit(fruits) {
    // Handle edge cases
    if (!fruits || fruits.length === 0) return 0;
    if (fruits.length <= 2) return fruits.length;

    // Map to store the count of each fruit type in current window
    const basketMap = new Map();
    
    let maxLength = 0;        // Track maximum sequence length
    let windowStart = 0;      // Start of sliding window
    
    // Iterate through the fruits array using sliding window
    for (let windowEnd = 0; windowEnd < fruits.length; windowEnd++) {
        const currentFruit = fruits[windowEnd];
        
        // Add current fruit to basket map
        basketMap.set(currentFruit, (basketMap.get(currentFruit) || 0) + 1);
        
        // Shrink window while we have more than 2 types of fruits
        while (basketMap.size > 2) {
            const leftFruit = fruits[windowStart];
            basketMap.set(leftFruit, basketMap.get(leftFruit) - 1);
            
            // Remove fruit type if count becomes 0
            if (basketMap.get(leftFruit) === 0) {
                basketMap.delete(leftFruit);
            }
            
            windowStart++;
        }
        
        // Update maximum length
        maxLength = Math.max(maxLength, windowEnd - windowStart + 1);
    }
    
    return maxLength;
}

/**
 * Test cases
 */
function runTests() {
    const testCases = [
        {
            input: [1, 2, 1],
            expected: 3,
            description: "Basic case with three fruits"
        },
        {
            input: [0, 1, 2, 2],
            expected: 3,
            description: "Case with consecutive same fruits"
        },
        {
            input: [1, 2, 3, 2, 2],
            expected: 4,
            description: "Case with multiple different fruits"
        },
        {
            input: [],
            expected: 0,
            description: "Empty array"
        },
        {
            input: [1],
            expected: 1,
            description: "Single fruit"
        }
    ];

    testCases.forEach((testCase, index) => {
        const result = totalFruit(testCase.input);
        console.log(`Test ${index + 1}: ${testCase.description}`);
        console.log(`Input: [${testCase.input}]`);
        console.log(`Expected: ${testCase.expected}`);
        console.log(`Got: ${result}`);
        console.log(`Status: ${result === testCase.expected ? 'PASSED' : 'FAILED'}`);
        console.log('---');
    });
}

// Export the function for use in other modules
module.exports = {
    totalFruit,
    runTests
};

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}