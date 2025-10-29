/**
 * # Difficulty: Medium
 *
 * # 0027. Remove Element
 *
 *
 * Given an integer array nums and an integer val, remove all occurrences of val in nums in-place. The order of the elements may be changed. Then return the number of elements in nums which are not equal to val.
 *
 * Consider the number of elements in nums which are not equal to val be k, to get accepted, you need to do the following things:
 *
 * - Change the array nums such that the first k elements of nums contain the elements which are not equal to val. The remaining elements of nums are not important as well as the size of nums.
 * - Return k.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[3,2,2,3], val = 3</dd>
 * <dt>Output:</dt>
 * <dd>4</dd>
 * <dt>Explanation:</dt>
 * <dd>Remove element 3 from [3,2,2,3] gives length 2</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Two Pointers Pattern, Hash Table Pattern
 * **Time Complexity**: O(n)
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Use two pointers: one for reading, one for writing. When read pointer finds non-target value, write it at write pointer position and increment both. Otherwise only increment read pointer.
 *
 * ### APPROACH:
 * 1. **Initialize write pointer**: Set k = 0 to track position for non-val elements
 * 2. **Iterate through array**: For each element in nums
 * 3. **Check if not val**: If nums[i] != val
 * 4. **Copy to write position**: nums[k] = nums[i]
 * 5. **Increment write pointer**: k += 1
 * 6. **Continue scanning**: Process all elements
 * 7. **Return count**: Return k as count of elements not equal to val
 *
 * ### WHY THIS WORKS:
 * - Two pointers: write pointer tracks next position for valid elements
 * - If element != val, copy to write position and increment write
 * - If element == val, skip (don't increment write)
 * - Return write as new length (first write elements are result)
 * - O(n) time, O(1) space
 *
 *

This solution uses hash table lookup for efficient implementation.

This solution uses hash map storage for efficient implementation.
### EXAMPLE WALKTHROUGH:
 * Given input nums = [3,2,2,3], val = 3:
 *
 * Input:
 * ```
 * nums = [3,2,2,3], val = 3
 * ```
 *
 * Step 1: Two pointers
 * i=0, nums[0]=3=val, skip
 * i=1, nums[1]=2≠val, nums[0]=2, i=1
 * i=2, nums[2]=2≠val, nums[1]=2, i=2
 * i=3, nums[3]=3=val, skip
 *
 * Output:
 * ```
 * k=2, nums=[2,2,_,_]
 * ```

 * ### TIME COMPLEXITY:

 * O(n)

 * - Single pass through the input
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

class Solution {
  removeElement(nums: number[], val: number): number {
    let k = 0;

    for (let i = 0; i < nums.length; i++) {
      if (nums[i] !== val) {
        nums[k] = nums[i];
        k++;
      }
    }

    return k;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const nums1 = [3, 2, 2, 3];
  console.log(`Test 1: ${solution.removeElement(nums1, 3) === 2 ? "PASS" : "FAIL"}`);

  const nums2 = [0, 1, 2, 2, 3, 0, 4, 2];
  console.log(`Test 2: ${solution.removeElement(nums2, 2) === 5 ? "PASS" : "FAIL"}`);

  const nums3 = [1];
  console.log(`Test 3: ${solution.removeElement(nums3, 1) === 0 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
