/**
 * ### METADATA:
 *
 *
 * ### INTUITION:
 * The key insight is that binary search is the classic divide-and-conquer algorithm for searching
 * in sorted arrays. We repeatedly divide the search space in half by
 * comparing the target with the middle element.
 *
 * ### APPROACH:
 * 1. **Initialize pointers**: Set left=0, right=len(nums)-1
 * 2. **Divide search space**: Calculate mid = (left + right) // 2
 * 3. **Compare and eliminate**:
 *    - If nums[mid] == target: found, return mid
 *    - If nums[mid] < target: search right half (left = mid + 1)
 *    - If nums[mid] > target: search left half (right = mid - 1)
 * 4. **Repeat until found or search space exhausted**
 *
 * ### WHY THIS WORKS:
 * - Sorted array property allows us to eliminate half the elements each iteration
 * - Each comparison reduces search space by 50%
 * - Guarantees O(log n) time complexity
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [-1,0,3,5,9,12], target = 9
 * ```
 *
 * Step 1: left=0, right=5, mid=2, nums[2]=3 < 9, search right
 * Step 2: left=3, right=5, mid=4, nums[4]=9 == 9, found!
 *
 * Output:
 * ```
 * 4
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(log n)**
 * - Binary search or tree height
 *
 * ### SPACE COMPLEXITY:
 * **O(n)** - [Explanation of why this complexity]. The algorithm [describe the operation] which takes **O(n)** space.
 *
 * ### EDGE CASES:
 * - **Empty input**: Handle when input is empty
 * - **Single element**: Handle single-element inputs
 * - **Boundary values**: Handle minimum/maximum valid values
 *
 * *
 */

class Solution {
  search(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (nums[mid] === target) {
        return mid;
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return -1;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.search([-1, 0, 3, 5, 9, 12], 9) === 4 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.search([-1, 0, 3, 5, 9, 12], 2) === -1 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.search([5], 5) === 0 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
