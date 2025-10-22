/**
 * # Difficulty: Easy
 *
 * # 338. Counting Bits
 *
 * Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[0,1,1,2,1,2]</dd>
 * <dt>Output:</dt>
 * <dd>"Expected {expected}, got {result}"</dd>
 * <dt>Explanation:</dt>
 * <dd>Counting bits: for n=5, result is [0,1,1,2,1,2] (bit counts for 0-5)</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Hash Table Pattern, Dynamic Programming
 * **Time Complexity**: O(n)
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * For each number, count set bits. Pattern: dp[i] = dp[i >> 1] + (i & 1). The count for i equals count for i/2 plus the last bit of i.
 *
 * ### APPROACH:
 * 1. **Initialize result array**: Create result = [0] * (n + 1) to store counts for 0 to n
 * 2. **Iterate from 1 to n**: Loop with index i from 1 to n
 * 3. **Use recurrence relation**: Set result[i] = result[i >> 1] + (i & 1)
 * 4. **Understand i >> 1**: Right shift removes the rightmost bit, giving count for i//2
 * 5. **Add rightmost bit**: (i & 1) adds 1 if rightmost bit is set, 0 otherwise
 * 6. **Build incrementally**: Each result[i] uses previously computed result[i//2]
 * 7. **Return result**: Return complete result array with counts for all numbers 0 to n
 *
 * ### WHY THIS WORKS:
 * - DP: count[i] = count[i >> 1] + (i & 1)
 * - Bit shift right removes last bit, i & 1 checks if last bit is 1
 * - Reuse previous results: i >> 1 is already computed
 * - Alternatively: count[i] = count[i & (i-1)] + 1 (remove rightmost 1)
 * - O(n) time: each number processed once, O(1) space excluding output
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: n = 5
 * Step 1: Count bits for each number from 0 to 5
 *   0 = 000 → 0 bits
 *   1 = 001 → 1 bit
 *   2 = 010 → 1 bit
 *   3 = 011 → 2 bits
 *   4 = 100 → 1 bit
 *   5 = 101 → 2 bits
 *
 * Step 2: DP relation: count[i] = count[i>>1] + (i&1)
 *   count[0] = 0
 *   count[1] = count[0] + 1 = 1
 *   count[2] = count[1] + 0 = 1
 *   count[3] = count[1] + 1 = 2
 *   count[4] = count[2] + 0 = 1
 *   count[5] = count[2] + 1 = 2
 *
 * Output: [0,1,1,2,1,2]
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
  countBits(n: number): number[] {
    const result: number[] = new Array(n + 1).fill(0);

    for (let i = 1; i <= n; i++) {
      result[i] = result[i >> 1] + (i & 1);
    }

    return result;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.countBits(2);
  console.log(
    `Test 1: ${JSON.stringify(result1) === JSON.stringify([0, 1, 1]) ? "PASS" : "FAIL"}`
  );

  const result2 = solution.countBits(5);
  console.log(
    `Test 2: ${JSON.stringify(result2) === JSON.stringify([0, 1, 1, 2, 1, 2]) ? "PASS" : "FAIL"}`
  );

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
