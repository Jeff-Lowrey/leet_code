/**
### INTUITION:
This is similar to counting inversions but with a modified condition (nums[i] > 2 * nums[j] instead of nums[i] > nums[j]). We can use merge sort to count these pairs efficiently during the merge process, or use segment trees / BIT with coordinate compression.

### APPROACH:
1. **Base case check**: Return 0 for empty array, and create base case for single-element arrays in recursion
2. **Divide array**: Split array into left and right halves using merge sort structure
3. **Recursively count**: Get reverse pair counts from left half and right half independently
4. **Count cross-boundary pairs**: For each element in left half, count elements in right half where left[i] > 2 * right[j]
5. **Use two pointers**: Maintain pointer j in right array, increment while condition left[i] > 2 * right[j] holds
6. **Merge sorted arrays**: After counting, merge left and right into sorted array for parent recursion level
7. **Return total count**: Sum of left count, right count, and cross-boundary count gives total reverse pairs

### WHY THIS WORKS:
By repeatedly dividing the search space in half, we eliminate half of the remaining elements in each iteration. Since the array is sorted, we can determine which half contains the target by comparing with the middle element. This guarantees we find the target (if it exists) in O(log n) time because each step reduces the problem size by a factor of 2.



This solution uses hash table lookup for efficient implementation.

This solution uses hash map storage for efficient implementation.

This solution uses set operations for efficient implementation.

### EXAMPLE WALKTHROUGH:
Given input nums = [1,3,2,3,1]:

Input:
```
nums = [1,3,2,3,1]
```

Reverse pairs:
- (1,4): nums[1]=3 > 2*nums[4]=2 ✓
- (3,4): nums[3]=3 > 2*nums[4]=2 ✓

Output:
```
2
```


Result: 2

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
O(n log n)**
- Sorting or divide-and-conquer
For merge sort and tree-based approaches

### SPACE COMPLEXITY:
O(n)**
- Additional set storage
For auxiliary arrays and recursion stack

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

*/

class Solution {
  /**
   * Count reverse pairs using merge sort approach.
   *
   *         Args:
   *             nums: Input array of integers
   *
   *         Returns:
   *             Number of reverse pairs
   *
   *         Time Complexity: O(n log n) - merge sort with counting
   *         Space Complexity: O(n) - for auxiliary arrays and recursion
   */
  reversePairs(nums: number[]): number {
    if (!nums || nums.length === 0) {
      return 0;
    }

    const mergeSort = (arr: number[]): [number[], number] => {
      if (arr.length <= 1) {
        return [arr, 0];
      }

      const mid = Math.floor(arr.length / 2);
      const [left, leftCount] = mergeSort(arr.slice(0, mid));
      const [right, rightCount] = mergeSort(arr.slice(mid));

      // Count cross-boundary pairs
      let count = leftCount + rightCount;
      let j = 0;
      for (let i = 0; i < left.length; i++) {
        while (j < right.length && left[i] > 2 * right[j]) {
          j++;
        }
        count += j;
      }

      // Merge sorted arrays
      const merged: number[] = [];
      let i = 0;
      j = 0;
      while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
          merged.push(left[i++]);
        } else {
          merged.push(right[j++]);
        }
      }
      merged.push(...left.slice(i), ...right.slice(j));

