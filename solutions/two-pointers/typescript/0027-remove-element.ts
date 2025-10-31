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
 * <dd>k=2, nums=[2,2,_,_]</dd>
 * <dt>Explanation:</dt>
 * <dd>Remove element 3 from [3,2,2,3] gives length 2</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * ### METADATA:
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
 * **Data structures: Array (for storage and traversal)**
 * 1. **Initialize write pointer**: Set k = 0 to track position for non-val elements in array
 * 2. **Iterate through array**: For each element in nums using array traversal
 * 3. **Check if not val**: If nums[i] != val using hash table lookup
 * 4. **Copy to write position**: nums[k] = nums[i] in array
 * 5. **Increment write pointer**: k += 1
 * 6. **Continue scanning**: Process all elements in array
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
 * **Input:** nums = [3,2,2,3], val = 3
 *
 * **Step 1:** Initialize write pointer k=0 for nums=[3,2,2,3], val=3
 * - Will track position for non-val elements
 *
 * **Step 2:** Process i=0, nums[0]=3
 * - 3 == val, skip (don't write, don't increment k)
 *
 * **Step 3:** Process i=1, nums[1]=2
 * - 2 ≠ val, write to nums[0]=2, increment k=1
 *
 * **Step 4:** Process i=2, nums[2]=2
 * - 2 ≠ val, write to nums[1]=2, increment k=2
 *
 * **Step 5:** Process i=3, nums[3]=3
 * - 3 == val, skip (don't write, don't increment k)
 *
 * **Step 6:** Continue scanning
 * - All elements processed (i=0,1,2,3 complete)
 * - Array now has valid elements at start: [2,2,_,_]
 *
 * **Step 7:** Return count
 * - Return k=2 as count of elements not equal to val
 * - First k elements contain the result
 *
 * Output:
 * ```
 * 2
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
 * - Empty array: nums=[], val=3 → 0 (no elements to process, returns immediately)
 * - Single element equals val: nums=[3], val=3 → 0 (remove it, returns empty result)
 * - Single element not equals val: nums=[2], val=3 → 1 (keep it, element stays)
 * - All elements equal val: nums=[3,3,3,3], val=3 → 0 (remove all instances)
 * - No elements equal val: nums=[1,2,4,5], val=3 → 4 (keep all, original length unchanged)
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
