/**
 * # Difficulty: Medium
 *
 * # 274. H Index
 *
 * Given an array of integers citations where citations[i] is the number of citations a researcher
 * received for their ith paper, return the researcher's h-index.
 *
 * According to the definition of h-index on Wikipedia: The h-index is defined as the maximum value
 * of h such that the given researcher has published at least h papers that have each been cited at
 * least h times.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>citations = [3,0,6,1,5]</dd>
 * <dt>Output:</dt>
 * <dd>3</dd>
 * <dt>Explanation:</dt>
 * <dd>H-index for citations [3,0,6,1,5] is 3</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Array Traversal, Sorting
 * **Data Structures**: Array
 * **Patterns**: Hash Table Pattern
 * **Time Complexity**: * O(n log n) - Sorting or divide-and-conquer
 * **Space Complexity**: * O(1) - Constant extra space

 *
 * ### INTUITION:
 * The h-index is the largest number h where at least h papers have h or more citations.
 * Sorting helps us find this threshold efficiently. We can also use counting for O(n) solution.
 *
 * ### APPROACH:
 * 1. **Sort citations** in descending order
 * 2. **Iterate through sorted array**: For each position i, check if citations[i] >= i+1
 * 3. **Find maximum h**: The h-index is the largest i+1 where citations[i] >= i+1
 * 4. **Alternative**: Count papers with at least k citations for each k
 *
 * ### WHY THIS WORKS:
 * - After sorting in descending order, citations[i] is the (i+1)th highest citation count
 * - If citations[i] >= i+1, we have at least i+1 papers with i+1+ citations
 * - The h-index is the maximum such i+1 value
 * - Counting approach: For each h, count papers with >= h citations
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * citations = [3,0,6,1,5]
 * ```
 *
 * Sorted (descending): [6,5,3,1,0]
 * Check each position:
 * i=0: citations[0]=6 >= 1? YES (h >= 1)
 * i=1: citations[1]=5 >= 2? YES (h >= 2)
 * i=2: citations[2]=3 >= 3? YES (h >= 3)
 * i=3: citations[3]=1 >= 4? NO  (h < 4)
 * i=4: citations[4]=0 >= 5? NO  (h < 5)
 * Maximum h where condition holds: h=3
 * This means: 3 papers with at least 3 citations each
 * Verification:
 * Papers: [6,5,3,1,0]
 * Papers with >= 3 citations: 6,5,3 = 3 papers ✓
 * Papers with >= 4 citations: 6,5 = 2 papers (not enough for h=4)
 *
 * Output:
 * ```
 * 3
 * ```

### TIME COMPLEXITY:
 * O(n log n)
 * For sorting approach. Counting approach is O(n).
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * If sorting in place, O(n) for sorting with extra space
 *
 * ### EDGE CASES:
 * - All zeros (h-index = 0)
 * - All citations > n (h-index = n)
 * - Single paper
 * - Empty array
 *
 * </details>
 */

/**
 * Main solution for Problem 274: H Index
 *
 * @param {number[]} citations - Array of citation counts
 * @return {number} - The h-index value
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(1)
 */
function solve(citations) {
  // Sort citations in descending order
  citations.sort((a, b) => b - a);

  let hIndex = 0;
  for (let i = 0; i < citations.length; i++) {
    // At position i, we have (i + 1) papers
    // If citations[i] >= i + 1, then we have at least (i + 1) papers with >= (i + 1) citations
    if (citations[i] >= i + 1) {
      hIndex = i + 1;
    } else {
      break; // No point continuing once the condition fails
    }
  }

  return hIndex;
}

/**
 * Test cases for Problem 274: H Index
 */
function testSolution() {
  console.log("Testing 274. H Index");

  // Test case 1: Example from problem
  const result1 = solve([3, 0, 6, 1, 5]);
  const expected1 = 3;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Another example
  const result2 = solve([1, 3, 1]);
  const expected2 = 1;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: High citations
  const result3 = solve([100]);
  const expected3 = 1;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: All zeros
  const result4 = solve([0, 0, 0]);
  const expected4 = 0;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Increasing sequence
  const result5 = solve([1, 2, 3, 4, 5]);
  const expected5 = 3;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  console.log("All test cases passed for 274. H Index!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 274. H Index ===");
  console.log("Category: Sorting");
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
 * - This solution focuses on sorting concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
