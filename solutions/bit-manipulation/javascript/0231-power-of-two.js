/**
 * # 0231. Power Of Two
 *
 * Difficulty: Medium
 *
 * # 0231. Power of Two
 *
 *
 * Given an integer n, return true if it is a power of two. Otherwise, return false.
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
 * A power of two has exactly one bit set in its binary representation.
 * Recursively, we can check: if n is even, divide by 2 and recurse.
 * If n becomes 1, it's a power of two. If n is odd (and not 1), it's not.
 *
 * ### APPROACH:
 * 1. **Base cases**: Check integer n - if n = 1 (true, 2^0), if n ≤ 0 (false)
 * 2. **Even case**: Recursively check n/2, dividing the integer by 2
 * 3. **Odd case**: Return false (powers of 2 are never odd except 1)
 * 4. **Alternative**: Bit manipulation on integer - n & (n-1) == 0
 *
 * ### WHY THIS WORKS:
 * - Powers of 2 in binary: 1, 10, 100, 1000, etc.
 * - Dividing by 2 removes one bit until we reach 1
 * - If we encounter an odd number (except 1), it cannot be a power of 2
 *
 *

This solution uses recursion for efficient implementation.

This solution uses math for efficient implementation.

The solution leverages integer for efficient operations.
### EXAMPLE WALKTHROUGH:
 * **Input:** n = 16
 *
 * **Step 1:** isPowerOfTwo(16) → 16 % 2 === 0 → check isPowerOfTwo(8)
 *
 * **Step 2:** isPowerOfTwo(8) → 8 % 2 === 0 → check isPowerOfTwo(4)
 *
 * **Step 3:** isPowerOfTwo(4) → 4 % 2 === 0 → check isPowerOfTwo(2)
 *
 * **Step 4:** isPowerOfTwo(2) → 2 % 2 === 0 → check isPowerOfTwo(1)
 *
 * **Step 5:** isPowerOfTwo(1) → return true (base case)
 *
 * **Output:** true
 *
 * ### TIME COMPLEXITY:
 * O(log n) - dividing by 2 each time
 *
 * ### SPACE COMPLEXITY:
 * O(log n) - recursion stack depth
 *
 * ### EDGE CASES:
 * - n = 0: n=0 → false (zero is not a power of two)
 * - n < 0: n=-16 → false (negative numbers, powers of 2 are positive)
 * - n = 1: n=1 → true (special case: 2^0 = 1)
 * - Odd numbers > 1: n=3 → false, n=5 → false, n=7 → false (immediately false)
 * - Large powers of 2: n=1024 → true (2^10), n=1073741824 → true (2^30)
 *
 * </details>
 *
 * @param {number} n
 * @return {boolean}
 */

class Solution {
  /**
   * Check if n is a power of two using recursion.
   *
   * Time Complexity: O(log n)
   * Space Complexity: O(log n)
   */
  isPowerOfTwo(n) {
    // Base cases
    if (n <= 0) {
      return false;
    }
    if (n === 1) {
      return true;
    }

    // If n is odd (and not 1), it cannot be a power of 2
    if (n % 2 !== 0) {
      return false;
    }

    // Recursively check n/2
    return this.isPowerOfTwo(Math.floor(n / 2));
  }

  /**
   * Check using bit manipulation (most efficient).
   *
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  isPowerOfTwoBitManipulation(n) {
    return n > 0 && (n & (n - 1)) === 0;
  }

  /**
   * Check iteratively.
   *
   * Time Complexity: O(log n)
   * Space Complexity: O(1)
   */
  isPowerOfTwoIterative(n) {
    if (n <= 0) {
      return false;
    }

    while (n > 1) {
      if (n % 2 !== 0) {
        return false;
      }
      n = Math.floor(n / 2);
    }

    return true;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests() {
  const solution = new Solution();

  console.log(`Test 1: ${solution.isPowerOfTwo(1) === true ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.isPowerOfTwo(16) === true ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.isPowerOfTwo(3) === false ? "PASS" : "FAIL"}`);
  console.log(`Test 4: ${solution.isPowerOfTwo(0) === false ? "PASS" : "FAIL"}`);
  console.log(`Test 5: ${solution.isPowerOfTwo(-16) === false ? "PASS" : "FAIL"}`);
  console.log(`Test 6: ${solution.isPowerOfTwo(1024) === true ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}
