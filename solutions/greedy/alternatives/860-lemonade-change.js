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
