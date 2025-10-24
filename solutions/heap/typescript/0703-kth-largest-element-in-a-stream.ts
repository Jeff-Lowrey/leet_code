/**
 * # Difficulty: Easy
 * 
 * # 703. Kth Largest Element in a Stream
 * 
 * Design a class to find the kth largest element in a stream. Note that it is the kth largest element in the sorted order, not the kth distinct element.
 * 
 * Implement KthLargest class:
 * - KthLargest(int k, int[] nums) Initializes the object with the integer k and the stream of integers nums.
 * - int add(int val) Appends the integer val to the stream and returns the element representing the kth largest element in the stream.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>k = 3, nums = [4, 5, 8, 2]</dd>
 * <dt>Output:</dt>
 * <dd>See walkthrough</dd>
 * <dt>Explanation:</dt>
 * <dd>The 3rd largest element is maintained as elements are added</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Standard Algorithm
 * **Data Structures**: Array, Heap, Tree
 * **Patterns**: Iterative Solution
 * **Time Complexity**: - Constructor: O(n log k) where n = len(nums)
 * **Space Complexity**: O(k)
 * 
 * ### INTUITION:
 * Use a min-heap of size k. The root of the heap is always the kth largest element. When adding a new element, if it's larger than the root, replace the root. This maintains exactly k largest elements with the smallest at the top.
 * 
 * ### APPROACH:
 * 1. **Initialize min-heap**: Add first k elements from nums
 * 2. **Maintain heap size k**: If heap grows beyond k, pop smallest
 * 3. **add() operation**:
 *    - Add new element to heap
 *    - If heap size > k, remove smallest
 *    - Return heap root (kth largest)
 * 
 * ### WHY THIS WORKS:
 * - Min-heap with k elements keeps k largest elements
 * - Root of min-heap is the smallest of the k largest = kth largest overall
 * - When new element added, if it's in top k, smallest of previous top k is removed
 * - Heap operations are O(log k), efficient for streaming data
 * 
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * k = 3, nums = [4, 5, 8, 2]
 * ```
 *
 * Initial heap (3 largest): [4, 5, 8]
 * Min-heap structure: 4 at root (kth largest = 4)
 * add(3):
 * - Add 3 to heap: [3, 4, 5, 8]
 * - Size > k, remove min: [4, 5, 8]
 * - Return root: 4
 * add(5):
 * - Add 5 to heap: [4, 5, 5, 8]
 * - Size > k, remove min: [5, 5, 8]
 * - Return root: 5
 * add(10):
 * - Add 10 to heap: [5, 5, 8, 10]
 * - Size > k, remove min: [5, 8, 10]
 * - Return root: 5

### TIME COMPLEXITY:
 * - Constructor: O(n log k) where n = len(nums)
 * - add(): O(log k)
 * 
 * ### SPACE COMPLEXITY:
 * O(k)
 * Heap stores at most k elements
 * 
 * ### EDGE CASES:
 * - k = 1 (just track maximum)
 * - Empty initial array
 * - All elements same
 * - Negative numbers
 * - k > initial array size
 * 
 * </details>
 */

class Solution {
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();
  // Add test cases here
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;