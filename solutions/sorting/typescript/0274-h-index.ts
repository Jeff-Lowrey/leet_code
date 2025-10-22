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
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Array
 * **Patterns**: Hash Table Pattern
 * **Time Complexity**: O(n log n) - Sorting or divide-and-conquer
 * **Space Complexity**: O(1) - Constant extra space
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
 * ```
 * Input: citations = [3,0,6,1,5]
 *
 * Sorted (descending): [6,5,3,1,0]
 *
 * Check each position:
 * i=0: citations[0]=6 >= 1? YES (h >= 1)
 * i=1: citations[1]=5 >= 2? YES (h >= 2)
 * i=2: citations[2]=3 >= 3? YES (h >= 3)
 * i=3: citations[3]=1 >= 4? NO  (h < 4)
 * i=4: citations[4]=0 >= 5? NO  (h < 5)
 *
 * Maximum h where condition holds: h=3
 * This means: 3 papers with at least 3 citations each
 *
 * Verification:
 * Papers: [6,5,3,1,0]
 * Papers with >= 3 citations: 6,5,3 = 3 papers ✓
 * Papers with >= 4 citations: 6,5 = 2 papers (not enough for h=4)
 *
 * Output: 3
 * ```
 *
 * ### TIME COMPLEXITY:
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

class Solution {
  hIndex(citations: number[]): number {
    citations.sort((a, b) => b - a);

    let h = 0;
    for (let i = 0; i < citations.length; i++) {
      if (citations[i] >= i + 1) {
        h = i + 1;
      } else {
        break;
      }
    }

    return h;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.hIndex([3, 0, 6, 1, 5]);
  console.log(`Test 1: ${result1 === 3 ? "PASS" : "FAIL"}`);

  const result2 = solution.hIndex([1, 3, 1]);
  console.log(`Test 2: ${result2 === 1 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
