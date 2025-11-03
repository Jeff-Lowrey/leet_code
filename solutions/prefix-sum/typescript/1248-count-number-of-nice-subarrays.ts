/**
### INTUITION:
This problem is a variation of "subarray sum equals k" but instead of sum, we count odd numbers. We can use prefix sum technique by treating each odd number as 1 and even numbers as 0. Then we need to find subarrays where the sum of 1s equals k.

### APPROACH:
Data structures: **Array** with **Prefix Sum** tracking, **Hash Map** for frequency storage**
1. **Transform problem**: Convert to counting subarrays with sum = k (odd→1, even→0)
2. **Prefix sum tracking**: Maintain running count of odd numbers encountered
3. **HashMap frequency**: Store frequency of each prefix count in **Hash Map**
4. **Count subarrays**: For each position, check if (current_count - k) exists in **Hash Map**

### WHY THIS WORKS:
- This ensures that prefix sum transforms odd counting into a sum problem: odd→1, even→0
- This ensures that **Hash Map** stores frequency of prefix counts for O(1) lookup
- This ensures that using prefix sum: prefix_count[j] - prefix_count[i] = k means subarray from i+1 to j has k odd numbers
- This ensures that for each position j, we find how many earlier positions i satisfy the equation
- This ensures that alternative sliding window approach uses "exactly k = at most k - at most (k-1)" formula

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [1, 1, 2, 1, 1], k = 3
```

Step 1:** Transform array
- Convert odd→1, even→0: [1,1,0,1,1]
- Prefix counts: [0,1,2,2,3,4]

Step 2:** Check position 3 (count=3)
- Need count-k = 3-3 = 0
- Frequency map has 0 appearing 1 time
- Add 1 to result

Step 3:** Check position 4 (count=4)
- Need count-k = 4-3 = 1
- Frequency map has 1 appearing 1 time
- Add 1 to result

Step 4:** Count total nice subarrays
- Subarray [1,1,2,1] (indices 0-3)
- Subarray [1,2,1,1] (indices 1-4)

Output:
```
2
```

### TIME COMPLEXITY:
O(n)**
Single pass through array with HashMap operations

### SPACE COMPLEXITY:
O(n)**
- Additional hash map storage
For the frequency HashMap

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

*/

class Solution {
  /**
   * Count nice subarrays using prefix sum approach.
   *
   *         Args:
   *             nums: **Array** of integers
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
   *             nums: **Array** of integers
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
   *             nums: **Array** of integers
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
   *             nums: **Array** of integers
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