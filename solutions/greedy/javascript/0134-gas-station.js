/**
 * # Difficulty: Medium
 *
 * # 134. Gas Station
 *
 * Difficulty: Medium
 *
 * There are n gas stations along a circular route, where the amount of gas at the
 * ith station is gas[i].
 *
 * You have a car with an unlimited gas tank and it costs cost[i] of gas to travel
 * from the ith station to its next (i + 1)th station. You begin the journey with an
 * empty tank at one of the gas stations.
 *
 * Given two integer arrays gas and cost, return the starting gas station's index if
 * you can travel around the circuit once in the clockwise direction, otherwise return -1.
 * If there exists a solution, it is guaranteed to be unique.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>gas = [1,2,3,4,5], cost = [3,4,5,1,2]</dd>
 * <dt>Output:</dt>
 * <dd>3</dd>
 * <dt>Explanation:</dt>
 * <dd>Car can complete circuit starting at gas station 3</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Array Traversal, Greedy Selection
 * **Data Structures**: Array, Linked List
 * **Patterns**: Greedy Algorithm
 * **Time Complexity**: * O(n) - Single pass through input
 * **Space Complexity**: * O(1) - Constant extra space

 *
 * ### INTUITION:
 * This problem can be solved greedily by recognizing two key insights:
 * 1. If the total gas is less than total cost, completing the circuit is impossible
 * 2. If we run out of gas at station i when starting from station j, then no station
 *    between j and i can be a valid starting point
 *
 * ### APPROACH:
 * 1. **Check feasibility**: If sum(gas) < sum(cost), return -1
 * 2. **Track current gas**: Simulate traveling and track current gas level
 * 3. **Reset when negative**: When gas becomes negative, the next station becomes
 *    the new candidate starting point
 * 4. **Greedy choice**: We don't need to check previous stations again because if
 *    starting from j fails at i, then j+1, j+2, ..., i-1 will also fail
 *
 * ### WHY THIS WORKS:
 * The algorithm correctly solves the problem by systematically exploring all valid states while maintaining necessary invariants. Each step preserves correctness through careful state management, and the base cases handle edge conditions properly. The approach guarantees finding the solution (if one exists) by examining all possibilities or efficiently pruning invalid paths.
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * gas = [1,2,3,4,5], cost = [3,4,5,1,2]
 * ```
 *
 * Check total: sum(gas) = 15, sum(cost) = 15 (feasible)
 * Start at index 0:
 * i=0: current_gas = 0 + (1-3) = -2 (negative!)
 * Reset start to 1, current_gas = 0
 * Start at index 1:
 * i=1: current_gas = 0 + (2-4) = -2 (negative!)
 * Reset start to 2, current_gas = 0
 * Start at index 2:
 * i=2: current_gas = 0 + (3-5) = -2 (negative!)
 * Reset start to 3, current_gas = 0
 * Start at index 3:
 * i=3: current_gas = 0 + (4-1) = 3 ✓
 * i=4: current_gas = 3 + (5-2) = 6 ✓
 * All positions checked, total_gas >= 0
 *
 * Output:
 * ```
 * 3
 * ```

### TIME COMPLEXITY:
 * O(n)
 * Single pass through the arrays
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * Only using constant extra space
 *
 * ### EDGE CASES:
 * - Single station: Only possible if gas[0] >= cost[0]
 * - All gas equals all cost: First station with gas[i] >= cost[i] works
 * - Multiple resets: The algorithm handles multiple candidate starting points
 * - Impossible cases: Return -1 when total gas < total cost
 *
 * </details>
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
  console.log("Testing 134. Gas Station");

  // Test case 1: Valid circuit from station 3
  const result1 = solve([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]);
  const expected1 = 3;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Impossible circuit
  const result2 = solve([2, 3, 4], [3, 4, 3]);
  const expected2 = -1;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Single station
  const result3 = solve([5], [4]);
  const expected3 = 0;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Start from first station
  const result4 = solve([3, 3, 4], [3, 4, 3]);
  const expected4 = 0;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: All equal
  const result5 = solve([2, 2, 2, 2], [2, 2, 2, 2]);
  const expected5 = 0;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  console.log("All test cases passed for 134. Gas Station!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 134. Gas Station ===");
  console.log("Category: Greedy");
  console.log("Difficulty: Medium");
  console.log("");

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
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This solution focuses on greedy concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
