/**
 * 394. Decode String
 * Medium
 *
 * Decode String - JavaScript Implementation This solution decodes a string encoded in the format: k[encoded_string] where encoded_string can contain nested encoded strings. Example: Input: "3[a]2[bc]" -> Output: "aaabcbc" Input: "3[a2[c]]" -> Output: "accaccacc" @param {string} s - The encoded string to decode @return {string} - The decoded string
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Decode String is to understand the core problem pattern
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
 * Decode String - JavaScript Implementation
 * 
 * This solution decodes a string encoded in the format: k[encoded_string]
 * where encoded_string can contain nested encoded strings.
 * 
 * Example:
 * Input: "3[a]2[bc]" -> Output: "aaabcbc"
 * Input: "3[a2[c]]" -> Output: "accaccacc"
 * 
 * @param {string} s - The encoded string to decode
 * @return {string} - The decoded string
 */

function decodeString(s) {
    // Edge case: empty string
    if (!s || s.length === 0) return "";

    // Initialize stacks for numbers and strings
    const numStack = [];
    const strStack = [];
    let currentNum = 0;
    let currentStr = '';

    // Iterate through each character in the input string
    for (let char of s) {
        if (isDigit(char)) {
            // Build number if multiple digits
            currentNum = currentNum * 10 + parseInt(char);
        } 
        else if (char === '[') {
            // Push current number and string to respective stacks
            numStack.push(currentNum);
            strStack.push(currentStr);
            // Reset current values
            currentNum = 0;
            currentStr = '';
        }
        else if (char === ']') {
            // Get previous string and number from stacks
            const prevStr = strStack.pop();
            const num = numStack.pop();
            // Repeat current string num times and append to previous string
            currentStr = prevStr + currentStr.repeat(num);
        }
        else {
            // Add character to current string
            currentStr += char;
        }
    }

    return currentStr;
}

/**
 * Helper function to check if a character is a digit
 * @param {string} char - Character to check
 * @return {boolean} - True if character is a digit
 */
function isDigit(char) {
    return char >= '0' && char <= '9';
}

// Export the function for use in other modules
module.exports = decodeString;

// Test cases
function runTests() {
    const testCases = [
        { input: "3[a]2[bc]", expected: "aaabcbc" },
        { input: "3[a2[c]]", expected: "accaccacc" },
        { input: "2[abc]3[cd]ef", expected: "abcabccdcdcdef" },
        { input: "", expected: "" },
        { input: "abc", expected: "abc" }
    ];

    testCases.forEach((test, index) => {
        const result = decodeString(test.input);
        console.log(`Test ${index + 1}:`);
        console.log(`Input: ${test.input}`);
        console.log(`Expected: ${test.expected}`);
        console.log(`Result: ${result}`);
        console.log(`Pass: ${result === test.expected}\n`);
    });
}

// Uncomment to run tests
// runTests();