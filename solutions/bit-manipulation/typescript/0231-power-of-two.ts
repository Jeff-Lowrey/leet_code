/**
 * # 0231. Power of Two
 *
 * Difficulty: Medium
 *
 * # Difficulty: Easy
 *
 * Given an integer n, return true if it is a power of two. Otherwise, return false.
 *
 * An integer n is a power of two, if there exists an integer x such that n == 2^x.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>n = 16</dd>
 * <dt>Output:</dt>
 * <dd>true</dd>
 * <dt>Explanation:</dt>
 * <dd>2^4 = 16</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: Recursion, Bit Manipulation
 * **Data Structures**: None
 * **Patterns**: Divide and Conquer, Mathematical
 * **Time Complexity**: O(log n) for recursion
 * **Space Complexity**: O(log n) for recursion stack
 *
 * ### INTUITION:
 * A power of two has exactly one bit set in its binary representation.
 * Recursively, we can check: if n is even, divide by 2 and recurse.
 * If n becomes 1, it's a power of two. If n is odd (and not 1), it's not.
 *
 * ### APPROACH:
 * 1. **Base cases**: n = 1 (true, 2^0), n ≤ 0 (false)
 * 2. **Even case**: Recursively check n/2
 * 3. **Odd case**: Return false (powers of 2 are never odd except 1)
 * 4. **Alternative**: Bit manipulation - n & (n-1) == 0
 *
 * ### WHY THIS WORKS:
 * - Powers of 2 in binary: 1, 10, 100, 1000, etc.
 * - Dividing by 2 removes one bit until we reach 1
 * - If we encounter an odd number (except 1), it cannot be a power of 2
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * n = 16
 * ```
 *
 * Steps:
 * Step 1: isPowerOfTwo(16) → 16 % 2 == 0, check isPowerOfTwo(8)
 * Step 2: isPowerOfTwo(8)  → 8 % 2 == 0, check isPowerOfTwo(4)
 * Step 3: isPowerOfTwo(4)  → 4 % 2 == 0, check isPowerOfTwo(2)
 * Step 4: isPowerOfTwo(2)  → 2 % 2 == 0, check isPowerOfTwo(1)
 * Step 5: isPowerOfTwo(1)  → return True
 * Step 6: Result: True
 * 
 * Output:
 * ```
 * True
 * ```
 * 
 * ### TIME COMPLEXITY:
 * O(log n) for recursion
 *
 * ### SPACE COMPLEXITY:
 * O(log n) for recursion stack
 *
 * ### EDGE CASES:
 * - n ≤ 0: return False
 * - n = 1: return True (2^0)
 * - Odd numbers > 1: return False
 *
 * </details>
 */

class Solution {
  /**
   * Check if n is a power of two using recursion.
   *
   * Time Complexity: O(log n)
   * Space Complexity: O(log n)
   */
  isPowerOfTwo(n: number): boolean {
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
  isPowerOfTwoBitManipulation(n: number): boolean {
    return n > 0 && (n & (n - 1)) === 0;
  }

  /**
   * Check iteratively.
   *
   * Time Complexity: O(log n)
   * Space Complexity: O(1)
   */
  isPowerOfTwoIterative(n: number): boolean {
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

function runTests(): void {
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

export default Solution;
