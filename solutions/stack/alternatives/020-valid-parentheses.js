/**
 * 20. Valid Parentheses
 * Medium
 *
 * Valid Parentheses - JavaScript Implementation Problem: Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. The brackets must close in the correct order. @param {string} s - The input string containing parentheses @return {boolean} - Returns true if the parentheses are valid, false otherwise
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Valid Parentheses is to understand the core problem pattern
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
 * Valid Parentheses - JavaScript Implementation
 * 
 * Problem: Given a string containing just the characters '(', ')', '{', '}', '[' and ']',
 * determine if the input string is valid. The brackets must close in the correct order.
 * 
 * @param {string} s - The input string containing parentheses
 * @return {boolean} - Returns true if the parentheses are valid, false otherwise
 */

const isValid = function(s) {
    // Handle edge cases
    if (!s) return true;
    if (s.length % 2 !== 0) return false;

    // Create a stack to keep track of opening brackets
    const stack = [];
    
    // Define matching pairs of brackets
    const bracketPairs = {
        '(': ')',
        '{': '}',
        '[': ']'
    };

    // Iterate through each character in the string
    for (let char of s) {
        // If it's an opening bracket, push to stack
        if (bracketPairs[char]) {
            stack.push(char);
        } else {
            // If it's a closing bracket
            const lastOpening = stack.pop();
            
            // Check if the current closing bracket matches the last opening bracket
            if (bracketPairs[lastOpening] !== char) {
                return false;
            }
        }
    }

    // After processing all characters, stack should be empty for valid string
    return stack.length === 0;
};

// Test cases
const testCases = [
    "()",           // true
    "()[]{}",       // true
    "(]",           // false
    "([)]",         // false
    "{[]}",         // true
    "",             // true
    "(((",          // false
    "))))",         // false
    "{[]}()",       // true
];

// Run test cases
console.log("Testing Valid Parentheses Implementation:");
testCases.forEach((test, index) => {
    console.log(`Test ${index + 1}: "${test}" => ${isValid(test)}`);
});

// Export the function for potential use in other modules
module.exports = isValid;