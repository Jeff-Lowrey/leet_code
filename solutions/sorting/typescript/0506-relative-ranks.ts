/**
 * # Difficulty: Easy
 * 
 * # 506. Relative Ranks
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
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
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
 * ```
 * Input: score = [5,4,3,2,1]
 * 
 * Step 1: Create (score, index) pairs
 * [(5,0), (4,1), (3,2), (2,3), (1,4)]
 * 
 * Step 2: Sort by score descending
 * [(5,0), (4,1), (3,2), (2,3), (1,4)]
 * 
 * Step 3: Assign ranks
 * Rank 1 (Gold Medal): score 5, index 0
 * Rank 2 (Silver Medal): score 4, index 1
 * Rank 3 (Bronze Medal): score 3, index 2
 * Rank 4: score 2, index 3
 * Rank 5: score 1, index 4
 * 
 * Step 4: Map back to original indices
 * answer[0] = "Gold Medal"
 * answer[1] = "Silver Medal"
 * answer[2] = "Bronze Medal"
 * answer[3] = "4"
 * answer[4] = "5"
 * 
 * Output: ["Gold Medal","Silver Medal","Bronze Medal","4","5"]
 * ```
 * 
 * ### TIME COMPLEXITY:
 * O(n log n)
 * For sorting the scores
 * 
 * ### SPACE COMPLEXITY:
 * O(n)
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

class Solution {
  /**
   * Assign ranks to athletes based on their scores.
   *
   *         Args:
   *             score: Array of athlete scores
   *
   *         Returns:
   *             Array of rank strings for each athlete
   *
   *         Time Complexity: O(n log n) for sorting
   *         Space Complexity: O(n) for result and mappings
   */
  findRelativeRanks(score: number[]): string[] {
    // Implementation
    n = score.length
    sorted_scores = sorted(enumerate(score), key=lambda x: x.get(1), reverse=true)
    result = [""] * n
    for rank, (original_idx, _) in enumerate(sorted_scores):
  }

  /**
   * Alternative approach using dictionary mapping.
   *
   *         Time Complexity: O(n log n)
   *         Space Complexity: O(n)
   */
  findRelativeRanksDict(score: number[]): string[] {
    // Implementation
    sorted_scores = sorted(score, reverse=true)
    rank_map: dict[Any, Any] = {}
    for (let rank = 0; rank < sorted_scores.length; rank++) {
        const s = sorted_scores.get(rank);
    if rank == 0:
    rank_map.set(s, "Gold Medal"
    elif rank == 1:
    rank_map.set(s, "Silver Medal"
    elif rank == 2:
  }

  /**
   * Concise solution using sorted with key.
   *
   *         Time Complexity: O(n log n)
   *         Space Complexity: O(n)
   */
  findRelativeRanksOneLiner(score: number[]): string[] {
    // Implementation
    sorted_scores = sorted(score, reverse=true)
    medals = ["Gold Medal", "Silver Medal", "Bronze Medal"]
    rank_map = {s: medals.get(i) if i < 3 else str(i + 1) for i, s in enumerate(sorted_scores)}
    return [rank_map.get(s) for s in score]
    def test_solution() -> null:
    """Test cases for Problem 506."""
    solution = Solution()
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
  console.log("=== 506. Relative Ranks ===")
  console.log(`findRelativeRanks([5,4,3,2,1]) -> {solution.findRelativeRanks([5, 4, 3, 2, 1])}`)
  console.log(`findRelativeRanks([10,3,8,9,4]) -> {solution.findRelativeRanks([10, 3, 8, 9, 4])}`)
  console.log(`findRelativeRanks([100]) -> {solution.findRelativeRanks([100])}`)
  console.log(`findRelativeRanks([1,2,3]) -> {solution.findRelativeRanks([1, 2, 3])}`)
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;