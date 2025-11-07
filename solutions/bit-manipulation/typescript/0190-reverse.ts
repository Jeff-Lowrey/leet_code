/**
 * ### METADATA:
 *
 *
 * ### INTUITION:
 * The key insight is that reverse bits by extracting each bit from the right (n & 1), shifting result left, and adding the bit. Process all 32 bits by shifting n right each iteration.
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
 * - This ensures that process 32 bits: shift result left, add rightmost bit of n, shift n right
 * - This ensures that result = (result << 1) | (n & 1), then n >>= 1
 * - This ensures that each iteration moves one bit from n to result in reverse position
 * - This ensures that repeat 32 times for all bits
 * - This ensures that o(1) time: fixed 32 iterations, O(1) space
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
 *
 * ### TIME COMPLEXITY:
 * O(n)**
 * - Single pass through input
 *
 * ### SPACE COMPLEXITY:
 * **O(n)** - [Explanation of why this complexity]. The algorithm [describe the operation] which takes **O(n)** space.
 *
 * ### EDGE CASES:
 * - **Empty input**: Handle when input is empty
 * - **Single element**: Handle single-element inputs
 * - **Boundary values**: Handle minimum/maximum valid values
 *
 * *
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
