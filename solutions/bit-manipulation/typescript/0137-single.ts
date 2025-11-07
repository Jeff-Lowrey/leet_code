/**
 * ### METADATA:
 *
 *
 * ### INTUITION:
 * The key insight is that use bit manipulation to count occurrences at each bit position. For each bit, sum all bits at that position mod 3. The result is the bit pattern of the single number appearing once.
 *
 * ### APPROACH:
 * 1. **Initialize counters**: Set ones = 0 and twos = 0 to track bits appearing once and twice
 * 2. **Iterate through numbers**: Loop through each num in nums array
 * 3. **Update twos**: Set twos |= (ones & num) to mark bits that appeared twice
 * 4. **Update ones**: Set ones ^= num to toggle bits appearing odd times
 * 5. **Clear bits appearing thrice**: Compute common = ~(ones & twos) and apply ones &= common, twos &= common
 * 6. **Eliminate triple occurrences**: Bits appearing 3 times are cleared from both ones and twos
 * 7. **Return result**: Return ones which contains the single number appearing exactly once
 *
 * ### WHY THIS WORKS:
 * - This ensures that count bits at each position across all numbers
 * - This ensures that if count[i] % 3 != 0, single number has bit i set
 * # - Build result by setting bits where count % 3 == 1  # Result undefined
 * - This ensures that duplicates contribute 3 to each bit position, single contributes 1
 * - This ensures that o(n) time: 32 passes (constant), O(1) space
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [2,2,3,2]
 * ```
 *
 * Step 1: Count bits at each position
 * Binary representations:
 * 2 = 010
 * 2 = 010
 * 3 = 011
 * 2 = 010
 *
 * Steps:
 * Step 1: Bit 0: appears 1 time → 1 % 3 = 1
 * Step 2: Bit 1: appears 4 times → 4 % 3 = 1
 * Step 3: Bit 2: appears 0 times → 0 % 3 = 0
 * Step 4: Build result from remaining bits
 * Step 5: result = 011 (binary) = 3 (decimal)
 *
 * Output:
 * ```
 * 3 (single number)
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
  singleNumber(nums: number[]): number {
    let ones = 0;
    let twos = 0;

    for (const num of nums) {
      twos |= ones & num;
      ones ^= num;
      const common = ~(ones & twos);
      ones &= common;
      twos &= common;
    }

    return ones;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.singleNumber([2, 2, 3, 2]);
  console.log(`Test 1: ${result1 === 3 ? "PASS" : "FAIL"}`);

  const result2 = solution.singleNumber([0, 1, 0, 1, 0, 1, 99]);
  console.log(`Test 2: ${result2 === 99 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
