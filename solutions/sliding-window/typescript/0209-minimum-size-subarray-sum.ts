/**
 * # Difficulty: Medium
 *
 * # 209. Minimum Size Subarray Sum
 *
 * Difficulty: Medium
 *
 * Given an array of positive integers nums and a positive integer target, return the minimal length of a subarray whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>target = 7, nums = [2,3,1,2,4,3]</dd>
 * <dt>Output:</dt>
 * <dd>2 (minimum length)</dd>
 * <dt>Explanation:</dt>
 * <dd>The minimal length subarray with sum ≥ 7 is [4,3] with length 2</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Array Traversal, Sliding Window
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Complement Search, Two Pointers Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Use sliding window. Expand window until sum >= target. Then shrink from left while sum >= target. Track minimum length. This achieves O(n) time with single pass.
 *
 * ### APPROACH:
 * 1. **Initialize variables**: Set left = 0, min_len = float('inf'), current_sum = 0
 * 2. **Expand with right pointer**: For right in range(len(nums))
 * 3. **Add to window**: current_sum += nums[right]
 * 4. **Contract while valid**: While current_sum >= target
 * 5. **Update minimum**: min_len = min(min_len, right - left + 1)
 * 6. **Shrink window**: current_sum -= nums[left], left += 1
 * 7. **Continue scanning**: Process all elements
 * 8. **Return result**: Return min_len if found, else 0
 *
 * ### WHY THIS WORKS:
 * - Sliding window expands right until sum >= target, then contracts left
 * - Greedy contraction: shrink window while maintaining sum >= target
 * - Each element added once (right++) and removed once (left++)
 * - Track minimum window size satisfying sum condition
 * - O(n) time: two pointers scan array once, O(1) space
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * target = 7, nums = [2,3,1,2,4,3]
 * ```
 *
 * Step 1: Expand window
 * [2,3,1,2] sum=8 ≥ 7
 * Step 2: Contract
 * [3,1,2] sum=6 < 7
 * Expand: [3,1,2,4] sum=10 ≥ 7
 * Contract: [1,2,4] sum=7 ≥ 7
 * Contract: [2,4] sum=6 < 7
 * Expand: [2,4,3] sum=9 ≥ 7
 * Contract: [4,3] sum=7 ≥ 7, length=2
 *
 * Output:
 * ```
 * 2 (minimum length)
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
  /**
   * Find minimum length of subarray with sum >= target.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  minSubArrayLen(target: number, nums: number[]): number {
    if (!nums || nums.length === 0) {
      return 0;
    }

    let minLength = Infinity;
    let currentSum = 0;
    let left = 0;

    for (let right = 0; right < nums.length; right++) {
      currentSum += nums[right];

      while (currentSum >= target) {
        minLength = Math.min(minLength, right - left + 1);
        currentSum -= nums[left];
        left++;
      }
    }

    return minLength === Infinity ? 0 : minLength;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.minSubArrayLen(7, [2, 3, 1, 2, 4, 3]) === 2 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.minSubArrayLen(4, [1, 4, 4]) === 1 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1]) === 0 ? "PASS" : "FAIL"}`);
  console.log(`Test 4: ${solution.minSubArrayLen(15, [1, 2, 3, 4, 5]) === 5 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
