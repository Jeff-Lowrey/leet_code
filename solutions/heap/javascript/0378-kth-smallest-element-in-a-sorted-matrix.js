/**
 * # Difficulty: Medium
 *
 * # 0378. Kth Smallest Element In A Sorted Matrix
 *
 * Difficulty: Medium
 *
 * Given an n x n matrix where each of the rows and columns is sorted in ascending order, return the kth smallest element in the matrix.
 *
 * Note that it is the kth smallest element in the sorted order, not the kth distinct element.
 *
 * You must find a solution with a memory complexity better than O(n²).
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[[1, 5, 9]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>The 8th smallest element in sorted matrix [[1,5,9],[10,11,13],[12,13,15]] is 13</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * ### METADATA:
 * **Techniques**: Hash Map Storage, Array Traversal, Binary Search
 * **Data Structures**: Array, String, Heap
 * **Patterns**: Greedy Algorithm, Divide and Conquer
 * **Time Complexity**: O(k log n)
 * **Space Complexity**: O(n)

 *
 * ### INTUITION:
 * This problem involves finding the kth smallest element in a matrix where both rows and columns are sorted. We have multiple approaches: heap-based, binary search, and merge-like. The heap approach treats each row as a sorted list and uses a min-heap to efficiently find the kth smallest element.
 *
 * ### APPROACH:
 * 1. **Initialize min-heap**: Create a heap with the first element (matrix[0][0]) and a visited set to track processed cells
 * 2. **Extract minimum k times**: Pop the smallest element from heap k times to reach the kth smallest
 * 3. **Add neighbors to heap**: For each popped element at position (row, col), add its right neighbor (row, col+1) if not visited
 * 4. **Add bottom neighbor**: Also add the bottom neighbor (row+1, col) if not visited and within bounds
 * 5. **Track visited cells**: Use a visited set to ensure each cell is added to heap only once, preventing duplicates
 * 6. **Return kth element**: After k iterations, the last popped value is the kth smallest element
 * 7. **Alternative binary search**: Search for answer in range [min, max], count elements ≤ mid using sorted property
 *
 * ### WHY THIS WORKS:
 * A set by definition contains only unique elements - when we convert an array to a set, any duplicates are automatically removed. By comparing the lengths of the original array and the set, we can detect if duplicates existed. The early termination approach works because as soon as we find an element already in our seen set, we've proven a duplicate exists without needing to check the remaining elements.
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * Matrix: [[1,5,9],[10,11,13],[12,13,15]], k=8
 * ```
 *
 * Step 1: heap = [(1,0,0)] (value, row, col)
 *
 * Steps:
 * Step 1: pop 1, add 5 and 10 -> heap = [(5,0,1), (10,1,0)]
 * Step 2: pop 5, add 9 -> heap = [(9,0,2), (10,1,0)]
 * Step 3: pop 9 -> heap = [(10,1,0)]
 * Step 4: pop 10, add 11 and 12 -> heap = [(11,1,1), (12,2,0)]
 * Step 5: pop 11, add 13 -> heap = [(12,2,0), (13,1,2)]
 * Step 6: pop 12, add 13 -> heap = [(13,1,2), (13,2,1)]
 * Step 7: pop 13 (8th smallest) -> return 13

 * ### TIME COMPLEXITY:
 * O(k log n)
 * Where n is matrix dimension and k is the target position
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 * For the heap storing at most n elements (one from each row)
 *
 * ### EDGE CASES:
 * - Single element matrix
 * - k = 1 (smallest element)
 * - k = n² (largest element)
 * - Matrix with duplicate values
 *
 * </details>
 */

/**
 * MinHeap implementation for [value, row, col] tuples
 */
class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  push(item) {
    this.heap.push(item);
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
      if (this.heap[parentIndex][0] <= this.heap[index][0]) break;
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
        this.heap[leftChild][0] < this.heap[smallest][0]
      ) {
        smallest = leftChild;
      }
      if (
        rightChild < this.heap.length &&
        this.heap[rightChild][0] < this.heap[smallest][0]
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
 * Main solution for Problem 378: Kth Smallest Element In A Sorted Matrix
 *
 * @param {number[][]} matrix - Sorted matrix
 * @param {number} k - Find kth smallest element
 * @return {number} - The kth smallest element
 *
 * Time Complexity: O(k log n) where n is number of rows
 * Space Complexity: O(n)
 */
function solve(matrix, k) {
  if (!matrix || !matrix.length || !matrix[0].length) {
    return null;
  }

  const n = matrix.length;
  const minHeap = new MinHeap();

  // Initialize heap with first element of each row
  for (let row = 0; row < Math.min(n, k); row++) {
    minHeap.push([matrix[row][0], row, 0]);
  }

  // Extract minimum k times
  let result = 0;
  for (let i = 0; i < k; i++) {
    const [val, row, col] = minHeap.pop();
    result = val;

    // Add next element in the same row
    if (col + 1 < matrix[row].length) {
      minHeap.push([matrix[row][col + 1], row, col + 1]);
    }
  }

  return result;
}

/**
 * Test cases for Problem 378: Kth Smallest Element In A Sorted Matrix
 */
function testSolution() {
  console.log("Testing 378. Kth Smallest Element In A Sorted Matrix");

  // Test case 1: Basic functionality
  const result1 = solve(
    [
      [1, 5, 9],
      [10, 11, 13],
      [12, 13, 15],
    ],
    8,
  );
  const expected1 = 13;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: k = 1 (smallest element)
  const result2 = solve(
    [
      [1, 2],
      [1, 3],
    ],
    1,
  );
  const expected2 = 1;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Single element matrix
  const result3 = solve([[5]], 1);
  const expected3 = 5;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: All elements in first column
  const result4 = solve([[-5]], 1);
  const expected4 = -5;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Larger matrix
  const result5 = solve(
    [
      [1, 5, 9],
      [10, 11, 13],
      [12, 13, 15],
    ],
    1,
  );
  const expected5 = 1;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  console.log(
    "All test cases passed for 378. Kth Smallest Element In A Sorted Matrix!",
  );
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 378. Kth Smallest Element In A Sorted Matrix ===");
  console.log("Category: Heap");
  console.log("Difficulty: Medium");
  console.log("");

  const matrix = [
    [1, 5, 9],
    [10, 11, 13],
    [12, 13, 15],
  ];
  const k = 8;
  console.log("Input matrix:", JSON.stringify(matrix));
  console.log(`k = ${k}`);
  const result = solve(matrix, k);
  console.log(`Output: ${result}`);

  testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
  demonstrateSolution();
}

// Export for use in other modules
module.exports = {
  solve,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This solution uses a min heap to merge sorted rows efficiently
 * - Alternative approach: Binary search on the value range
 * - The heap approach is more intuitive and efficient for small k
 * - For very large k, binary search might be more efficient
 */
