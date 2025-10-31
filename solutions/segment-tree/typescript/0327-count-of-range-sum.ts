/**
 * 0327. Count Of Range Sum
 *
 * Difficulty: Hard
 * 
 * Given an integer array nums and two integers lower and upper, return the number of range sums that lie in [lower, upper] inclusive.
 * 
 * Range sum S(i, j) is defined as the sum of the elements in nums between indices i and j inclusive, where i <= j.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>nums = [-2, 5, -1], lower = -2, upper = 2</dd>
 * <dt>Output:</dt>
 * <dd>3</dd>
 * <dt>Explanation:</dt>
 * <dd>Count of ranges with sum in [lower=-2, upper=2] is 3</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
 * **Data Structures**: Hash Set, Array, Tree
 * **Patterns**: Two Pointers Pattern, Hash Table Pattern
 * **Time Complexity**: O(n log n) - Sorting or divide-and-conquer
 * **Space Complexity**: O(n) - Additional set storage
 * 
 * ### INTUITION:
 * This is an advanced range sum counting problem. The key insight is to use prefix sums: if we have prefix[j] - prefix[i] in [lower, upper], then we need to count how many prefix[i] satisfy: prefix[j] - upper <= prefix[i] <= prefix[j] - lower. This transforms into a range counting problem solvable with merge sort or segment trees.
 * 
 * ### APPROACH:
 * 1. **Compute prefix sums**: Build prefix sum array where prefix[i] represents sum of elements from index 0 to i-1
 * 2. **Transform problem**: Use insight that range sum S(i,j) = prefix[j] - prefix[i], need to count pairs where lower <= prefix[j] - prefix[i] <= upper
 * 3. **Apply merge sort**: Recursively divide prefix array and count valid ranges during merge process
 * 4. **Count cross-boundary ranges**: For each prefix[j] in right half, count how many prefix[i] in left half satisfy the range condition
 * 5. **Use two pointers**: Maintain pointers to find range [prefix[j] - upper, prefix[j] - lower] in sorted left half
 * 6. **Accumulate counts**: Sum counts from left subtree, right subtree, and cross-boundary ranges
 * 7. **Return total count**: Final result is total number of valid range sums found across all merge levels
 * 
 * ### WHY THIS WORKS:
 * The algorithm correctly solves the problem by systematically exploring all valid states while maintaining necessary invariants. Each step preserves correctness through careful state management, and the base cases handle edge conditions properly. The approach guarantees finding the solution (if one exists) by examining all possibilities or efficiently pruning invalid paths.
 * 
 *

This solution uses set operations for efficient implementation.
 * - Segment tree enables efficient range queries and updates in O(log n) time by maintaining a binary tree structure
 * - Binary Indexed Tree (Fenwick tree) provides O(log n) prefix sum queries and updates using bit manipulation
 *
### EXAMPLE WALKTHROUGH:
 * Given input nums = [-2,5,-1], lower = -2, upper = 2:
 *
 * Input:
 * ```
 * nums = [-2,5,-1], lower = -2, upper = 2
 * ```
 *
 * Prefix sums: [0, -2, 3, 2]
 * Range sums to check:
 * - S(0,0) = -2 ✓ (in range)
 * - S(0,1) = 3 ✗
 * - S(0,2) = 2 ✓
 * - S(1,1) = 5 ✗
 * - S(1,2) = 4 ✗
 * - S(2,2) = -1 ✓
 *
 * Result: 3 range sums lie within [-2, 2]
 *
 * Output:
 * ```
 * 3
 * ```

 *
 * Result: 3
 * ### TIME COMPLEXITY:
 * O(n log n)
 * - Sorting or divide-and-conquer
 * For merge sort and tree-based approaches
 * 
 * ### SPACE COMPLEXITY:
 * O(n)
 * - Additional set storage
 * For prefix sums and auxiliary structures
 * 
 * ### EDGE CASES:
 * - Empty array
 * - Single element
 * - All elements equal
 * - Lower and upper bounds edge cases
 * - Negative numbers and overflow considerations
 * 
 * </details>
 */

