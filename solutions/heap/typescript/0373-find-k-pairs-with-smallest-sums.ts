/**
 * # Difficulty: Medium
 *
 * # 0373. Find K Pairs With Smallest Sums
 *
 *
 * You are given two integer arrays nums1 and nums2 sorted in ascending order and an integer k.
 *
 * Define a pair (u, v) which consists of one element from the first array and one element from the second array.
 *
 * Return the k pairs (u1, v1), (u2, v2), ..., (uk, vk) with the smallest sums.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>nums1 = [1,7,11], nums2 = [2,4,6], k = 3</dd>
 * <dt>Output:</dt>
 * <dd>[[1,2],[1,4],[1,6]]</dd>
 * <dt>Explanation:</dt>
 * <dd>The k=3 pairs with smallest sums from [1,7,11] and [2,4,6] are [[1,2],[1,4],[1,6]]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
 * **Data Structures**: Hash Map, Array, Heap
 * **Patterns**: Hash Table Pattern, Greedy Algorithm
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
The key insight is that use min heap containing pairs from k sorted lists. Initially add first pair from each list. Pop minimum, add result, and push next pair from same lists. Repeat k times.

### APPROACH:
 * 1. **Initialize min heap**: Create heap with first element from nums2 for each nums1 element
 * 2. **Push initial pairs**: For i in range(min(k, len(nums1))), push (nums1[i]+nums2[0], i, 0)
 * 3. **Extract k pairs**: Pop from heap k times or until heap empty
 * 4. **Add to result**: For each popped (sum, i, j), add [nums1[i], nums2[j]] to result
 * 5. **Push next pair**: If j+1 < len(nums2), push (nums1[i]+nums2[j+1], i, j+1)
 * 6. **Continue extraction**: Repeat until k pairs found or heap empty
 * 7. **Return result**: Return list of k pairs with smallest sums
 *
 * ### WHY THIS WORKS:
- This ensures that min heap stores (sum, i, j) tuples
- This ensures that start with pairs (nums1[i], nums2[0]) for all i
- This ensures that pop minimum, add next pair (nums1[i], nums2[j+1]) to heap
- This ensures that collect k pairs or until heap empty
- This ensures that o(k log k) time: k heap operations, O(k) space for heap

### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums1 = [1,7,11], nums2 = [2,4,6], k = 3
 * ```
 *
 * Step 1: Initialize min heap
 * heap = [(1+2, 0, 0)]
 * Step 2: Extract k smallest pairs
 * Pop (3, 0, 0): pair [1,2], add (1+4, 0, 1)
 * Pop (5, 0, 1): pair [1,4], add (1+6, 0, 2)
 * Pop (7, 0, 2): pair [1,6], add (7+2, 1, 0)
 *
 * Output:
 * ```
 * [[1,2],[1,4],[1,6]]
 * ```

 * ### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
 *
 * ### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>
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
  kSmallestPairs(nums1: number[], nums2: number[], k: number): number[][] {
    if (!nums1.length || !nums2.length) return [];

    const result: number[][] = [];
    const heap = new MinHeap<[number, number, number]>((a, b) => a[0] - b[0]);
    const visited = new Set<string>();

    heap.push([nums1[0] + nums2[0], 0, 0]);
    visited.add("0,0");

    while (heap.size() > 0 && result.length < k) {
      const [sum, i, j] = heap.pop()!;
      result.push([nums1[i], nums2[j]]);

      if (i + 1 < nums1.length && !visited.has(`${i + 1},${j}`)) {
        heap.push([nums1[i + 1] + nums2[j], i + 1, j]);
        visited.add(`${i + 1},${j}`);
      }

      if (j + 1 < nums2.length && !visited.has(`${i},${j + 1}`)) {
        heap.push([nums1[i] + nums2[j + 1], i, j + 1]);
        visited.add(`${i},${j + 1}`);
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

  const result1 = solution.kSmallestPairs([1, 7, 11], [2, 4, 6], 3);
  const expected1 = [[1, 2], [1, 4], [1, 6]];
  console.log(`Test 1: ${JSON.stringify(result1) === JSON.stringify(expected1) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
