/**

 *
 * This problem demonstrates key concepts in String Manipulation.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Add two binary strings just like you would add decimal numbers by hand:
 * start from the rightmost digits, add them with any carry, and move left.
 *
 * APPROACH:





 *
 * WHY THIS WORKS:
 * Binary addition follows the same principles as decimal addition:
 * 0 + 0 = 0, 0 + 1 = 1, 1 + 1 = 10 (0 with carry 1)
 *
 * TIME COMPLEXITY: O(max(m, n))
 * - Where m and n are the lengths of the two strings
 * SPACE COMPLEXITY: O(max(m, n))
 * - Result string will be at most max(m, n) + 1 characters
 *
 * EXAMPLE WALKTHROUGH:
 * Input: a = "1010", b = "1011"
 * Step 1: 0 + 1 = 1, carry = 0
 * Step 2: 1 + 1 = 0, carry = 1
 * Step 3: 0 + 0 + carry = 1, carry = 0
 * Step 4: 1 + 1 = 0, carry = 1
 * Step 5: Add carry = 1
 * Output: "10101"
 *
 * EDGE CASES:
 * - Different length strings: Pad with implicit zeros
 * - Result has extra digit from final carry
 * - One or both strings are "0"
 */

/**
 * Main solution for Problem 67: Add Binary
 *
 * @param {string} a - First binary string
 * @param {string} b - Second binary string
 * @return {string} - Sum as binary string
 *
 * Time Complexity: O(max(m, n))
 * Space Complexity: O(max(m, n))
 */
function solve(a, b) {
    let result = '';
    let carry = 0;
    let i = a.length - 1;
    let j = b.length - 1;

    // Process both strings from right to left
    while (i >= 0 || j >= 0 || carry > 0) {
        // Get current digits (0 if we've exhausted the string)
        const digitA = i >= 0 ? parseInt(a[i]) : 0;
        const digitB = j >= 0 ? parseInt(b[j]) : 0;

        // Calculate sum and new carry
        const sum = digitA + digitB + carry;
        result = (sum % 2) + result;
        carry = Math.floor(sum / 2);

        i--;
        j--;
    }

    return result;
}

/**
 * Test cases for Problem 67: Add Binary
 */
function testSolution() {
    console.log('Testing 67. Add Binary');

    // Test case 1: Basic addition
    const result1 = solve("11", "1");
    const expected1 = "100";
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Equal length strings
    const result2 = solve("1010", "1011");
    const expected2 = "10101";
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Adding zeros
    const result3 = solve("0", "0");
    const expected3 = "0";
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Different lengths
    const result4 = solve("1111", "1");
    const expected4 = "10000";
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Single digits
    const result5 = solve("1", "1");
    const expected5 = "10";
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 67. Add Binary!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 67. Add Binary ===');
    console.log('Category: String Manipulation');
    console.log('Difficulty: Easy');
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
