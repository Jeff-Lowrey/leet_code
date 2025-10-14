/**
 * # Difficulty: Medium
 *
 * The count-and-say sequence is a sequence of digit strings defined by the recursive formula:
 * - countAndSay(1) = "1"
 * - countAndSay(n) is the way you would "say" the digit string from countAndSay(n-1),
 *   which is then converted into a different digit string.
 *
 * To determine how you "say" a digit string, split it into the minimal number of substrings
 * such that each substring contains exactly one unique digit. Then for each substring,
 * say the number of digits, then say the digit. Finally, concatenate every said digit.
 *
 * Example:
 * Input: n = 4
 * Output: "1211"
 * Explanation:
 * countAndSay(1) = "1"
 * countAndSay(2) = say "1" = one 1 = "11"
 * countAndSay(3) = say "11" = two 1s = "21"
 * countAndSay(4) = say "21" = one 2 + one 1 = "1211"
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>n = 4</dd>
 * <dt>Output:</dt>
 * <dd>1211"</dd>
 * <dt>Explanation:</dt>
 * <dd>4th count-and-say term is '1211'</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The count-and-say sequence is built iteratively where each term describes the previous term
 * by counting consecutive identical digits. We read the previous result from left to right,
 * counting how many times each digit appears consecutively, then building a new string.
 *
 * ### APPROACH:
 * 1. **Base Case**: Start with "1" for n=1
 * 2. **Iterative Building**: For each iteration from 2 to n:
 *    - Read through the previous string
 *    - Count consecutive occurrences of each digit
 *    - Build new string by appending count + digit
 * 3. **Two-Pointer Technique**: Use two pointers to identify runs of same digits
 * 4. **String Construction**: Use list for efficient string building
 *
 * ### WHY THIS WORKS:
 * - Each term is uniquely determined by the previous term
 * - We process left to right, counting consecutive identical digits
 * - The pattern is deterministic and follows a clear rule
 * - Building with a list and joining is efficient in Python
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * n = 5:
 * 1. "1"
 * 2. "11" (one 1)
 * 3. "21" (two 1s)
 * 4. "1211" (one 2, one 1)
 * 5. "111221" (one 1, one 2, two 1s)
 *
 * For "1211" → "111221":
 * - Read '1' once: "11"
 * - Read '2' once: "12"
 * - Read '1' twice: "21"
 * - Result: "111221"
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n * m)
 * - n iterations to build up to the nth term
 * - m is the length of the string at each iteration (grows exponentially)
 * - Each iteration processes the entire string once
 *
 * ### SPACE COMPLEXITY:
 * O(m)
 * - m is the length of the current string
 * - We store the result string which grows with each iteration
 *
 * ### EDGE CASES:
 * - n = 1: Return "1" directly
 * - Long sequences: String grows exponentially
 * - All same digits: Still processed character by character
 *
 * </details>
 */

/**
 * Main solution for Problem 38: Count And Say
 *
 * @param {number} n - The position in the count-and-say sequence
 * @return {string} - The nth term in the sequence
 *
 * Time Complexity: O(2^n)
 * Space Complexity: O(2^n)
 */
function solve(n) {
    // Base case
    if (n === 1) return "1";

    // Start with the first term
    let result = "1";

    // Generate each subsequent term
    for (let i = 1; i < n; i++) {
        result = getNextTerm(result);
    }

    return result;
}

/**
 * Helper function to generate the next term from the current term
 *
 * @param {string} s - Current term
 * @return {string} - Next term
 */
function getNextTerm(s) {
    let next = "";
    let i = 0;

    while (i < s.length) {
        let currentChar = s[i];
        let count = 1;

        // Count consecutive identical characters
        while (i + count < s.length && s[i + count] === currentChar) {
            count++;
        }

        // Append count + character
        next += count + currentChar;
        i += count;
    }

    return next;
}

/**
 * Test cases for Problem 38: Count And Say
 */
function testSolution() {
    console.log('Testing 38. Count And Say');

    // Test case 1: n = 1
    const result1 = solve(1);
    const expected1 = "1";
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: n = 2
    const result2 = solve(2);
    const expected2 = "11";
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: n = 3
    const result3 = solve(3);
    const expected3 = "21";
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: n = 4
    const result4 = solve(4);
    const expected4 = "1211";
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: n = 5
    const result5 = solve(5);
    const expected5 = "111221";
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 38. Count And Say!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 38. Count And Say ===');
    console.log('Category: String Manipulation');
    console.log('Difficulty: Medium');
    console.log('');

    // Example demonstration would go here
    testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
    demonstrateSolution();
}

// Export for use in other modules
module.exports = {
    solve,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This solution focuses on string manipulation concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
