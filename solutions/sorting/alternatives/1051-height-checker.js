/**
 * # Difficulty: Easy
 *
 * # 1051. Height Checker
 *
 * A school is trying to take an annual photo of all the students. The students are asked to stand in a single file line in non-decreasing order by height. Let this ordering be represented by the integer array expected where expected[i] is the expected height of the ith student in line.
 *
 * You are given an integer array heights representing the current order that the students are standing in. Each heights[i] is the height of the ith student in line (0-indexed).
 *
 * Return the number of indices where heights[i] != expected[i].
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>Input: heights = [1,1,4,2,1,3]</dd>
 * <dt>Output:</dt>
 * <dd>Expected (sorted): [1,1,1,2,3,4]</dd>
 * <dt>Explanation:</dt>
 * <dd>Minimum swaps needed to sort students by height</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * We need to compare the current order with the expected sorted order and count mismatches. The key insight is that the expected order is simply the current array sorted.
 *
 * ### APPROACH:
 * 1. **Create expected array**: Sort the current heights array
 * 2. **Compare arrays**: Count positions where current != expected
 * 3. **Return count**: Number of students in wrong positions
 *
 * ### WHY THIS WORKS:
 * - The expected order is the sorted version of current heights
 * - Any position where current[i] != sorted[i] needs adjustment
 * - Simple comparison gives us the mismatch count
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: heights = [1,1,4,2,1,3]
 * Expected (sorted): [1,1,1,2,3,4]
 *
 * Compare:
 * Current:  [1,1,4,2,1,3]
 * Expected: [1,1,1,2,3,4]
 * Match:     ✓ ✓ ✗ ✓ ✗ ✗
 *
 * Mismatches at indices: 2, 4, 5
 * Count: 3
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n log n)
 * Due to sorting the array
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 * For the sorted expected array
 *
 * ### EDGE CASES:
 * - **Already sorted**: Return 0 (no mismatches)
 * - **Reverse sorted**: Return n (all positions wrong)
 * - **Single element**: Return 0 (trivially sorted)
 * - **All same heights**: Return 0 (any order is sorted)
 * - **Few elements out of place**: Count specific mismatches
 *
 * </details>
 */

/**
 * Main solution for Problem 1051: Height Checker
 *
 * @param {number[]} heights - Array of student heights
 * @return {number} - Number of students not in correct position
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
function solve(heights) {
  // Create sorted copy
  const expected = [...heights].sort((a, b) => a - b);

  // Count mismatches
  let count = 0;
  for (let i = 0; i < heights.length; i++) {
    if (heights[i] !== expected[i]) {
      count++;
    }
  }

  return count;
}

/**
 * Test cases for Problem 1051: Height Checker
 */
function testSolution() {
  console.log("Testing 1051. Height Checker");

  // Test case 1: Example from problem
  const result1 = solve([1, 1, 4, 2, 1, 3]);
  const expected1 = 3;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Already sorted
  const result2 = solve([1, 2, 3, 4, 5]);
  const expected2 = 0;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Reverse sorted
  const result3 = solve([5, 1, 2, 3, 4]);
  const expected3 = 5;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Single element
  const result4 = solve([1]);
  const expected4 = 0;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  console.log("All test cases passed for 1051. Height Checker!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 1051. Height Checker ===");
  console.log("Category: Sorting");
  console.log("Difficulty: Easy");
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
 * - This solution focuses on sorting concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
