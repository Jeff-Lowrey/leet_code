/**
 * Difficulty: Medium
 *
 * [Problem description goes here]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[input description]</dd>
 * <dt>Output:</dt>
 * <dd>[output description]</dd>
 * <dt>Explanation:</dt>
 * <dd>[explanation]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * [High-level insight or key observation]
 *
 * ### APPROACH:
 * [Detailed explanation of the solution approach]
 *
 * ### WHY THIS WORKS:
 * - [Explanation of correctness]
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * [example input]
 * ```
 *
 * **Step 1:** [description]
 *
 * **Step 2:** [description]
 *
 * ### TIME COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### SPACE COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### EDGE CASES:
 * - **[Edge case 1]:** [how it's handled]
 * - **[Edge case 2]:** [how it's handled]
 *
 * </details>
 */

/**
 * Main solution for Problem 20: Valid Parentheses
 *
 * @param {string} s - String containing only '(', ')', '{', '}', '[', ']'
 * @return {boolean} - True if string has valid parentheses, false otherwise
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function isValid(s) {
    // Early termination: odd length can't be balanced
    if (s.length % 2 === 1) {
        return false;
    }

    // Stack to track opening brackets
    const stack = [];

    // Mapping of closing to opening brackets
    const bracketMap = {
        ')': '(',
        '}': '{',
        ']': '['
    };

    for (let char of s) {
        if (char in bracketMap) {
            // Closing bracket - check if it matches top of stack
            if (stack.length === 0 || stack.pop() !== bracketMap[char]) {
                return false;
            }
        } else {
            // Opening bracket - push to stack
            stack.push(char);
        }
    }

    // Valid if all brackets were matched (empty stack)
    return stack.length === 0;
}

/**
 * Alternative implementation with explicit opening bracket check
 *
 * @param {string} s - Input string
 * @return {boolean} - True if valid parentheses
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function isValidAlternative(s) {
    const stack = [];
    const opening = new Set(['(', '[', '{']);
    const pairs = { ')': '(', ']': '[', '}': '{' };

    for (let char of s) {
        if (opening.has(char)) {
            stack.push(char);
        } else if (char in pairs) {
            if (stack.length === 0 || stack.pop() !== pairs[char]) {
                return false;
            }
        }
        // Ignore other characters (if any)
    }

    return stack.length === 0;
}

/**
 * Alternative iterative replacement approach (less efficient)
 *
 * @param {string} s - Input string
 * @return {boolean} - True if valid parentheses
 *
 * Time Complexity: O(n²) in worst case
 * Space Complexity: O(n)
 */
function isValidIterative(s) {
    // Keep replacing valid pairs until no more changes
    while (s.includes('()') || s.includes('[]') || s.includes('{}')) {
        s = s.replace('()', '').replace('[]', '').replace('{}', '');
    }

    return s === '';
}

/**
 * Factory function that returns the main solution
 * @param {string} s - Input string
 * @return {boolean} - Result
 */
function solve(s) {
    return isValid(s);
}

/**
 * Test cases for Problem 20: Valid Parentheses
 */
function testSolution() {
    console.log('Testing 20. Valid Parentheses');

    // Test case 1: Simple valid cases
    console.assert(isValid("()") === true, 'Test 1a failed');
    console.assert(isValid("[]") === true, 'Test 1b failed');
    console.assert(isValid("{}") === true, 'Test 1c failed');

    // Test case 2: Multiple brackets
    console.assert(isValid("()[]{}") === true, 'Test 2a failed');
    console.assert(isValid("([{}])") === true, 'Test 2b failed');

    // Test case 3: Invalid cases
    console.assert(isValid("(]") === false, 'Test 3a failed');
    console.assert(isValid("([)]") === false, 'Test 3b failed');
    console.assert(isValid("((") === false, 'Test 3c failed');
    console.assert(isValid("))") === false, 'Test 3d failed');

    // Test case 4: Edge cases
    console.assert(isValid("") === true, 'Test 4a failed');
    console.assert(isValid("(") === false, 'Test 4b failed');
    console.assert(isValid(")") === false, 'Test 4c failed');

    // Test case 5: Complex valid case
    console.assert(isValid("((([{}])))") === true, 'Test 5a failed');

    // Test case 6: Complex invalid case
    console.assert(isValid("([{}]))]") === false, 'Test 6a failed');

    // Test alternative implementations
    console.assert(isValidAlternative("()[]{}") === true, 'Alt test failed');
    console.assert(isValidIterative("([{}])") === true, 'Iterative test failed');

    console.log('All test cases passed for 20. Valid Parentheses!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 20. Valid Parentheses ===');
    console.log('Category: Stack');
    console.log('Difficulty: Easy');
    console.log('');

    // Example demonstrations
    console.log('Example 1: isValid("()") =', isValid("()"));
    console.log('Example 2: isValid("()[]{}") =', isValid("()[]{}"));
    console.log('Example 3: isValid("(]") =', isValid("(]"));
    console.log('Example 4: isValid("([)]") =', isValid("([)]"));
    console.log('');

    testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
    demonstrateSolution();
}

// Export for use in other modules
module.exports = {
    isValid,
    isValidAlternative,
    isValidIterative,
    solve,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This solution uses classic stack approach for O(n) time complexity
 * - The bracket mapping technique simplifies the matching logic
 * - Critical for understanding stack data structure applications
 * - The approach can be adapted for other matching/pairing problems
 */
