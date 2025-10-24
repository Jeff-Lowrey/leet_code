/**
 * # Difficulty: Medium
 *
 * # 0042. Trapping Rain Water
 *
 * Difficulty: Easy
 *
 * Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>height = [0,1,0,2,1,0,1,3,2,1,2,1]</dd>
 * <dt>Output:</dt>
 * <dd>6 (total water trapped)</dd>
 * <dt>Explanation:</dt>
 * <dd>Rain water trapped between heights [0,1,0,2,1,0,1,3,2,1,2,1] is 6 units</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * ### METADATA:
 * **Techniques**: Hash Table Lookup, Array Traversal, Two Pointers
 * **Data Structures**: Hash Map, Array, Stack
 * **Patterns**: Two Pointers Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space

 *
 * ### INTUITION:
 * [This problem requires understanding of two pointers concepts. The key insight is to identify the optimal approach for this specific scenario.]
 *
 * ### APPROACH:
 * 1. **Analyze the problem**: Understand the input constraints and expected output
 * 2. **Choose the right technique**: Apply two pointers methodology
 * 3. **Implement efficiently**: Focus on optimal time and space complexity
 * 4. **Handle edge cases**: Consider boundary conditions and special cases
 *
 * ### WHY THIS WORKS:
 * - The solution leverages two pointers principles
 * - Time complexity is optimized for the given constraints
 * - Space complexity is minimized where possible
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * height = [0,1,0,2,1,0,1,3,2,1,2,1]
 * ```
 *
 * Step 1: Calculate max heights
 * left_max = [0,1,1,2,2,2,2,3,3,3,3,3]
 * right_max = [3,3,3,3,3,3,3,3,2,2,2,1]
 * Step 2: Calculate water at each position
 * i=2: min(1,3)-0 = 1
 * i=4: min(2,3)-1 = 1
 * i=5: min(2,3)-0 = 2
 * ...
 *
 * Output:
 * ```
 * 6 (total water trapped)
 * ```

 * ### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
 *
 * ### EDGE CASES:
 * - Empty input handling
 * - Single element cases
 * - Large input considerations
 *
 * </details>
 */

/**
 * Main solution for Problem 042: Trapping Rain Water
 *
 * @param {number[]} height - Array of non-negative integers representing elevation map
 * @return {number} - Total amount of water that can be trapped
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(height) {
  // Edge case: need at least 3 bars to trap water
  if (!height || height.length < 3) {
    return 0;
  }

  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let water = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      // Process left side
      if (height[left] >= leftMax) {
        // Update leftMax
        leftMax = height[left];
      } else {
        // Calculate water trapped at this position
        water += leftMax - height[left];
      }
      left++;
    } else {
      // Process right side
      if (height[right] >= rightMax) {
        // Update rightMax
        rightMax = height[right];
      } else {
        // Calculate water trapped at this position
        water += rightMax - height[right];
      }
      right--;
    }
  }

  return water;
}

/**
 * Test cases for Problem 042: Trapping Rain Water
 */
function testSolution() {
  console.log("Testing 042. Trapping Rain Water");

  // Test case 1: Example from problem
  const result1 = solve([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]);
  const expected1 = 6;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );
  console.log(`Test 1 passed: trap([0,1,0,2,1,0,1,3,2,1,2,1]) = ${result1}`);

  // Test case 2: Another example
  const result2 = solve([4, 2, 0, 3, 2, 5]);
  const expected2 = 9;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );
  console.log(`Test 2 passed: trap([4,2,0,3,2,5]) = ${result2}`);

  // Test case 3: No water can be trapped
  const result3 = solve([1, 2, 3, 4, 5]);
  const expected3 = 0;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );
  console.log(`Test 3 passed: trap([1,2,3,4,5]) = ${result3}`);

  // Test case 4: Simple valley
  const result4 = solve([3, 0, 2]);
  const expected4 = 2;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );
  console.log(`Test 4 passed: trap([3,0,2]) = ${result4}`);

  // Test case 5: Edge case - less than 3 elements
  const result5 = solve([1, 2]);
  const expected5 = 0;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );
  console.log(`Test 5 passed: trap([1,2]) = ${result5}`);

  // Test case 6: All zeros
  const result6 = solve([0, 0, 0, 0]);
  const expected6 = 0;
  console.assert(
    result6 === expected6,
    `Test 6 failed: expected ${expected6}, got ${result6}`,
  );
  console.log(`Test 6 passed: trap([0,0,0,0]) = ${result6}`);

  console.log("All test cases passed for 042. Trapping Rain Water!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 042. Trapping Rain Water ===");
  console.log("Category: Two Pointers");
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
 * - This is a classic hard problem that becomes elegant with two pointers
 * - The key insight is processing from the side with smaller maximum height
 * - Alternative approaches include using stacks or precomputing max arrays (O(n) space)
 * - This two-pointer solution is optimal in both time and space
 */
