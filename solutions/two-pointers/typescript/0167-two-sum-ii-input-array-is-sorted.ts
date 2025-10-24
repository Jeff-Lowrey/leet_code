/**
 * # Difficulty: Medium
 *
 * # 167. Two Sum Ii Input Array Is Sorted
 *
 * Difficulty: Medium
 *
 * Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Let these two numbers be numbers[index1] and numbers[index2] where 1 <= index1 < index2 <= numbers.length.
 *
 * Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2] of length 2.
 *
 * The tests are generated such that there is exactly one solution. You may not use the same element twice.
 *
 * Your solution must use only constant extra space.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>numbers = [2, 7, 11, 15], target = 9</dd>
 * <dt>Output:</dt>
 * <dd>[1, 2] (1-indexed positions)</dd>
 * <dt>Explanation:</dt>
 * <dd>Two numbers [2,7] at indices [1,2] sum to target 9</dd>
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
 * Array is sorted, so use two pointers from both ends. If sum < target, move left pointer right. If sum > target, move right pointer left. If equal, found the pair.
 *
 * ### APPROACH:
 * 1. **Initialize pointers**: Set left = 0, right = len(numbers) - 1
 * 2. **Loop while left < right**: Continue until pointers meet
 * 3. **Calculate sum**: current_sum = numbers[left] + numbers[right]
 * 4. **Check if found**: If current_sum == target, return [left+1, right+1]
 * 5. **Adjust pointers**: If current_sum < target, increment left; else decrement right
 * 6. **Continue search**: Repeat until target found
 * 7. **Return result**: Return indices of the two numbers
 *
 * ### WHY THIS WORKS:
 * - Two pointers: left at start, right at end
 * - If sum < target, increment left (need larger value)
 * - If sum > target, decrement right (need smaller value)
 * - If sum == target, found pair
 * - O(n) time single pass, O(1) space, exploits sorted property
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * numbers = [2, 7, 11, 15], target = 9
 * ```
 *
 * Step 1: Initialize pointers
 * left = 0 (numbers[0] = 2)
 * right = 3 (numbers[3] = 15)
 * Step 2: First iteration
 * current_sum = 2 + 15 = 17
 * 17 > 9, so move right pointer left
 * right = 2
 * Step 3: Second iteration
 * left = 0 (numbers[0] = 2)
 * right = 2 (numbers[2] = 11)
 * current_sum = 2 + 11 = 13
 * 13 > 9, so move right pointer left
 * right = 1
 * Step 4: Third iteration
 * left = 0 (numbers[0] = 2)
 * right = 1 (numbers[1] = 7)
 * current_sum = 2 + 7 = 9
 * 9 == 9 ✓ Found!
 *
 * Output:
 * ```
 * [1, 2] (1-indexed positions)
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
  twoSum(numbers: number[], target: number): number[] {
    let left = 0;
    let right = numbers.length - 1;

    while (left < right) {
      const sum = numbers[left] + numbers[right];

      if (sum === target) {
        return [left + 1, right + 1];
      } else if (sum < target) {
        left++;
      } else {
        right--;
      }
    }

    return [];
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(
    `Test 1: ${JSON.stringify(solution.twoSum([2, 7, 11, 15], 9)) === JSON.stringify([1, 2]) ? "PASS" : "FAIL"}`
  );
  console.log(
    `Test 2: ${JSON.stringify(solution.twoSum([2, 3, 4], 6)) === JSON.stringify([1, 3]) ? "PASS" : "FAIL"}`
  );
  console.log(
    `Test 3: ${JSON.stringify(solution.twoSum([-1, 0], -1)) === JSON.stringify([1, 2]) ? "PASS" : "FAIL"}`
  );

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
