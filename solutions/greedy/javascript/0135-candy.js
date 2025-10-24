/**
 * # Difficulty: Hard
 *
 * # 135. Candy
 *
 * Difficulty: Medium
 *
 * There are n children standing in a line. Each child is assigned a rating value given
 * in the integer array ratings.
 *
 * You are giving candies to these children subjected to the following requirements:
 * - Each child must have at least one candy.
 * - Children with a higher rating get more candies than their neighbors.
 *
 * Return the minimum number of candies you need to have to distribute the candies to
 * the children.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>Input: ratings = [1,0,2]</dd>
 * <dt>Output:</dt>
 * <dd>See walkthrough</dd>
 * <dt>Explanation:</dt>
 * <dd>Minimum candies to distribute is 5 following the rules</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Hash Map Storage, Array Traversal, Two Pointers
 * **Data Structures**: Array, Tree, Trie
 * **Patterns**: Two Pointers Pattern, Greedy Algorithm
 * **Time Complexity**: * O(n) - Single pass through input
 * **Space Complexity**: * O(n)

 *
 * ### INTUITION:
 * This is a classic greedy problem requiring two passes. The key insight is that we
 * need to satisfy both left and right neighbor constraints independently, then take
 * the maximum to satisfy both.
 *
 * ### APPROACH:
 * 1. **Initialize**: Give each child 1 candy initially
 * 2. **Left to right pass**: If ratings[i] > ratings[i-1], ensure candies[i] > candies[i-1]
 * 3. **Right to left pass**: If ratings[i] > ratings[i+1], ensure candies[i] > candies[i+1]
 * 4. **Sum total**: Return sum of all candies
 *
 * ### WHY THIS WORKS:
 * - **Greedy choice**: We assign minimum necessary candies to satisfy local constraints
 * - **Two passes ensure both directions**:
 *   - Left pass ensures right neighbor constraint
 *   - Right pass ensures left neighbor constraint
 *   - Taking max ensures both constraints satisfied
 * - **Optimality**: Each assignment is minimal, so total is minimal
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * ratings = [1,0,2]
 * ```
 *
 * Initial: candies = [1,1,1]
 * Left to right pass:
 * i=1: ratings[1]=0 < ratings[0]=1, no change
 * candies = [1,1,1]
 * i=2: ratings[2]=2 > ratings[1]=0, candies[2] = candies[1] + 1 = 2
 * candies = [1,1,2]
 * Right to left pass:
 * i=1: ratings[1]=0 < ratings[2]=2, no change
 * candies = [1,1,2]
 * i=0: ratings[0]=1 > ratings[1]=0, candies[0] = max(1, 1+1) = 2
 * candies = [2,1,2]
 * Total: 2 + 1 + 2 = 5

 * ### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
 * Two passes through the array
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 * Array to store candy counts (can be optimized to O(1) with complex logic)
 *
 * ### EDGE CASES:
 * - Single child: Return 1
 * - All same rating: Each gets 1 candy
 * - Strictly increasing: [1,2,3,...,n]
 * - Strictly decreasing: [n,n-1,...,2,1]
 * - Valley pattern: [2,1,2] → [2,1,2]
 * - Peak pattern: [1,2,1] → [1,2,1]
 *
 * </details>
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
  console.log("Testing 135. Candy");

  // Test case 1: Example from problem
  const result1 = solve([1, 0, 2]);
  const expected1 = 5;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Another example
  const result2 = solve([1, 2, 2]);
  const expected2 = 4;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Single child
  const result3 = solve([1]);
  const expected3 = 1;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Strictly increasing
  const result4 = solve([1, 2, 3, 4]);
  const expected4 = 10; // 1+2+3+4
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Strictly decreasing
  const result5 = solve([4, 3, 2, 1]);
  const expected5 = 10; // 4+3+2+1
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  console.log("All test cases passed for 135. Candy!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 135. Candy ===");
  console.log("Category: Greedy");
  console.log("Difficulty: Hard");
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
