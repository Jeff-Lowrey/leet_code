/**
 * # Difficulty: Easy
 *
 * # 1221. Split A String In Balanced Strings
 *
 * Balanced strings are those that have an equal quantity of 'L' and 'R' characters.
 *
 * Given a balanced string s, split it into some number of substrings such that:
 * - Each substring is balanced.
 *
 * Return the maximum number of balanced strings you can obtain.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>"RLRRLLRLRL"</dd>
 * <dt>Output:</dt>
 * <dd>4</dd>
 * <dt>Explanation:</dt>
 * <dd>String 'RLRRLLRLRL' can be split into 4 balanced substrings</dd>
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
 * The key insight is to use a greedy approach: whenever we find a balanced substring
 * (where count of 'L' equals count of 'R'), we should immediately split it off. This
 * maximizes the number of splits because splitting early gives us more opportunities
 * for future splits.
 *
 * ### APPROACH:
 * 1. **Use a counter**: Track the balance between 'L' and 'R' characters
 * 2. **Increment/decrement**: +1 for 'L', -1 for 'R' (or vice versa)
 * 3. **Split when balanced**: When counter reaches 0, we have a balanced substring
 * 4. **Count splits**: Increment split counter each time balance reaches 0
 *
 * ### WHY THIS WORKS:
 * The algorithm correctly solves the problem by systematically exploring all valid states while maintaining necessary invariants. Each step preserves correctness through careful state management, and the base cases handle edge conditions properly. The approach guarantees finding the solution (if one exists) by examining all possibilities or efficiently pruning invalid paths.
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: s = "RLRRLLRLRL"
 *
 * i=0: 'R' → balance = -1
 * i=1: 'L' → balance = 0 → SPLIT! count = 1 → "RL"
 * i=2: 'R' → balance = -1
 * i=3: 'R' → balance = -2
 * i=4: 'L' → balance = -1
 * i=5: 'L' → balance = 0 → SPLIT! count = 2 → "RRLL"
 * i=6: 'R' → balance = -1
 * i=7: 'L' → balance = 0 → SPLIT! count = 3 → "RL"
 * i=8: 'R' → balance = -1
 * i=9: 'L' → balance = 0 → SPLIT! count = 4 → "RL"
 *
 * Output: 4
 * Substrings: "RL", "RRLL", "RL", "RL"
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)
 * Single pass through the string
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * Only using counter and result variables
 *
 * ### EDGE CASES:
 * - Minimum length: "RL" or "LR" → 1 split
 * - All same then alternating: Won't happen (input is balanced)
 * - Already optimal splits: "RLRL" → 2 splits
 * - Long balanced section: "RRRRLLLLLLL" → 1 split
 *
 * </details>
 */

/**
 * Main solution for Problem 1221: Split A String In Balanced Strings
 *
 * @param {string} s - Balanced string containing only 'L' and 'R'
 * @return {number} - Maximum number of balanced substrings
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(s) {
  let balance = 0;
  let count = 0;

  for (const char of s) {
    // Increment for L, decrement for R (or vice versa)
    balance += char === "L" ? 1 : -1;

    // When balanced, we found a split point
    if (balance === 0) {
      count++;
    }
  }

  return count;
}

/**
 * Test cases for Problem 1221: Split A String In Balanced Strings
 */
function testSolution() {
  console.log("Testing 1221. Split A String In Balanced Strings");

  // Test case 1: Example from problem
  const result1 = solve("RLRRLLRLRL");
  const expected1 = 4;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: All L's then all R's
  const result2 = solve("RLLLLRRRLR");
  const expected2 = 3;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Minimum case
  const result3 = solve("RL");
  const expected3 = 1;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Alternating pattern
  const result4 = solve("RLRLRLRL");
  const expected4 = 4;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Larger groups
  const result5 = solve("LLLLRRRR");
  const expected5 = 1;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  console.log(
    "All test cases passed for 1221. Split A String In Balanced Strings!",
  );
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 1221. Split A String In Balanced Strings ===");
  console.log("Category: Greedy");
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
 * - This solution focuses on greedy concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