class Solution {
  /**
   * Count range sums in [lower, upper] using merge sort approach.
   *
   *         Args:
   *             nums: Input array of integers
   *             lower: Lower bound of range (inclusive)
   *             upper: Upper bound of range (inclusive)
   *
   *         Returns:
   *             Number of range sums in [lower, upper]
   *
   *         Time Complexity: O(n log n) - merge sort with counting
   *         Space Complexity: O(n) - for prefix sums and recursion
   */
  countRangeSum(nums: number[], lower: number, upper: number): number {
    if (!nums || nums.length === 0) {
      return 0;
    }

    const prefix: number[] = [0];
    for (const num of nums) {
      prefix.push(prefix[prefix.length - 1] + num);
    }

    const mergeSort = (start: number, end: number): number => {
      // Merge sort with range counting
      if (start >= end) {
        return 0;
      }

      const mid = Math.floor((start + end) / 2);
      let count = mergeSort(start, mid) + mergeSort(mid + 1, end);

      // Count cross-boundary ranges
      let j = mid + 1;
      let k = mid + 1;
      let t = mid + 1;
      const temp: number[] = [];

      for (let i = start; i <= mid; i++) {
        // Find range [prefix[i] + lower, prefix[i] + upper]
        while (k <= end && prefix[k] - prefix[i] < lower) k++;
        while (j <= end && prefix[j] - prefix[i] <= upper) j++;
        count += j - k;

        // Merge step
        while (t <= end && prefix[t] < prefix[i]) {
          temp.push(prefix[t++]);
        }
        temp.push(prefix[i]);
      }

      for (let i = 0; i < temp.length; i++) {
        prefix[start + i] = temp[i];
      }

      return count;
    };

    return mergeSort(0, prefix.length - 1);
  }