      return [merged, count];
    };

    const [, count] = mergeSort(nums);
    return count;
  }

  /**
   * Solution using Binary Indexed Tree with coordinate compression.
   *
   *         Args:
   *             nums: Input array
   *
   *         Returns:
   *             Number of reverse pairs
   *
   *         Time Complexity: O(n log n)
   *         Space Complexity: O(n)
   */
  reversePairsBIT(nums: number[]): number {
    if (!nums || nums.length === 0) {
      return 0;
    }

    // Coordinate compression
    const allValues = new Set<number>();
    for (const num of nums) {
      allValues.add(num);
      allValues.add(2 * num);
    }
    const sortedValues = Array.from(allValues).sort((a, b) => a - b);
    const valueToIndex = new Map<number, number>();
    sortedValues.forEach((val, idx) => valueToIndex.set(val, idx + 1));

    // Binary Indexed Tree
    const bit = Array(sortedValues.length + 1).fill(0);

    const update = (idx: number): void => {
      while (idx < bit.length) {
        bit[idx]++;
        idx += idx & -idx;
      }
    };

    const query = (idx: number): number => {
      let sum = 0;
      while (idx > 0) {
        sum += bit[idx];
        idx -= idx & -idx;
      }
      return sum;
    };

    let count = 0;
    for (let i = nums.length - 1; i >= 0; i--) {
      const targetIdx = valueToIndex.get(2 * nums[i])!;
      count += query(targetIdx - 1);
      const numIdx = valueToIndex.get(nums[i])!;
      update(numIdx);
    }

    return count;
  }

  /**
   * Solution using Segment Tree.
   *
   *         Args:
   *             nums: Input array
   *
   *         Returns:
   *             Number of reverse pairs
   *
   *         Time Complexity: O(n log n)
   *         Space Complexity: O(n)
   */
  reversePairsSegmentTree(nums: number[]): number {
    if (!nums || nums.length === 0) {
      return 0;
    }

    // Coordinate compression
    const allValues = new Set<number>();
    for (const num of nums) {
      allValues.add(num);
      allValues.add(2 * num);
    }
    const sortedValues = Array.from(allValues).sort((a, b) => a - b);
    const valueToIndex = new Map<number, number>();
    sortedValues.forEach((val, idx) => valueToIndex.set(val, idx));

    // Segment Tree
    const size = sortedValues.length;
    const tree = Array(4 * size).fill(0);

    const update = (node: number, start: number, end: number, idx: number): void => {
      if (start === end) {
        tree[node]++;
        return;
      }
      const mid = Math.floor((start + end) / 2);
      if (idx <= mid) {
        update(2 * node, start, mid, idx);
      } else {
        update(2 * node + 1, mid + 1, end, idx);
      }
      tree[node] = tree[2 * node] + tree[2 * node + 1];
    };

    const query = (node: number, start: number, end: number, l: number, r: number): number => {
      if (r < start || end < l) {
        return 0;
      }
      if (l <= start && end <= r) {
        return tree[node];
      }
      const mid = Math.floor((start + end) / 2);
      return query(2 * node, start, mid, l, r) + query(2 * node + 1, mid + 1, end, l, r);
    };

    let count = 0;
    for (let i = nums.length - 1; i >= 0; i--) {
      const targetIdx = valueToIndex.get(2 * nums[i])!;
      if (targetIdx > 0) {
        count += query(1, 0, size - 1, 0, targetIdx - 1);
      }
      const numIdx = valueToIndex.get(nums[i])!;
      update(1, 0, size - 1, numIdx);
    }

    return count;
  }

  /**
   * Brute force solution for verification.
   *
   *         Args:
   *             nums: Input array
   *
   *         Returns:
   *             Number of reverse pairs
   *
   *         Time Complexity: O(n²)
   *         Space Complexity: O(1)
   */
  reversePairsBruteForce(nums: number[]): number {
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
      for (let j = i + 1; j < nums.length; j++) {
        if (nums[i] > 2 * nums[j]) {
          count++;
        }
      }
    }
    return count;
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log("=== 493. Reverse Pairs ===");

  const testCases = [
    [1, 3, 2, 3, 1],
    [2, 4, 3, 5, 1],
    [5, 4, 3, 2, 1],
  ];

  for (const nums of testCases) {
    console.log(`\nInput: ${JSON.stringify(nums)}`);

    // Show all approaches
    const resultMerge = solution.reversePairs([...nums]);
    const resultBrute = solution.reversePairsBruteForce([...nums]);
    console.log(`Merge Sort:  ${resultMerge}`);
    console.log(`Brute Force: ${resultBrute}`);

    // Only test tree approaches for small inputs
    if (nums.length <= 10) {
      const resultBit = solution.reversePairsBIT([...nums]);
      const resultSeg = solution.reversePairsSegmentTree([...nums]);
      console.log(`Binary IT:   ${resultBit}`);
      console.log(`Segment Tree: ${resultSeg}`);
    }
  }

  // Detailed walkthrough
  console.log("\nDetailed example: [1,3,2,3,1]");
  const nums = [1, 3, 2, 3, 1];
  console.log("Finding reverse pairs where nums[i] > 2*nums[j] (i < j):");
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] > 2 * nums[j]) {
        console.log(`  (${i},${j}): nums[${i}]=${nums[i]} > 2*nums[${j}]=${2 * nums[j]}`);
        count++;
      }
    }
  }
  console.log(`Total: ${count} reverse pairs`);

  // Performance comparison
  console.log("\nApproach complexities:");
  console.log("Merge Sort:   O(n log n) time, O(n) space");
  console.log("Binary IT:    O(n log n) time, O(n) space");
  console.log("Segment Tree: O(n log n) time, O(n) space");
  console.log("Brute Force:  O(n²) time, O(1) space");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;