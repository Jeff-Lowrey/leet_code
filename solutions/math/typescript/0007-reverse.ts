/**
 * # Difficulty: Medium
 *
 * # 0007. Reverse Integer
 *
 *
 * Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>x = 123</dd>
 * <dt>Output:</dt>
 * <dd>* 321</dd>
 * <dt>Explanation:</dt>
 * <dd>Reversed integer: 123 becomes 321</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Array Traversal
 * **Data Structures**: Hash Set, String
 * **Patterns**: Iterative Solution
 * **Time Complexity**: O(n)
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
The key insight is that extract digits from end using mod 10. Build reversed number by multiplying result by 10 and adding digit. Check for overflow before each operation.

### APPROACH:
 * 1. **Initialize result**: Set result = 0 to build reversed number
 * 2. **Handle sign**: Store sign of x, work with absolute value
 * 3. **Extract digits**: While x != 0, get digit = x % 10
 * 4. **Build reversed number**: result = result * 10 + digit
 * 5. **Remove last digit**: x = x // 10
 * 6. **Check overflow**: If result > 2^31 - 1 or result < -2^31, return 0
 * 7. **Restore sign**: Multiply result by original sign
 * 8. **Return result**: Return the reversed integer with sign
 *
 * ### WHY THIS WORKS:
- This ensures that build reversed number: rev = rev * 10 + x % 10, then x //= 10
- This ensures that check overflow before multiplying: if rev > MAX // 10, will overflow
- This ensures that handle negative numbers: take abs, reverse, then negate
- This ensures that return 0 if result exceeds 32-bit signed integer range
- This ensures that o(log n) time: number of digits, O(1) space

### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * x = 123
 * ```
 *
 * Step 1: Extract digits and build reversed number
 * result = 0
 * result = 0*10 + 3 = 3, x = 12
 * result = 3*10 + 2 = 32, x = 1
 * result = 32*10 + 1 = 321, x = 0
 *
 * Output:
 * ```
 * 321
 * ```

 * ### TIME COMPLEXITY:

 * O(n)

 * - Single pass through the input
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
 *
 * ### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>
 */

class Solution {
  reverse(x: number): number {
    const sign = x < 0 ? -1 : 1;
    let reversed = 0;
    x = Math.abs(x);

    while (x > 0) {
      reversed = reversed * 10 + (x % 10);
      x = Math.floor(x / 10);
    }

    reversed *= sign;

    if (reversed < -(2 ** 31) || reversed > 2 ** 31 - 1) {
      return 0;
    }

    return reversed;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.reverse(123) === 321 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.reverse(-123) === -321 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.reverse(120) === 21 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
