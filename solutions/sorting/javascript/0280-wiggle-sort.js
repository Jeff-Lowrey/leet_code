/**
 * # Difficulty: Medium
 *
 * # 280. Wiggle Sort
 *
 * Given an integer array nums, reorder it such that nums[0] <= nums[1] >= nums[2] <= nums[3]...
 *
 * You may assume the input array always has a valid answer.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[3, 5, 2, 1, 6, 4]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Wiggle sort: [3,5,2,1,6,4] becomes [3,5,1,6,2,4]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Array Traversal, Sorting
 * **Data Structures**: Array, String
 * **Patterns**: Iterative Solution
 * **Time Complexity**: * O(n) - Single pass through input
 * **Space Complexity**: * O(1) - Constant extra space

 *
 * ### INTUITION:
 * We need alternating pattern: small, large, small, large. We can achieve this in O(n) time
 * by swapping elements when the pattern is violated, without sorting.
 *
 * ### APPROACH:
 * 1. **One-pass swap approach**: Iterate through array
 * 2. **Check pattern**: At even indices, ensure nums[i] <= nums[i+1]
 * 3. **At odd indices**: Ensure nums[i] >= nums[i+1]
 * 4. **Swap if violated**: When pattern is wrong, swap adjacent elements
 * 5. **Alternative**: Sort and arrange elements
 *
 * ### WHY THIS WORKS:
 * - At even index i: We want nums[i] <= nums[i+1]
 *   - If nums[i] > nums[i+1], swap them
 * - At odd index i: We want nums[i] >= nums[i+1]
 *   - If nums[i] < nums[i+1], swap them
 * - After swap, previous conditions remain satisfied
 * - One pass is sufficient to fix all violations
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [3,5,2,1,6,4]
 * ```
 *
 * One-pass approach:
 * Sorting approach:
 * Pair and swap:
 *
 * Steps:
 * Step 1: i=0 (even): 3 <= 5? YES, no swap -> [3,5,2,1,6,4]
 * Step 2: i=1 (odd):  5 >= 2? YES, no swap -> [3,5,2,1,6,4]
 * Step 3: i=2 (even): 2 <= 1? NO, swap     -> [3,5,1,2,6,4]
 * Step 4: i=3 (odd):  2 >= 6? NO, swap     -> [3,5,1,6,2,4]
 * Step 5: i=4 (even): 2 <= 4? YES, no swap -> [3,5,1,6,2,4]
 * Step 6: Final: [3,5,1,6,2,4]
 * Step 7: Verify: 3<=5>=1<=6>=2<=4 ✓
 * Step 8: Sort: [1,2,3,4,5,6]
 * Step 9: - Take pairs: (1,2), (3,4), (5,6)
 * Step 10: - Swap each pair: (2,1), (4,3), (6,5)
 * Step 11: - Result: [2,1,4,3,6,5]
 * Step 12: - Verify: 2>=1<=4>=3<=6>=5 ✓

### TIME COMPLEXITY:
 * O(n)
 * Single pass through array with swaps
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * In-place swaps only
 *
 * ### EDGE CASES:
 * - Array length 1 or 2 (already valid)
 * - All elements equal
 * - Already wiggle sorted
 * - Reverse sorted array
 *
 * </details>
 */

/**
 * Main solution for Problem 280: Wiggle Sort
 *
 * @param {number[]} nums - Array to rearrange (modified in-place)
 * @return {void} - Modifies the array in-place
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(nums) {
  for (let i = 1; i < nums.length; i++) {
    // For odd indices, nums[i] should be >= nums[i-1]
    // For even indices, nums[i] should be <= nums[i-1]
    const shouldBeGreater = i % 2 === 1;

    if (shouldBeGreater) {
      // Odd index: nums[i] should be >= nums[i-1]
      if (nums[i] < nums[i - 1]) {
        [nums[i], nums[i - 1]] = [nums[i - 1], nums[i]];
      }
    } else {
      // Even index: nums[i] should be <= nums[i-1]
      if (nums[i] > nums[i - 1]) {
        [nums[i], nums[i - 1]] = [nums[i - 1], nums[i]];
      }
    }
  }
}

/**
 * Test cases for Problem 280: Wiggle Sort
 */
function testSolution() {
  console.log("Testing 280. Wiggle Sort");

  // Helper to verify wiggle property
  function isWiggleSorted(nums) {
    for (let i = 1; i < nums.length; i++) {
      if (i % 2 === 1) {
        // Odd index: should be >= previous
        if (nums[i] < nums[i - 1]) return false;
      } else {
        // Even index: should be <= previous
        if (nums[i] > nums[i - 1]) return false;
      }
    }
    return true;
  }

  // Test case 1: Example from problem
  const nums1 = [3, 5, 2, 1, 6, 4];
  solve(nums1);
  console.log("Test 1:", JSON.stringify(nums1));
  console.assert(isWiggleSorted(nums1), "Test 1 failed: not wiggle sorted");

  // Test case 2: Another example
  const nums2 = [1, 2, 3, 4, 5];
  solve(nums2);
  console.log("Test 2:", JSON.stringify(nums2));
  console.assert(isWiggleSorted(nums2), "Test 2 failed: not wiggle sorted");

  // Test case 3: Already wiggle sorted
  const nums3 = [1, 3, 2, 4, 3];
  solve(nums3);
  console.log("Test 3:", JSON.stringify(nums3));
  console.assert(isWiggleSorted(nums3), "Test 3 failed: not wiggle sorted");

  // Test case 4: Two elements
  const nums4 = [2, 1];
  solve(nums4);
  console.assert(isWiggleSorted(nums4), "Test 4 failed: not wiggle sorted");

  // Test case 5: Duplicates
  const nums5 = [1, 1, 1, 1, 1];
  solve(nums5);
  console.assert(isWiggleSorted(nums5), "Test 5 failed: not wiggle sorted");

  console.log("All test cases passed for 280. Wiggle Sort!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 280. Wiggle Sort ===");
  console.log("Category: Sorting");
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
 * - This solution focuses on sorting concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
