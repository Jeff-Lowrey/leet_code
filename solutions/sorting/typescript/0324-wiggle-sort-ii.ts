/**
 * # Difficulty: Medium
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
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Array, Graph
 * **Patterns**: Graph Pattern
 * **Time Complexity**: O(n log n) - Sorting or divide-and-conquer
 * **Space Complexity**: O(n) - Additional hash map storage
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

class Solution {
  wiggleSort(nums: number[]): void {
    const sorted = [...nums].sort((a, b) => a - b);
    const n = nums.length;
    const mid = Math.floor((n + 1) / 2);

    const small = sorted.slice(0, mid).reverse();
    const large = sorted.slice(mid).reverse();

    for (let i = 0; i < small.length; i++) {
      nums[2 * i] = small[i];
    }
    for (let i = 0; i < large.length; i++) {
      nums[2 * i + 1] = large[i];
    }
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function isStrictWiggle(nums: number[]): boolean {
  for (let i = 0; i < nums.length - 1; i++) {
    if (i % 2 === 0) {
      if (nums[i] >= nums[i + 1]) return false;
    } else {
      if (nums[i] <= nums[i + 1]) return false;
    }
  }
  return true;
}

function runTests(): void {
  const solution = new Solution();

  const nums1 = [1, 5, 1, 1, 6, 4];
  solution.wiggleSort(nums1);
  console.log(`Test 1: ${isStrictWiggle(nums1) ? "PASS" : "FAIL"}`);

  const nums2 = [1, 3, 2, 2, 3, 1];
  solution.wiggleSort(nums2);
  console.log(`Test 2: ${isStrictWiggle(nums2) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
