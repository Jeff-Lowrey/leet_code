/**
 * # Difficulty: Easy
 *
 * # 1356. Sort Integers By The Number Of 1 Bits
 *
 * You are given an integer array arr. Sort the integers in the array in ascending order by the number
 * of 1's in their binary representation and in case of two or more integers have the same number of 1's
 * you have to sort them in ascending order.
 *
 * Return the array after sorting it.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[0, 1, 2, 4, 8, 3, 5, 6, 7]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Integers sorted by number of 1 bits</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Array Traversal, Sorting, Greedy Selection
 * **Data Structures**: Array, Graph
 * **Patterns**: Hash Table Pattern, Greedy Algorithm
 * **Time Complexity**: O(n log n) - Sorting or divide-and-conquer
 * **Space Complexity**: O(n)
 *
 * ### INTUITION:
 * We need a two-level sort: first by count of 1-bits, then by value. Python's sort is stable,
 * so we can sort by value first, then by bit count. Or use a tuple key for simultaneous sorting.
 *
 * ### APPROACH:
 * 1. **Count 1-bits**: Use bin(n).count('1') or bit manipulation
 * 2. **Create sort key**: Tuple (bit_count, value)
 * 3. **Sort array**: Use sorted() with custom key function
 * 4. **Return result**: Sorted array
 *
 * ### WHY THIS WORKS:
 * - bin(n).count('1') counts 1-bits in binary representation
 * - Python sorts tuples lexicographically (first element, then second)
 * - Stable sort maintains order when keys are equal
 * - Lambda function provides clean, concise key
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: arr = [0,1,2,3,4,5,6,7,8]
 *
 * Binary representations and bit counts:
 * 0 = 0b0     -> 0 ones
 * 1 = 0b1     -> 1 one
 * 2 = 0b10    -> 1 one
 * 3 = 0b11    -> 2 ones
 * 4 = 0b100   -> 1 one
 * 5 = 0b101   -> 2 ones
 * 6 = 0b110   -> 2 ones
 * 7 = 0b111   -> 3 ones
 * 8 = 0b1000  -> 1 one
 *
 * Group by bit count (then sort by value):
 * 0 ones: [0]
 * 1 one:  [1, 2, 4, 8]
 * 2 ones: [3, 5, 6]
 * 3 ones: [7]
 *
 * Output: [0,1,2,4,8,3,5,6,7]
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n log n)
 * - Counting bits: O(log max_value) per number = O(n log max_value)
 * - Sorting: O(n log n)
 * - Total: O(n log n) dominates
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 * For the sorted result array
 *
 * ### EDGE CASES:
 * - Array with single element
 * - All numbers have same bit count
 * - Array with zeros
 * - Large numbers (up to 10^4)
 *
 * </details>
 */

class Solution {
  sortByBits(arr: number[]): number[] {
    const countBits = (n: number): number => {
      let count = 0;
      while (n > 0) {
        count += n & 1;
        n >>= 1;
      }
      return count;
    };

    return arr.sort((a, b) => {
      const bitsA = countBits(a);
      const bitsB = countBits(b);
      if (bitsA !== bitsB) {
        return bitsA - bitsB;
      }
      return a - b;
    });
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.sortByBits([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  console.log(
    `Test 1: ${
      JSON.stringify(result1) === JSON.stringify([0, 1, 2, 4, 8, 3, 5, 6, 7]) ? "PASS" : "FAIL"
    }`
  );

  const result2 = solution.sortByBits([1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1]);
  console.log(
    `Test 2: ${
      JSON.stringify(result2) === JSON.stringify([1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024])
        ? "PASS"
        : "FAIL"
    }`
  );

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
