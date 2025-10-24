/**
 * # Difficulty: Medium
 *
 * # 0075. Sort Colors
 *
 * Difficulty: Easy
 *
 * Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.
 *
 * We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.
 *
 * You must solve this problem without using the library's sort function.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>nums = [2, 0, 2, 1, 1, 0]</dd>
 * <dt>Output:</dt>
 * <dd>[0, 0, 1, 1, 2, 2]</dd>
 * <dt>Explanation:</dt>
 * <dd>Sort colors [2,0,2,1,1,0] in-place to [0,0,1,1,2,2]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * ### METADATA:
 * **Techniques**: Hash Map Storage, Array Traversal
 * **Data Structures**: Array, String, Linked List
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
 * nums = [2, 0, 2, 1, 1, 0]
 * ```
 *
 * Step 1: Initialize pointers
 * left = 0, current = 0, right = 5
 * Array: [2, 0, 2, 1, 1, 0]
 * Step 2: current=0, nums[0]=2
 * Swap with right: [0, 0, 2, 1, 1, 2]
 * right = 4, current stays at 0
 * Step 3: current=0, nums[0]=0
 * Swap with left: [0, 0, 2, 1, 1, 2]
 * left = 1, current = 1
 * Step 4: current=1, nums[1]=0
 * Swap with left: [0, 0, 2, 1, 1, 2]
 * left = 2, current = 2
 * Step 5: current=2, nums[2]=2
 * Swap with right: [0, 0, 1, 1, 2, 2]
 * right = 3, current stays at 2
 * Step 6: current=2, nums[2]=1
 * Move current: current = 3
 * Step 7: current=3, nums[3]=1
 * Move current: current = 4
 * Step 8: current=4, right=3, stop (current > right)
 *
 * Output:
 * ```
 * [0, 0, 1, 1, 2, 2]
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
 * Main solution for Problem 075: Sort Colors
 *
 * @param {number[]} nums - Array with values 0, 1, 2 representing red, white, blue
 * @return {void} - Sorts array in-place, does not return anything
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(nums) {
  // Edge case: empty or single element
  if (!nums || nums.length <= 1) {
    return;
  }

  let low = 0; // Pointer for next position of 0
  let mid = 0; // Current element being examined
  let high = nums.length - 1; // Pointer for next position of 2

  while (mid <= high) {
    if (nums[mid] === 0) {
      // Swap 0 to the front
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++;
      mid++;
    } else if (nums[mid] === 1) {
      // 1 is in correct position, just move forward
      mid++;
    } else {
      // nums[mid] === 2
      // Swap 2 to the back
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;
      // Don't increment mid yet, need to examine swapped element
    }
  }
}

/**
 * Test cases for Problem 075: Sort Colors
 */
function testSolution() {
  console.log("Testing 075. Sort Colors");

  // Test case 1: Example from problem
  const nums1 = [2, 0, 2, 1, 1, 0];
  solve(nums1);
  const expected1 = [0, 0, 1, 1, 2, 2];
  console.assert(
    nums1.toString() === expected1.toString(),
    `Test 1 failed: expected ${expected1}, got ${nums1}`,
  );
  console.log(`Test 1 passed: sortColors([2,0,2,1,1,0]) = [${nums1}]`);

  // Test case 2: Another example
  const nums2 = [2, 0, 1];
  solve(nums2);
  const expected2 = [0, 1, 2];
  console.assert(
    nums2.toString() === expected2.toString(),
    `Test 2 failed: expected ${expected2}, got ${nums2}`,
  );
  console.log(`Test 2 passed: sortColors([2,0,1]) = [${nums2}]`);

  // Test case 3: All same color
  const nums3 = [1, 1, 1, 1];
  solve(nums3);
  const expected3 = [1, 1, 1, 1];
  console.assert(
    nums3.toString() === expected3.toString(),
    `Test 3 failed: expected ${expected3}, got ${nums3}`,
  );
  console.log(`Test 3 passed: sortColors([1,1,1,1]) = [${nums3}]`);

  // Test case 4: Already sorted
  const nums4 = [0, 0, 1, 1, 2, 2];
  solve(nums4);
  const expected4 = [0, 0, 1, 1, 2, 2];
  console.assert(
    nums4.toString() === expected4.toString(),
    `Test 4 failed: expected ${expected4}, got ${nums4}`,
  );
  console.log(`Test 4 passed: sortColors([0,0,1,1,2,2]) = [${nums4}]`);

  // Test case 5: Reverse sorted
  const nums5 = [2, 2, 1, 1, 0, 0];
  solve(nums5);
  const expected5 = [0, 0, 1, 1, 2, 2];
  console.assert(
    nums5.toString() === expected5.toString(),
    `Test 5 failed: expected ${expected5}, got ${nums5}`,
  );
  console.log(`Test 5 passed: sortColors([2,2,1,1,0,0]) = [${nums5}]`);

  // Test case 6: Single element
  const nums6 = [0];
  solve(nums6);
  const expected6 = [0];
  console.assert(
    nums6.toString() === expected6.toString(),
    `Test 6 failed: expected ${expected6}, got ${nums6}`,
  );
  console.log(`Test 6 passed: sortColors([0]) = [${nums6}]`);

  console.log("All test cases passed for 075. Sort Colors!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 075. Sort Colors ===");
  console.log("Category: Two Pointers");
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
 * - This is the classic Dutch National Flag problem by Edsger Dijkstra
 * - The three-way partitioning technique is elegant and efficient
 * - One-pass solution with O(1) space is optimal
 * - The key is understanding why we don't increment mid after swapping with high
 */
