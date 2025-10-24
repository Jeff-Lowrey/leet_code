/**
 * # Difficulty: Easy
 *
 * # 0506. Relative Ranks
 *
 *
 * You are given an integer array score of size n, where score[i] is the score of the ith athlete
 * in a competition. All the scores are guaranteed to be unique.
 *
 * The athletes are placed based on their scores, where the 1st place athlete has the highest score,
 * the 2nd place athlete has the 2nd highest score, and so on. The placement of each athlete determines
 * their rank:
 *
 * - The 1st place athlete's rank is "Gold Medal".
 * - The 2nd place athlete's rank is "Silver Medal".
 * - The 3rd place athlete's rank is "Bronze Medal".
 * - For the 4th place to the nth place athlete, their rank is their placement number (i.e., the xth place athlete's rank is "x").
 *
 * Return an array answer of size n where answer[i] is the rank of the ith athlete.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>["Gold Medal", "Silver Medal", "Bronze Medal", "4", "5"]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Ranks for scores [5,4,3,2,1] are ['Gold','Silver','Bronze','4','5']</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * ### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Array, String
 * **Patterns**: Iterative Solution
 * **Time Complexity**: O(n log n) - Sorting or divide-and-conquer
 * **Space Complexity**: O(n) - Additional hash map storage

 *
 * ### INTUITION:
 * We need to map each score to its rank. Sorting gives us the order, but we need to maintain
 * the original indices. Use sorting with indices or create a score-to-rank mapping.
 *
 * ### APPROACH:
 * 1. **Create index-score pairs**: Track original positions
 * 2. **Sort by score descending**: Highest score first
 * 3. **Assign ranks**: Gold/Silver/Bronze for top 3, numbers for rest
 * 4. **Map back to original positions**: Use original indices
 *
 * ### WHY THIS WORKS:
 * - Sorting by score gives us the ranking order
 * - Tracking original indices lets us place ranks correctly
 * - Dictionary mapping from score to rank is efficient
 * - Special strings for top 3, numbers for rest
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * score = [5,4,3,2,1]
 * ```
 *
 * Step 1: Create (score, index) pairs
 * [(5,0), (4,1), (3,2), (2,3), (1,4)]
 * Step 2: Sort by score descending
 * [(5,0), (4,1), (3,2), (2,3), (1,4)]
 * Step 3: Assign ranks
 * Rank 1 (Gold Medal): score 5, index 0
 * Rank 2 (Silver Medal): score 4, index 1
 * Rank 3 (Bronze Medal): score 3, index 2
 * Rank 4: score 2, index 3
 * Rank 5: score 1, index 4
 * Step 4: Map back to original indices
 * answer[0] = "Gold Medal"
 * answer[1] = "Silver Medal"
 * answer[2] = "Bronze Medal"
 * answer[3] = "4"
 * answer[4] = "5"
 *
 * Output:
 * ```
 * ["Gold Medal","Silver Medal","Bronze Medal","4","5"]
 * ```

 * ### TIME COMPLEXITY:
 * O(n log n)
 * - Sorting or divide-and-conquer
 * For sorting the scores
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 * - Additional hash map storage
 * For storing score-rank mappings and result
 *
 * ### EDGE CASES:
 * - Single athlete (gets Gold Medal)
 * - Two athletes (Gold and Silver only)
 * - Three athletes (Gold, Silver, Bronze)
 * - Large number of athletes
 *
 * </details>
 */

/**
 * Main solution for Problem 506: Relative Ranks
 *
 * @param {number[]} score - Array of athlete scores
 * @return {string[]} - Array of ranks in original order
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
function solve(score) {
  const n = score.length;
  const result = new Array(n);

  // Create pairs of [score, originalIndex]
  const pairs = score.map((s, i) => [s, i]);

  // Sort by score in descending order
  pairs.sort((a, b) => b[0] - a[0]);

  // Assign ranks
  const medals = ["Gold Medal", "Silver Medal", "Bronze Medal"];

  for (let rank = 0; rank < n; rank++) {
    const [scoreValue, originalIndex] = pairs[rank];

    if (rank < 3) {
      result[originalIndex] = medals[rank];
    } else {
      result[originalIndex] = String(rank + 1);
    }
  }

  return result;
}

/**
 * Test cases for Problem 506: Relative Ranks
 */
function testSolution() {
  console.log("Testing 506. Relative Ranks");

  // Test case 1: Example from problem
  const result1 = solve([5, 4, 3, 2, 1]);
  const expected1 = ["Gold Medal", "Silver Medal", "Bronze Medal", "4", "5"];
  console.assert(
    JSON.stringify(result1) === JSON.stringify(expected1),
    `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`,
  );

  // Test case 2: Another example
  const result2 = solve([10, 3, 8, 9, 4]);
  const expected2 = ["Gold Medal", "5", "Bronze Medal", "Silver Medal", "4"];
  console.assert(
    JSON.stringify(result2) === JSON.stringify(expected2),
    `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`,
  );

  // Test case 3: Single athlete
  const result3 = solve([100]);
  const expected3 = ["Gold Medal"];
  console.assert(
    JSON.stringify(result3) === JSON.stringify(expected3),
    `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`,
  );

  // Test case 4: Two athletes
  const result4 = solve([7, 5]);
  const expected4 = ["Gold Medal", "Silver Medal"];
  console.assert(
    JSON.stringify(result4) === JSON.stringify(expected4),
    `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`,
  );

  // Test case 5: Three athletes
  const result5 = solve([1, 2, 3]);
  const expected5 = ["Bronze Medal", "Silver Medal", "Gold Medal"];
  console.assert(
    JSON.stringify(result5) === JSON.stringify(expected5),
    `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`,
  );

  console.log("All test cases passed for 506. Relative Ranks!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 506. Relative Ranks ===");
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
