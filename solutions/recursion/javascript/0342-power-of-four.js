/**
 * # 342. Power of Four
 *
 * # Difficulty: Easy
 *
 * Given an integer n, return true if it is a power of four. Otherwise, return false.
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
