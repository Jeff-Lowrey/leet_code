/**
 * # Difficulty: Easy
 *
 * # 190. Reverse Bits
 *
 * Reverse bits of a given 32 bits unsigned integer.
 *
 * Note:
 * - Note that in some languages, such as Java, there is no unsigned integer type. In this case, both input and output will be given as a signed integer type. They should not affect your implementation, as the integer's internal binary representation is the same, whether it is signed or unsigned.
 * - In Java, the compiler represents the signed integers using 2's complement notation. Therefore, in Example 2 above, the input represents the signed integer -3 and the output represents the signed integer -1073741825.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>n = 00000010100101000001111010011100 (43261596)</dd>
 * <dt>Output:</dt>
 * <dd>964176192 (00111001011110000010100101000000)</dd>
 * <dt>Explanation:</dt>
 * <dd>Bits of 00000010100101000001111010011100 are reversed to 00111001011110000010100101000000</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Array Traversal, Two Pointers
 * **Data Structures**: Hash Set, Tree, Linked List
 * **Patterns**: Complement Search, Two Pointers Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Reverse bits by extracting each bit from the right (n & 1), shifting result left, and adding the bit. Process all 32 bits by shifting n right each iteration.
 *
 * ### APPROACH:
 * 1. **Initialize result**: Set result = 0 to build the reversed bits
 * 2. **Loop 32 times**: Iterate for each of the 32 bits in the integer
 * 3. **Extract rightmost bit**: Use (n & 1) to get the current rightmost bit of n
 * 4. **Shift result left**: Left-shift result by 1 to make room for the new bit (result <<= 1)
 * 5. **Add bit to result**: Use result |= (n & 1) to add the extracted bit to result
 * 6. **Shift n right**: Right-shift n by 1 to process the next bit (n >>= 1)
 * 7. **Return result**: After 32 iterations, return result with all bits reversed
 *
 * ### WHY THIS WORKS:
 * - Process 32 bits: shift result left, add rightmost bit of n, shift n right
 * - result = (result << 1) | (n & 1), then n >>= 1
 * - Each iteration moves one bit from n to result in reverse position
 * - Repeat 32 times for all bits
 * - O(1) time: fixed 32 iterations, O(1) space
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * n = 00000010100101000001111010011100 (43261596)
 * ```
 *
 * Step 1: Reverse bits one by one
 * Step 2: Detailed process for first few bits
 * n = 43261596, result = 0
 * - Extract bit 0 (0), shift result left, add bit
 * - Extract bit 1 (0), shift result left, add bit
 * - Continue for all 32 bits
 *
 * result = 0, iterate 32 times:
 * ```
 * Bit 0: n & 1 = 0, result = 0
 * Bit 1: n & 1 = 0, result = 0
 * ...
 * Bit 31: n & 1 = 0, result = 964176192
 * ```
 *
 * Output:
 * ```
 * 964176192 (00111001011110000010100101000000)
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
  reverseBits(n: number): number {
    let result = 0;

    for (let i = 0; i < 32; i++) {
      result <<= 1;
      result |= n & 1;
      n >>= 1;
    }

    return result >>> 0;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.reverseBits(0b00000010100101000001111010011100);
  console.log(`Test 1: ${result1 === 964176192 ? "PASS" : "FAIL"}`);

  const result2 = solution.reverseBits(0b11111111111111111111111111111101);
  console.log(`Test 2: ${result2 === 3221225471 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
