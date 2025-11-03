/**
 * ### METADATA:
 *
 *
 * ### INTUITION:
 * The key insight is that the missing number is the difference between expected sum (n*(n+1)/2) and actual sum. Alternatively, XOR all numbers and all indices to cancel pairs, leaving missing number.
 *
 * ### APPROACH:
 * 1. **Calculate expected sum**: expected = n * (n + 1) // 2
 * 2. **Calculate actual sum**: actual = sum(nums)
 * 3. **Find difference**: missing = expected - actual
 * 4. **Return result**: Return missing number
 *
 * ### WHY THIS WORKS:
 * - This ensures that xOR all numbers 0..n and all array elements
 * - This ensures that duplicate numbers XOR to 0, leaving only missing number
 * - This ensures that alternative: expected sum - actual sum = missing (Gauss formula)
 * - This ensures that xOR approach avoids integer overflow issues
 * - This ensures that o(n) time, O(1) space
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [3,0,1]
 * ```
 *
 * Step 1: Calculate expected sum
 * expected = 0+1+2+3 = 6
 * Step 2: Calculate actual sum
 * actual = 3+0+1 = 4
 * Step 3: Find difference
 * missing = 6 - 4 = 2
 *
 * Output:
 * ```
 * 2 (missing number)
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)**
 *
 * - Single pass through the input
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
  missingNumber(nums: number[]): number {
    const n = nums.length;
    let missing = n;

    for (let i = 0; i < n; i++) {
      missing ^= i ^ nums[i];
    }

    return missing;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.missingNumber([3, 0, 1]) === 2 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.missingNumber([0, 1]) === 2 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1]) === 8 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
