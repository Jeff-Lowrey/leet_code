/**
 * ### METADATA:
 *
 *
 * ### INTUITION:
 * The key insight is that binary search on the eating speed k, not the array. The minimum k is 1, maximum is max(piles). For each mid speed, calculate total hours needed. If hours <= h, try smaller k; otherwise try larger k. Find the minimum valid k.
 *
 * ### APPROACH:
 * 1. **Define search range**: Set left = 1 (minimum speed), right = max(piles) (maximum speed)
 * 2. **Binary search on speed**: While left < right, calculate mid = (left + right) // 2
 * 3. **Calculate hours needed**: For speed mid, compute hours = sum(ceil(pile / mid) for pile in piles)
 * 4. **Check feasibility**: Compare hours with h to determine if speed mid works
 * 5. **Speed too slow**: If hours > h, increase speed: left = mid + 1
 * 6. **Speed works**: If hours <= h, try slower speed: right = mid
 * 7. **Find minimum speed**: Continue until left == right
 * 8. **Return result**: Return left as the minimum eating speed
 *
 * ### WHY THIS WORKS:
 * - This ensures that binary search on eating speed: min=1, max=max(piles)
 * - This ensures that for each speed k, calculate hours needed: ceil(pile / k) for each pile
 * - This ensures that if total hours <= h, try smaller speed (right = mid - 1)
 * - This ensures that if total hours > h, need faster speed (left = mid + 1)
 * - This ensures that o(n log m) time: log m binary search, O(n) to verify, O(1) space
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * piles = [3,6,7,11], h = 8
 * ```
 *
 * Step 1: Initialize search space
 * left = 1 (min speed), right = 11 (max pile size)
 * Step 2: Binary search for minimum speed
 * mid = 6: hours = ceil(3/6)+ceil(6/6)+ceil(7/6)+ceil(11/6) = 1+1+2+2 = 6 ≤ 8
 *
 * Steps:
 * Step 1: Try lower speed, right = 6
 * Step 2: mid = 3: hours = ceil(3/3)+ceil(6/3)+ceil(7/3)+ceil(11/3) = 1+2+3+4 = 10 > 8
 * Step 3: Need higher speed, left = 4
 * Step 4: mid = 5: hours = ceil(3/5)+ceil(6/5)+ceil(7/5)+ceil(11/5) = 1+2+2+3 = 8 ≤ 8
 * Step 5: Try lower speed, right = 5
 * Step 6: mid = 4: hours = ceil(3/4)+ceil(6/4)+ceil(7/4)+ceil(11/4) = 1+2+2+3 = 8 ≤ 8
 * Step 7: Try lower speed, right = 4
 * Step 8: left = right = 4
 *
 * Output:
 * ```
 * 4 (minimum eating speed)
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
  minEatingSpeed(piles: number[], h: number): number {
    let left = 1;
    let right = Math.max(...piles);

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      const hours = this.calculateHours(piles, mid);

      if (hours <= h) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }

    return left;
  }

  private calculateHours(piles: number[], speed: number): number {
    return piles.reduce((total, pile) => total + Math.ceil(pile / speed), 0);
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.minEatingSpeed([3, 6, 7, 11], 8) === 4 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.minEatingSpeed([30, 11, 23, 4, 20], 5) === 30 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.minEatingSpeed([30, 11, 23, 4, 20], 6) === 23 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
