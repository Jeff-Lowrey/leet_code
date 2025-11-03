/**
 * # 0448. Find All Numbers Disappeared In An Array
 *
 * Difficulty: Medium
 *
 *
 * Given an array nums of n integers where nums[i] is in the range [1, n], return an array of all the integers in the range [1, n] that do not appear in nums.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[4,3,2,7,8,2,3,1]</dd>
 * <dt>Output:</dt>
 * <dd>[5, 6]</dd>
 * <dt>Explanation:</dt>
 * <dd>The numbers [5,6] are missing from [4,3,2,7,8,2,3,1] (should be 1-8)</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: In-place Marking, Array Traversal, Index Manipulation
 * **Data Structures**: Array
 * **Patterns**: Cyclic Sort Pattern, In-place Marking
 * **Time Complexity**: O(n) - Two passes through input
 * **Space Complexity**: O(1) - Constant extra space (excluding output)
 *
 * ### INTUITION:
The key insight is that use the array itself as a hash map by marking indices. For each number n, negate the value at index n-1 to mark that n is present. After marking, any indices with positive values indicate missing numbers.

### APPROACH:
 * 1. **Mark present numbers**: Iterate through nums array, for each num get index = abs(num) - 1
 * 2. **Negate at index**: Set nums[index] = -abs(nums[index]) to mark that number (index + 1) is present
 * 3. **Use absolute value**: Always use abs(num) when calculating index since previous iterations may have negated values
 * 4. **Find missing numbers**: After marking phase, iterate through indices 0 to len(nums) - 1
 * 5. **Check for positive values**: If nums[i] > 0, then number (i + 1) was never marked as present
 * 6. **Build result**: Append (i + 1) to result list for each positive value found
 * 7. **Return result**: Return list of all missing numbers from range [1, n]
 *
 * ### WHY THIS WORKS:
 * - Array values are in range [1, n], so each value maps to a valid index (value - 1)
 * - Negating values at corresponding indices marks numbers as "seen" without extra space
 * - Using absolute value when indexing handles already-negated values correctly
 * - Positive values after marking phase indicate those indices+1 were never present
 * - O(n) time with two passes, O(1) space by reusing input array as marker
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [4,3,2,7,8,2,3,1]
 * ```
 *
 * Step 1: Mark present numbers by negating values at indices
 * - Process 4: nums[3] = -7, nums = [4,3,2,-7,8,2,3,1]
 * - Process 3: nums[2] = -2, nums = [4,3,-2,-7,8,2,3,1]
 * - Process 2: nums[1] = -3, nums = [4,-3,-2,-7,8,2,3,1]
 * - Process 7: nums[6] = -3, nums = [4,-3,-2,-7,8,2,-3,1]
 * - Process 8: nums[7] = -1, nums = [4,-3,-2,-7,8,2,-3,-1]
 * - Process 2: already marked
 * - Process 3: already marked
 * - Process 1: nums[0] = -4, nums = [-4,-3,-2,-7,8,2,-3,-1]
 * Step 2: Find indices with positive values
 *
 * Steps:
 * Step 1: - Index 4 has value 8 (positive) → number 5 is missing
 * Step 2: - Index 5 has value 2 (positive) → number 6 is missing
 *
 * Output:
 * ```
 * [5, 6]
 * ```

 * ### TIME COMPLEXITY:
 * **O(n)** - where n is the length of the array. We make two complete passes through the array: (1) first pass marks present numbers by negating values at corresponding indices (O(n)), (2) second pass identifies which indices have positive values to determine missing numbers (O(n)). Each operation within the loops is O(1). Total: O(n) + O(n) = O(2n) = O(n). This is optimal since we must examine every element.
 *
 * ### SPACE COMPLEXITY:
 * **O(1)** - excluding the output array. We use only constant extra space for variables (loop counters, index calculations). The result array doesn't count toward space complexity as it's required output. We modify the input array in-place using negation to mark present numbers, avoiding any additional data structures. This achieves the follow-up requirement of O(1) space without using extra sets or hash maps.
 *
 * ### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>
 */

class Solution {
  /**
   * Find all numbers from 1 to n that are missing in the input array.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(1) - excluding the output array
   */
  findDisappearedNumbers(nums: number[]): number[] {
    // Mark present numbers using index manipulation
    for (const num of nums) {
      // Get the absolute value since numbers might have been marked negative
      const index = Math.abs(num) - 1;
      // Mark as seen by making the number at index negative
      nums[index] = -Math.abs(nums[index]);
    }

    // Find missing numbers by checking which indices contain positive numbers
    const result: number[] = [];
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] > 0) {
        // i + 1 is missing from the original array
        result.push(i + 1);
      }
    }

    return result;
  }

  /**
   * Alternative solution using Set (simpler but uses O(n) extra space).
   *
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  findDisappearedNumbersSet(nums: number[]): number[] {
    const numSet = new Set(nums);
    const result: number[] = [];

    for (let i = 1; i <= nums.length; i++) {
      if (!numSet.has(i)) {
        result.push(i);
      }
    }

    return result;
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  // Test case 1: Example from problem
  const result1 = solution.findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1]);
  const expected1 = [5, 6];
  console.log(`Test 1: ${JSON.stringify(result1) === JSON.stringify(expected1) ? "PASS" : "FAIL"}`);
  console.log(`  Input: [4, 3, 2, 7, 8, 2, 3, 1]`);
  console.log(`  Expected: ${JSON.stringify(expected1)}`);
  console.log(`  Got: ${JSON.stringify(result1)}`);

  // Test case 2: No missing numbers
  const result2 = solution.findDisappearedNumbers([1, 2, 3, 4]);
  const expected2: number[] = [];
  console.log(`Test 2: ${JSON.stringify(result2) === JSON.stringify(expected2) ? "PASS" : "FAIL"}`);
  console.log(`  Input: [1, 2, 3, 4]`);
  console.log(`  Expected: ${JSON.stringify(expected2)}`);
  console.log(`  Got: ${JSON.stringify(result2)}`);

  // Test case 3: Single element
  const result3 = solution.findDisappearedNumbers([1]);
  const expected3: number[] = [];
  console.log(`Test 3: ${JSON.stringify(result3) === JSON.stringify(expected3) ? "PASS" : "FAIL"}`);
  console.log(`  Input: [1]`);
  console.log(`  Expected: ${JSON.stringify(expected3)}`);
  console.log(`  Got: ${JSON.stringify(result3)}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
