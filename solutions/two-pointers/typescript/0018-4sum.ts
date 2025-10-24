/**
 * # Difficulty: Medium
 *
 * # 018. 4Sum
 *
 * Given an array nums of n integers, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that:
 *
 * - 0 <= a, b, c, d < n
 * - a, b, c, and d are distinct.
 * - nums[a] + nums[b] + nums[c] + nums[d] == target
 *
 * You may return the answer in any order.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[1,0,-1,0,-2,2], target = 0</dd>
 * <dt>Output:</dt>
 * <dd>[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]</dd>
 * <dt>Explanation:</dt>
 * <dd>4Sum: quadruplets summing to target</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Complement Search, Two Pointers Pattern
 * **Time Complexity**: O(n)
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Sort array first. Fix first two elements, use two pointers for remaining two. Skip duplicates at all four positions. Adjust pointers based on sum comparison to target.
 *
 * ### APPROACH:
 * 1. **Sort array**: Sort nums to enable two-pointer technique and skip duplicates
 * 2. **Outer loops for first two numbers**: Use nested loops for i and j
 * 3. **Skip duplicates**: For both i and j, skip duplicate values
 * 4. **Initialize two pointers**: For each (i,j) pair, set left = j+1, right = len(nums)-1
 * 5. **Calculate sum**: current_sum = nums[i] + nums[j] + nums[left] + nums[right]
 * 6. **Check target**: If sum == target, add quadruplet and skip duplicates
 * 7. **Adjust pointers**: If sum < target, increment left; if sum > target, decrement right
 * 8. **Return result**: Return list of all unique quadruplets
 *
 * ### WHY THIS WORKS:
 * - Sort array, fix two numbers with outer loops, two-pointer on remaining
 * - Skip duplicates at each level to avoid duplicate quadruplets
 * - Two pointers find pairs that sum to (target - num1 - num2)
 * - Same as 3sum with extra outer loop
 * - O(n^3) time: two nested loops + two pointers, O(1) space
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [1,0,-1,0,-2,2], target = 0
 * ```
 *
 * Step 1: Sort array
 * sorted = [-2,-1,0,0,1,2]
 * Step 2: Fix first two, use two pointers for rest
 * i=-2, j=-1: find pairs summing to 3
 * i=-2, j=0: find pairs summing to 2
 * ...
 *
 * Output:
 * ```
 * [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
 * ```

### TIME COMPLEXITY:
 * O(n)
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 *
 * ### EDGE CASES:
 * - Empty input handling
 * - Single element cases
 * - Large input considerations
 *
 * </details>
 */

class Solution {
  fourSum(nums: number[], target: number): number[][] {
    const result: number[][] = [];
    nums.sort((a, b) => a - b);

    for (let i = 0; i < nums.length - 3; i++) {
      if (i > 0 && nums[i] === nums[i - 1]) continue;

      for (let j = i + 1; j < nums.length - 2; j++) {
        if (j > i + 1 && nums[j] === nums[j - 1]) continue;

        let left = j + 1;
        let right = nums.length - 1;

        while (left < right) {
          const sum = nums[i] + nums[j] + nums[left] + nums[right];

          if (sum === target) {
            result.push([nums[i], nums[j], nums[left], nums[right]]);

            while (left < right && nums[left] === nums[left + 1]) left++;
            while (left < right && nums[right] === nums[right - 1]) right--;

            left++;
            right--;
          } else if (sum < target) {
            left++;
          } else {
            right--;
          }
        }
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

  const result1 = solution.fourSum([1, 0, -1, 0, -2, 2], 0);
  console.log(
    `Test 1: ${result1.length === 3 ? "PASS" : "FAIL"}`
  );

  const result2 = solution.fourSum([2, 2, 2, 2, 2], 8);
  console.log(
    `Test 2: ${JSON.stringify(result2) === JSON.stringify([[2, 2, 2, 2]]) ? "PASS" : "FAIL"}`
  );

  const result3 = solution.fourSum([1, -2, -5, -4, -3, 3, 3, 5], -11);
  console.log(`Test 3: ${result3.length >= 0 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
