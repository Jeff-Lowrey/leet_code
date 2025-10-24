/**
 * # Difficulty: Hard
 *
 * # 315. Count Of Smaller Numbers After Self
 *
 * Difficulty: Medium
 *
 * Given an integer array nums, return an integer array counts where counts[i] is the number of smaller elements to the right of nums[i].
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[2, 1, 1, 0]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Counts of smaller numbers after each element: [2,1,1,0] for [5,2,6,1]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Set, Array, Tree
 * **Patterns**: Two Pointers Pattern, Hash Table Pattern
 * **Time Complexity**: O(n log n) - Sorting or divide-and-conquer
 * **Space Complexity**: O(n) - Additional set storage
 *
 * ### INTUITION:
 * This is a classic "count inversions" problem that can be solved efficiently using various advanced data structures. The naive O(n²) approach checks every pair, but we can do better using merge sort, segment trees, or Binary Indexed Trees (Fenwick Trees).
 *
 * ### APPROACH:
 * 1. **Create indexed pairs**: Build array of (value, original_index) pairs to track positions during sorting
 * 2. **Initialize result array**: Create array of zeros to store counts for each original position
 * 3. **Define merge sort function**: Implement merge sort that recursively divides array into halves
 * 4. **Merge with counting**: During merge, when comparing elements from left and right halves, count inversions
 * 5. **Count smaller elements**: When left[i] <= right[j], all remaining elements in right array are larger, so add their count to result
 * 6. **Preserve order**: Merge elements while maintaining sorted order by value, preserving index information
 * 7. **Return result**: After complete merge sort, result array contains count of smaller elements after each position
 *
 * ### WHY THIS WORKS:
 * A set by definition contains only unique elements - when we convert an array to a set, any duplicates are automatically removed. By comparing the lengths of the original array and the set, we can detect if duplicates existed. The early termination approach works because as soon as we find an element already in our seen set, we've proven a duplicate exists without needing to check the remaining elements.
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * [5,2,6,1]
 * ```
 *
 * Process right to left:
 * - nums[3]=1: no elements after it, count=0
 * - nums[2]=6: elements after: [1], smaller: 1, count=1
 * - nums[1]=2: elements after: [6,1], smaller: 1, count=1
 * - nums[0]=5: elements after: [2,6,1], smaller: 2, count=2
 *
 * Output:
 * ```
 * [2,1,1,0]
 * ```

 * ### TIME COMPLEXITY:
 * O(n log n)
 * - Sorting or divide-and-conquer
 * For merge sort and tree-based approaches
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 * - Additional set storage
 * For auxiliary data structures
 *
 * ### EDGE CASES:
 * - Empty array
 * - Single element
 * - All elements equal
 * - Strictly increasing/decreasing arrays
 * - Duplicate values
 *
 * </details>
 */

class Solution {
  /**
   * Count smaller numbers after self using merge sort approach.
   *
   * Time Complexity: O(n log n)
   * Space Complexity: O(n)
   */
  countSmaller(nums: number[]): number[] {
    if (!nums || nums.length === 0) {
      return [];
    }

    // Create index array to track original positions
    const indexedNums: [number, number][] = nums.map((val, idx) => [val, idx]);
    const result = new Array(nums.length).fill(0);

    const merge = (left: [number, number][], right: [number, number][]): [number, number][] => {
      const merged: [number, number][] = [];
      let i = 0;
      let j = 0;

      while (i < left.length && j < right.length) {
        if (left[i][0] <= right[j][0]) {
          // All elements in right[j:] are greater than left[i]
          // So left[i] has (right.length - j) smaller elements after it
          result[left[i][1]] += right.length - j;
          merged.push(left[i]);
          i++;
        } else {
          merged.push(right[j]);
          j++;
        }
      }

      // Add remaining elements
      while (i < left.length) {
        merged.push(left[i]);
        i++;
      }
      while (j < right.length) {
        merged.push(right[j]);
        j++;
      }

      return merged;
    };

    const mergeSort = (arr: [number, number][]): [number, number][] => {
      if (arr.length <= 1) {
        return arr;
      }

      const mid = Math.floor(arr.length / 2);
      const left = mergeSort(arr.slice(0, mid));
      const right = mergeSort(arr.slice(mid));

      return merge(left, right);
    };

    mergeSort(indexedNums);
    return result;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.countSmaller([5, 2, 6, 1]);
  console.log(`Test 1: ${JSON.stringify(result1) === JSON.stringify([2, 1, 1, 0]) ? "PASS" : "FAIL"}`);

  const result2 = solution.countSmaller([-1]);
  console.log(`Test 2: ${JSON.stringify(result2) === JSON.stringify([0]) ? "PASS" : "FAIL"}`);

  const result3 = solution.countSmaller([-1, -1]);
  console.log(`Test 3: ${JSON.stringify(result3) === JSON.stringify([0, 0]) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
