/**

 *
 * This problem demonstrates key concepts in Greedy.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Use two-pass greedy approach. First pass handles left-to-right comparisons,
 * second pass handles right-to-left. Each child must have more candy than
 * neighbors with lower ratings.
 *
 * APPROACH:




 *
 * WHY THIS WORKS:
 * - Two passes ensure we satisfy both left and right neighbor constraints
 * - Greedy choice: give minimum candies that satisfy immediate constraints
 * - Left pass ensures child has more than left neighbor if rating is higher
 * - Right pass ensures child has more than right neighbor if rating is higher
 * - Taking max in right pass preserves left pass constraints
 *
 * TIME COMPLEXITY: O(n)
 * SPACE COMPLEXITY: O(n) for candies array
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * ratings = [1, 0, 2]
 * Initial: candies = [1, 1, 1]
 *
 * Left-to-right:
 *   i=1: ratings[1]=0 < ratings[0]=1, no change → [1, 1, 1]
 *   i=2: ratings[2]=2 > ratings[1]=0 → candies[2]=2 → [1, 1, 2]
 *
 * Right-to-left:
 *   i=1: ratings[1]=0 < ratings[2]=2, no change → [1, 1, 2]
 *   i=0: ratings[0]=1 > ratings[1]=0 → candies[0]=max(1, 1+1)=2 → [2, 1, 2]
 *
 * Total: 2 + 1 + 2 = 5
 * ```
 *
 * EDGE CASES:
 * - Single child: 1 candy
 * - All same ratings: n candies (1 each)
 * - Strictly increasing: 1+2+3+...+n candies
 * - Strictly decreasing: n+...+3+2+1 candies
 */

/**
 * Main solution for Problem 135: Candy
 *
 * @param {number[]} ratings - Ratings of children
 * @return {number} - Minimum candies needed
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function solve(ratings) {
    const n = ratings.length;
    if (n === 0) return 0;

    const candies = new Array(n).fill(1);

    // Left to right pass
    for (let i = 1; i < n; i++) {
        if (ratings[i] > ratings[i - 1]) {
            candies[i] = candies[i - 1] + 1;
        }
    }

    // Right to left pass
    for (let i = n - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1]) {
            candies[i] = Math.max(candies[i], candies[i + 1] + 1);
        }
    }

    // Sum all candies
    return candies.reduce((sum, candy) => sum + candy, 0);
}

/**
 * Test cases for Problem 135: Candy
 */
function testSolution() {
    console.log('Testing 135. Candy');

    // Test case 1: Example from problem
    const result1 = solve([1, 0, 2]);
    const expected1 = 5;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Another example
    const result2 = solve([1, 2, 2]);
    const expected2 = 4;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Single child
    const result3 = solve([1]);
    const expected3 = 1;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Strictly increasing
    const result4 = solve([1, 2, 3, 4]);
    const expected4 = 10; // 1+2+3+4
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Strictly decreasing
    const result5 = solve([4, 3, 2, 1]);
    const expected5 = 10; // 4+3+2+1
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 135. Candy!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 135. Candy ===');
    console.log('Category: Greedy');
    console.log('Difficulty: Hard');
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
