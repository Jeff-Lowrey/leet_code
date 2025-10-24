/**
 * # 696. Count Binary Substrings
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
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Set, Array, String
 * **Patterns**: Two Pointers Pattern, Sliding Window Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(n) - Additional set storage
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
 * - Additional set storage
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

class Solution {
  /**
   * Count binary substrings with equal grouped 0's and 1's.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  countBinarySubstrings(s: string): number {
    let count = 0;
    let prevGroupLen = 0;
    let currGroupLen = 1;

    // Process string left to right
    for (let i = 1; i < s.length; i++) {
      if (s[i] === s[i - 1]) {
        // Same digit, extend current group
        currGroupLen++;
      } else {
        // Different digit, new group starts
        // Add valid substrings from previous pair
        count += Math.min(prevGroupLen, currGroupLen);
        prevGroupLen = currGroupLen;
        currGroupLen = 1;
      }
    }

    // Don't forget the last pair
    count += Math.min(prevGroupLen, currGroupLen);

    return count;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.countBinarySubstrings("00110011") === 6 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.countBinarySubstrings("10101") === 4 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.countBinarySubstrings("00110") === 3 ? "PASS" : "FAIL"}`);
  console.log(`Test 4: ${solution.countBinarySubstrings("01") === 1 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
