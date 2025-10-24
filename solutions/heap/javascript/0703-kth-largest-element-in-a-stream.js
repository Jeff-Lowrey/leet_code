/**
 * # Difficulty: Easy
 *
 * # 703. Kth Largest Element in a Stream
 *
 * Difficulty: Medium
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
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Hash Map Storage, Set Operations, Array Traversal
 * **Data Structures**: Array, Heap
 * **Patterns**: Iterative Solution
 * **Time Complexity**: * - Constructor: O(n log k) where n = len(nums)
 * **Space Complexity**: * O(k)

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

/**
 * MinHeap implementation for maintaining k largest elements
 */
class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  peek() {
    return this.heap[0];
  }

  push(val) {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }

  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown(0);
    return top;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex] <= this.heap[index]) break;
      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];
      index = parentIndex;
    }
  }

  bubbleDown(index) {
    while (true) {
      let smallest = index;
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;

      if (
        leftChild < this.heap.length &&
        this.heap[leftChild] < this.heap[smallest]
      ) {
        smallest = leftChild;
      }
      if (
        rightChild < this.heap.length &&
        this.heap[rightChild] < this.heap[smallest]
      ) {
        smallest = rightChild;
      }
      if (smallest === index) break;

      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      index = smallest;
    }
  }
}

/**
 * KthLargest class - maintains kth largest element in a stream
 */
class KthLargest {
  /**
   * @param {number} k - The kth position to track
   * @param {number[]} nums - Initial numbers
   */
  constructor(k, nums) {
    this.k = k;
    this.minHeap = new MinHeap();

    // Add all initial numbers to heap
    for (const num of nums) {
      this.add(num);
    }
  }

  /**
   * Adds a value to the stream and returns the kth largest element
   * @param {number} val - Value to add
   * @return {number} - The kth largest element
   */
  add(val) {
    // If heap has fewer than k elements, always add
    if (this.minHeap.size() < this.k) {
      this.minHeap.push(val);
    }
    // If new value is larger than smallest in top k, replace it
    else if (val > this.minHeap.peek()) {
      this.minHeap.pop();
      this.minHeap.push(val);
    }

    return this.minHeap.peek();
  }
}

/**
 * Main solution wrapper for consistency
 */
function solve() {
  return KthLargest;
}

/**
 * Test cases for Problem 703: Kth Largest Element In A Stream
 */
function testSolution() {
  console.log("Testing 703. Kth Largest Element In A Stream");

  // Test case 1: Basic functionality
  const kthLargest1 = new KthLargest(3, [4, 5, 8, 2]);
  const result1_1 = kthLargest1.add(3);
  console.assert(
    result1_1 === 4,
    `Test 1.1 failed: expected 4, got ${result1_1}`,
  );
  const result1_2 = kthLargest1.add(5);
  console.assert(
    result1_2 === 5,
    `Test 1.2 failed: expected 5, got ${result1_2}`,
  );
  const result1_3 = kthLargest1.add(10);
  console.assert(
    result1_3 === 5,
    `Test 1.3 failed: expected 5, got ${result1_3}`,
  );
  const result1_4 = kthLargest1.add(9);
  console.assert(
    result1_4 === 8,
    `Test 1.4 failed: expected 8, got ${result1_4}`,
  );
  const result1_5 = kthLargest1.add(4);
  console.assert(
    result1_5 === 8,
    `Test 1.5 failed: expected 8, got ${result1_5}`,
  );

  // Test case 2: k = 1 (largest element)
  const kthLargest2 = new KthLargest(1, [1, 2, 3]);
  const result2 = kthLargest2.add(4);
  console.assert(result2 === 4, `Test 2 failed: expected 4, got ${result2}`);

  // Test case 3: Empty initial array
  const kthLargest3 = new KthLargest(2, []);
  const result3_1 = kthLargest3.add(3);
  console.assert(
    result3_1 === 3,
    `Test 3.1 failed: expected 3, got ${result3_1}`,
  );
  const result3_2 = kthLargest3.add(5);
  console.assert(
    result3_2 === 3,
    `Test 3.2 failed: expected 3, got ${result3_2}`,
  );
  const result3_3 = kthLargest3.add(10);
  console.assert(
    result3_3 === 5,
    `Test 3.3 failed: expected 5, got ${result3_3}`,
  );

  // Test case 4: Negative numbers
  const kthLargest4 = new KthLargest(2, [-1, -2]);
  const result4 = kthLargest4.add(0);
  console.assert(result4 === -1, `Test 4 failed: expected -1, got ${result4}`);

  console.log(
    "All test cases passed for 703. Kth Largest Element In A Stream!",
  );
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 703. Kth Largest Element In A Stream ===");
  console.log("Category: Heap");
  console.log("Difficulty: Easy");
  console.log("");

  const kthLargest = new KthLargest(3, [4, 5, 8, 2]);
  console.log("Initialized with k=3, nums=[4, 5, 8, 2]");
  console.log("add(3):", kthLargest.add(3)); // 4
  console.log("add(5):", kthLargest.add(5)); // 5
  console.log("add(10):", kthLargest.add(10)); // 5
  console.log("add(9):", kthLargest.add(9)); // 8
  console.log("add(4):", kthLargest.add(4)); // 8

  testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
  demonstrateSolution();
}

// Export for use in other modules
module.exports = {
  solve,
  KthLargest,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This solution uses a min heap of size k to track k largest elements
 * - The top of the min heap is always the kth largest element
 * - Very efficient for streaming data: O(log k) per addition
 * - Perfect example of using heap for maintaining top-k elements
 */
