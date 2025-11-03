/**
 * # Difficulty: Medium
 *
 * # 0034. Find First And Last Position Of Element In Sorted Array
 *
 *
 * Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.
 *
 * If target is not found in the array, return [-1, -1].
 *
 * You must write an algorithm with O(log n) runtime complexity.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[5,7,7,8,8,10]</dd>
 * <dt>Output:</dt>
 * <dd>[-1,-1]</dd>
 * <dt>Explanation:</dt>
 * <dd>Target 8 appears at indices [3,4] in sorted array [5,7,7,8,8,10]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Two Pointers
 * **Data Structures**: Array, Tree
 * **Patterns**: Two Pointers Pattern, Binary Search Pattern
 * **Time Complexity**: O(log n) - Binary search or tree height
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * This is a classic binary search problem that requires finding both the leftmost and rightmost positions of a target. The key insight is to perform two separate binary searches: one to find the first occurrence and another to find the last occurrence.
 *
 * ### APPROACH:
 * 1. **First position**: Use binary search to find the leftmost occurrence
 * 2. **Last position**: Use binary search to find the rightmost occurrence
 * 3. **Optimization**: Return early if target not found in first search
 * 4. **Edge cases**: Handle empty array and target not found
 *
 * ### WHY THIS WORKS:
 * - Binary search maintains O(log n) complexity for sorted arrays
 * - Two separate searches isolate first and last positions independently
 * - Template-based approach ensures correctness for boundary conditions
 * - Early termination optimizes performance when target not found
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [5,7,7,8,8,10], target = 8
 * nums = [5,7,7,8,8,10], target = 6
 * ```
 *
 * Step 1: Find first position of 8
 * - Binary search finds index 3 as leftmost 8
 * Step 2: Find last position of 8
 * - Binary search finds index 4 as rightmost 8
 * Step 1: Find first position of 6
 * - Binary search returns -1 (not found)
 *
 * Output:
 * ```
 * [3,4]
 * [-1,-1] (early return)
 * ```

 * ### TIME COMPLEXITY:
 * O(log n)
 * - Binary search or tree height
 * Two binary searches on array of size n
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
 * Only using constant extra space
 *
 * ### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>
 */

class Solution {
  searchRange(nums: number[], target: number): number[] {
    const left = this.findBound(nums, target, true);
    if (left === -1) return [-1, -1];

    const right = this.findBound(nums, target, false);
    return [left, right];
  }

  private findBound(nums: number[], target: number, isLeft: boolean): number {
    let left = 0;
    let right = nums.length - 1;
    let result = -1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (nums[mid] === target) {
        result = mid;
        if (isLeft) {
          right = mid - 1;
        } else {
          left = mid + 1;
        }
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return result;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(
    `Test 1: ${JSON.stringify(solution.searchRange([5, 7, 7, 8, 8, 10], 8)) === JSON.stringify([3, 4]) ? "PASS" : "FAIL"}`
  );
  console.log(
    `Test 2: ${JSON.stringify(solution.searchRange([5, 7, 7, 8, 8, 10], 6)) === JSON.stringify([-1, -1]) ? "PASS" : "FAIL"}`
  );
  console.log(
    `Test 3: ${JSON.stringify(solution.searchRange([], 0)) === JSON.stringify([-1, -1]) ? "PASS" : "FAIL"}`
  );

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
