/**
 * # 326. Power Of Three
 *
 * Solve problem #326: Power Of Three
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>input data here</dd>
 * <dt>Output:</dt>
 * <dd>output data here</dd>
 * <dt>Explanation:</dt>
 * <dd>Explanation of the solution</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: TBD
 * **Data Structures**: TBD
 * **Patterns**: TBD
 * **Time Complexity**: **O(n)**
 * **Space Complexity**: **O(1)**
 *
 * ### INTUITION:
 * The key insight is to solve this problem efficiently.
 *
 * ### APPROACH:
 * We solve this problem by implementing the required algorithm.
 *
 * ### WHY THIS WORKS:
 * This approach works because it correctly implements the problem requirements.
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: example input
 * Output: example output
 * ```
 *
 * ### TIME COMPLEXITY:
 * **O(n)** - Analysis of time complexity
 *
 * ### SPACE COMPLEXITY:
 * **O(1)** - Analysis of space complexity
 *
 * ### EDGE CASES:
 * - Handle empty input
 * - Handle boundary conditions
 *
 * </details>
 */

class Solution {
  /**
   * Check if n is a power of three using recursion.
   *
   * Time Complexity: O(log₃ n)
   * Space Complexity: O(log₃ n)
   */
  isPowerOfThree(n) {
    // Base cases
    if (n <= 0) {
      return false;
    }
    if (n === 1) {
      return true;
    }

    // If n is not divisible by 3, it cannot be a power of 3
    if (n % 3 !== 0) {
      return false;
    }

    // Recursively check n/3
    return this.isPowerOfThree(Math.floor(n / 3));
  }

  /**
   * Check iteratively.
   *
   * Time Complexity: O(log₃ n)
   * Space Complexity: O(1)
   */
  isPowerOfThreeIterative(n) {
    if (n <= 0) {
      return false;
    }

    while (n > 1) {
      if (n % 3 !== 0) {
        return false;
      }
      n = Math.floor(n / 3);
    }

    return true;
  }

  /**
   * Check using mathematics.
   *
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  isPowerOfThreeMath(n) {
    return n > 0 && 1162261467 % n === 0;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests() {
  const solution = new Solution();

  console.log(`Test 1: ${solution.isPowerOfThree(1) === true ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.isPowerOfThree(27) === true ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.isPowerOfThree(0) === false ? "PASS" : "FAIL"}`);
  console.log(`Test 4: ${solution.isPowerOfThree(-1) === false ? "PASS" : "FAIL"}`);
  console.log(`Test 5: ${solution.isPowerOfThree(9) === true ? "PASS" : "FAIL"}`);
  console.log(`Test 6: ${solution.isPowerOfThree(45) === false ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}
