/**
 * # Difficulty: Medium
 *
 * # 134. Gas Station
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
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Array Traversal, Greedy Selection
 * **Data Structures**: Array, Linked List
 * **Patterns**: Greedy Algorithm, Tree Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
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
 * ```
 * Input: gas = [1,2,3,4,5], cost = [3,4,5,1,2]
 *
 * Check total: sum(gas) = 15, sum(cost) = 15 (feasible)
 *
 * Start at index 0:
 *   i=0: current_gas = 0 + (1-3) = -2 (negative!)
 *   Reset start to 1, current_gas = 0
 *
 * Start at index 1:
 *   i=1: current_gas = 0 + (2-4) = -2 (negative!)
 *   Reset start to 2, current_gas = 0
 *
 * Start at index 2:
 *   i=2: current_gas = 0 + (3-5) = -2 (negative!)
 *   Reset start to 3, current_gas = 0
 *
 * Start at index 3:
 *   i=3: current_gas = 0 + (4-1) = 3 ✓
 *   i=4: current_gas = 3 + (5-2) = 6 ✓
 *
 * All positions checked, total_gas >= 0
 * Output: 3
 * ```
 *
 * ### TIME COMPLEXITY:
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

class Solution {
  canCompleteCircuit(gas: number[], cost: number[]): number {
    let totalGas = 0;
    let totalCost = 0;
    let currentGas = 0;
    let startIndex = 0;

    for (let i = 0; i < gas.length; i++) {
      totalGas += gas[i];
      totalCost += cost[i];
      currentGas += gas[i] - cost[i];

      if (currentGas < 0) {
        startIndex = i + 1;
        currentGas = 0;
      }
    }

    return totalGas >= totalCost ? startIndex : -1;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(
    `Test 1: ${solution.canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]) === 3 ? "PASS" : "FAIL"}`
  );
  console.log(
    `Test 2: ${solution.canCompleteCircuit([2, 3, 4], [3, 4, 3]) === -1 ? "PASS" : "FAIL"}`
  );
  console.log(`Test 3: ${solution.canCompleteCircuit([5], [4]) === 0 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
