/**
 * # Difficulty: Hard
 *
 * # 295. Find Median from Data Stream
 *
 * Difficulty: Medium
 *
 * The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.
 *
 * Implement the MedianFinder class:
 * - MedianFinder() initializes the MedianFinder object.
 * - void addNum(int num) adds the integer num from the data stream to the data structure.
 * - double findMedian() returns the median of all elements so far.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>addNum(1):</dd>
 * <dt>Output:</dt>
 * <dd>left=[1], right=[]</dd>
 * <dt>Explanation:</dt>
 * <dd>Median after adding [1,2] is 1.5, after [1,2,3] is 2</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Hash Map Storage, Array Traversal, Stack Operations
 * **Data Structures**: Array, Heap
 * **Patterns**: Iterative Solution
 * **Time Complexity**: * - addNum(): O(log n) - heap operations
 * **Space Complexity**: * O(n)

 *
 * ### INTUITION:
 * Use two heaps to divide numbers into two halves: max-heap for smaller half, min-heap for larger half. The median is always at the top of one or both heaps.
 *
 * ### APPROACH:
 * 1. **Two heaps**: max-heap (left half), min-heap (right half)
 * 2. **Balance heaps**: Keep sizes equal or left heap has 1 more
 * 3. **Add number**:
 *    - Add to left heap, then move largest to right heap
 *    - If right > left, move smallest from right to left
 * 4. **Find median**:
 *    - If sizes equal: average of both tops
 *    - Else: top of left heap
 *
 * ### WHY THIS WORKS:
 * - Max-heap stores smaller half (can get largest quickly)
 * - Min-heap stores larger half (can get smallest quickly)
 * - Tops of heaps are always the middle elements
 * - Balancing ensures O(1) median access
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * addNum(1):
 * ```
 *
 * left=[1], right=[]
 * median = 1
 * addNum(2):
 * left=[1], right=[2]
 * median = (1+2)/2 = 1.5
 * addNum(3):
 * left=[2,1], right=[3]
 * median = 2 (top of left heap)
 * addNum(4):
 * left=[2,1], right=[3,4]
 * median = (2+3)/2 = 2.5

 * ### TIME COMPLEXITY:
 * - addNum(): O(log n) - heap operations
 * - findMedian(): O(1) - just access heap tops
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 * Store all n numbers across two heaps
 *
 * ### EDGE CASES:
 * - Single element
 * - Two elements
 * - Negative numbers
 * - Duplicate values
 * - Large data stream
 *
 * </details>
 */

/**
 * MinHeap implementation for the upper half of numbers
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
 * MaxHeap implementation for the lower half of numbers
 */
class MaxHeap {
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
      if (this.heap[parentIndex] >= this.heap[index]) break;
      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];
      index = parentIndex;
    }
  }

  bubbleDown(index) {
    while (true) {
      let largest = index;
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;

      if (
        leftChild < this.heap.length &&
        this.heap[leftChild] > this.heap[largest]
      ) {
        largest = leftChild;
      }
      if (
        rightChild < this.heap.length &&
        this.heap[rightChild] > this.heap[largest]
      ) {
        largest = rightChild;
      }
      if (largest === index) break;

      [this.heap[index], this.heap[largest]] = [
        this.heap[largest],
        this.heap[index],
      ];
      index = largest;
    }
  }
}

/**
 * MedianFinder class - maintains median of a stream of numbers
 */
class MedianFinder {
  constructor() {
    this.maxHeap = new MaxHeap(); // Lower half
    this.minHeap = new MinHeap(); // Upper half
  }

  /**
   * Adds a number to the data structure
   * @param {number} num
   * @return {void}
   */
  addNum(num) {
    // Add to max heap (lower half) first
    if (this.maxHeap.size() === 0 || num <= this.maxHeap.peek()) {
      this.maxHeap.push(num);
    } else {
      this.minHeap.push(num);
    }

    // Balance the heaps
    if (this.maxHeap.size() > this.minHeap.size() + 1) {
      this.minHeap.push(this.maxHeap.pop());
    } else if (this.minHeap.size() > this.maxHeap.size()) {
      this.maxHeap.push(this.minHeap.pop());
    }
  }

  /**
   * Returns the median of all elements so far
   * @return {number}
   */
  findMedian() {
    if (this.maxHeap.size() > this.minHeap.size()) {
      return this.maxHeap.peek();
    }
    return (this.maxHeap.peek() + this.minHeap.peek()) / 2;
  }
}

/**
 * Main solution wrapper for consistency
 */
function solve() {
  return MedianFinder;
}

/**
 * Test cases for Problem 295: Find Median From Data Stream
 */
function testSolution() {
  console.log("Testing 295. Find Median From Data Stream");

  // Test case 1: Basic functionality
  const mf1 = new MedianFinder();
  mf1.addNum(1);
  mf1.addNum(2);
  const result1 = mf1.findMedian();
  console.assert(
    result1 === 1.5,
    `Test 1 failed: expected 1.5, got ${result1}`,
  );

  // Test case 2: Odd number of elements
  mf1.addNum(3);
  const result2 = mf1.findMedian();
  console.assert(result2 === 2, `Test 2 failed: expected 2, got ${result2}`);

  // Test case 3: More complex sequence
  const mf2 = new MedianFinder();
  mf2.addNum(6);
  mf2.addNum(10);
  mf2.addNum(2);
  mf2.addNum(6);
  mf2.addNum(5);
  const result3 = mf2.findMedian();
  console.assert(result3 === 6, `Test 3 failed: expected 6, got ${result3}`);

  // Test case 4: Single element
  const mf3 = new MedianFinder();
  mf3.addNum(5);
  const result4 = mf3.findMedian();
  console.assert(result4 === 5, `Test 4 failed: expected 5, got ${result4}`);

  // Test case 5: Negative numbers
  const mf4 = new MedianFinder();
  mf4.addNum(-1);
  mf4.addNum(-2);
  mf4.addNum(-3);
  const result5 = mf4.findMedian();
  console.assert(result5 === -2, `Test 5 failed: expected -2, got ${result5}`);

  console.log("All test cases passed for 295. Find Median From Data Stream!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 295. Find Median From Data Stream ===");
  console.log("Category: Heap");
  console.log("Difficulty: Hard");
  console.log("");

  const medianFinder = new MedianFinder();
  console.log("Adding numbers: 1, 2, 3");
  medianFinder.addNum(1);
  medianFinder.addNum(2);
  console.log("Median after adding 1, 2:", medianFinder.findMedian()); // 1.5
  medianFinder.addNum(3);
  console.log("Median after adding 3:", medianFinder.findMedian()); // 2

  testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
  demonstrateSolution();
}

// Export for use in other modules
module.exports = {
  solve,
  MedianFinder,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This solution uses two heaps to maintain the median efficiently
 * - The max heap stores the smaller half of numbers
 * - The min heap stores the larger half of numbers
 * - Heaps are kept balanced to ensure O(1) median access
 * - This is a classic streaming algorithm problem
 */
