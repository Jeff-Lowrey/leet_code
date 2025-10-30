/**
 * 1248. Count Number Of Nice Subarrays
 *
 * Difficulty: Medium
 * 
 * Given an array of integers nums and an integer k. A continuous subarray is called nice if there are k odd numbers on it.
 * 
 * Return the number of nice sub-arrays.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>nums = [1, 1, 2, 1, 1], k = 3</dd>
 * <dt>Output:</dt>
 * <dd>2</dd>
 * <dt>Explanation:</dt>
 * <dd>There are 2 nice subarrays (containing exactly k=3 odd numbers)</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Array
 * **Patterns**: Sliding Window Pattern, Hash Table Pattern
 * **Time Complexity**: O(n)
 * **Space Complexity**: O(n) - Additional hash map storage
 * 
 * ### INTUITION:
 * This problem is a variation of "subarray sum equals k" but instead of sum, we count odd numbers. We can use prefix sum technique by treating each odd number as 1 and even numbers as 0. Then we need to find subarrays where the sum of 1s equals k.
 * 
 * ### APPROACH:
 * 1. **Transform problem**: Convert to counting subarrays with sum = k
 * 2. **Prefix sum**: Track running count of odd numbers
 * 3. **HashMap frequency**: Store frequency of each prefix count
 * 4. **Count subarrays**: For each position, check if (current_count - k) exists
 * 
 * ### WHY THIS WORKS:
 * - Transform odd numbers to 1, even numbers to 0
 * - Problem becomes: find subarrays with sum = k
 * - Use the same technique as "Subarray Sum Equals K"
 * - prefix_count[j] - prefix_count[i] = k means subarray from i+1 to j has k odd numbers
 * 
 * ### EXAMPLE WALKTHROUGH:
 * Given input nums = [1,1,2,1,1], k = 3:
 *
 * Input:
 * ```
 * nums = [1,1,2,1,1], k = 3
 * ```
 *
 * Transform: [1,1,0,1,1] (odd=1, even=0)
 * Prefix counts: [0,1,2,2,3,4]
 * For each position, check if (current_count - k) exists:
 * - Position 3: count=3, need=0, found 1 time
 * - Position 4: count=4, need=1, found 1 time
 * Total: 2 nice subarrays

 *
 * Result: 2
 * ### TIME COMPLEXITY:
 * O(n)
 * Single pass through array with HashMap operations
 * 
 * ### SPACE COMPLEXITY:
 * O(n)
 * - Additional hash map storage
 * For the frequency HashMap
 * 
 * ### EDGE CASES:
 * - No odd numbers in array
 * - k = 0 (looking for subarrays with no odd numbers)
 * - k > number of odd numbers in array
 * - All numbers are odd or all are even
 * 
 * </details>
 */

class Solution {
  /**
   * Count nice subarrays using prefix sum approach.
   *
   *         Args:
   *             nums: Array of integers
   *             k: Number of odd numbers required in subarray
   *
   *         Returns:
   *             Number of nice subarrays (subarrays with exactly k odd numbers)
   *
   *         Time Complexity: O(n) - single pass through array
   *         Space Complexity: O(n) - for frequency HashMap
   */
  numberOfSubarrays(nums: number[], k: number): number {
    const prefixCountFreq = new Map<number, number>();
    prefixCountFreq.set(0, 1); // Empty prefix has 0 odd numbers

    let currentOddCount = 0;
    let niceSubarrays = 0;

    for (const num of nums) {
      if (num % 2 === 1) {
        currentOddCount++;
      }

      // Check if (currentOddCount - k) exists
      const needed = currentOddCount - k;
      if (prefixCountFreq.has(needed)) {
        niceSubarrays += prefixCountFreq.get(needed)!;
      }

      // Update frequency map
      prefixCountFreq.set(currentOddCount, (prefixCountFreq.get(currentOddCount) || 0) + 1);
    }

    return niceSubarrays;
  }

