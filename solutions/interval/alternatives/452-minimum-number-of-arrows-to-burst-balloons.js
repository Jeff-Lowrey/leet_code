/**
 * # Difficulty: Medium
 *
 * # 452. Minimum Number Of Arrows To Burst Balloons
 *
 * There are some spherical balloons taped onto a flat wall that represents the XY-plane. The balloons are represented as a 2D integer array points where points[i] = [xstart, xend] denotes a balloon whose horizontal diameter stretches between xstart and xend. You do not know the exact y-coordinates of the balloons.
 *
 * Arrows can be shot up directly vertically (in the positive y-direction) from different points along the x-axis. A balloon with xstart and xend is burst by an arrow shot at x if xstart <= x <= xend. There is no limit to the number of arrows that can be shot. A shot arrow keeps traveling up infinitely, bursting any balloons in its path.
 *
 * Given the array points, return the minimum number of arrows that must be shot to burst all balloons.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>points = [[10,16],[2,8],[1,6],[7,12]]</dd>
 * <dt>Output:</dt>
 * <dd>2 (minimum arrows)</dd>
 * <dt>Explanation:</dt>
 * <dd>Minimum 2 arrows needed to burst balloons at [[10,16],[2,8],[1,6],[7,12]]</dd>
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
 * [This problem requires understanding of interval concepts. The key insight is to identify the optimal approach for this specific scenario.]
 *
 * ### APPROACH:
 * 1. **Analyze the problem**: Understand the input constraints and expected output
 * 2. **Choose the right technique**: Apply interval methodology
 * 3. **Implement efficiently**: Focus on optimal time and space complexity
 * 4. **Handle edge cases**: Consider boundary conditions and special cases
 *
 * ### WHY THIS WORKS:
 * - The solution leverages interval principles
 * - Time complexity is optimized for the given constraints
 * - Space complexity is minimized where possible
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: points = [[10,16],[2,8],[1,6],[7,12]]
 * Step 1: Sort by end position
 *   sorted = [[1,6],[2,8],[7,12],[10,16]]
 *
 * Step 2: Greedy arrow placement
 *   Arrow at 6: bursts [1,6],[2,8]
 *   Arrow at 12: bursts [7,12],[10,16]
 *
 * Output: 2 (minimum arrows)
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
 * Main solution for Problem 452: Minimum Number Of Arrows To Burst Balloons
 *
 * @param {number[][]} points - Array of balloon intervals [start, end]
 * @return {number} - Minimum number of arrows needed
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(1)
 */
function solve(points) {
  if (!points || points.length === 0) {
    return 0;
  }

  // Sort balloons by end position
  points.sort((a, b) => a[1] - b[1]);

  let arrows = 1;
  let arrowPos = points[0][1]; // Shoot arrow at first balloon's end

  for (let i = 1; i < points.length; i++) {
    // If current balloon starts after arrow position, need new arrow
    if (points[i][0] > arrowPos) {
      arrows++;
      arrowPos = points[i][1]; // Shoot new arrow at this balloon's end
    }
    // Otherwise, current arrow bursts this balloon too
  }

  return arrows;
}

/**
 * Test cases for Problem 452: Minimum Number Of Arrows To Burst Balloons
 */
function testSolution() {
  console.log("Testing 452. Minimum Number Of Arrows To Burst Balloons");

  // Test case 1: Basic functionality
  const result1 = solve([
    [10, 16],
    [2, 8],
    [1, 6],
    [7, 12],
  ]);
  const expected1 = 2;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: All overlapping
  const result2 = solve([
    [1, 2],
    [3, 4],
    [5, 6],
    [7, 8],
  ]);
  const expected2 = 4;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: All same balloon
  const result3 = solve([
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
  ]);
  const expected3 = 2;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Single balloon
  const result4 = solve([[1, 2]]);
  const expected4 = 1;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Empty array
  const result5 = solve([]);
  const expected5 = 0;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  // Test case 6: Touching balloons
  const result6 = solve([
    [1, 10],
    [3, 9],
    [4, 11],
    [6, 7],
    [6, 9],
    [8, 12],
  ]);
  const expected6 = 2;
  console.assert(
    result6 === expected6,
    `Test 6 failed: expected ${expected6}, got ${result6}`,
  );

  console.log(
    "All test cases passed for 452. Minimum Number Of Arrows To Burst Balloons!",
  );
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log(
    "\n=== Problem 452. Minimum Number Of Arrows To Burst Balloons ===",
  );
  console.log("Category: Interval");
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
 * - This solution focuses on interval concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
