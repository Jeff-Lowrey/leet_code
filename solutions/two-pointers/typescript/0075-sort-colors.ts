/**
 * # Difficulty: Medium
 *
 * # 075. Sort Colors
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
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Two Pointers
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Two Pointers Pattern
 * **Time Complexity**: O(n)
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Use three pointers: p0 for next 0, p2 for next 2, current for scanning. When see 0, swap with p0. When see 2, swap with p2. When see 1, just move current. Partitions in single pass.
 *
 * ### APPROACH:
 * 1. **Initialize three pointers**: Set low = 0, mid = 0, high = len(nums) - 1
 * 2. **Process while mid <= high**: Continue loop while mid hasn't passed high
 * 3. **Case nums[mid] == 0**: Swap nums[mid] with nums[low], increment both low and mid
 * 4. **Case nums[mid] == 1**: Just increment mid (already in correct position)
 * 5. **Case nums[mid] == 2**: Swap nums[mid] with nums[high], decrement high only
 * 6. **Continue partitioning**: Repeat until mid > high
 * 7. **Array sorted**: After loop, array contains 0s, then 1s, then 2s
 *
 * ### WHY THIS WORKS:
 * - Dutch national flag: three pointers (low, mid, high)
 * - low tracks next position for 0, high tracks next position for 2
 * - If nums[mid] == 0: swap with low, advance both
 * - If nums[mid] == 2: swap with high, decrement high only (don't advance mid, need to check swapped value)
 * - O(n) time single pass, O(1) space
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
  sortColors(nums: number[]): void {
    let low = 0;
    let mid = 0;
    let high = nums.length - 1;

    while (mid <= high) {
      if (nums[mid] === 0) {
        [nums[low], nums[mid]] = [nums[mid], nums[low]];
        low++;
        mid++;
      } else if (nums[mid] === 1) {
        mid++;
      } else {
        [nums[mid], nums[high]] = [nums[high], nums[mid]];
        high--;
      }
    }
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const nums1 = [2, 0, 2, 1, 1, 0];
  solution.sortColors(nums1);
  console.log(
    `Test 1: ${JSON.stringify(nums1) === JSON.stringify([0, 0, 1, 1, 2, 2]) ? "PASS" : "FAIL"}`
  );

  const nums2 = [2, 0, 1];
  solution.sortColors(nums2);
  console.log(`Test 2: ${JSON.stringify(nums2) === JSON.stringify([0, 1, 2]) ? "PASS" : "FAIL"}`);

  const nums3 = [0];
  solution.sortColors(nums3);
  console.log(`Test 3: ${JSON.stringify(nums3) === JSON.stringify([0]) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
