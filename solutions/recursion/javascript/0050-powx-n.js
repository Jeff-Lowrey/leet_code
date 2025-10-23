/**
 * # 50. Powx N
 *
 * # 50. Pow(x, n)
 *
 * # Difficulty: Medium
 *
 * Implement pow(x, n), which calculates x raised to the power n (i.e., x^n).
 *
 * @param {number} x
 * @param {number} n
 * @return {number}
 */

class Solution {
  /**
   * Calculate x^n using fast exponentiation (recursion).
   *
   * Time Complexity: O(log n)
   * Space Complexity: O(log n)
   */
  myPow(x, n) {
    const helper = (base, exp) => {
      // Base case
      if (exp === 0) {
        return 1.0;
      }

      // Compute half power
      const half = helper(base, Math.floor(exp / 2));

      // Even exponent
      if (exp % 2 === 0) {
        return half * half;
      }
      // Odd exponent
      else {
        return base * half * half;
      }
    };

    // Handle negative exponent
    if (n < 0) {
      return 1.0 / helper(x, -n);
    }
    return helper(x, n);
  }

  /**
   * Calculate x^n iteratively.
   *
   * Time Complexity: O(log n)
   * Space Complexity: O(1)
   */
  myPowIterative(x, n) {
    if (n < 0) {
      x = 1 / x;
      n = -n;
    }

    let result = 1.0;
    let currentProduct = x;

    while (n > 0) {
      if (n % 2 === 1) {
        result *= currentProduct;
      }
      currentProduct *= currentProduct;
      n = Math.floor(n / 2);
    }

    return result;
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests() {
  const solution = new Solution();

  console.log(`Test 1: ${Math.abs(solution.myPow(2.0, 10) - 1024.0) < 1e-5 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${Math.abs(solution.myPow(2.1, 3) - 9.261) < 1e-5 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${Math.abs(solution.myPow(2.0, -2) - 0.25) < 1e-5 ? "PASS" : "FAIL"}`);
  console.log(`Test 4: ${solution.myPow(1.0, 1000000) === 1.0 ? "PASS" : "FAIL"}`);
  console.log(`Test 5: ${solution.myPow(2.0, 0) === 1.0 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}
