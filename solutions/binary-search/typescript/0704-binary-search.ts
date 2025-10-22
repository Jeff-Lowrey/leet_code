/**
 * # Difficulty: Easy
 *
 * # 704. Binary Search
 *
 * Given an array of integers nums which is sorted in ascending order,
 * and an integer target, write a function to search target in nums.
 * If target exists, then return its index. Otherwise, return -1.
 *
 * You must write an algorithm with O(log n) runtime complexity.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[-1,0,3,5,9,12], target = 9</dd>
 * <dt>Output:</dt>
 * <dd>4</dd>
 * <dt>Explanation:</dt>
 * <dd>Target 9 is at index 4 in sorted array [-1,0,3,5,9,12]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Set, Array, Tree
 * **Patterns**: Complement Search, Two Pointers Pattern
 * **Time Complexity**: O(log n) - Binary search or tree height
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Binary search is the classic divide-and-conquer algorithm for searching
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
 * ```
 * Input: nums = [-1,0,3,5,9,12], target = 9
 * Step 1: left=0, right=5, mid=2, nums[2]=3 < 9, search right
 * Step 2: left=3, right=5, mid=4, nums[4]=9 == 9, found!
 * Output: 4
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(log n)
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 *
 * ### EDGE CASES:
 * - Empty array: return -1
 * - Single element: check if it equals target
 * - Target not in array: return -1
 * - Target at boundaries: first or last element
 *
 * </details>
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
