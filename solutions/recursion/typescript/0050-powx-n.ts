/**
 * # 0050. Pow(x, n)
 *
 * Difficulty: Easy
 *
 * # Difficulty: Medium
 *
 * Implement pow(x, n), which calculates x raised to the power n (i.e., x^n).
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>x = 2.00000, n = 10</dd>
 * <dt>Output:</dt>
 * <dd>1024.00000</dd>
 * <dt>Explanation:</dt>
 * <dd>2^10 = 1024</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: Recursion, Fast Exponentiation, Divide and Conquer
 * **Data Structures**: None (pure computation)
 * **Patterns**: Binary Exponentiation
 * **Time Complexity**: O(log n)
 * **Space Complexity**: O(log n) for recursion stack
 *
 * ### INTUITION:
 * Use divide-and-conquer to compute power efficiently. Instead of multiplying x by itself n times,
 * we can compute x^(n/2) once and square it. This reduces time complexity from O(n) to O(log n).
 *
 * ### APPROACH:
 * 1. **Base case**: x^0 = 1
 * 2. **Negative power**: x^(-n) = 1 / x^n
 * 3. **Even power**: x^n = (x^(n/2))^2
 * 4. **Odd power**: x^n = x * (x^(n/2))^2
 * 5. **Recursion**: Compute half power and reuse it
 *
 * ### WHY THIS WORKS:
 * - Dividing exponent by 2 each time gives O(log n) complexity
 * - Squaring result avoids redundant multiplications
 * - Handles negative exponents by taking reciprocal
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * x = 2, n = 10
 * ```
 *
 * pow(2, 10) = pow(2, 5)^2
 * pow(2, 5) = 2 * pow(2, 2)^2
 * pow(2, 2) = pow(2, 1)^2
 * pow(2, 1) = 2 * pow(2, 0)^2
 * pow(2, 0) = 1
 * Working back: 2*1 = 2, 2^2 = 4, 2*16 = 32, 32^2 = 1024
 *
 * Output:
 * ```
 * 1024
 * ```

 * ### TIME COMPLEXITY:

 * O(log n)

 * - Binary search or tree height traversal
 *
 * ### SPACE COMPLEXITY:
 * O(log n) for recursion stack
 *
 * ### EDGE CASES:
 * - n = 0: return 1
 * - n < 0: compute 1/pow(x, -n)
 * - x = 0: return 0
 * - x = 1: return 1
 *
 * </details>
 */

class Solution {
  /**
   * Calculate x^n using fast exponentiation (recursion).
   *
   * Time Complexity: O(log n)
   * Space Complexity: O(log n)
   */
  myPow(x: number, n: number): number {
    const helper = (base: number, exp: number): number => {
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
  myPowIterative(x: number, n: number): number {
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

function runTests(): void {
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

export default Solution;
