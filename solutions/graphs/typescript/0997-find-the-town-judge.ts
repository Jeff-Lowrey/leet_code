/**
 * # Difficulty: Easy
 * 
 * # 997. Find The Town Judge
 * 
 * In a town, there are n people labeled from 1 to n. There is a rumor that one of these people is secretly the town judge.
 * 
 * If the town judge exists, then:
 * 
 * 
 * 
 * 
 * You are given an array trust where trust[i] = [ai, bi] representing that the person labeled ai trusts the person labeled bi.
 * 
 * Return the label of the town judge if the town judge exists and can be identified, or return -1 otherwise.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>n = 3, trust = [[1,3],[2,3]]</dd>
 * <dt>Output:</dt>
 * <dd>"n={n}, trust={trust} -> Judge: {result}"</dd>
 * <dt>Explanation:</dt>
 * <dd>The town judge is person 2 who is trusted by all but trusts no one</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Array, Graph
 * **Patterns**: Hash Table Pattern
 * **Time Complexity**: O(T + N)
 * **Space Complexity**: O(N)
 * 
 * ### INTUITION:
 * This is a graph problem where we need to find a node (person) with specific in-degree and out-degree properties. The judge must have in-degree = n-1 (everyone trusts them) and out-degree = 0 (they trust nobody). We can solve this efficiently by tracking trust relationships as a directed graph.
 * 
 * ### APPROACH:
 * 1. **Count trust relationships**: Track who trusts whom and who is trusted by whom
 * 2. **Calculate net trust**: For each person, calculate (trusted_by_count - trusts_count)
 * 3. **Find the judge**: The judge will have net trust = n-1 (trusted by n-1 people, trusts 0)
 * 4. **Validate result**: Ensure exactly one person satisfies the judge criteria
 * 
 * ### WHY THIS WORKS:
 * - Judge trusts nobody: out-degree = 0
 * - Everyone else trusts judge: in-degree = n-1
 * - Net trust = in-degree - out-degree = (n-1) - 0 = n-1
 * - All other people have net trust < n-1 (they either trust someone or aren't trusted by everyone)
 * 
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * n = 3, trust = [[1,3],[2,3]]
 * ```
 *
 * Steps:
 * Step 1: Person 1: trusts 3, trusted by 0 → net = 0 - 1 = -1
 * Step 2: Person 2: trusts 3, trusted by 0 → net = 0 - 1 = -1
 * Step 3: Person 3: trusts 0, trusted by 2 → net = 2 - 0 = 2 = n-1 ✓
 *
 * Output:
 * ```
 * 3 (person 3 is the judge)
 * ```

### TIME COMPLEXITY:
 * O(T + N)
 * Where T is the number of trust relationships and N is the number of people
 * 
 * ### SPACE COMPLEXITY:
 * O(N)
 * For storing trust counts
 * 
 * ### EDGE CASES:
 * - n = 1: Only one person, they are the judge by default
 * - Empty trust array with n > 1: No judge possible
 * - Multiple people with high trust: No unique judge
 * - Circular trust: No judge possible
 * 
 * </details>
 */

class Solution {
  /**
   * Find the town judge using net trust calculation.
   *
   *         Args:
   *             n: Number of people (labeled 1 to n)
   *             trust: List of trust relationships [a, b] meaning a trusts b
   *
   *         Returns:
   *             Label of the town judge, or -1 if no judge exists
   *
   *         Time Complexity: O(T + N) where T is trust relationships, N is people
   *         Space Complexity: O(N) for trust count arrays
   */
  findJudge(n: number, trust: number[][]): number {
    // Implementation
    if n == 1:
    return 1 if not trust else -1
    net_trust = [0] * (n + 1)  # Index 0 unused, 1 to n for people
    for truster, trustee in trust:
    net_trust.get(truster) -= 1  # Truster loses trust (trusts someone)
  }

  /**
   * Alternative implementation using separate in-degree and out-degree tracking.
   *
   *         Args:
   *             n: Number of people
   *             trust: Trust relationships
   *
   *         Returns:
   *             Judge label or -1
   */
  findJudgeAlternative(n: number, trust: number[][]): number {
    // Implementation
    if n == 1:
    return 1
    trusted_by = [0] * (n + 1)  # How many people trust this person
    trusts = [0] * (n + 1)  # How many people this person trusts
    for truster, trustee in trust:
    trusts.get(truster) += 1
    trusted_by.get(trustee) += 1
  }

  /**
   * Space-optimized solution using single pass and candidate tracking.
   *
   *         Args:
   *             n: Number of people
   *             trust: Trust relationships
   *
   *         Returns:
   *             Judge label or -1
   */
  findJudgeOptimized(n: number, trust: number[][]): number {
    // Implementation
    if n == 1:
    return 1 if not trust else -1
    trust_score: dict[Any, Any] = {}
    for truster, trustee in trust:
    trust_score.set(truster, trust_score.get(truster, 0) - 1
    trust_score.set(trustee, trust_score.get(trustee, 0) + 1
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
  console.log("=== 997. Find The Town Judge ===")
  # Demonstrate various scenarios
  test_cases = [
  (2, [[1, 2]]),
  (3, [[1, 3], [2, 3]]),
  (3, [[1, 3], [2, 3], [3, 1]]),
  (1, []),
  (4, [[1, 3], [1, 4], [2, 3], [2, 4], [4, 3]]),
  ]
  for n, trust in test_cases:
  result = solution.findJudge(n, trust)
  console.log(`n={n}, trust={trust} -> Judge: {result}`)
  console.log("\nDetailed example:")
  console.log("n=3, trust=[[1,3],[2,3]]")
  console.log("Person 1: trusts person 3 (net trust = -1)")
  console.log("Person 2: trusts person 3 (net trust = -1)")
  console.log("Person 3: trusted by persons 1,2 (net trust = +2 = n-1)")
  console.log("Judge: Person 3 ✓")
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;