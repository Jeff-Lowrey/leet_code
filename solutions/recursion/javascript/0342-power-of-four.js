/**
 * # 0342. Power Of Four
 *
 * Difficulty: Medium
 *
 * # 0342. Power of Four
 *
 * Given an integer n, return true if it is a power of four. Otherwise, return false.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>16</dd>
 * <dt>Output:</dt>
 * <dd>true</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: Bit Manipulation, Recursion, Math
 * **Data Structures**: Integer
 * **Patterns**: Power Detection, Bit Pattern Recognition
 * **Time Complexity**: **O(1)** - Constant time bit operation or O(log n) for recursion
 * **Space Complexity**: **O(1)** - Constant space or O(log n) for recursion stack
 *
 * ### INTUITION:
 * A power of four must be a power of two with the bit set at an even position.
 * Powers of 4 in binary: 1 (1), 4 (100), 16 (10000), 64 (1000000).
 * Notice the single bit is always at position 0, 2, 4, 6, etc. (even positions).
 *
 * ### APPROACH:
 * **Data structures: Integer (value operations), Bit manipulation**
 * 1. **Base cases**: n = 1 (true, 4^0), n ≤ 0 (false)
 * 2. **Divisible by 4**: Recursively check n/4
 * 3. **Not divisible by 4**: Return false
 * 4. **Alternative**: Check if power of 2 AND (n-1) % 3 === 0
 *
 * ### WHY THIS WORKS:
 * - Powers of 4: 1, 4, 16, 64, 256, 1024, etc.
 * - Dividing by 4 repeatedly should eventually reach 1
 * - Mathematical property: 4^x = (2^2)^x = 2^(2x) means the bit is at even position
 * - All powers of 4 satisfy: (n-1) % 3 === 0
 *
 *

This solution uses bit manipulation for efficient implementation.

This solution uses recursion for efficient implementation.

The solution leverages integer for efficient operations.
### EXAMPLE WALKTHROUGH:
 * **Input:** n = 16
 *
 * **Step 1:** isPowerOfFour(16) → 16 % 4 === 0 → check isPowerOfFour(4)
 *
 * **Step 2:** isPowerOfFour(4) → 4 % 4 === 0 → check isPowerOfFour(1)
 *
 * **Step 3:** isPowerOfFour(1) → return true (base case)
 *
 * Output:
 * ```
 * true
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(log₄ n) - dividing by 4 each time
 *
 * ### SPACE COMPLEXITY:
 * O(log₄ n) - recursion stack depth
 *
 * ### EDGE CASES:
 * - n = 0: n=0 → false (zero is not a power of four)
 * - n < 0: n=-16 → false (negative numbers, powers of 4 are positive)
 * - n = 1: n=1 → true (special case: 4^0 = 1)
 * - Powers of 2 that aren't powers of 4: n=2 → false, n=8 → false, n=32 → false
 * - Large powers of 4: n=64 → true (4^3), n=256 → true (4^4), n=1024 → true (4^5)
 *
 * </details>
 *
 * @param {number} n
 * @return {boolean}
 */

class Solution {
  /**
   * Check if n is a power of four using recursion.
   *
   * Time Complexity: O(log₄ n)
   * Space Complexity: O(log₄ n)
   */
  isPowerOfFour(n) {
    // Base cases
    if (n <= 0) {
      return false;
    }
    if (n === 1) {
      return true;
    }

    // If n is not divisible by 4, it cannot be a power of 4
    if (n % 4 !== 0) {
      return false;
    }

    // Recursively check n/4
    return this.isPowerOfFour(Math.floor(n / 4));
  }

  /**
   * Check using bit manipulation.
   *
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  isPowerOfFourBitManipulation(n) {
    return n > 0 && (n & (n - 1)) === 0 && (n & 0x55555555) !== 0;
  }

  /**
   * Check using mathematics.
   *
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  isPowerOfFourMath(n) {
    return n > 0 && (n & (n - 1)) === 0 && (n - 1) % 3 === 0;
  }

  /**
   * Check iteratively.
   *
   * Time Complexity: O(log₄ n)
   * Space Complexity: O(1)
   */
  isPowerOfFourIterative(n) {
    if (n <= 0) {
      return false;
    }

    while (n > 1) {
      if (n % 4 !== 0) {
        return false;
      }
      n = Math.floor(n / 4);
    }

    return true;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests() {
  const solution = new Solution();

  console.log(`Test 1: ${solution.isPowerOfFour(1) === true ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.isPowerOfFour(16) === true ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.isPowerOfFour(5) === false ? "PASS" : "FAIL"}`);
  console.log(`Test 4: ${solution.isPowerOfFour(0) === false ? "PASS" : "FAIL"}`);
  console.log(`Test 5: ${solution.isPowerOfFour(2) === false ? "PASS" : "FAIL"}`);
  console.log(`Test 6: ${solution.isPowerOfFour(8) === false ? "PASS" : "FAIL"}`);
  console.log(`Test 7: ${solution.isPowerOfFour(64) === true ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}
