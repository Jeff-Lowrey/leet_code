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
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Map Storage, Array Traversal, Two Pointers
 * **Data Structures**: Array, Tree, Linked List
 * **Patterns**: Two Pointers Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
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
 * ```
 * Input: nums = [3,5,2,1,6,4]
 *
 * One-pass approach:
 * i=0 (even): 3 <= 5? YES, no swap -> [3,5,2,1,6,4]
 * i=1 (odd):  5 >= 2? YES, no swap -> [3,5,2,1,6,4]
 * i=2 (even): 2 <= 1? NO, swap     -> [3,5,1,2,6,4]
 * i=3 (odd):  2 >= 6? NO, swap     -> [3,5,1,6,2,4]
 * i=4 (even): 2 <= 4? YES, no swap -> [3,5,1,6,2,4]
 *
 * Final: [3,5,1,6,2,4]
 * Verify: 3<=5>=1<=6>=2<=4 ✓
 *
 * Sorting approach:
 * Sort: [1,2,3,4,5,6]
 * Pair and swap:
 * - Take pairs: (1,2), (3,4), (5,6)
 * - Swap each pair: (2,1), (4,3), (6,5)
 * - Result: [2,1,4,3,6,5]
 * - Verify: 2>=1<=4>=3<=6>=5 ✓
 * ```
 *
 * ### TIME COMPLEXITY:
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

class Solution {
  wiggleSort(nums: number[]): void {
    for (let i = 0; i < nums.length - 1; i++) {
      if ((i % 2 === 0 && nums[i] > nums[i + 1]) || (i % 2 === 1 && nums[i] < nums[i + 1])) {
        [nums[i], nums[i + 1]] = [nums[i + 1], nums[i]];
      }
    }
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function isWiggleSorted(nums: number[]): boolean {
  for (let i = 0; i < nums.length - 1; i++) {
    if (i % 2 === 0) {
      if (nums[i] > nums[i + 1]) return false;
    } else {
      if (nums[i] < nums[i + 1]) return false;
    }
  }
  return true;
}

function runTests(): void {
  const solution = new Solution();

  const nums1 = [3, 5, 2, 1, 6, 4];
  solution.wiggleSort(nums1);
  console.log(`Test 1: ${isWiggleSorted(nums1) ? "PASS" : "FAIL"}`);

  const nums2 = [1, 2, 3, 4, 5];
  solution.wiggleSort(nums2);
  console.log(`Test 2: ${isWiggleSorted(nums2) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
