/**
### INTUITION:
The key insight is that use prefix sum with hash map. For each position, count how many previous positions
have prefix_sum = current_prefix_sum - goal. This gives us all subarrays ending at
current position with sum equal to goal.

### APPROACH:
1. **Hash Map**: Store (prefix_sum → frequency) pairs
2. **Prefix Sum**: Calculate cumulative sum
3. **Count**: For each position, add count of (current_sum - goal) from map
4. **Update**: Add current sum to map for future positions

### WHY THIS WORKS:
If prefix[j] - prefix[i] = goal, then sum(nums[i+1:j+1]) = goal.
For each j, count all i where prefix[i] = prefix[j] - goal.

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [1,0,1,0,1], goal = 2
```

Prefix sums: [1, 1, 2, 2, 3]
Initialize: {0: 1}  # prefix sum 0 at position -1
Index 0: sum=1, need 1-2=-1 (not found), count=0, add {0:1, 1:1}
Index 1: sum=1, need 1-2=-1 (not found), count=0, add {0:1, 1:2}
Index 2: sum=2, need 2-2=0 (found 1), count=1, add {0:1, 1:2, 2:1}
Index 3: sum=2, need 2-2=0 (found 1), count=2, add {0:1, 1:2, 2:2}
Index 4: sum=3, need 3-2=1 (found 2), count=4
Total: 4

Output:
```
[Expected output]
```

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
O(n)**
- Single pass through input

### SPACE COMPLEXITY:
O(n)**
- Additional hash map storage

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

*/

/**
 * Main solution for Problem 930: Binary Subarrays With Sum
 *
 * @param {number[]} nums - Binary array (0s and 1s)
 * @param {number} goal - Target sum
 * @return {number} - Number of subarrays with sum equal to goal
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function solve(nums, goal) {
  // Map to store frequency of each prefix sum
  const prefixSumCount = new Map();
  prefixSumCount.set(0, 1); // Base case: sum 0 appears once

  let currentSum = 0;
  let count = 0;

  for (const num of nums) {
    currentSum += num;

    // Check if there's a prefix sum that gives us the goal
    // We need: currentSum - previousSum = goal
    // So: previousSum = currentSum - goal
    const needed = currentSum - goal;
    if (prefixSumCount.has(needed)) {
      count += prefixSumCount.get(needed);
    }

    // Update frequency of current sum
    prefixSumCount.set(currentSum, (prefixSumCount.get(currentSum) || 0) + 1);
  }

  return count;
}

/**
 * Test cases for Problem 930: Binary Subarrays With Sum
 */
function testSolution() {
  console.log("Testing 930. Binary Subarrays With Sum");

  // Test case 1: Example 1
  const result1 = solve([1, 0, 1, 0, 1], 2);
  const expected1 = 4;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Example 2
  const result2 = solve([0, 0, 0, 0, 0], 0);
  const expected2 = 15;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: All ones with goal 3
  const result3 = solve([1, 1, 1, 1], 3);
  const expected3 = 2;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Single element matching goal
  const result4 = solve([1], 1);
  const expected4 = 1;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Goal = 0 with mix
  const result5 = solve([0, 1, 0], 0);
  const expected5 = 2;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  console.log("All test cases passed for 930. Binary Subarrays With Sum!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 930. Binary Subarrays With Sum ===");
  console.log("Category: Prefix Sum");
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
 * - This solution focuses on prefix sum concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
