/**
 * # Difficulty: Medium
 *
 * # 0009. Palindrome Number
 *
 * Difficulty: Easy
 *
 * Given an integer x, return true if x is a palindrome, and false otherwise.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>x = 121</dd>
 * <dt>Output:</dt>
 * <dd>True (is palindrome)</dd>
 * <dt>Explanation:</dt>
 * <dd>Number 121 is a palindrome</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Standard Algorithm
 * **Data Structures**: String
 * **Patterns**: Iterative Solution
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Extract first and last digits. Compare them. If different, not palindrome. Remove first and last digits by dividing by 10^(digits-1) and mod 10^(digits-1). Repeat.
 *
 * ### APPROACH:
 * 1. **Handle negatives**: If x < 0, return False
 * 2. **Handle edge cases**: If x ends in 0 and x != 0, return False
 * 3. **Reverse half**: Initialize reversed_half = 0
 * 4. **Build reversed half**: While x > reversed_half
 * 5. **Extract digit**: reversed_half = reversed_half * 10 + x % 10, x //= 10
 * 6. **Compare halves**: Check if x == reversed_half or x == reversed_half // 10
 * 7. **Return result**: Return True if palindrome, False otherwise
 *
 * ### WHY THIS WORKS:
 * - Reverse second half of number, compare with first half
 * - Negative numbers not palindromes (leading minus sign)
 * - Build reversed number: rev = rev * 10 + x % 10, then x /= 10
 * - Compare original with reversed: x == rev or x == rev // 10 (odd length)
 * - O(log n) time: number of digits, O(1) space
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * x = 121
 * ```
 *
 * Step 1: Reverse half of the number
 * original = 121, reversed = 0
 * reversed = 0*10 + 1 = 1, x = 12
 * reversed = 1*10 + 2 = 12, x = 1
 * Step 2: Compare
 * x = 1, reversed = 12
 * 12/10 = 1, equals x
 *
 * Output:
 * ```
 * True (is palindrome)
 * ```

 * ### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
 *
 * ### EDGE CASES:
 * - Empty input handling
 * - Single element cases
 * - Large input considerations
 *
 * </details>
 */

class Solution {
  isPalindrome(x: number): boolean {
    if (x < 0) return false;
    if (x < 10) return true;
    if (x % 10 === 0) return false;

    let reversed = 0;
    let original = x;

    while (x > reversed) {
      reversed = reversed * 10 + (x % 10);
      x = Math.floor(x / 10);
    }

    return x === reversed || x === Math.floor(reversed / 10);
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.isPalindrome(121) === true ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.isPalindrome(-121) === false ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.isPalindrome(10) === false ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
