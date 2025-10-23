/**
 * # Difficulty: Medium
 *
 * # 456. 132 Pattern
 *
 * Given an array of n integers nums, a 132 pattern is a subsequence of three integers nums[i], nums[j] and nums[k] such that i < j < k and nums[i] < nums[k] < nums[j].
 *
 * Return true if there is a 132 pattern in nums, otherwise, return false.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[3,1,4,2]</dd>
 * <dt>Output:</dt>
 * <dd>True (132 pattern exists)</dd>
 * <dt>Explanation:</dt>
 * <dd>The array contains a 132 pattern because there exist indices i < j < k where nums[i] < nums[k] < nums[j]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Two Pointers Pattern, Hash Table Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Track minimum values seen so far from left. Use decreasing stack from right to find first element < stack top. The 132 pattern means min < nums[j] < nums[k] where i < j < k.
 *
 * ### APPROACH:
 * 1. **Initialize variables**: Set s3 = float('-inf'), stack = []
 * 2. **Iterate backward**: For i in range(len(nums)-1, -1, -1)
 * 3. **Check pattern**: If nums[i] < s3, return True
 * 4. **Update s3**: While stack and nums[i] > stack[-1], s3 = stack.pop()
 * 5. **Push to stack**: Append nums[i] to stack
 * 6. **Continue scanning**: Process all elements
 * 7. **Return False**: If loop completes without finding pattern
 *
 * ### WHY THIS WORKS:
 * - Find 132 pattern: nums[i] < nums[k] < nums[j] where i < j < k
 * - Monotonic stack tracks potential nums[k], maintain max nums[k] found
 * - Traverse right-to-left: if current < nums[k], found 132 pattern
 * - Stack maintains decreasing sequence, pops when larger element found
 * - O(n) time single pass, O(n) space for stack
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: nums = [3,1,4,2]
 * Step 1: Find 132 pattern
 *   i=0, j=2, k=3: nums[0]=3, nums[2]=4, nums[3]=2
 *   Check: 3 < 4 and 2 < 4 and 3 > 2? Yes
 *
 * Output: True (132 pattern exists)
 * ```
 *
 * ### TIME COMPLEXITY:
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
   * Determines if the given array contains a 132 pattern.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  find132pattern(nums: number[]): boolean {
    if (nums.length < 3) {
      return false;
    }

    // Stack to keep track of potential "2" values
    const stack: number[] = [];

    // Initialize the "2" value (nums[k]) as negative infinity
    let s3 = -Infinity;

    // Iterate through the array from right to left
    for (let i = nums.length - 1; i >= 0; i--) {
      const num = nums[i];

      // If current number is less than s3, we found a 132 pattern
      if (num < s3) {
        return true;
      }

      // While stack is not empty and current number is greater than top of stack
      while (stack.length > 0 && stack[stack.length - 1] < num) {
        // Update s3 (potential "2" value)
        s3 = stack.pop()!;
      }

      // Add current number to stack as potential "3" value
      stack.push(num);
    }

    return false;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  // Test case 1: Basic case
  console.log(`Test 1: ${solution.find132pattern([1, 2, 3, 4]) === false ? "PASS" : "FAIL"}`);

  // Test case 2: Pattern exists
  console.log(`Test 2: ${solution.find132pattern([3, 1, 4, 2]) === true ? "PASS" : "FAIL"}`);

  // Test case 3: Pattern exists with negatives
  console.log(`Test 3: ${solution.find132pattern([-1, 3, 2, 0]) === true ? "PASS" : "FAIL"}`);

  // Test case 4: No pattern
  console.log(`Test 4: ${solution.find132pattern([1, 0, 1, -4, -3]) === false ? "PASS" : "FAIL"}`);

  // Test case 5: Single element
  console.log(`Test 5: ${solution.find132pattern([1]) === false ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
