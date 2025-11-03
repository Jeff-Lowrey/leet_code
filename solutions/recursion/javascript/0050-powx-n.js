/**
 * # 0050. Powx N
 *
 * Difficulty: Easy
 *
 * Solve the Powx N problem as described.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>x = 2.0, n = 10</dd>
 * <dt>Output:</dt>
 * <dd>1024.0</dd>
 * <dt>Explanation:</dt>
 * <dd>2^10 = 1024</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: Fast Exponentiation, Divide and Conquer
 * **Data Structures**: Recursion Stack
 * **Patterns**: Binary Exponentiation, Recursion Pattern
 * **Time Complexity**: **O(log n)**
 * **Space Complexity**: **O(log n)** for recursion, **O(1)** for iterative
 *
 * ### INTUITION:
 * Instead of computing x^n by multiplying x by itself n times (O(n)), use fast exponentiation to compute the result in O(log n) by repeatedly squaring and using the property: x^n = (x^(n/2))^2.
 *
 * ### APPROACH:
1. **Base case**: x^0 = 1
2. **Recursive case**: Compute half = x^(n/2) recursively
3. **Even exponent**: x^n = half * half
4. **Odd exponent**: x^n = x * half * half
5. **Negative exponent**: x^(-n) = 1 / x^n

### WHY THIS WORKS:
Binary exponentiation reduces the problem size by half in each step. For example, computing 2^10 only requires computing 2^5, then squaring it, rather than multiplying 2 ten times.

### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * x = 2.0, n = 10
 * ```
 *
 * Steps:
 * Step 1: myPow(2, 10) → half = myPow(2, 5)
 * Step 2: myPow(2, 5) → half = myPow(2, 2), return 2 * half * half
 * Step 3: myPow(2, 2) → half = myPow(2, 1), return half * half
 * Step 4: myPow(2, 1) → half = myPow(2, 0), return 2 * half * half
 * Step 5: myPow(2, 0) → return 1
 *
 * Output:
 * ```
 * 1024.0
 * ```

 * ### TIME COMPLEXITY:
**O(n)** - Analysis of time complexity - [Add explanation of why this complexity]

### SPACE COMPLEXITY:
**O(1)** - Analysis of space complexity - [Add explanation of why this complexity]

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>
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
