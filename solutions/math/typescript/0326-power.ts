/**
 * # Difficulty: Medium
 *
 * # 326. Power
 *
 * Given an integer n, return true if it is a power of three. Otherwise, return false.
 *
 * An integer n is a power of three, if there exists an integer x such that n == 3^x.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>n = 27</dd>
 * <dt>Output:</dt>
 * <dd>True (27 is power of 3)</dd>
 * <dt>Explanation:</dt>
 * <dd>Number 27 is a power of 3 (27 = 3³)</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Standard Algorithm
 * **Data Structures**: Basic Types
 * **Patterns**: Hash Table Pattern, Divide and Conquer
 * **Time Complexity**: O(n)
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Powers of 3 only have 3 in their prime factorization. Find maximum power of 3 in 32-bit range (3^19). Check if n divides it evenly. If yes, n is power of 3.
 *
 * ### APPROACH:
 * 1. **Handle edge cases**: If n == 1, return True; if n <= 0, return False
 * 2. **Iterate while n > 1**: While n is greater than 1
 * 3. **Check divisibility**: If n % 3 != 0, return False
 * 4. **Divide by 3**: n = n // 3
 * 5. **Continue loop**: Repeat until n becomes 1 or indivisible by 3
 * # 6. **Return result**: Return True if loop exits with n == 1  # Result undefined
 *
 * ### WHY THIS WORKS:
 * - Power of 3 only has prime factor 3
 * - Max 32-bit power of 3 is 3^19 = 1162261467
 * - If n divides max power of 3 evenly, n is power of 3
 * - Alternative: repeatedly divide by 3, check if result is 1
 * - O(1) time with division check, O(1) space
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: n = 27
 * Step 1: Divide by 3 repeatedly
 *   27/3 = 9
 *   9/3 = 3
 *   3/3 = 1
 *
 * Step 2: Check if reached 1
 *   Result is 1, so 27 is power of 3
 *
 * Counter-example: n = 10
 *   10/3 = 3 (remainder 1, not divisible)
 *
 * Output: True (27 is power of 3)
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
  isPowerOfThree(n: number): boolean {
    if (n <= 0) return false;

    while (n % 3 === 0) {
      n = n / 3;
    }

    return n === 1;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.isPowerOfThree(27) === true ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.isPowerOfThree(0) === false ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.isPowerOfThree(9) === true ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
