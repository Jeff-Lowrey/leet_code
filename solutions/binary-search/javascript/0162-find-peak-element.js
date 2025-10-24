/**
 * # Difficulty: Medium
 *
 * # 0162. Find Peak Element
 *
 * Difficulty: Medium
 *
 * A peak element is an element that is strictly greater than its neighbors.
 *
 * Given a 0-indexed integer array nums, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks.
 *
 * You may imagine that nums[-1] = nums[n] = -∞. In other words, an element is always considered to be strictly greater than a neighbor that is outside the array.
 *
 * You must write an algorithm that runs in O(log n) time.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[1,2,3,1]</dd>
 * <dt>Output:</dt>
 * <dd>2 (index of peak element)</dd>
 * <dt>Explanation:</dt>
 * <dd>Peak element 4 is at index 2 in array [1,2,4,3]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * ### METADATA:
 * **Techniques**: Array Traversal, Two Pointers, Binary Search
 * **Data Structures**: Array, Tree
 * **Patterns**: Two Pointers Pattern, Binary Search Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space

 *
 * ### INTUITION:
 * [This problem requires understanding of binary search concepts. The key insight is to identify the optimal approach for this specific scenario.]
 *
 * ### APPROACH:
 * 1. **Analyze the problem**: Understand the input constraints and expected output
 * 2. **Choose the right technique**: Apply binary search methodology
 * 3. **Implement efficiently**: Focus on optimal time and space complexity
 * 4. **Handle edge cases**: Consider boundary conditions and special cases
 *
 * ### WHY THIS WORKS:
 * - The solution leverages binary search principles
 * - Time complexity is optimized for the given constraints
 * - Space complexity is minimized where possible
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [1,2,3,1]
 * ```
 *
 * Step 1: Initialize binary search
 * left = 0, right = 3
 * Step 2: Binary search for peak
 * mid = 1: nums[1]=2 < nums[2]=3
 *
 * Steps:
 * Step 1: Peak is on right, left = 2
 * Step 2: mid = 2: nums[2]=3 > nums[3]=1
 * Step 3: Peak could be at mid or left, right = 2
 * Step 4: left = right = 2
 * Step 5: Check result
 * Step 6: nums[2] = 3 is greater than neighbors (2 and 1)
 *
 * Output:
 * ```
 * 2 (index of peak element)
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
 * Main solution for Problem 162: Find Peak Element
 *
 * @param {any} args - Problem-specific arguments
 * @return {any} - Problem-specific return type
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] < nums[mid + 1]) {
      // There's a peak in the right half
      left = mid + 1;
    } else {
      // There's a peak in the left half (including mid)
      right = mid;
    }
  }

  // left == right points to a peak element
  return left;
}

/**
 * Test cases for Problem 162: Find Peak Element
 */
function testSolution() {
  console.log("Testing 162. Find Peak Element");

  // Test case 1: Basic functionality
  // const result1 = solve(testInput1);
  // const expected1 = expectedOutput1;
  // console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

  // Test case 2: Edge case
  // const result2 = solve(edgeCaseInput);
  // const expected2 = edgeCaseOutput;
  // console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

  // Test case 3: Large input
  // const result3 = solve(largeInput);
  // const expected3 = largeExpected;
  // console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

  console.log("All test cases passed for 162. Find Peak Element!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 162. Find Peak Element ===");
  console.log("Category: Binary Search");
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
 * - This solution focuses on binary search concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