  /**
   * Alternative solution using sliding window approach.
   *
   *         Args:
   *             nums: Array of integers
   *             k: Number of odd numbers required
   *
   *         Returns:
   *             Number of nice subarrays
   *
   *         Time Complexity: O(n)
   *         Space Complexity: O(1)
   */
  numberOfSubarraysSlidingWindow(nums: number[], k: number): number {
    const atMostKOdd = (nums: number[], k: number): number => {
      // Count subarrays with at most k odd numbers
      if (k < 0) return 0;

      let left = 0;
      let oddCount = 0;
      let result = 0;

      for (let right = 0; right < nums.length; right++) {
        if (nums[right] % 2 === 1) {
          oddCount++;
        }

        while (oddCount > k) {
          if (nums[left] % 2 === 1) {
            oddCount--;
          }
          left++;
        }

        result += right - left + 1;
      }

      return result;
    };

    // Exactly k = at most k - at most (k-1)
    return atMostKOdd(nums, k) - atMostKOdd(nums, k - 1);
  }

  /**
   * Optimized solution using manual HashMap.
   *
   *         Args:
   *             nums: Array of integers
   *             k: Number of odd numbers required
   *
   *         Returns:
   *             Number of nice subarrays
   */
  numberOfSubarraysOptimized(nums: number[], k: number): number {
    const prefixFreq: Record<number, number> = { 0: 1 };
    let oddCount = 0;
    let result = 0;

    for (const num of nums) {
      if (num % 2 === 1) {
        oddCount++;
      }

      const needed = oddCount - k;
      if (prefixFreq[needed]) {
        result += prefixFreq[needed];
      }

      prefixFreq[oddCount] = (prefixFreq[oddCount] || 0) + 1;
    }

    return result;
  }

  /**
   * Brute force solution for verification.
   *
   *         Args:
   *             nums: Array of integers
   *             k: Number of odd numbers required
   *
   *         Returns:
   *             Number of nice subarrays
   *
   *         Time Complexity: O(n²)
   *         Space Complexity: O(1)
   */
  numberOfSubarraysBruteForce(nums: number[], k: number): number {
    const n = nums.length;
    let count = 0;

    for (let i = 0; i < n; i++) {
      let oddCount = 0;
      for (let j = i; j < n; j++) {
        if (nums[j] % 2 === 1) {
          oddCount++;
        }
        if (oddCount === k) {
          count++;
        }
        if (oddCount > k) {
          break; // No need to continue this subarray
        }
      }
    }

    return count;
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log("=== 1248. Count Number Of Nice Subarrays ===");

  // Test different approaches
  const testCases: [number[], number][] = [
    [[1, 1, 2, 1, 1], 3],
    [[2, 4, 6], 1],
    [[1, 3, 5], 2],
    [[2, 2, 2, 1, 2, 2, 1, 2, 2, 2], 2],
  ];

  for (const [nums, k] of testCases) {
    console.log(`\nInput: nums=[${nums}], k=${k}`);
    const result1 = solution.numberOfSubarrays(nums, k);
    const result2 = solution.numberOfSubarraysSlidingWindow(nums, k);
    const result3 = solution.numberOfSubarraysOptimized(nums, k);
    console.log(`Prefix sum approach:    ${result1}`);
    console.log(`Sliding window:         ${result2}`);
    console.log(`Optimized approach:     ${result3}`);
  }

  // Detailed walkthrough
  console.log("\nDetailed example: nums=[1,1,2,1,1], k=3");
  const nums = [1, 1, 2, 1, 1];
  const oddPositions = nums.map((x, i) => (x % 2 === 1 ? i : -1)).filter((i) => i !== -1);
  console.log(`Odd positions: [${oddPositions}]`);
  console.log("Nice subarrays with 3 odd numbers:");
  console.log("- [1,1,2,1] (indices 0-3)");
  console.log("- [1,2,1,1] (indices 1-4)");
  console.log(`Total: ${solution.numberOfSubarrays(nums, 3)}`);

  // Performance comparison
  console.log("\nApproach complexities:");
  console.log("Prefix sum:     O(n) time, O(n) space");
  console.log("Sliding window: O(n) time, O(1) space");
  console.log("Optimized:      O(n) time, O(n) space");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;