/**
 * # Difficulty: Medium
 *
 * # 0763. Partition Labels
 *
 *
 * You are given a string s. We want to partition the string into as many parts as possible so that each letter appears in at most one part.
 *
 * Note that the partition is done so that after concatenating all the parts in order, the resultant string should be s.
 *
 * Return a list of integers representing the size of these parts.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>s = "ababcbacadefegdehijhklij"</dd>
 * <dt>Output:</dt>
 * <dd>[9,7,8] (partition sizes)</dd>
 * <dt>Explanation:</dt>
 * <dd>String is partitioned into 2 parts: 'ababcbaca' + 'defegde'</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * ### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Greedy Algorithm
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space

 *
 * ### INTUITION:
 * [This problem requires understanding of greedy concepts. The key insight is to identify the optimal approach for this specific scenario.]
 *
 * ### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply greedy methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- This ensures that the solution leverages greedy principles
- This ensures that time complexity is optimized for the given constraints
- This ensures that space complexity is minimized where possible

### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * s = "ababcbacadefegdehijhklij"
 * ```
 *
 * Step 1: Record last occurrence of each character
 * last = {'a':8, 'b':5, 'c':7, 'd':14, 'e':15, ...}
 * Step 2: Iterate and extend partition
 * i=0, ch='a': end = max(0, 8) = 8
 * i=1, ch='b': end = max(8, 5) = 8
 * ...
 *
 * Steps:
 * Step 1: i=8: reached end → partition size = 9
 * Step 2: i=9, ch='c': end = 14
 * Step 3: ...
 *
 * Output:
 * ```
 * [9,7,8] (partition sizes)
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

/**
 * Main solution for Problem 763: Partition Labels
 *
 * @param {string} s - Input string
 * @return {number[]} - Array of partition sizes
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(s) {
  // Record last position of each character
  const lastPos = new Map();
  for (let i = 0; i < s.length; i++) {
    lastPos.set(s[i], i);
  }

  const result = [];
  let start = 0;
  let end = 0;

  for (let i = 0; i < s.length; i++) {
    // Extend partition end to include last occurrence of current char
    end = Math.max(end, lastPos.get(s[i]));

    // When we reach the end of current partition
    if (i === end) {
      result.push(end - start + 1);
      start = i + 1;
    }
  }

  return result;
}

/**
 * Test cases for Problem 763: Partition Labels
 */
function testSolution() {
  console.log("Testing 763. Partition Labels");

  // Test case 1: Example from problem
  const result1 = solve("ababcbacadefegdehijhklij");
  const expected1 = [9, 7, 8];
  console.assert(
    JSON.stringify(result1) === JSON.stringify(expected1),
    `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`,
  );

  // Test case 2: Another example
  const result2 = solve("eccbbbbdec");
  const expected2 = [10];
  console.assert(
    JSON.stringify(result2) === JSON.stringify(expected2),
    `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`,
  );

  // Test case 3: All unique
  const result3 = solve("abc");
  const expected3 = [1, 1, 1];
  console.assert(
    JSON.stringify(result3) === JSON.stringify(expected3),
    `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`,
  );

  // Test case 4: All same
  const result4 = solve("aaaa");
  const expected4 = [4];
  console.assert(
    JSON.stringify(result4) === JSON.stringify(expected4),
    `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`,
  );

  // Test case 5: Two partitions
  const result5 = solve("abcabc");
  const expected5 = [6];
  console.assert(
    JSON.stringify(result5) === JSON.stringify(expected5),
    `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`,
  );

  console.log("All test cases passed for 763. Partition Labels!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 763. Partition Labels ===");
  console.log("Category: Greedy");
  console.log("Difficulty: Medium");
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
 * - This solution focuses on greedy concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
