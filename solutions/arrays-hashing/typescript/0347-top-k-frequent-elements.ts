/**
 * # 347. Top K Frequent Elements
 *
 * Difficulty: Medium
 *
 * # Difficulty: Medium
 *
 * Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>nums = [1,1,1,2,2,3], k = 2</dd>
 * <dt>Output:</dt>
 * <dd>[1, 2]</dd>
 * <dt>Explanation:</dt>
 * <dd>The k=2 most frequent elements in [1,1,1,2,2,3] are [1,2]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal, Bucket Sort
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Hash Table Pattern, Bucket Sort Pattern
 * **Time Complexity**: O(n) - Bucket sort approach
 * **Space Complexity**: O(n) - Hash map and buckets storage
 *
 * ### INTUITION:
 * Use bucket sort where the index represents frequency. After counting frequencies with a hash map, place each number in a bucket corresponding to its frequency. Then collect results from the highest frequency buckets downward until we have k elements.
 *
 * ### APPROACH:
 * 1. **Count frequencies**: Use a hash map to count frequency of each number
 * 2. **Create buckets**: Build array where buckets[freq] contains all numbers with that frequency
 * 3. **Collect results**: Iterate from highest frequency to lowest, collecting k elements
 * 4. **Return result**: Return the k most frequent elements
 *
 * ### WHY THIS WORKS:
 * - Bucket sort by frequency achieves O(n) time vs heap's O(n log k)
 * - Frequency can't exceed n, so we need at most n+1 buckets (index 0 to n)
 * - Hash map counts frequencies in O(n), bucketing also O(n)
 * - Collecting from buckets high to low gets k elements without full sort
 * - Trade space O(n) for buckets to gain linear time complexity
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [1,1,1,2,2,3], k = 2
 * ```
 *
 * Step 1: Count frequencies
 * freq_map = {1: 3, 2: 2, 3: 1}
 * Step 2: Create buckets by frequency
 * buckets[3] = [1]
 * buckets[2] = [2]
 * buckets[1] = [3]
 * Step 3: Collect from highest frequency buckets
 * - From bucket 3: add 1
 * - From bucket 2: add 2
 *
 * Output:
 * ```
 * [1, 2]
 * ```

### TIME COMPLEXITY:
 * O(n) - Bucket sort approach
 *
 * ### SPACE COMPLEXITY:
 * O(n) - Hash map and buckets
 *
 * ### EDGE CASES:
 * - Empty input handling
 * - Single element cases
 * - k equals array length
 *
 * </details>
 */

class Solution {
  /**
   * Find the k most frequent elements using bucket sort.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  topKFrequent(nums: number[], k: number): number[] {
    // Handle edge cases
    if (!nums || nums.length === 0 || k <= 0) {
      return [];
    }
    if (k >= nums.length) {
      return Array.from(new Set(nums));
    }

    // Count frequency of each number
    const freqMap = new Map<number, number>();
    for (const num of nums) {
      freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }

    // Create buckets where index represents frequency
    const buckets: number[][] = Array.from({ length: nums.length + 1 }, () =>
      [],
    );
    for (const [num, freq] of freqMap.entries()) {
      buckets[freq].push(num);
    }

    // Collect k most frequent elements
    const result: number[] = [];
    for (let i = buckets.length - 1; i >= 0; i--) {
      if (buckets[i].length > 0) {
        result.push(...buckets[i]);
        if (result.length >= k) {
          return result.slice(0, k);
        }
      }
    }

    return result;
  }

  /**
   * Alternative implementation using sorting.
   *
   * Time Complexity: O(n log n)
   * Space Complexity: O(n)
   */
  topKFrequentSort(nums: number[], k: number): number[] {
    // Handle edge cases
    if (!nums || nums.length === 0 || k <= 0) {
      return [];
    }
    if (k >= nums.length) {
      return Array.from(new Set(nums));
    }

    // Count frequency of each number
    const freqMap = new Map<number, number>();
    for (const num of nums) {
      freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }

    // Sort by frequency and take top k
    return Array.from(freqMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, k)
      .map((entry) => entry[0]);
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  // Test case 1: Example from problem
  const result1 = solution.topKFrequent([1, 1, 1, 2, 2, 3], 2);
  const expected1 = [1, 2];
  console.log(`Test 1: ${JSON.stringify(result1.sort()) === JSON.stringify(expected1.sort()) ? "PASS" : "FAIL"}`);
  console.log(`  Input: [1, 1, 1, 2, 2, 3], k=2`);
  console.log(`  Expected: ${JSON.stringify(expected1)}`);
  console.log(`  Got: ${JSON.stringify(result1)}`);

  // Test case 2: Single element
  const result2 = solution.topKFrequent([1], 1);
  const expected2 = [1];
  console.log(`Test 2: ${JSON.stringify(result2) === JSON.stringify(expected2) ? "PASS" : "FAIL"}`);
  console.log(`  Input: [1], k=1`);
  console.log(`  Expected: ${JSON.stringify(expected2)}`);
  console.log(`  Got: ${JSON.stringify(result2)}`);

  // Test case 3: All different elements
  const result3 = solution.topKFrequent([1, 2, 3, 4, 5], 2);
  console.log(`Test 3: Got ${JSON.stringify(result3)} (any 2 elements valid)`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
