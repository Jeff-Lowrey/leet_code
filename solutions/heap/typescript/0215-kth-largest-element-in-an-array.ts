/**
 * # Difficulty: Medium
 *
 * # 0215. Kth Largest Element in an Array
 *
 * Difficulty: Medium
 *
 * Given an integer array nums and an integer k, return the kth largest element in the array.
 *
 * Note that it is the kth largest element in the sorted order, not the kth distinct element.
 *
 * Can you solve it without sorting?
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>nums = [3,2,1,5,6,4], k = 2</dd>
 * <dt>Output:</dt>
 * <dd>[3,2,1,5,6,4]</dd>
 * <dt>Explanation:</dt>
 * <dd>The 2nd largest element in [3,2,1,5,6,4] is 5</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Map Storage, Array Traversal, Two Pointers
 * **Data Structures**: Array, Heap, Tree
 * **Patterns**: Two Pointers Pattern, Hash Table Pattern
 * **Time Complexity**: - Min-heap: O(n log k)
 * **Space Complexity**: - Min-heap: O(k)
 *
 * ### INTUITION:
 * Several approaches: min-heap (keep k largest), max-heap (pop k-1 times), or QuickSelect (partition-based like QuickSort). QuickSelect is optimal O(n) average case.
 *
 * ### APPROACH:
 * 1. **Build initial min-heap**: Create a min-heap from the first k elements of the array using heapify
 * 2. **Process remaining elements**: Iterate through the rest of the array starting from index k
 * 3. **Compare with heap root**: For each element, check if it's larger than the smallest element in heap (heap[0])
 * 4. **Replace if larger**: If element is larger than heap root, replace the root with this element using heapreplace
 * 5. **Maintain heap size k**: Heap always contains the k largest elements seen so far, with smallest of those k at the root
 * 6. **Return kth largest**: After processing all elements, the root of the min-heap is the kth largest element
 * 7. **Alternative QuickSelect**: Use partition-based selection similar to QuickSort for O(n) average time complexity
 *
 * ### WHY THIS WORKS:
 * - **Heap**: Root of min-heap with k elements = kth largest
 * - **QuickSelect**: Partially sorts to find kth element (like QuickSort but only one partition)
 * - **Quick Select** doesn't need full sort, just correct position
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [3,2,1,5,6,4], k = 2
 * ```
 *
 * Min-Heap approach:
 * - Build heap with first k=2: [2, 3]
 * - Process 1: 1 < 2, skip
 * - Process 5: 5 > 2, replace: [3, 5]
 * - Process 6: 6 > 3, replace: [5, 6]
 * - Process 4: 4 < 5, skip
 * - Result: heap[0] = 5
 * QuickSelect approach:
 * - Pivot 4: [3,2,1,4] | [5,6]
 * - Position 4 from right, need position 2
 * - Recurse right: [5,6]
 * - Pivot 5: [5] | [6]
 * - Position 2 from right = answer: 5

 * ### TIME COMPLEXITY:
 * - Min-heap: O(n log k)
 * - Max-heap: O(n + k log n)
 * - QuickSelect: O(n) average, O(n²) worst
 * - Sorting: O(n log n)
 *
 * ### SPACE COMPLEXITY:
 * - Min-heap: O(k)
 * - QuickSelect: O(1) if in-place
 * - Sorting: O(1) or O(n) depending on algorithm
 *
 * ### EDGE CASES:
 * - k = 1 (maximum)
 * - k = n (minimum)
 * - All elements same
 * - Negative numbers
 * - k > array length (invalid input)
 *
 * </details>
 */

class Solution {
  /**
   * Find kth largest using sort (simple and efficient for most cases).
   *
   * Time Complexity: O(n log n)
   * Space Complexity: O(1)
   */
  findKthLargest(nums: number[], k: number): number {
    // Sort in descending order
    nums.sort((a, b) => b - a);
    return nums[k - 1];
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.findKthLargest([3, 2, 1, 5, 6, 4], 2) === 5 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4) === 4 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.findKthLargest([1, 2, 3], 3) === 1 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
