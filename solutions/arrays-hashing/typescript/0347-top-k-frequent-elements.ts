/**
 * ### METADATA:
 * **Techniques**: Bucket Sort, Frequency Counting
 * **Data Structures**: Hash Map (Counter), Buckets (Array of Lists)
 * **Time Complexity**: O(n)
 * **Space Complexity**: O(n)
 *
 * ### INTUITION:
 * The key insight is to use bucket sort based on frequency. Since the maximum frequency any element can have is n (all elements the same), we can create n+1 buckets where bucket[i] contains all numbers that appear exactly i times. First count frequencies with a hash map, then place numbers into frequency buckets, finally collect k elements from highest frequency buckets first. This achieves O(n) time by avoiding sorting.
 *
 * ### APPROACH:
 * 1. **Count frequencies**: Build hash map of number → frequency for all elements in nums
 * 2. **Create frequency buckets**: Initialize array of n+1 buckets, where bucket[freq] holds all numbers with that frequency
 * 3. **Fill buckets**: For each (number, frequency) pair from hash map, add number to bucket[frequency]
 * 4. **Collect top k**: Traverse buckets from highest frequency (n) down to lowest, collecting elements until we have k total
 * 5. **Return result**: Slice to ensure exactly k elements returned (handle case where last bucket has more than needed)
 *
 * ### WHY THIS WORKS:
 * - This ensures that bucket sort by frequency achieves O(n) time vs heap's O(n log k)
 * - This ensures that frequency can't exceed n, so we need at most n+1 buckets (index 0 to n)
 * - This ensures that hash map counts frequencies in O(n), bucketing also O(n)
 * - This ensures that collecting from buckets high to low gets k elements without full sort
 * - This ensures that trade space O(n) for buckets to gain linear time complexity
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [1,1,1,2,2,3], k = 2
 * ```
 *
 * Step 1: Count frequencies using Counter
 * freq_map = {1: 3, 2: 2, 3: 1}
 * Step 2: Build max heap with negative frequencies
 * heap = [(-3, 1), (-2, 2), (-1, 3)]
 * Step 3: Extract k most frequent elements
 * Alternative (Bucket Sort):
 *
 * Steps:
 * Step 1: - Pop: (-3, 1) → result = [1]
 * Step 2: - Pop: (-2, 2) → result = [1, 2]
 * Step 3: Create buckets by frequency
 * Step 4: buckets[3] = [1]
 * Step 5: buckets[2] = [2]
 * Step 6: buckets[1] = [3]
 * Step 7: Collect from highest frequency buckets
 * Step 8: - From bucket 3: add 1
 * Step 9: - From bucket 2: add 2
 *
 * Output:
 * ```
 * [1, 2]
 * [1, 2]
 * ```
 *
 * ### TIME COMPLEXITY:
 * **O(n)** - where n is the length of the nums array. We perform three linear passes: (1) count frequencies in hash map **O(n)**, (2) place numbers into frequency buckets **O(unique elements)** ≤ **O(n)**, (3) collect k elements from buckets **O(n)** in worst case. Total: **O(n)** + **O(n)** + **O(n)** = **O(3n)** = **O(n)**. This is better than heap-based solutions which would be **O(n log k)** or sorting-based solutions which would be **O(n log n)**.
 *
 * ### SPACE COMPLEXITY:
 * **O(n)** - We use a frequency hash map that stores at most n unique elements (**O(n)**), plus a buckets array of size n+1 where each bucket can hold numbers (**O(n)** total across all buckets in worst case), plus the result array of size k (**O(k)** ≤ **O(n)**). Total space: **O(n)** + **O(n)** + **O(k)** = **O(n)**. The dominant factors are the hash map and buckets array, both **O(n)**.
 *
 * ### EDGE CASES:
 * - **Empty input**: Handle when input is empty
 * - **Single element**: Handle single-element inputs
 * - **Boundary values**: Handle minimum/maximum valid values
 *
 *
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
