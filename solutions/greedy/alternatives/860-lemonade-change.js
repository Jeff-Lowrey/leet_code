/**
 * 860. Lemonade Change
 * Easy
 *
 * This problem demonstrates key concepts in Greedy.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Simulate the cashier process with greedy change-making. When giving change for $20,
 * prefer using $10+$5 over three $5 bills, because $5 bills are more versatile.
 * The greedy choice prioritizes preserving $5 bills.
 *
 * APPROACH:
 * 1. **Track bills**: Keep count of $5 and $10 bills in register
 * 2. **Process each customer**: Handle $5, $10, and $20 bills differently
 * 3. **Make change greedily**: For $20, prefer $10+$5 over $5+$5+$5
 * 4. **Check feasibility**: Return false if we can't make change
 *
 * WHY THIS WORKS:
 * - $5 bills are most versatile (can make any change)
 * - Greedy choice: preserve $5 bills by using $10 when possible
 * - For $20: prefer $10+$5 because it saves two $5 bills
 * - This maximizes our ability to make future change
 *
 * TIME COMPLEXITY: O(n)
 * SPACE COMPLEXITY: O(1)
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * bills = [5,5,5,10,20]
 * Customer 1: $5 → five=1, ten=0
 * Customer 2: $5 → five=2, ten=0
 * Customer 3: $5 → five=3, ten=0
 * Customer 4: $10 → give $5 change → five=2, ten=1
 * Customer 5: $20 → give $10+$5 change → five=1, ten=0
 * Result: true (all customers served)
 * ```
 *
 * EDGE CASES:
 * - First customer pays $10 or $20: Impossible (no change available)
 * - All customers pay exact change: Always possible
 * - Need to give change but out of bills: Return false
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
