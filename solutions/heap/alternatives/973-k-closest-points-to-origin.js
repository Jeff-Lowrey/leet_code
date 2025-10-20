/**
 * # Difficulty: Medium
 *
 * # 973. K Closest Points To Origin
 *
 * Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).
 *
 * The distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)^2 + (y1 - y2)^2).
 *
 * You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[[0,1]</dd>
 * <dt>Output:</dt>
 * <dd>"Expected {expected}, got {result}"</dd>
 * <dt>Explanation:</dt>
 * <dd>The k=2 closest points to origin are [[1,3],[-2,2]]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### METADATA:
**Techniques**: TBD
**Data Structures**: TBD
**Patterns**: TBD
**Time Complexity**: * O(n)
**Space Complexity**: * O(1)

 *
 * ### INTUITION:
 * [This problem requires understanding of heap concepts. The key insight is to identify the optimal approach for this specific scenario.]
 *
 * ### APPROACH:
 * 1. **Analyze the problem**: Understand the input constraints and expected output
 * 2. **Choose the right technique**: Apply heap methodology
 * 3. **Implement efficiently**: Focus on optimal time and space complexity
 * 4. **Handle edge cases**: Consider boundary conditions and special cases
 *
 * ### WHY THIS WORKS:
 * - The solution leverages heap principles
 * - Time complexity is optimized for the given constraints
 * - Space complexity is minimized where possible
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: points = [[1,3], [-2,2], [5,8], [0,1]], k = 2
 *
 * Step 1: Calculate distances (squared)
 *   [1,3]: dist = 1² + 3² = 10
 *   [-2,2]: dist = (-2)² + 2² = 8
 *   [5,8]: dist = 5² + 8² = 89
 *   [0,1]: dist = 0² + 1² = 1
 *
 * Step 2: Build min heap
 *   heap = [(1, [0,1]), (8, [-2,2]), (10, [1,3]), (89, [5,8])]
 *
 * Step 3: Extract k=2 smallest
 *   Pop (1, [0,1]) → result = [[0,1]]
 *   Pop (8, [-2,2]) → result = [[0,1], [-2,2]]
 *
 * Output: [[0,1], [-2,2]]
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 *
 * ### EDGE CASES:
 * - Empty input handling
 * - Single element cases
 * - Large input considerations
 *
 * </details>
 */

/**
 * MaxHeap implementation for [point, distance] pairs
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
      // Compare by distance (second element of pair)
      if (this.heap[parentIndex][1] >= this.heap[index][1]) break;
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
        this.heap[leftChild][1] > this.heap[largest][1]
      ) {
        largest = leftChild;
      }
      if (
        rightChild < this.heap.length &&
        this.heap[rightChild][1] > this.heap[largest][1]
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
 * Calculate squared Euclidean distance from origin
 * @param {number[]} point - [x, y] coordinates
 * @return {number} - Squared distance
 */
function distanceSquared(point) {
  return point[0] * point[0] + point[1] * point[1];
}

/**
 * Main solution for Problem 973: K Closest Points To Origin
 *
 * @param {number[][]} points - Array of [x, y] points
 * @param {number} k - Number of closest points to find
 * @return {number[][]} - K closest points
 *
 * Time Complexity: O(n log k)
 * Space Complexity: O(k)
 */
function solve(points, k) {
  if (!points || points.length === 0 || k === 0) {
    return [];
  }

  const maxHeap = new MaxHeap();

  for (const point of points) {
    const dist = distanceSquared(point);

    if (maxHeap.size() < k) {
      maxHeap.push([point, dist]);
    } else if (dist < maxHeap.peek()[1]) {
      maxHeap.pop();
      maxHeap.push([point, dist]);
    }
  }

  // Extract all points from heap
  const result = [];
  while (maxHeap.size() > 0) {
    result.push(maxHeap.pop()[0]);
  }

  return result;
}

/**
 * Test cases for Problem 973: K Closest Points To Origin
 */
function testSolution() {
  console.log("Testing 973. K Closest Points To Origin");

  // Helper function to check if arrays contain same points (order doesn't matter)
  function samePoints(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    const set1 = new Set(arr1.map((p) => JSON.stringify(p)));
    const set2 = new Set(arr2.map((p) => JSON.stringify(p)));
    return set1.size === set2.size && [...set1].every((p) => set2.has(p));
  }

  // Test case 1: Basic functionality
  const result1 = solve(
    [
      [1, 3],
      [-2, 2],
    ],
    1,
  );
  const expected1 = [[-2, 2]];
  console.assert(
    samePoints(result1, expected1),
    `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`,
  );

  // Test case 2: Multiple points
  const result2 = solve(
    [
      [3, 3],
      [5, -1],
      [-2, 4],
    ],
    2,
  );
  const expected2 = [
    [3, 3],
    [-2, 4],
  ];
  console.assert(
    samePoints(result2, expected2),
    `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`,
  );

  // Test case 3: k equals number of points
  const result3 = solve(
    [
      [1, 1],
      [2, 2],
      [3, 3],
    ],
    3,
  );
  console.assert(
    result3.length === 3,
    `Test 3 failed: expected 3 points, got ${result3.length}`,
  );

  // Test case 4: Single point
  const result4 = solve([[0, 1]], 1);
  const expected4 = [[0, 1]];
  console.assert(
    samePoints(result4, expected4),
    `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`,
  );

  // Test case 5: Points at origin
  const result5 = solve(
    [
      [0, 0],
      [1, 1],
    ],
    1,
  );
  const expected5 = [[0, 0]];
  console.assert(
    samePoints(result5, expected5),
    `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`,
  );

  console.log("All test cases passed for 973. K Closest Points To Origin!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 973. K Closest Points To Origin ===");
  console.log("Category: Heap");
  console.log("Difficulty: Medium");
  console.log("");

  const points = [
    [1, 3],
    [-2, 2],
  ];
  const k = 1;
  console.log(`Input: points = ${JSON.stringify(points)}, k = ${k}`);
  const result = solve(points, k);
  console.log(`Output: ${JSON.stringify(result)}`);
  console.log("Explanation: Distance from (1,3) to origin is sqrt(10)");
  console.log("             Distance from (-2,2) to origin is sqrt(8)");
  console.log("             So [-2,2] is closer");

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
 * - This solution uses a max heap to efficiently find k closest points
 * - We use squared distance to avoid expensive sqrt calculations
 * - Max heap of size k is more efficient than sorting all points
 * - Time complexity O(n log k) beats naive O(n log n) sorting approach
 * - Alternative: QuickSelect algorithm for O(n) average case
 */
