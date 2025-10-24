/**
 * # 371. Sum of Two Integers
 *
 * # Difficulty: Medium
 *
 * Given two integers a and b, return the sum of the two integers without using
 * the operators + and -.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>a = 1, b = 2</dd>
 * <dt>Output:</dt>
 * <dd>3</dd>
 * <dt>Explanation:</dt>
 * <dd>1 + 2 = 3 using bitwise operations</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: Bit Manipulation, XOR, AND, Bit Shifting
 * **Data Structures**: None
 * **Patterns**: Bitwise Addition Simulation
 * **Time Complexity**: O(1) - Fixed number of iterations (32 bits for integers)
 * **Space Complexity**: O(1) - Only storing intermediate values
 *
 * ### INTUITION:
 * Addition can be broken down into two parts:
 * 1. XOR gives sum without carry (1+1=0, 1+0=1, 0+0=0)
 * 2. AND then left shift gives the carry (1+1 produces carry to next position)
 * Repeat until there's no carry.
 *
 * ### APPROACH:
 * 1. **XOR operation**: Calculate sum without carry (a ^ b)
 * 2. **AND operation**: Find carry bits (a & b)
 * 3. **Left shift**: Move carry to next position ((a & b) << 1)
 * 4. **Repeat**: Continue until carry becomes 0
 * 5. **Handle negatives**: Mask to handle 32-bit signed integers
 *
 * ### WHY THIS WORKS:
 * - XOR: Adds bits without considering carry (0+0=0, 0+1=1, 1+0=1, 1+1=0)
 * - AND then shift: Finds where both bits are 1 (produces carry)
 * - Iterating combines partial sums with carries until no carry remains
 * - Works for both positive and negative numbers
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * a = 1, b = 2
 * ```
 *
 * Binary: a = 001, b = 010
 * Iteration 1:
 * sum = 001 ^ 010 = 011 (3)
 * carry = (001 & 010) << 1 = 000 << 1 = 000
 * carry = 0, done!
 *
 * Output:
 * ```
 * 3
 * ```

### TIME COMPLEXITY:
 * O(1) - At most 32 iterations for 32-bit integers
 *
 * ### SPACE COMPLEXITY:
 * O(1) - Constant space for variables
 *
 * ### EDGE CASES:
 * - **Both zero**: Return 0
 * - **Negative numbers**: Handle with mask for 32-bit range
 * - **Overflow**: Mask to 32-bit range
 * - **Opposite signs**: XOR and AND operations handle correctly
 *
 * </details>
 */

class Solution {
  /**
   * Add two integers using bitwise operations.
   *
   * @param {number} a
   * @param {number} b
   * @return {number}
   *
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  getSum(a, b) {
    // Mask to get 32-bit integers
    const mask = 0xffffffff;

    // Process until no carry
    while (b !== 0) {
      // Calculate sum without carry and carry
      const sumWithoutCarry = (a ^ b) & mask;
      const carry = ((a & b) << 1) & mask;

      a = sumWithoutCarry;
      b = carry;
    }

    // Handle negative numbers (convert from 32-bit to JavaScript int)
    return a > 0x7fffffff ? ~(a ^ mask) : a;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests() {
  const solution = new Solution();

  console.log(`Test 1: ${solution.getSum(1, 2)}`); // Expected: 3
  console.log(`Test 2: ${solution.getSum(2, 3)}`); // Expected: 5
  console.log(`Test 3: ${solution.getSum(-2, 3)}`); // Expected: 1
  console.log(`Test 4: ${solution.getSum(-1, 1)}`); // Expected: 0

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}
