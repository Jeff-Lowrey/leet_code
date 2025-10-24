/**
 * # 0696. Count Binary Substrings
 *
 * Difficulty: Medium
 *
 * # Difficulty: Easy
 *
 * Given a binary string s, return the number of non-empty substrings that have the same
 * number of 0's and 1's, and all the 0's and all the 1's in these substrings are grouped
 * consecutively.
 *
 * Substrings that occur multiple times are counted the number of times they occur.
 *
 * Example:
 * Input: s = "00110011"
 * Output: 6
 * Explanation: There are 6 substrings that have equal 0's and 1's: "0011", "01", "1100",
 * "10", "0011", and "01".
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>s = "00110011"</dd>
 * <dt>Output:</dt>
 * <dd>6</dd>
 * <dt>Explanation:</dt>
 * <dd>Count of binary substrings with equal consecutive 0s and 1s in '00110011' is 6</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Hash Map Storage, Array Traversal, Greedy Selection
 * **Data Structures**: String
 * **Patterns**: Hash Table Pattern, Greedy Algorithm
 * **Time Complexity**: * O(n) - Single pass through input
 * **Space Complexity**: * O(n)

 *
 * ### INTUITION:
 * For a valid binary substring, all 0's must be grouped together and all 1's must be
 * grouped together, with equal counts. The key insight is that we only need to look at
 * adjacent groups of the same digit. For two consecutive groups, the number of valid
 * substrings is min(length of first group, length of second group).
 *
 * ### APPROACH:
 * 1. **Count Consecutive Groups**: Count length of each consecutive group of same digit
 * 2. **Sliding Window**: Look at pairs of adjacent groups
 * 3. **Count Valid Substrings**: For each pair, add min(group1_length, group2_length)
 * 4. **Total Count**: Sum all valid substrings from all pairs
 *
 * Example: "00110" has groups [2, 2, 1]
 * - Groups "00" and "11": min(2, 2) = 2 valid substrings ("01", "0011")
 * - Groups "11" and "0": min(2, 1) = 1 valid substring ("10")
 * - Total: 3
 *
 * ### WHY THIS WORKS:
 * - Valid substrings must have consecutive identical digits
 * - For two adjacent groups with lengths n and m, we can form min(n, m) valid substrings
 * - Each valid substring takes equal number of digits from each group
 * - Example: groups "000" (3) and "11" (2) → min(3, 2) = 2 substrings: "01", "0011"
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * s = "00110011"
 * ```
 *
 * Count groups: [2, 2, 2, 2]
 * - "00": length 2
 * - "11": length 2
 * - "00": length 2
 * - "11": length 2
 * Count valid substrings:
 * - Pair [2, 2]: min(2, 2) = 2 substrings ("01", "0011")
 * - Pair [2, 2]: min(2, 2) = 2 substrings ("10", "1100")
 * - Pair [2, 2]: min(2, 2) = 2 substrings ("01", "0011")
 * Total: 2 + 2 + 2 = 6

 * ### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
 * - Single pass through string to count groups
 * - Process each group once
 * - Overall linear in string length
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 * - In worst case, store n groups (alternating 0s and 1s)
 * - Can be optimized to O(1) by processing pairs on-the-fly
 *
 * ### EDGE CASES:
 * - Single character: No valid substrings, return 0
 * - All same character: No valid substrings, return 0
 * - Alternating pattern "010101": Maximum valid substrings
 * - Two groups only: Simple case
 *
 * </details>
 */

/**
 * Main solution for Problem 696: Count Binary Substrings
 *
 * @param {string} s - Binary string
 * @return {number} - Count of valid binary substrings
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(s) {
  let result = 0;
  let prevCount = 0;
  let currCount = 1;

  // Count groups of consecutive identical characters
  for (let i = 1; i < s.length; i++) {
    if (s[i] === s[i - 1]) {
      // Same character, increase current group count
      currCount++;
    } else {
      // Different character, we can form substrings
      // Number of substrings = min of previous and current group
      result += Math.min(prevCount, currCount);
      prevCount = currCount;
      currCount = 1;
    }
  }

  // Add the last pair
  result += Math.min(prevCount, currCount);

  return result;
}

/**
 * Test cases for Problem 696: Count Binary Substrings
 */
function testSolution() {
  console.log("Testing 696. Count Binary Substrings");

  // Test case 1: Basic case
  const result1 = solve("00110011");
  const expected1 = 6;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Simple case
  const result2 = solve("10101");
  const expected2 = 4;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: All same characters
  const result3 = solve("0000");
  const expected3 = 0;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Two characters
  const result4 = solve("01");
  const expected4 = 1;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Unequal groups
  const result5 = solve("00011");
  const expected5 = 2;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  console.log("All test cases passed for 696. Count Binary Substrings!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 696. Count Binary Substrings ===");
  console.log("Category: String Manipulation");
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
 * - This solution focuses on string manipulation concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
