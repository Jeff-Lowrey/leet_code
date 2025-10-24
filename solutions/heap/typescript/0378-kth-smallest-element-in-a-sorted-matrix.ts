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
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
 * **Data Structures**: Hash Set, Array, Heap
 * **Patterns**: Two Pointers Pattern, Hash Table Pattern
 * **Time Complexity**: O(k log n)
 * **Space Complexity**: O(n) - Additional set storage
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
 * - Additional set storage
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

class MinHeap<T> {
  private heap: T[] = [];
  private compare: (a: T, b: T) => number;

  constructor(compare: (a: T, b: T) => number) {
    this.compare = compare;
  }

  push(val: T): void {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }

  pop(): T | undefined {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const top = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.bubbleDown(0);
    return top;
  }

  size(): number {
    return this.heap.length;
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.compare(this.heap[index], this.heap[parentIndex]) >= 0) break;
      [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
      index = parentIndex;
    }
  }

  private bubbleDown(index: number): void {
    while (true) {
      let smallest = index;
      const left = 2 * index + 1;
      const right = 2 * index + 2;

      if (left < this.heap.length && this.compare(this.heap[left], this.heap[smallest]) < 0) {
        smallest = left;
      }
      if (right < this.heap.length && this.compare(this.heap[right], this.heap[smallest]) < 0) {
        smallest = right;
      }
      if (smallest === index) break;

      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      index = smallest;
    }
  }
}

class Solution {
  kthSmallest(matrix: number[][], k: number): number {
    const n = matrix.length;
    const heap = new MinHeap<[number, number, number]>((a, b) => a[0] - b[0]);
    const visited = new Set<string>();

    heap.push([matrix[0][0], 0, 0]);
    visited.add("0,0");

    let val = 0;
    for (let i = 0; i < k; i++) {
      const [v, row, col] = heap.pop()!;
      val = v;

      if (col + 1 < n && !visited.has(`${row},${col + 1}`)) {
        heap.push([matrix[row][col + 1], row, col + 1]);
        visited.add(`${row},${col + 1}`);
      }

      if (row + 1 < n && !visited.has(`${row + 1},${col}`)) {
        heap.push([matrix[row + 1][col], row + 1, col]);
        visited.add(`${row + 1},${col}`);
      }
    }

    return val;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.kthSmallest([[1, 5, 9], [10, 11, 13], [12, 13, 15]], 8);
  console.log(`Test 1: ${result1 === 13 ? "PASS" : "FAIL"}`);

  const result2 = solution.kthSmallest([[1, 2], [1, 3]], 2);
  console.log(`Test 2: ${result2 === 1 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
