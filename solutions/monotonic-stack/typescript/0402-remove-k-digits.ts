/**
 * # Difficulty: Medium
 *
 * # 402. Remove K Digits
 *
 * Given string num representing a non-negative integer num, and an integer k, return the smallest possible integer after removing k digits from num.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>num = "1432219", k = 3</dd>
 * <dt>Output:</dt>
 * <dd>"1219"</dd>
 * <dt>Explanation:</dt>
 * <dd>By greedily removing k digits to make the smallest number, '1432219' becomes '1219' after removing 3 digits</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Array, String, Stack
 * **Patterns**: Two Pointers Pattern, Greedy Algorithm
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Use monotonic increasing stack. Remove k digits greedily by popping larger digits when a smaller digit is found. If k removals not reached, remove from end. Handle leading zeros.
 *
 * ### APPROACH:
 * 1. **Initialize stack**: Create empty stack to build result
 * 2. **Iterate through digits**: For each digit in num
 * 3. **Remove larger digits**: While k > 0 and stack and stack[-1] > digit, pop from stack and decrement k
 * 4. **Add current digit**: Append digit to stack
 * 5. **Handle remaining k**: After loop, if k > 0, remove last k digits from stack
 * 6. **Remove leading zeros**: Strip leading zeros from result
 * 7. **Handle empty**: If result is empty, return "0"
 * 8. **Return result**: Return ''.join(stack)
 *
 * ### WHY THIS WORKS:
 * - Monotonic increasing stack removes digits to create smallest number
 * - Remove larger digits from left when possible (higher place value impact)
 * - While digit < stack_top and k > 0: pop (remove larger digit)
 * - Leading zeros stripped, leftover k handled by removing from right
 * - Greedy works: removing leftmost large digits always improves result
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * num = "1432219", k = 3
 * ```
 *
 * Step 1: Use monotonic stack
 * Add '1': stack=['1']
 * Add '4': stack=['1','4']
 * Add '3': pop '4' (3<4), k=2, stack=['1','3']
 * Add '2': pop '3' (2<3), k=1, stack=['1','2']
 * Add '2': stack=['1','2','2']
 * Add '1': pop '2' (1<2), k=0, stack=['1','2','1']
 * Add '9': stack=['1','2','1','9']
 *
 * Output:
 * ```
 * "1219"
 * ```

### TIME COMPLEXITY:
 * O(n)
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 *
 * ### EDGE CASES:
 * - Empty input handling
 * - Single element cases
 * - Large input considerations
 *
 * </details>
 */

class Solution {
  /**
   * Remove k digits from the number to get the smallest possible number.
   * Uses a monotonic stack approach to maintain increasing sequence.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  removeKdigits(num: string, k: number): string {
    // Edge cases
    if (!num || k >= num.length) {
      return "0";
    }

    // Initialize stack to build monotonic sequence
    const stack: string[] = [];

    // Process each digit
    for (const digit of num) {
      // Remove digits that break monotonic increasing sequence
      while (k > 0 && stack.length > 0 && stack[stack.length - 1] > digit) {
        stack.pop();
        k--;
      }
      stack.push(digit);
    }

    // If we still need to remove digits, remove from the end
    while (k > 0) {
      stack.pop();
      k--;
    }

    // Build the result string
    const result = stack.join("").replace(/^0+/, "");

    // Return "0" if result is empty, otherwise return result
    return result || "0";
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  // Test case 1: Example from problem
  console.log(`Test 1: ${solution.removeKdigits("1432219", 3) === "1219" ? "PASS" : "FAIL"}`);

  // Test case 2: Remove all digits
  console.log(`Test 2: ${solution.removeKdigits("10", 2) === "0" ? "PASS" : "FAIL"}`);

  // Test case 3: Leading zeros
  console.log(`Test 3: ${solution.removeKdigits("10200", 1) === "200" ? "PASS" : "FAIL"}`);

  // Test case 4: Remove from end
  console.log(`Test 4: ${solution.removeKdigits("112", 1) === "11" ? "PASS" : "FAIL"}`);

  // Test case 5: All same digits
  console.log(`Test 5: ${solution.removeKdigits("1111", 2) === "11" ? "PASS" : "FAIL"}`);

  // Test case 6: Single digit
  console.log(`Test 6: ${solution.removeKdigits("9", 1) === "0" ? "PASS" : "FAIL"}`);

  // Test case 7: No removals needed
  console.log(`Test 7: ${solution.removeKdigits("123", 0) === "123" ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
