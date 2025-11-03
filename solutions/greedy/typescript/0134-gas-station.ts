/**
### INTUITION:
This problem can be solved greedily by recognizing two key insights:
1. If the total gas is less than total cost, completing the circuit is impossible
2. If we run out of gas at station i when starting from station j, then no station
   between j and i can be a valid starting point

### APPROACH:
1. **Check feasibility**: If sum(gas) < sum(cost), return -1
2. **Track current gas**: Simulate traveling and track current gas level
3. **Reset when negative**: When gas becomes negative, the next station becomes
   the new candidate starting point
4. **Greedy choice**: We don't need to check previous stations again because if
   starting from j fails at i, then j+1, j+2, ..., i-1 will also fail

### WHY THIS WORKS:
The algorithm correctly solves the problem by systematically exploring all valid states while maintaining necessary invariants. Each step preserves correctness through careful state management, and the base cases handle edge conditions properly. The approach guarantees finding the solution (if one exists) by examining all possibilities or efficiently pruning invalid paths.

### EXAMPLE WALKTHROUGH:
Input:
```
gas = [1,2,3,4,5], cost = [3,4,5,1,2]
```

Check total: sum(gas) = 15, sum(cost) = 15 (feasible)
Start at index 0:
i=0: current_gas = 0 + (1-3) = -2 (negative!)
Reset start to 1, current_gas = 0
Start at index 1:
i=1: current_gas = 0 + (2-4) = -2 (negative!)
Reset start to 2, current_gas = 0
Start at index 2:
i=2: current_gas = 0 + (3-5) = -2 (negative!)
Reset start to 3, current_gas = 0
Start at index 3:
i=3: current_gas = 0 + (4-1) = 3 ✓
i=4: current_gas = 3 + (5-2) = 6 ✓
All positions checked, total_gas >= 0

Output:
```
3
```

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
O(n)**
- Single pass through input
Single pass through the arrays

### SPACE COMPLEXITY:
O(1)**
- Constant extra space
Only using constant extra space

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

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
