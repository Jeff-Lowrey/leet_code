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
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Array, Stack
 * **Patterns**: Hash Table Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Use monotonic decreasing stack storing indices. When current temperature > stack top temperature, pop and calculate days waited (current index - popped index). Remaining indices have no warmer day.
 *
 * ### APPROACH:
 * 1. **Initialize result and stack**: result = [0] * len(temperatures), stack = []
 * 2. **Iterate through temperatures**: For i, temp in enumerate(temperatures)
 * 3. **Process stack**: While stack and temp > temperatures[stack[-1]]
 * 4. **Calculate days**: prev_idx = stack.pop(), result[prev_idx] = i - prev_idx
 * 5. **Push current**: Append i to stack
 * 6. **Return result**: Return result array
 *
 * ### WHY THIS WORKS:
 * - Monotonic decreasing stack stores indices of days waiting for warmer temperature
 * - When warmer day found, pop all cooler days and calculate their wait times
 * - Current index - popped index gives days waited
 * - Days still in stack at end have answer 0 (no warmer day)
 * - O(n) time: each element pushed/popped once, O(n) space for stack
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

class Solution {
  /**
   * Calculate the number of days until a warmer temperature occurs.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  dailyTemperatures(temperatures: number[]): number[] {
    const n = temperatures.length;
    const result: number[] = new Array(n).fill(0);
    const stack: number[] = []; // Stack to store indices of temperatures

    // Process each temperature
    for (let currDay = 0; currDay < n; currDay++) {
      const currTemp = temperatures[currDay];

      // While stack is not empty and current temperature is warmer
      // than temperature at top of stack
      while (stack.length > 0 && temperatures[stack[stack.length - 1]] < currTemp) {
        const prevDay = stack.pop()!;
        result[prevDay] = currDay - prevDay;
      }

      // Add current day to stack
      stack.push(currDay);
    }

    return result;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  // Test case 1: Example from problem
  const result1 = solution.dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]);
  console.log(`Test 1: ${JSON.stringify(result1) === JSON.stringify([1, 1, 4, 2, 1, 1, 0, 0]) ? "PASS" : "FAIL"}`);

  // Test case 2: All decreasing temperatures
  const result2 = solution.dailyTemperatures([30, 40, 50, 60]);
  console.log(`Test 2: ${JSON.stringify(result2) === JSON.stringify([1, 1, 1, 0]) ? "PASS" : "FAIL"}`);

  // Test case 3: All same temperatures
  const result3 = solution.dailyTemperatures([30, 30, 30, 30]);
  console.log(`Test 3: ${JSON.stringify(result3) === JSON.stringify([0, 0, 0, 0]) ? "PASS" : "FAIL"}`);

  // Test case 4: Single element
  const result4 = solution.dailyTemperatures([100]);
  console.log(`Test 4: ${JSON.stringify(result4) === JSON.stringify([0]) ? "PASS" : "FAIL"}`);

  // Test case 5: Two elements - warmer next day
  const result5 = solution.dailyTemperatures([30, 60]);
  console.log(`Test 5: ${JSON.stringify(result5) === JSON.stringify([1, 0]) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
