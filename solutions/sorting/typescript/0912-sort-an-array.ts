/**
 * # Difficulty: Medium
 *
 * # 912. Sort An Array
 *
 * Difficulty: Medium
 *
 * Given an array of integers nums, sort the array in ascending order and return it.
 *
 * You must solve the problem without using any built-in functions in O(nlog(n)) time complexity
 * and with the smallest space complexity possible.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[1, 2, 3, 5]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Array [5,2,3,1] sorted is [1,2,3,5]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Map Storage, Array Traversal, Two Pointers
 * **Data Structures**: Array, Stack, Heap
 * **Patterns**: Two Pointers Pattern, Divide and Conquer
 * **Time Complexity**: O(n log n) - Sorting or divide-and-conquer
 * **Space Complexity**: - Merge Sort: O(n) for merge array
 *
 * ### INTUITION:
 * Implement various sorting algorithms from scratch. Quicksort, Mergesort, and Heapsort all
 * achieve O(n log n) time. This problem tests understanding of fundamental sorting algorithms.
 *
 * ### APPROACH:
 * **Merge Sort:**
 * 1. Divide array into two halves recursively
 * 2. Sort each half recursively
 * 3. Merge sorted halves back together
 *
 * **Quick Sort:**
 * 1. Choose pivot element
 * 2. Partition array around pivot
 * 3. Recursively sort left and right partitions
 *
 * **Heap Sort:**
 * 1. Build max heap from array
 * 2. Repeatedly extract maximum and rebuild heap
 *
 * ### WHY THIS WORKS:
 * - **Merge Sort**: Divide-and-conquer with guaranteed O(n log n), stable, needs O(n) space
 * - **Quick Sort**: Average O(n log n), in-place, but O(n²) worst case
 * - **Heap Sort**: Guaranteed O(n log n), in-place, not stable
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [5,2,3,1]
 * ```
 *
 * Merge Sort:
 * [5,2,3,1]
 * /    \\
 * [5,2]  [3,1]
 * / \\    / \\
 * [5][2] [3][1]
 * \\ /    \\ /
 * [2,5]  [1,3]
 * \\    /
 * [1,2,3,5]
 * Quick Sort:
 * [5,2,3,1] pivot=1
 * [1] [5,2,3]
 * [2,3,5] pivot=3
 * [2,3] [5]
 * [1,2,3,5]
 *
 * Output:
 * ```
 * [1,2,3,5]
 * ```

### TIME COMPLEXITY:
 * O(n log n)
 * All three algorithms achieve this complexity
 *
 * ### SPACE COMPLEXITY:
 * - Merge Sort: O(n) for merge array
 * - Quick Sort: O(log n) for recursion stack
 * - Heap Sort: O(1) in-place
 *
 * ### EDGE CASES:
 * - Empty array
 * - Single element
 * - All elements equal
 * - Already sorted
 * - Reverse sorted
 * - Large arrays (up to 50,000 elements)
 *
 * </details>
 */

class Solution {
  sortArray(nums: number[]): number[] {
    if (nums.length <= 1) {
      return nums;
    }

    const mid = Math.floor(nums.length / 2);
    const left = this.sortArray(nums.slice(0, mid));
    const right = this.sortArray(nums.slice(mid));

    return this.merge(left, right);
  }

  private merge(left: number[], right: number[]): number[] {
    const result: number[] = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }

    result.push(...left.slice(i));
    result.push(...right.slice(j));

    return result;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.sortArray([5, 2, 3, 1]);
  console.log(
    `Test 1: ${JSON.stringify(result1) === JSON.stringify([1, 2, 3, 5]) ? "PASS" : "FAIL"}`
  );

  const result2 = solution.sortArray([5, 1, 1, 2, 0, 0]);
  console.log(
    `Test 2: ${JSON.stringify(result2) === JSON.stringify([0, 0, 1, 1, 2, 5]) ? "PASS" : "FAIL"}`
  );

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
