/**
 * # Difficulty: Medium
 *
 * # 042. Trapping Rain Water
 *
 * Difficulty: Easy
 *
 * Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>height = [0,1,0,2,1,0,1,3,2,1,2,1]</dd>
 * <dt>Output:</dt>
 * <dd>6 (total water trapped)</dd>
 * <dt>Explanation:</dt>
 * <dd>Rain water trapped between heights [0,1,0,2,1,0,1,3,2,1,2,1] is 6 units</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Two Pointers, Binary Search
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Two Pointers Pattern, Hash Table Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * For each position, calculate trapped water = min(max_left, max_right) - height. Use two pointers from both ends. Track max heights seen. Move pointer with smaller max height inward.
 *
 * ### APPROACH:
 * 1. **Initialize pointers**: Set left = 0, right = len(height) - 1
 * 2. **Track max heights**: Set left_max = 0, right_max = 0
 * 3. **Initialize water count**: Set water = 0
 * 4. **Loop while left < right**: Continue until pointers meet
 * 5. **Process shorter side**: If height[left] < height[right], process left
 * 6. **Update max and water**: If height[left] >= left_max, update left_max; else add (left_max - height[left]) to water
 * 7. **Move pointer**: Increment left or decrement right based on which side processed
 * 8. **Return result**: Return water as total trapped water
 *
 * ### WHY THIS WORKS:
 * - Water level at any position determined by min(left_max, right_max) - height
 * - Two pointers work inward from edges tracking max heights seen so far
 * - Process side with smaller max first: its water amount is already determined by the smaller max
 * - Other side's larger max guarantees it won't limit water on current side
 * - Single pass O(n) time replaces two-pass array approach, O(1) space instead of O(n)
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * height = [0,1,0,2,1,0,1,3,2,1,2,1]
 * ```
 *
 * Step 1: Calculate max heights
 * left_max = [0,1,1,2,2,2,2,3,3,3,3,3]
 * right_max = [3,3,3,3,3,3,3,3,2,2,2,1]
 * Step 2: Calculate water at each position
 * i=2: min(1,3)-0 = 1
 * i=4: min(2,3)-1 = 1
 * i=5: min(2,3)-0 = 2
 * ...
 *
 * Output:
 * ```
 * 6 (total water trapped)
 * ```

 * ### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
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
  trap(height: number[]): number {
    if (height.length === 0) return 0;

    let left = 0;
    let right = height.length - 1;
    let leftMax = 0;
    let rightMax = 0;
    let water = 0;

    while (left < right) {
      if (height[left] < height[right]) {
        if (height[left] >= leftMax) {
          leftMax = height[left];
        } else {
          water += leftMax - height[left];
        }
        left++;
      } else {
        if (height[right] >= rightMax) {
          rightMax = height[right];
        } else {
          water += rightMax - height[right];
        }
        right--;
      }
    }

    return water;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]) === 6 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.trap([4, 2, 0, 3, 2, 5]) === 9 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.trap([4, 2, 3]) === 1 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
