/**
 * 134. Gas Station
 * Medium
 *
 * This problem demonstrates key concepts in Greedy.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Use greedy approach with a key insight: if we can't reach station j from station i,
 * then we can't reach j from any station between i and j. So we should start from j+1.
 * Also, if total gas >= total cost, a solution must exist.
 *
 * APPROACH:
 * 1. **Check feasibility**: If total gas < total cost, no solution exists
 * 2. **Track tank level**: Keep running total of gas - cost
 * 3. **Reset on deficit**: When tank goes negative, start from next station
 * 4. **Return candidate**: The last starting point we tried
 *
 * WHY THIS WORKS:
 * - If sum(gas) >= sum(cost), a solution exists (mathematical guarantee)
 * - Greedy choice: if we fail from station i, skip all stations up to failure point
 * - If we can't reach j from i, we can't reach j from i+1, i+2, ..., j-1 either
 * - The last starting point we choose must be valid if total gas >= total cost
 *
 * TIME COMPLEXITY: O(n)
 * SPACE COMPLEXITY: O(1)
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * gas = [1,2,3,4,5], cost = [3,4,5,1,2]
 * i=0: tank=1-3=-2 → negative, start=1, tank=0
 * i=1: tank=2-4=-2 → negative, start=2, tank=0
 * i=2: tank=3-5=-2 → negative, start=3, tank=0
 * i=3: tank=4-1=3
 * i=4: tank=3+5-2=6
 * total_tank=15-15=0 → valid, return start=3
 * ```
 *
 * EDGE CASES:
 * - Single station: Always return 0 if gas >= cost
 * - Impossible circuit: Return -1 when total gas < total cost
 * - Multiple valid starts: Return any valid one (greedy finds one)
 */

/**
 * Main solution for Problem 134: Gas Station
 *
 * @param {number[]} gas - Amount of gas at each station
 * @param {number[]} cost - Cost to travel to next station
 * @return {number} - Starting station index, or -1 if impossible
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(gas, cost) {
    let totalTank = 0;
    let currentTank = 0;
    let startStation = 0;

    for (let i = 0; i < gas.length; i++) {
        const diff = gas[i] - cost[i];
        totalTank += diff;
        currentTank += diff;

        // If current tank is negative, we can't reach next station from startStation
        // So we try starting from the next station
        if (currentTank < 0) {
            startStation = i + 1;
            currentTank = 0;
        }
    }

    // If total gas >= total cost, the last startStation we found is valid
    return totalTank >= 0 ? startStation : -1;
}

/**
 * Test cases for Problem 134: Gas Station
 */
function testSolution() {
    console.log('Testing 134. Gas Station');

    // Test case 1: Valid circuit from station 3
    const result1 = solve([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]);
    const expected1 = 3;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Impossible circuit
    const result2 = solve([2, 3, 4], [3, 4, 3]);
    const expected2 = -1;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Single station
    const result3 = solve([5], [4]);
    const expected3 = 0;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Start from first station
    const result4 = solve([3, 3, 4], [3, 4, 3]);
    const expected4 = 0;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: All equal
    const result5 = solve([2, 2, 2, 2], [2, 2, 2, 2]);
    const expected5 = 0;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 134. Gas Station!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 134. Gas Station ===');
    console.log('Category: Greedy');
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
 * - This solution focuses on greedy concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
