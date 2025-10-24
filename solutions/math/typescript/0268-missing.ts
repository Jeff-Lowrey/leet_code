/**
 * # Difficulty: Medium
 *
 * # 0268. Missing Number
 *
 * Difficulty: Medium
 *
 * Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[3,0,1]</dd>
 * <dt>Output:</dt>
 * <dd>2 (missing number)</dd>
 * <dt>Explanation:</dt>
 * <dd>Missing number in [3,0,1] is 2</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Array Traversal
 * **Data Structures**: Hash Map, Array
 * **Patterns**: Iterative Solution
 * **Time Complexity**: O(n)
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * The missing number is the difference between expected sum (n*(n+1)/2) and actual sum. Alternatively, XOR all numbers and all indices to cancel pairs, leaving missing number.
 *
 * ### APPROACH:
 * 1. **Calculate expected sum**: expected = n * (n + 1) // 2
 * 2. **Calculate actual sum**: actual = sum(nums)
 * 3. **Find difference**: missing = expected - actual
 * 4. **Return result**: Return missing number
 *
 * ### WHY THIS WORKS:
 * - XOR all numbers 0..n and all array elements
 * - Duplicate numbers XOR to 0, leaving only missing number
 * - Alternative: expected sum - actual sum = missing (Gauss formula)
 * - XOR approach avoids integer overflow issues
 * - O(n) time, O(1) space
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [3,0,1]
 * ```
 *
 * Step 1: Calculate expected sum
 * expected = 0+1+2+3 = 6
 * Step 2: Calculate actual sum
 * actual = 3+0+1 = 4
 * Step 3: Find difference
 * missing = 6 - 4 = 2
 *
 * Output:
 * ```
 * 2 (missing number)
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
  missingNumber(nums: number[]): number {
    const n = nums.length;
    let missing = n;

    for (let i = 0; i < n; i++) {
      missing ^= i ^ nums[i];
    }

    return missing;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.missingNumber([3, 0, 1]) === 2 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.missingNumber([0, 1]) === 2 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1]) === 8 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
