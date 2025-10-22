/**
 * # 231. Power of Two
 *
 * # Difficulty: Easy
 *
 * Given an integer n, return true if it is a power of two. Otherwise, return false.
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
