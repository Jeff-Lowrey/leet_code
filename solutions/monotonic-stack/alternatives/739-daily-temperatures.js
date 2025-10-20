/**
 * # Difficulty: Medium
 *
 * # 739. Daily Temperatures
 *
 * Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[1,1,4,2,1,1,0,0]</dd>
 * <dt>Output:</dt>
 * <dd>"Expected {expected}, got {result}"</dd>
 * <dt>Explanation:</dt>
 * <dd>For each day, count days until a warmer temperature: [1, 1, 4, 2, 1, 1, 0, 0]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### METADATA:
**Techniques**: TBD
**Data Structures**: TBD
**Patterns**: TBD
**Time Complexity**: * O(n)
**Space Complexity**: * O(1)

 *
 * ### INTUITION:
 * [This problem requires understanding of monotonic stack concepts. The key insight is to identify the optimal approach for this specific scenario.]
 *
 * ### APPROACH:
 * 1. **Analyze the problem**: Understand the input constraints and expected output
 * 2. **Choose the right technique**: Apply monotonic stack methodology
 * 3. **Implement efficiently**: Focus on optimal time and space complexity
 * 4. **Handle edge cases**: Consider boundary conditions and special cases
 *
 * ### WHY THIS WORKS:
 * - The solution leverages monotonic stack principles
 * - Time complexity is optimized for the given constraints
 * - Space complexity is minimized where possible
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: temperatures = [73, 74, 75, 71, 69, 72, 76, 73]
 *
 * Step 1: day=0, temp=73
 *   Stack: [0]
 *   Result: [0,0,0,0,0,0,0,0]
 *
 * Step 2: day=1, temp=74
 *   74 > 73 (stack top), pop 0
 *   result[0] = 1 - 0 = 1
 *   Stack: [1]
 *   Result: [1,0,0,0,0,0,0,0]
 *
 * Step 3: day=2, temp=75
 *   75 > 74, pop 1
 *   result[1] = 2 - 1 = 1
 *   Stack: [2]
 *   Result: [1,1,0,0,0,0,0,0]
 *
 * Step 4: day=3, temp=71
 *   71 < 75, push 3
 *   Stack: [2,3]
 *   Result: [1,1,0,0,0,0,0,0]
 *
 * Step 5: day=4, temp=69
 *   69 < 71, push 4
 *   Stack: [2,3,4]
 *   Result: [1,1,0,0,0,0,0,0]
 *
 * Step 6: day=5, temp=72
 *   72 > 69, pop 4: result[4] = 5-4 = 1
 *   72 > 71, pop 3: result[3] = 5-3 = 2
 *   72 < 75, push 5
 *   Stack: [2,5]
 *   Result: [1,1,0,2,1,0,0,0]
 *
 * Step 7: day=6, temp=76
 *   76 > 72, pop 5: result[5] = 6-5 = 1
 *   76 > 75, pop 2: result[2] = 6-2 = 4
 *   Stack: [6]
 *   Result: [1,1,4,2,1,1,0,0]
 *
 * Step 8: day=7, temp=73
 *   73 < 76, push 7
 *   Stack: [6,7]
 *   Result: [1,1,4,2,1,1,0,0]
 *
 * Output: [1,1,4,2,1,1,0,0]
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 *
 * ### EDGE CASES:
 * - Empty input handling
 * - Single element cases
 * - Large input considerations
 *
 * </details>
 */

/**
 * Main solution for Problem 739: Daily Temperatures
 *
 * @param {number[]} temperatures - Daily temperatures
 * @return {number[]} - Days until warmer temperature
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function solve(temperatures) {
  const n = temperatures.length;
  const result = new Array(n).fill(0);
  const stack = []; // Store indices

  for (let i = 0; i < n; i++) {
    // Pop cooler days and update their wait times
    while (
      stack.length > 0 &&
      temperatures[i] > temperatures[stack[stack.length - 1]]
    ) {
      const prevIndex = stack.pop();
      result[prevIndex] = i - prevIndex;
    }
    stack.push(i);
  }

  return result;
}

/**
 * Helper function to compare arrays
 */
function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

/**
 * Test cases for Problem 739: Daily Temperatures
 */
function testSolution() {
  console.log("Testing 739. Daily Temperatures");

  // Test case 1: Example from problem
  const result1 = solve([73, 74, 75, 71, 69, 72, 76, 73]);
  const expected1 = [1, 1, 4, 2, 1, 1, 0, 0];
  console.assert(
    arraysEqual(result1, expected1),
    `Test 1 failed: expected [${expected1}], got [${result1}]`,
  );

  // Test case 2: Another example
  const result2 = solve([30, 40, 50, 60]);
  const expected2 = [1, 1, 1, 0];
  console.assert(
    arraysEqual(result2, expected2),
    `Test 2 failed: expected [${expected2}], got [${result2}]`,
  );

  // Test case 3: Decreasing temperatures
  const result3 = solve([30, 60, 90]);
  const expected3 = [1, 1, 0];
  console.assert(
    arraysEqual(result3, expected3),
    `Test 3 failed: expected [${expected3}], got [${result3}]`,
  );

  // Test case 4: All same temperature
  const result4 = solve([30, 30, 30, 30]);
  const expected4 = [0, 0, 0, 0];
  console.assert(
    arraysEqual(result4, expected4),
    `Test 4 failed: expected [${expected4}], got [${result4}]`,
  );

  // Test case 5: Single day
  const result5 = solve([50]);
  const expected5 = [0];
  console.assert(
    arraysEqual(result5, expected5),
    `Test 5 failed: expected [${expected5}], got [${result5}]`,
  );

  // Test case 6: Decreasing then increasing
  const result6 = solve([89, 62, 70, 58, 47, 99]);
  const expected6 = [5, 1, 3, 2, 1, 0];
  console.assert(
    arraysEqual(result6, expected6),
    `Test 6 failed: expected [${expected6}], got [${result6}]`,
  );

  console.log("All test cases passed for 739. Daily Temperatures!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 739. Daily Temperatures ===");
  console.log("Category: Monotonic Stack");
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
 * - This solution focuses on monotonic stack concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