  /**
   * Solution using Binary Indexed Tree with coordinate compression.
   *
   *         Args:
   *             nums: Input array
   *             lower: Lower bound
   *             upper: Upper bound
   *
   *         Returns:
   *             Count of valid range sums
   *
   *         Time Complexity: O(n log n)
   *         Space Complexity: O(n)
   */
  countRangeSumBIT(nums: number[], lower: number, upper: number): number {
    if (!nums || nums.length === 0) {
      return 0;
    }

    const prefix: number[] = [0];
    for (const num of nums) {
      prefix.push(prefix[prefix.length - 1] + num);
    }

    // Coordinate compression
    const allValues = new Set<number>();
    for (const p of prefix) {
      allValues.add(p);
      allValues.add(p - lower);
      allValues.add(p - upper);
    }
    const sorted = Array.from(allValues).sort((a, b) => a - b);
    const compress = new Map<number, number>();
    sorted.forEach((val, idx) => compress.set(val, idx + 1));

    // Binary Indexed Tree
    const bit = new Array(compress.size + 1).fill(0);
    const update = (idx: number) => {
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
    update(compress.get(prefix[0])!);

    for (let i = 1; i < prefix.length; i++) {
      const left = compress.get(prefix[i] - upper)!;
      const right = compress.get(prefix[i] - lower)!;
      count += query(right) - query(left - 1);
      update(compress.get(prefix[i])!);
    }

    return count;
  }

  /**
   * Solution using Segment Tree.
   *
   *         Args:
   *             nums: Input array
   *             lower: Lower bound
   *             upper: Upper bound
   *
   *         Returns:
   *             Count of valid range sums
   *
   *         Time Complexity: O(n log n)
   *         Space Complexity: O(n)
   */
  countRangeSumSegmentTree(nums: number[], lower: number, upper: number): number {
    if (!nums || nums.length === 0) {
      return 0;
    }

    const prefix: number[] = [0];
    for (const num of nums) {
      prefix.push(prefix[prefix.length - 1] + num);
    }

    // Coordinate compression
    const allValues = new Set<number>();
    for (const p of prefix) {
      allValues.add(p);
      allValues.add(p - lower);
      allValues.add(p - upper);
    }
    const sorted = Array.from(allValues).sort((a, b) => a - b);
    const compress = new Map<number, number>();
    sorted.forEach((val, idx) => compress.set(val, idx));

    // Segment tree
    const tree = new Array(sorted.length * 4).fill(0);
    const update = (node: number, start: number, end: number, idx: number) => {
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
    const query = (node: number, start: number, end: number, left: number, right: number): number => {
      if (right < start || left > end) return 0;
      if (left <= start && end <= right) return tree[node];
      const mid = Math.floor((start + end) / 2);
      return query(2 * node, start, mid, left, right) + query(2 * node + 1, mid + 1, end, left, right);
    };

    let count = 0;
    update(1, 0, sorted.length - 1, compress.get(prefix[0])!);

    for (let i = 1; i < prefix.length; i++) {
      const left = compress.get(prefix[i] - upper)!;
      const right = compress.get(prefix[i] - lower)!;
      count += query(1, 0, sorted.length - 1, left, right);
      update(1, 0, sorted.length - 1, compress.get(prefix[i])!);
    }

    return count;
  }

  /**
   * Brute force solution for verification.
   *
   *         Args:
   *             nums: Input array
   *             lower: Lower bound
   *             upper: Upper bound
   *
   *         Returns:
   *             Count of valid range sums
   *
   *         Time Complexity: O(n²)
   *         Space Complexity: O(n) for prefix sums
   */
  countRangeSumBruteForce(nums: number[], lower: number, upper: number): number {
    if (!nums || nums.length === 0) {
      return 0;
    }

    const prefix: number[] = [0];
    for (const num of nums) {
      prefix.push(prefix[prefix.length - 1] + num);
    }

    let count = 0;
    for (let i = 0; i < prefix.length; i++) {
      for (let j = i + 1; j < prefix.length; j++) {
        const rangeSum = prefix[j] - prefix[i];
        if (rangeSum >= lower && rangeSum <= upper) {
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

  console.log("=== 327. Count Of Range Sum ===");

  const testCases: [number[], number, number][] = [
    [[-2, 5, -1], -2, 2],
    [[0, -3, -3, 1, 1, 2], 3, 5],
    [[1, 2, 3], 3, 7],
  ];

  for (const [nums, lower, upper] of testCases) {
    console.log(`\nInput: nums = [${nums}], lower = ${lower}, upper = ${upper}`);

    // Show all approaches
    const resultMerge = solution.countRangeSum(nums, lower, upper);
    const resultBrute = solution.countRangeSumBruteForce(nums, lower, upper);
    console.log(`Merge Sort:  ${resultMerge}`);
    console.log(`Brute Force: ${resultBrute}`);

    // Only test tree approaches for small inputs
    if (nums.length <= 10) {
      const resultBit = solution.countRangeSumBIT(nums, lower, upper);
      const resultSeg = solution.countRangeSumSegmentTree(nums, lower, upper);
      console.log(`Binary IT:   ${resultBit}`);
      console.log(`Segment Tree: ${resultSeg}`);
    }
  }

  // Detailed walkthrough
  console.log("\nDetailed example: nums = [-2,5,-1], lower = -2, upper = 2");
  const nums = [-2, 5, -1];
  console.log("Prefix sums: [0, -2, 3, 2]");
  console.log("Valid range sums:");
  console.log("  S(0,0) = -2 (in [-2, 2])");
  console.log("  S(0,2) = 2 (in [-2, 2])");
  console.log("  S(2,2) = -1 (in [-2, 2])");
  console.log(`Total: ${solution.countRangeSum(nums, -2, 2)} valid ranges`);

  // Performance comparison
  console.log("\nApproach complexities:");
  console.log("Merge Sort:   O(n log n) time, O(n) space");
  console.log("Binary IT:    O(n log n) time, O(n) space");
  console.log("Segment Tree: O(n log n) time, O(n) space");
  console.log("Brute Force:  O(n²) time, O(n) space");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;