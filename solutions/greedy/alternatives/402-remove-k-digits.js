/**
 * 402. Remove K Digits
 * Medium
 *
 * Remove K Digits Given a non-negative integer num represented as a string and an integer k, return the smallest possible integer after removing k digits from num. @param {string} num - The input number as a string @param {number} k - Number of digits to remove @return {string} - The smallest possible number after removing k digits
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Remove K Digits is to understand the core problem pattern
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
 * Remove K Digits
 * Given a non-negative integer num represented as a string and an integer k,
 * return the smallest possible integer after removing k digits from num.
 * 
 * @param {string} num - The input number as a string
 * @param {number} k - Number of digits to remove
 * @return {string} - The smallest possible number after removing k digits
 */
function removeKdigits(num, k) {
    // Handle edge cases
    if (k >= num.length) return "0";
    if (k === 0) return num;

    // Use stack to build result
    const stack = [];
    
    // Process each digit
    for (let digit of num) {
        // While we can still remove digits and current digit is smaller than last digit in stack
        while (k > 0 && stack.length > 0 && stack[stack.length - 1] > digit) {
            stack.pop();
            k--;
        }
        stack.push(digit);
    }
    
    // If we still need to remove digits, remove from end
    while (k > 0) {
        stack.pop();
        k--;
    }
    
    // Build result string
    let result = stack.join('');
    
    // Remove leading zeros
    result = result.replace(/^0+/, '');
    
    // Return "0" if empty string, otherwise return result
    return result === '' ? '0' : result;
}

/**
 * Test cases to verify the implementation
 */
function runTests() {
    const testCases = [
        { num: "1432219", k: 3, expected: "1219" },
        { num: "10200", k: 1, expected: "200" },
        { num: "10", k: 2, expected: "0" },
        { num: "112", k: 1, expected: "11" },
        { num: "1234567", k: 3, expected: "1234" },
        { num: "9", k: 1, expected: "0" },
        { num: "10001", k: 4, expected: "0" }
    ];

    testCases.forEach((test, index) => {
        const result = removeKdigits(test.num, test.k);
        console.log(`Test ${index + 1}:`);
        console.log(`Input: num = "${test.num}", k = ${test.k}`);
        console.log(`Expected: "${test.expected}"`);
        console.log(`Actual: "${result}"`);
        console.log(`Result: ${result === test.expected ? 'PASS' : 'FAIL'}\n`);
    });
}

// Export the function for potential module usage
module.exports = {
    removeKdigits
};

// Run tests if file is executed directly
if (require.main === module) {
    runTests();
}