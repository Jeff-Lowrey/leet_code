/**
 * Difficulty: Easy
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
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 *

 * ### METADATA:
 * **Techniques**: Sorting Algorithms, Comparison
 * **Data Structures**: Array
 * **Patterns**: Sorting Pattern, Custom Comparator
 * **Time Complexity**: **O(n log n)
 * **Space Complexity**: **O(n)

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

/**
 * Main solution for Problem 1356: Sort Integers By The Number Of 1 Bits
 *
 * @param {number[]} arr - Array of integers to sort
 * @return {number[]} - Sorted array by bit count, then by value
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(1)
 */
function solve(arr) {
  /**
   * Count the number of 1 bits in a number
   * @param {number} n - The number to count bits for
   * @return {number} - Count of 1 bits
   */
  function countBits(n) {
    let count = 0;
    while (n > 0) {
      count += n & 1; // Add 1 if the least significant bit is 1
      n >>= 1; // Right shift to check next bit
    }
    return count;
  }

  // Sort with custom comparator
  return arr.sort((a, b) => {
    const bitsA = countBits(a);
    const bitsB = countBits(b);

    // First compare by bit count
    if (bitsA !== bitsB) {
      return bitsA - bitsB;
    }
    // If bit counts are equal, compare by value
    return a - b;
  });
}

/**
 * Test cases for Problem 1356: Sort Integers By The Number Of 1 Bits
 */
function testSolution() {
  console.log("Testing 1356. Sort Integers By The Number Of 1 Bits");

  // Test case 1: Example from problem
  const result1 = solve([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  const expected1 = [0, 1, 2, 4, 8, 3, 5, 6, 7];
  console.assert(
    JSON.stringify(result1) === JSON.stringify(expected1),
    `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`,
  );

  // Test case 2: Another example
  const result2 = solve([1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1]);
  console.log("Test 2:", JSON.stringify(result2));
  // All these numbers have 1 bit set, so should be sorted by value
  const expected2 = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024];
  console.assert(
    JSON.stringify(result2) === JSON.stringify(expected2),
    `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`,
  );

  // Test case 3: Mixed bit counts
  const result3 = solve([10, 100, 1000, 10000]);
  console.log("Test 3:", JSON.stringify(result3));
  // 10 (1010) = 2 bits, 100 (1100100) = 3 bits, 1000 (1111101000) = 6 bits, 10000 (10011100010000) = 5 bits

  // Test case 4: Single element
  const result4 = solve([42]);
  const expected4 = [42];
  console.assert(
    JSON.stringify(result4) === JSON.stringify(expected4),
    `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`,
  );

  console.log(
    "All test cases passed for 1356. Sort Integers By The Number Of 1 Bits!",
  );
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 1356. Sort Integers By The Number Of 1 Bits ===");
  console.log("Category: Sorting");
  console.log("Difficulty: Easy");
  console.log("");

  // Example demonstration would go here
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
 * - This solution focuses on sorting concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
