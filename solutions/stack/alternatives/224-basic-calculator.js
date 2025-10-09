/**

 *
 * Given a string s representing a valid expression, implement a basic calculator to evaluate it, and return the result of the evaluation.
 *
 * Note: You are not allowed to use any built-in function which evaluates strings as mathematical expressions, such as eval().
 *
 * The expression string contains only '(', ')', '+', '-', non-negative integers and spaces ' '.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * This is a classic stack problem for parsing expressions with parentheses. The key insight is to use a stack to save the current state (result and sign) when entering a parenthesized subexpression, then restore it when exiting.
 *
 * APPROACH:




 *
 * WHY THIS WORKS:
 * - Stack naturally handles nested parentheses
 * - We maintain running result and current sign
 * - When we see '(', we start a fresh calculation (subproblem)
 * - When we see ')', we complete the subproblem and add back to previous result
 * - Numbers and operators are processed left to right
 *
 * TIME COMPLEXITY: O(n)
 * Single pass through the string
 *
 * SPACE COMPLEXITY: O(n)
 * Stack can grow up to the depth of nested parentheses
 *
 * EXAMPLE WALKTHROUGH:
 * Input: "1 + 1"



 * Output: 2
 *
 * Input: "2-(1+1)"







 * Output: 0
 *
 * KEY INSIGHTS:
 * - Stack stores the state before entering parentheses
 * - Current calculation happens in result and sign variables
 * - When exiting parentheses, combine subresult with previous state
 * - Handle spaces by ignoring them
 *
 * EDGE CASES:
 * - Empty or whitespace-only strings: return 0
 * - Single number: return the number itself
 * - Nested parentheses: stack handles arbitrary nesting depth
 * - Leading minus sign: handled by starting with sign=1 and result=0
 * - Multiple spaces: ignored during processing
 * - Large numbers: JavaScript handles within Number.MAX_SAFE_INTEGER
 */

/**
 * Calculate the result of a basic arithmetic expression with parentheses.
 * @param {string} s - String containing digits, +, -, (, ), and spaces
 * @returns {number} The calculated result
 *
 * Time Complexity: O(n) where n is length of string
 * Space Complexity: O(n) for stack in worst case (nested parentheses)
 */
function calculate(s) {
    const stack = [];
    let result = 0;
    let number = 0;
    let sign = 1; // 1 for positive, -1 for negative

    for (const char of s) {
        if (char >= '0' && char <= '9') {
            // Build the current number
            number = number * 10 + parseInt(char);
        } else if (char === '+') {
            // Apply the previous number with its sign
            result += sign * number;
            number = 0;
            sign = 1;
        } else if (char === '-') {
            // Apply the previous number with its sign
            result += sign * number;
            number = 0;
            sign = -1;
        } else if (char === '(') {
            // Save current state and start fresh calculation
            stack.push(result);
            stack.push(sign);
            result = 0;
            sign = 1;
        } else if (char === ')') {
            // Apply the current number
            result += sign * number;
            number = 0;

            // Pop the sign and previous result
            result *= stack.pop(); // This is the sign before '('
            result += stack.pop(); // This is the result before '('
        }
        // Ignore spaces
    }

    // Apply the last number
    result += sign * number;
    return result;
}

/**
 * Alternative implementation with explicit result tracking.
 * @param {string} s - Expression string
 * @returns {number} Calculated result
 */
function calculateAlternative(s) {
    /**
     * Process expression starting from index, return [result, next_index].
     * @param {number} index - Starting position in string
     * @returns {Array} [calculated_result, next_index]
     */
    function helper(index) {
        let result = 0;
        let number = 0;
        let sign = 1;

        while (index < s.length) {
            const char = s[index];

            if (char >= '0' && char <= '9') {
                number = number * 10 + parseInt(char);
            } else if (char === '+') {
                result += sign * number;
                number = 0;
                sign = 1;
            } else if (char === '-') {
                result += sign * number;
                number = 0;
                sign = -1;
            } else if (char === '(') {
                // Recursively solve the subproblem
                const [subResult, nextIndex] = helper(index + 1);
                result += sign * subResult;
                index = nextIndex;
                number = 0;
            } else if (char === ')') {
                // End of current subproblem
                result += sign * number;
                return [result, index];
            }

            index++;
        }

        // Apply the last number
        result += sign * number;
        return [result, index];
    }

    return helper(0)[0];
}

/**
 * Simplified version for expressions without parentheses.
 * @param {string} s - Expression string (no parentheses)
 * @returns {number} Calculated result
 */
function calculateSimple(s) {
    let result = 0;
    let number = 0;
    let sign = 1;

    const expr = s + '+'; // Add '+' to trigger final calculation
    for (const char of expr) {
        if (char >= '0' && char <= '9') {
            number = number * 10 + parseInt(char);
        } else if (char === '+' || char === '-') {
            result += sign * number;
            number = 0;
            sign = char === '+' ? 1 : -1;
        }
    }

    return result;
}

