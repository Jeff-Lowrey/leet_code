/**
 * 374. Guess Number Higher Or Lower
 * Medium
 *
 * Guess Number - JavaScript Implementation This is a solution for the Guess Number problem where we need to guess a number between 1 and n using a provided API. The API provides a guess() function that returns: -1 if the guess is higher than the number 1 if the guess is lower than the number 0 if the guess is correct
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Guess Number Higher Or Lower is to understand the core problem pattern
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
 * Guess Number - JavaScript Implementation
 * 
 * This is a solution for the Guess Number problem where we need to
 * guess a number between 1 and n using a provided API.
 * 
 * The API provides a guess() function that returns:
 * -1 if the guess is higher than the number
 * 1 if the guess is lower than the number
 * 0 if the guess is correct
 */

/** 
 * @param {number} n - The maximum possible value (1 to n)
 * @return {number} - The guessed number
 */
const guessNumber = function(n) {
    // Initialize the search range
    let left = 1;
    let right = n;
    
    // Continue searching while left <= right
    while (left <= right) {
        // Calculate mid point
        // Using left + Math.floor((right - left) / 2) to avoid integer overflow
        const mid = left + Math.floor((right - left) / 2);
        
        // Make a guess using the provided API
        const result = guess(mid);
        
        // Check the result
        if (result === 0) {
            // We found the number
            return mid;
        } else if (result === -1) {
            // Our guess was too high, search in lower half
            right = mid - 1;
        } else {
            // Our guess was too low, search in upper half
            left = mid + 1;
        }
    }
    
    // This line should never be reached given the problem constraints
    return -1;
};

/**
 * Mock implementation of the guess API
 * This would be provided by the problem environment
 * 
 * @param {number} num - The guessed number
 * @return {number} - Comparison result (-1, 0, or 1)
 */
function guess(num) {
    // This is just a mock implementation
    // The actual implementation would be provided by the problem
    const pick = 6; // Example picked number
    if (num > pick) return -1;
    if (num < pick) return 1;
    return 0;
}

// Example usage:
function runExample() {
    const n = 10;
    const result = guessNumber(n);
    console.log(`The number is: ${result}`);
}

// Export the function for testing purposes
module.exports = {
    guessNumber,
    guess
};

// Uncomment the following line to run the example
// runExample();