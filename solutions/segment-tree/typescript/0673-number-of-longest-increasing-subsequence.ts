/**
 * # Difficulty: Medium
 *
 * # 0673. Number Of Longest Increasing Subsequence
 *
 * Difficulty: Medium
 *
 * Given an integer array nums, return the number of longest increasing subsequences.
 *
 * Notice that the sequence has to be strictly increasing.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[[1, 3, 5, 4, 7]</dd>
 * <dt>Output:</dt>
 * <dd>"\nInput: nums"</dd>
 * <dt>Explanation:</dt>
 * <dd>The number of longest increasing subsequences of length 4 is 2</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Set, Array, Tree
 * **Patterns**: Two Pointers Pattern, Hash Table Pattern
 * **Time Complexity**: - DP: O(n²) - Nested iteration through input
 * **Space Complexity**: O(n) - Additional set storage
 *
 * ### INTUITION:
 * This extends the classic LIS problem by not just finding the length, but also counting how many subsequences achieve that length. We can use dynamic programming or segment trees. For each position, we track both the longest length ending there and the count of such sequences.
 *
 * ### APPROACH:
 * 1. **Initialize DP arrays**: Create two arrays - lengths[i] for LIS length ending at i, counts[i] for number of such subsequences
 * 2. **Set base values**: Initialize all lengths to 1 and all counts to 1 (each element is a subsequence of length 1)
 * 3. **Nested loop iteration**: For each position i, check all previous positions j where nums[j] < nums[i]
 * 4. **Update when longer found**: If lengths[j] + 1 > lengths[i], found longer sequence, update lengths[i] and reset counts[i] to counts[j]
 * 5. **Add when equal length**: If lengths[j] + 1 == lengths[i], found another sequence of same length, add counts[j] to counts[i]
 * 6. **Find maximum length**: After processing all positions, find the maximum value in lengths array
 * 7. **Sum matching counts**: Return sum of counts[i] for all positions i where lengths[i] equals maximum length
 *
 * ### WHY THIS WORKS:
 * A set by definition contains only unique elements - when we convert an array to a set, any duplicates are automatically removed. By comparing the lengths of the original array and the set, we can detect if duplicates existed. The early termination approach works because as soon as we find an element already in our seen set, we've proven a duplicate exists without needing to check the remaining elements.
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [1,3,5,4,7]
 * ```
 *
 * For each position:
 * i=0: nums[0]=1, length=1, count=1
 *
 * Steps:
 * Step 1: i=1: nums[1]=3, length=2 (1→3), count=1
 * Step 2: i=2: nums[2]=5, length=3 (1→3→5), count=1
 * Step 3: i=3: nums[3]=4, length=3 (1→3→4), count=1
 * Step 4: i=4: nums[4]=7, length=4, count=2 (from both i=2 and i=3)
 *
 * Output:
 * ```
 * 2
 * ```

 * ### TIME COMPLEXITY:
 * - DP: O(n²)
 * - Segment Tree: O(n log n)
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 * - Additional set storage
 * For DP arrays or tree structure
 *
 * ### EDGE CASES:
 * - Empty array
 * - Single element
 * - All elements equal (no strictly increasing)
 * - All increasing
 * - All decreasing
 * - Duplicates in array
 *
 * </details>
 */

class Solution {
  /**
   * Find number of longest increasing subsequences using DP.
   *
   * Time Complexity: O(n^2)
   * Space Complexity: O(n)
   */
  findNumberOfLIS(nums: number[]): number {
    if (!nums || nums.length === 0) {
      return 0;
    }

    const n = nums.length;
    const lengths = new Array(n).fill(1); // lengths[i] = length of LIS ending at i
    const counts = new Array(n).fill(1); // counts[i] = number of LIS ending at i

    for (let i = 1; i < n; i++) {
      for (let j = 0; j < i; j++) {
        if (nums[j] < nums[i]) {
          if (lengths[j] + 1 > lengths[i]) {
            // Found longer subsequence
            lengths[i] = lengths[j] + 1;
            counts[i] = counts[j];
          } else if (lengths[j] + 1 === lengths[i]) {
            // Found another subsequence of same length
            counts[i] += counts[j];
          }
        }
      }
    }

    // Find maximum length
    const maxLength = Math.max(...lengths);

    // Count all subsequences with maximum length
    let result = 0;
    for (let i = 0; i < n; i++) {
      if (lengths[i] === maxLength) {
        result += counts[i];
      }
    }

    return result;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.findNumberOfLIS([1, 3, 5, 4, 7]) === 2 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.findNumberOfLIS([2, 2, 2, 2, 2]) === 5 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.findNumberOfLIS([1, 2, 4, 3, 5, 4, 7, 2]) === 3 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
