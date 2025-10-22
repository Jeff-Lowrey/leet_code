/**
 * # Difficulty: Easy
 *
 * # 231. Power of Two
 *
 * Given an integer n, return true if it is a power of two. Otherwise, return false.
 *
 * An integer n is a power of two, if there exists an integer x such that n == 2^x.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[1, 2, 3, 4, 16, 17, 1024]</dd>
 * <dt>Output:</dt>
 * <dd>"Solution for 231. Power of Two:"</dd>
 * <dt>Explanation:</dt>
 * <dd>Number 16 is a power of 2 (16 = 2^4)</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Array Traversal
 * **Data Structures**: Hash Set
 * **Patterns**: Hash Table Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Powers of 2 have exactly one bit set. Check if n > 0 and n & (n-1) == 0. The expression n & (n-1) removes the rightmost set bit.
 *
 * ### APPROACH:
 * 1. **Check if positive**: If n <= 0, return False immediately (powers of 2 are positive)
 * 2. **Use bit manipulation trick**: Check if n & (n - 1) == 0
 * 3. **Understand the property**: Powers of 2 have exactly one bit set (e.g., 4 = 100, 8 = 1000)
 * 4. **Apply n-1 trick**: Subtracting 1 from power of 2 flips all bits after the single set bit
 * 5. **Verify with AND**: n & (n-1) clears the rightmost set bit; equals 0 only for powers of 2
 * 6. **Return result**: Return True if condition holds, False otherwise
 *
 * ### WHY THIS WORKS:
 * - Power of 2 has exactly one bit set in binary
 * - n & (n-1) removes rightmost set bit
 * - If result is 0, n had only one bit set (power of 2)
 * - Edge case: n must be positive (negative can't be power of 2)
 * - O(1) time: single operation, O(1) space
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: n = 16
 * Step 1: Check if n is power of 2
 *   Binary: 16 = 10000 (only one bit set)
 *   16 - 1 = 15 = 01111 (all bits after position 4 are set)
 *
 * Step 2: Apply bit trick
 *   16 & 15 = 10000 & 01111 = 00000 = 0
 *   Since result is 0, n is power of 2
 *
 * Counter-example: n = 18
 *   Binary = 10010 (two bits set)
 *   18 & 17 = 10010 & 10001 = 10000 ≠ 0
 *
 * Output: True (16 is power of 2)
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
  isPowerOfTwo(n: number): boolean {
    return n > 0 && (n & (n - 1)) === 0;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.isPowerOfTwo(1) === true ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.isPowerOfTwo(16) === true ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.isPowerOfTwo(3) === false ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