/**
 * Test cases for Problem 224: Basic Calculator
 */
function testSolution() {
    console.log('Testing 224. Basic Calculator');

    // Test case 1: Simple addition
    const result1 = calculate("1 + 1");
    const expected1 = 2;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Subtraction
    const result2 = calculate(" 2-1 + 2 ");
    const expected2 = 3;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Parentheses
    const result3 = calculate("(1+(4+5+2)-3)+(6+8)");
    const expected3 = 23;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Negative in parentheses
    const result4 = calculate("2-(1+1)");
    const expected4 = 0;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Nested parentheses
    const result5 = calculate("(1+2)-(3-(4-5))");
    const expected5 = 1;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    // Test case 6: Single number
    const result6 = calculate("123");
    const expected6 = 123;
    console.assert(result6 === expected6, `Test 6 failed: expected ${expected6}, got ${result6}`);

    // Test case 7: Complex expression
    const result7 = calculate("- (3 + (4 + 5))");
    const expected7 = -12;
    console.assert(result7 === expected7, `Test 7 failed: expected ${expected7}, got ${result7}`);

    // Test alternative implementation
    const result8 = calculateAlternative("(1+(4+5+2)-3)+(6+8)");
    console.assert(result8 === expected3, `Alternative test failed: expected ${expected3}, got ${result8}`);

    // Test simple implementation (no parentheses)
    const result9 = calculateSimple("1 + 1");
    console.assert(result9 === expected1, `Simple test failed: expected ${expected1}, got ${result9}`);

    console.log('All test cases passed for 224. Basic Calculator!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 224. Basic Calculator ===');
    console.log('Category: Stack');
    console.log('Difficulty: Hard');
    console.log('');

    // Example 1: Simple arithmetic
    const expr1 = "1 + 1";
    const result1 = calculate(expr1);
    console.log(`calculate('${expr1}') -> ${result1}`);

    // Example 2: With spaces
    const expr2 = " 2-1 + 2 ";
    const result2 = calculate(expr2);
    console.log(`calculate('${expr2}') -> ${result2}`);

    // Example 3: Parentheses
    const expr3 = "(1+(4+5+2)-3)+(6+8)";
    const result3 = calculate(expr3);
    console.log(`calculate('${expr3}') -> ${result3}`);

    // Example 4: Subtraction with parentheses
    const expr4 = "2-(1+1)";
    const result4 = calculate(expr4);
    console.log(`calculate('${expr4}') -> ${result4}`);

    // Example 5: Nested parentheses
    const expr5 = "(1+2)-(3-(4-5))";
    const result5 = calculate(expr5);
    console.log(`calculate('${expr5}') -> ${result5}`);

    console.log(`\nStep-by-step for '2-(1+1)':`);
    console.log(`1. Process '2': result=0, num=2, sign=1`);
    console.log(`2. Process '-': result=2, sign=-1, num=0`);
    console.log(`3. Process '(': push [2, -1], reset result=0, sign=1`);
    console.log(`4. Process '1': num=1`);
    console.log(`5. Process '+': result=1, sign=1, num=0`);
    console.log(`6. Process '1': num=1`);
    console.log(`7. Process ')': result=2, pop sign=-1, pop prev_result=2`);
    console.log(`8. Final: 2 + 2*(-1) = 0`);

    console.log(`\nKey insights:`);
    console.log(`1. Stack saves state when entering parentheses`);
    console.log(`2. Current result and sign handle immediate calculation`);
    console.log(`3. Numbers are built digit by digit`);
    console.log(`4. Operations are applied when seeing next operator or ')'`);
    console.log(`5. Spaces are ignored during processing`);

    console.log(`\nAlgorithm comparison:`);
    const approaches = [
        ['Stack-based', calculate],
        ['Recursive', calculateAlternative],
        ['Simple (no parens)', calculateSimple]
    ];

    for (const [name, method] of approaches) {
        try {
            const result = method("1 + 1");
            console.log(`${name}: ${result}`);
        } catch (e) {
            console.log(`${name}: N/A (${e.message})`);
        }
    }

    testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
    demonstrateSolution();
}

// Export for use in other modules
module.exports = {
    calculate,
    calculateAlternative,
    calculateSimple,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This solution uses stack-based expression parsing
 * - Time complexity is O(n) for single pass through string
 * - Space complexity is O(n) in worst case for deeply nested parentheses
 * - The algorithm handles all edge cases including spaces and negative numbers
 * - Essential insight: stack preserves state across parentheses boundaries
 * - Alternative recursive approach provides cleaner code structure
 */