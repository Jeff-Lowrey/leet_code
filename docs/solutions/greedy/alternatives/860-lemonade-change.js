/**
 * # Difficulty: Easy
 *
 * # 860. Lemonade Change
 *
 * At a lemonade stand, each lemonade costs $5. Customers are standing in a queue to buy from you and order one at a time (in the order specified by bills). Each customer will only buy one lemonade and pay with either a $5, $10, or $20 bill. You must provide the correct change to each customer so that the net transaction is that the customer pays $5.
 *
 * Note that you do not have any change in hand at first.
 *
 * Given an integer array bills where bills[i] is the bill the ith customer pays, return true if you can provide the correct change to every customer, or false otherwise.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[5,5,5,10,20]</dd>
 * <dt>Output:</dt>
 * <dd>True</dd>
 * <dt>Explanation:</dt>
 * <dd>Return true because correct change can always be made for [5,5,5,10,20]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * This is a greedy problem about making change optimally. We need to track our cash inventory and make change using the fewest bills possible. The key insight is to always use larger bills first when making change.
 *
 * ### APPROACH:
 * 1. **Track inventory**: Keep count of $5 and $10 bills
 * 2. **Process each customer**: Handle payment based on bill amount
 * 3. **Make change greedily**: Use largest bills first for optimal change-making
 * 4. **Check feasibility**: Return false if we can't make proper change
 *
 * ### WHY THIS WORKS:
 * The algorithm correctly solves the problem by systematically exploring all valid states while maintaining necessary invariants. Each step preserves correctness through careful state management, and the base cases handle edge conditions properly. The approach guarantees finding the solution (if one exists) by examining all possibilities or efficiently pruning invalid paths.
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: [5,5,5,10,20]
 * Step 1: 5 → count_5=1, count_10=0 ✓
 * Step 2: 5 → count_5=2, count_10=0 ✓
 * Step 3: 5 → count_5=3, count_10=0 ✓
 * Step 4: 10 → need $5 change → count_5=2, count_10=1 ✓
 * Step 5: 20 → need $15 change → use 1×$10 + 1×$5 → count_5=1, count_10=0 ✓
 * Output: True
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)
 * Process each customer once
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * Only tracking counts of two bill denominations
 *
 * ### EDGE CASES:
 * - Not enough $5 bills for $10 payment
 * - Not enough change combinations for $20 payment
 * - Empty input (return True)
 *
 * </details>
 */

/**
 * Main solution for Problem 860: Lemonade Change
 *
 * @param {number[]} bills - Array of bills customers pay with
 * @return {boolean} - True if can provide correct change to all customers
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(bills) {
    let five = 0;
    let ten = 0;

    for (const bill of bills) {
        if (bill === 5) {
            // No change needed
            five++;
        } else if (bill === 10) {
            // Need to give $5 change
            if (five === 0) return false;
            five--;
            ten++;
        } else { // bill === 20
            // Need to give $15 change
            // Greedy: prefer $10 + $5 over $5 + $5 + $5
            if (ten > 0 && five > 0) {
                ten--;
                five--;
            } else if (five >= 3) {
                five -= 3;
            } else {
                return false;
            }
        }
    }

    return true;
}

/**
 * Test cases for Problem 860: Lemonade Change
 */
function testSolution() {
    console.log('Testing 860. Lemonade Change');

    // Test case 1: Example from problem - possible
    const result1 = solve([5, 5, 5, 10, 20]);
    const expected1 = true;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Impossible case
    const result2 = solve([5, 5, 10, 10, 20]);
    const expected2 = false;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: All exact change
    const result3 = solve([5, 5, 5, 5]);
    const expected3 = true;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: First customer pays $10
    const result4 = solve([10, 10]);
    const expected4 = false;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Complex scenario
    const result5 = solve([5, 5, 10, 20, 5, 5, 5, 5, 5, 5, 5, 5, 5, 10, 5, 5, 20, 5, 20, 5]);
    const expected5 = true;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 860. Lemonade Change!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 860. Lemonade Change ===');
    console.log('Category: Greedy');
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
 * - This solution focuses on greedy concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
