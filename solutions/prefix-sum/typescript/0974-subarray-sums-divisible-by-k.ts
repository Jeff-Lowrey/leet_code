/**
 * # 0974. Subarray Sums Divisible By K
 * 
 * # Difficulty: Medium
 * 
 * Given an integer array nums and an integer k, return the number of non-empty subarrays
 * that have a sum divisible by k.
 * 
 * A subarray is a contiguous part of an array.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>nums = [4,5,0,-2,-3,1], k = 5</dd>
 * <dt>Output:</dt>
 * <dd>7</dd>
 * <dt>Explanation:</dt>
 * <dd>There are 7 subarrays with sum divisible by k=5</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Array
 * **Patterns**: Hash Table Pattern, Greedy Algorithm
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(min(n, k))
 * 
 * ### INTUITION:
The key insight is that use prefix sum with modulo arithmetic. If two prefix sums have the same remainder
when divided by k, the subarray between them is divisible by k. Track remainder
frequencies in a hash map.

### APPROACH:
 * 1. **Hash Map**: Store (remainder → frequency) pairs
 * 2. **Prefix Sum**: Calculate cumulative sum modulo k
 * 3. **Count**: For each remainder, if seen before, add previous count (all pairs count)
 * 4. **Normalize**: Handle negative remainders by adding k
 * 
 * ### WHY THIS WORKS:
If prefix[i] % k == prefix[j] % k, then sum(nums[i+1:j+1]) % k == 0.
For n occurrences of a remainder, there are n*(n-1)/2 pairs, but we count
incrementally: each new occurrence pairs with all previous occurrences.

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [4,5,0,-2,-3,1], k = 5
```

Prefix sums: [4, 9, 9, 7, 4, 5]
Remainders: [4, 4, 4, 2, 4, 0]
Initialize: {0: 1}  # remainder 0 before array
Index 0: rem=4, count=0 (not seen), add {0:1, 4:1}
Index 1: rem=4, count=1 (seen once), add {0:1, 4:2}
Index 2: rem=4, count=2 (seen twice), add {0:1, 4:3}
Index 3: rem=2, count=0 (not seen), add {0:1, 4:3, 2:1}
Index 4: rem=4, count=3 (seen 3 times), add {0:1, 4:4, 2:1}
Index 5: rem=0, count=1 (initial 0), add {0:2, 4:4, 2:1}
Total: 0+1+2+0+3+1 = 7

Output:
```
[Expected output]
```

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
 * 
 * ### SPACE COMPLEXITY:
 * O(min(n, k)) - hash map storage
 * 
 * ### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>
 */

class Solution {
  /**
   * Approach: Prefix sum with hash map tracking remainders
   * Time Complexity: O(n)
   * Space Complexity: O(min(n, k))
   */
  subarraysDivByK(nums: number[], k: number): number {
    const remainder_count = { 0: 1 };
    const count = 0;
    const prefix_sum = 0;
    for (const num of nums) {
      prefix_sum += num;
      const remainder = prefix_sum % k;
      if (remainder in remainder_count) {
        count += remainder_count[remainder];
      }
      const remainder_count[remainder] = remainder_count.get(remainder, 0) + 1;
    }
    return count;
  }

  /**
   * Approach: Same as above but with explicit remainder normalization
   * Time Complexity: O(n)
   * Space Complexity: O(min(n, k))
   */
  subarraysDivByKExplicitNormalization(nums: number[], k: number): number {
    const remainder_count = { 0: 1 };
    const count = 0;
    const prefix_sum = 0;
    for (const num of nums) {
      prefix_sum += num;
      const remainder = prefix_sum % k + k % k;
      if (remainder in remainder_count) {
        count += remainder_count[remainder];
      }
      const remainder_count[remainder] = remainder_count.get(remainder, 0) + 1;
    }
    return count;
  }

  /**
   * Approach: Brute force checking all subarrays
   * Time Complexity: O(n²)
   * Space Complexity: O(1)
   */
  subarraysDivByKBruteForce(nums: number[], k: number): number {
    const count = 0;
    const n = nums.length;
    for (let i = 0; i < n; i++) {
      const subarray_sum = 0;
      for (let j = 0; j < i; j++) {
        subarray_sum += nums[j];
        if (subarray_sum % k === 0) {
          count += 1;
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

  test_solution();
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;