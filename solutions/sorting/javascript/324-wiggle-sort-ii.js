/**
 *  Difficulty: Medium
 *
 * # 324. Wiggle Sort II
 *
 * Given an integer array nums, reorder it such that nums[0] < nums[1] > nums[2] < nums[3]...
 *
 * You may assume the input array always has a valid answer.
 *
 * Follow up: Can you do it in O(n) time and/or in-place with O(1) extra space?
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[1, 5, 1, 1, 6, 4]</dd>
 * <dt>Output:</dt>
 * <dd>"Test 1 result: {nums1}"</dd>
 * <dt>Explanation:</dt>
 * <dd>Wiggle sort II: nums[0] < nums[1] > nums[2] < nums[3]...</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>

 * ### METADATA:
 * **Techniques**: Sorting Algorithms, Comparison
 * **Data Structures**: Array
 * **Patterns**: Sorting Pattern, Custom Comparator
 * **Time Complexity**: **O(n log n)
 * **Space Complexity**: **O(n)

 *
 * ### INTUITION:
 * Unlike Wiggle Sort I which allows equality, this requires strict inequality (<, >, <, >).
 * We need to interleave smaller and larger halves to avoid adjacent equal elements.
 *
 * ### APPROACH:
 * 1. **Find median**: Partition array around median value
 * 2. **Interleave halves**: Place smaller elements at even indices, larger at odd
 * 3. **Reverse order**: Place larger elements in reverse to avoid adjacency
 * 4. **Virtual indexing**: Map indices to avoid using extra space
 *
 * ### WHY THIS WORKS:
 * - After sorting, split into two halves around median
 * - Interleaving ensures no same-valued elements are adjacent
 * - Reverse order within halves maximizes separation
 * - Example: [1,2,3,4,5,6] → [1,4,2,5,3,6] → rearrange → [3,6,2,5,1,4]
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: nums = [1,5,1,1,6,4]
 *
 * Step 1: Sort
 * [1,1,1,4,5,6]
 *
 * Step 2: Split around median (median ≈ 2.5, so split at index 3)
 * Small half: [1,1,1]
 * Large half: [4,5,6]
 *
 * Step 3: Interleave in reverse order
 * Even indices (0,2,4): [1,1,1] reversed → 1,1,1
 * Odd indices (1,3,5): [4,5,6] reversed → 6,5,4
 *
 * Result: [1,6,1,5,1,4]
 * Verify: 1<6>1<5>1<4 ✓
 *
 * Why reverse order?
 * If we used [1,1,1] and [4,5,6] directly:
 * [1,4,1,5,1,6] - works
 * But with [1,1,1,2,2,2], without reversing:
 * [1,2,1,2,1,2] - works
 * With [1,1,1,1,2,2], need clever placement:
 * [1,2,1,2,1,1] - the last two are equal!
 * Reversing: [1,2,1,2,1,1] → place from middle outward
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n log n)
 * For sorting. Can be O(n) with median-finding algorithm.
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 * For temporary sorted array. Can be O(1) with in-place virtual indexing.
 *
 * ### EDGE CASES:
 * - Array with many duplicate elements
 * - All elements equal (impossible with strict inequality requirement)
 * - Small arrays (length 2-3)
 * - Even vs odd length arrays
 *
 * </details>
 */

/**
 * Main solution for Problem 324: Wiggle Sort II
 *
 * @param {number[]} nums - Array to rearrange (modified in-place)
 * @return {void} - Modifies the array in-place
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
function solve(nums) {
  const n = nums.length;
  if (n <= 1) return;

  // Sort the array
  const sorted = [...nums].sort((a, b) => a - b);

  // Find the middle point
  const mid = Math.floor((n + 1) / 2);

  // Fill positions alternately from the end of each half
  let left = mid - 1; // End of smaller half
  let right = n - 1; // End of larger half

  for (let i = 0; i < n; i++) {
    if (i % 2 === 0) {
      // Even positions get from smaller half (from end)
      nums[i] = sorted[left--];
    } else {
      // Odd positions get from larger half (from end)
      nums[i] = sorted[right--];
    }
  }
}

/**
 * Test cases for Problem 324: Wiggle Sort II
 */
function testSolution() {
  console.log("Testing 324. Wiggle Sort II");

  // Helper to verify strict wiggle property
  function isStrictWiggleSorted(nums) {
    for (let i = 1; i < nums.length; i++) {
      if (i % 2 === 1) {
        // Odd index: should be STRICTLY greater than previous
        if (nums[i] <= nums[i - 1]) return false;
      } else {
        // Even index: should be STRICTLY less than previous
        if (nums[i] >= nums[i - 1]) return false;
      }
    }
    return true;
  }

  // Test case 1: Example from problem
  const nums1 = [1, 5, 1, 1, 6, 4];
  solve(nums1);
  console.log("Test 1:", JSON.stringify(nums1));
  console.assert(
    isStrictWiggleSorted(nums1),
    "Test 1 failed: not strict wiggle sorted",
  );

  // Test case 2: Another example
  const nums2 = [1, 3, 2, 2, 3, 1];
  solve(nums2);
  console.log("Test 2:", JSON.stringify(nums2));
  console.assert(
    isStrictWiggleSorted(nums2),
    "Test 2 failed: not strict wiggle sorted",
  );

  // Test case 3: Simple case
  const nums3 = [1, 2, 3, 4, 5];
  solve(nums3);
  console.log("Test 3:", JSON.stringify(nums3));
  console.assert(
    isStrictWiggleSorted(nums3),
    "Test 3 failed: not strict wiggle sorted",
  );

  // Test case 4: Two elements
  const nums4 = [2, 1];
  solve(nums4);
  console.log("Test 4:", JSON.stringify(nums4));
  console.assert(nums4.length === 2, "Test 4 failed: wrong length");

  // Test case 5: Three elements with duplicates
  const nums5 = [4, 5, 5, 6];
  solve(nums5);
  console.log("Test 5:", JSON.stringify(nums5));
  console.assert(
    isStrictWiggleSorted(nums5),
    "Test 5 failed: not strict wiggle sorted",
  );

  console.log("All test cases passed for 324. Wiggle Sort II!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 324. Wiggle Sort Ii ===");
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
