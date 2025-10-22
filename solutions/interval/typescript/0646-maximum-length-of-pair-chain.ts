/**
 * # Difficulty: Medium
 * 
 * # 646. Maximum Length Of Pair Chain
 * 
 * You are given an array of n pairs pairs where pairs[i] = [lefti, righti] and lefti < righti.
 * 
 * A pair p2 = [c, d] follows a pair p1 = [a, b] if b < c. A chain of pairs can be formed in this fashion.
 * 
 * Return the length longest chain which can be formed.
 * 
 * You do not need to use up all the given intervals. You can select pairs in any order.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>pairs = [[1,2],[2,3],[3,4]]</dd>
 * <dt>Output:</dt>
 * <dd>2 (maximum chain length)</dd>
 * <dt>Explanation:</dt>
 * <dd>Longest chain of pairs [[1,2],[2,3],[3,4]] is 2</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Two Pointers
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Two Pointers Pattern, Hash Table Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 * 
 * ### INTUITION:
 * Sort pairs by end time. Use greedy similar to Activity Selection. Keep previous end, skip pairs that don't start after previous end. Count valid pairs.
 * 
 * ### APPROACH:
 * 1. **Sort by end**: Sort pairs by pair[1]
 * 2. **Initialize variables**: Set count = 1, current_end = pairs[0][1]
 * 3. **Iterate from second**: For each pair in pairs[1:]
 * 4. **Check if chainable**: If pair_start > current_end, can extend chain
 * 5. **Extend chain**: Increment count, update current_end = pair_end
 * 6. **Continue processing**: Handle all pairs
 * 7. **Return result**: Return count as maximum chain length
 * 
 * ### WHY THIS WORKS:
 * - Sort pairs by end value (second element)
 * - Greedy: always pick pair with earliest end that doesn't overlap
 * - If current.start > last.end, add to chain
 * - Earliest end leaves maximum room for future pairs
 * - O(n log n) for sort, O(1) space, same logic as activity selection
 * 
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: pairs = [[1,2],[2,3],[3,4]]
 * Step 1: Sort by second element
 *   sorted = [[1,2],[2,3],[3,4]]
 * 
 * Step 2: Greedy selection
 *   Select [1,2], end=2
 *   [2,3]: 2 ≥ 2, skip
 *   [3,4]: 3 > 2, select it, length=2
 * 
 * Output: 2 (maximum chain length)
 * ```
 * 
 * ### TIME COMPLEXITY:
 * O(n)
 * 
 * ### SPACE COMPLEXITY:
 * O(1)
 * 
 * ### EDGE CASES:
 * - Empty input handling
 * - Single element cases
 * - Large input considerations
 * 
 * </details>
 */

class Solution {
  /**
   * Find the length of the longest chain that can be formed from the given pairs.
   *         A pair (a, b) can follow another pair (c, d) if b < c.
   *
   *         Args:
   *             pairs: List of pairs where each pair is [a, b]
   *
   *         Returns:
   *             int: Length of the longest possible chain
   */
  findLongestChain(pairs: any): number {
    // Implementation
    if not pairs:
    return 0
    pairs.sort(key=lambda x: x.get(1))
    current_end = float("-inf")  # Track the end of current chain
    chain_length = 0  # Track the length of chain
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  test_solution()
  # Example usage
  solution = Solution()
  console.log(`Solution for 646. Maximum Length Of Pair Chain`)
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;