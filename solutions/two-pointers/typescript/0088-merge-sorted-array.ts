/**
 * # Difficulty: Medium
 *
 * # 088. Merge Sorted Array
 *
 * Difficulty: Easy
 *
 * You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.
 *
 * Merge nums1 and nums2 into a single array sorted in non-decreasing order.
 *
 * The final sorted array should not be returned by the function, but instead be stored inside the array nums1. To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3</dd>
 * <dt>Output:</dt>
 * <dd>[1,2,2,3,5,6]</dd>
 * <dt>Explanation:</dt>
 * <dd>Merge [1,2,3,0,0,0] and [2,5,6] into [1,2,2,3,5,6]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Two Pointers
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Two Pointers Pattern, Greedy Algorithm
 * **Time Complexity**: O(n)
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Start from end of both arrays (largest elements). Compare elements and place larger one at end of nums1. Use three pointers: one for each array's current position, one for insertion position.
 *
 * ### APPROACH:
 * 1. **Initialize three pointers**: Set p1 = m-1, p2 = n-1, p = m+n-1
 * 2. **Merge from right to left**: While p1 >= 0 and p2 >= 0
 * 3. **Compare elements**: If nums1[p1] > nums2[p2], place nums1[p1] at nums1[p], decrement p1
 * 4. **Otherwise**: Place nums2[p2] at nums1[p], decrement p2
 * 5. **Decrement p**: After each placement, p -= 1
 * 6. **Handle remaining**: If p2 >= 0, copy remaining nums2 elements to nums1
 * 7. **No return needed**: Modification is in-place in nums1
 *
 * ### WHY THIS WORKS:
 * - Merge from back to front to avoid overwriting nums1 elements
 * - Three pointers: p1 at nums1 end, p2 at nums2 end, p at merge position
 * - Compare nums1[p1] and nums2[p2], place larger at nums1[p]
 * - Copy remaining nums2 elements if any
 * - O(m + n) time, O(1) space (in-place merge)
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
 * ```
 *
 * Step 1: Three pointers (fill from right)
 * p1=2, p2=2, p=5: nums1[5]=max(3,6)=6
 * p1=2, p2=1, p=4: nums1[4]=max(3,5)=5
 * p1=2, p2=0, p=3: nums1[3]=max(3,2)=3
 * p1=1, p2=0, p=2: nums1[2]=max(2,2)=2
 * p1=0, p2=0, p=1: nums1[1]=max(1,2)=2
 * p1=0, p=0: nums1[0]=1
 *
 * Output:
 * ```
 * [1,2,2,3,5,6]
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
  merge(nums1: number[], m: number, nums2: number[], n: number): void {
    let i = m - 1;
    let j = n - 1;
    let k = m + n - 1;

    while (j >= 0) {
      if (i >= 0 && nums1[i] > nums2[j]) {
        nums1[k] = nums1[i];
        i--;
      } else {
        nums1[k] = nums2[j];
        j--;
      }
      k--;
    }
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const nums1 = [1, 2, 3, 0, 0, 0];
  solution.merge(nums1, 3, [2, 5, 6], 3);
  console.log(
    `Test 1: ${JSON.stringify(nums1) === JSON.stringify([1, 2, 2, 3, 5, 6]) ? "PASS" : "FAIL"}`
  );

  const nums2 = [1];
  solution.merge(nums2, 1, [], 0);
  console.log(`Test 2: ${JSON.stringify(nums2) === JSON.stringify([1]) ? "PASS" : "FAIL"}`);

  const nums3 = [0];
  solution.merge(nums3, 0, [1], 1);
  console.log(`Test 3: ${JSON.stringify(nums3) === JSON.stringify([1]) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
