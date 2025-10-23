/**
 * # 350. Intersection of Two Arrays II
 *
 * # Difficulty: Easy
 *
 * Given two integer arrays nums1 and nums2, return an array of their intersection.
 * Each element in the result must appear as many times as it shows in both arrays
 * and you may return the result in any order.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>nums1 = [1,2,2,1], nums2 = [2,2]</dd>
 * <dt>Output:</dt>
 * <dd>[2,2]</dd>
 * <dt>Explanation:</dt>
 * <dd>The intersection includes elements that appear in both arrays with their frequencies</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: Hash Table, Frequency Counting, Two Pointers
 * **Data Structures**: Hash Map, Array
 * **Patterns**: Frequency Counter Pattern
 * **Time Complexity**: O(n + m) - Single pass through both arrays with O(1) hash operations
 * **Space Complexity**: O(min(n, m)) - Hash map stores frequencies of smaller array
 *
 * ### INTUITION:
 * Use a hash map to count frequencies in one array, then iterate through the second
 * array to find common elements. This allows us to handle duplicates correctly.
 *
 * ### APPROACH:
 * 1. **Count frequencies**: Build frequency map for nums1
 * 2. **Find intersections**: Iterate through nums2
 * 3. **Check and decrement**: If element exists in map with count > 0, add to result and decrement
 * 4. **Return result**: Array of intersecting elements with proper frequencies
 *
 * ### WHY THIS WORKS:
 * - Hash map tracks how many times each element appears in nums1
 * - For each element in nums2, we check if it's available in the map
 * - Decrementing the count ensures we don't reuse elements
 * - Time complexity is linear, space is proportional to smaller array
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: nums1 = [1,2,2,1], nums2 = [2,2]
 *
 * Step 1: Build frequency map from nums1
 *   freq = {1: 2, 2: 2}
 *
 * Step 2: Iterate through nums2
 *   num = 2: freq[2] = 2 > 0 → add 2, freq[2] = 1
 *   num = 2: freq[2] = 1 > 0 → add 2, freq[2] = 0
 *
 * Output: [2, 2]
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n + m) where n = len(nums1), m = len(nums2)
 *
 * ### SPACE COMPLEXITY:
 * O(min(n, m)) - Store frequencies of smaller array
 *
 * ### EDGE CASES:
 * - **Empty arrays**: Return empty array
 * - **No intersection**: Return empty array
 * - **All elements intersect**: Return all with proper frequencies
 * - **One array is subset**: Return the subset
 *
 * </details>
 */

class Solution {
  /**
   * Find intersection of two arrays with duplicate handling.
   *
   * @param {number[]} nums1
   * @param {number[]} nums2
   * @return {number[]}
   *
   * Time Complexity: O(n + m)
   * Space Complexity: O(min(n, m))
   */
  intersect(nums1, nums2) {
    // Count frequencies in nums1
    const freq = new Map();
    for (const num of nums1) {
      freq.set(num, (freq.get(num) || 0) + 1);
    }

    const result = [];

    // Find intersections in nums2
    for (const num of nums2) {
      if (freq.get(num) > 0) {
        result.push(num);
        freq.set(num, freq.get(num) - 1);
      }
    }

    return result;
  }

  /**
   * Alternative: Two pointers approach (requires sorting).
   *
   * Time Complexity: O(n log n + m log m)
   * Space Complexity: O(1) excluding output
   */
  intersectSorted(nums1, nums2) {
    nums1.sort((a, b) => a - b);
    nums2.sort((a, b) => a - b);

    let i = 0,
      j = 0;
    const result = [];

    while (i < nums1.length && j < nums2.length) {
      if (nums1[i] < nums2[j]) {
        i++;
      } else if (nums1[i] > nums2[j]) {
        j++;
      } else {
        result.push(nums1[i]);
        i++;
        j++;
      }
    }

    return result;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests() {
  const solution = new Solution();

  console.log(`Test 1: ${JSON.stringify(solution.intersect([1, 2, 2, 1], [2, 2]))}`);
  console.log(`Test 2: ${JSON.stringify(solution.intersect([4, 9, 5], [9, 4, 9, 8, 4]).sort())}`);
  console.log(`Test 3: ${JSON.stringify(solution.intersect([1, 2, 3], [4, 5, 6]))}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}
