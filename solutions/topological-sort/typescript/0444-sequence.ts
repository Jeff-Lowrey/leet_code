/**
 * # Difficulty: Medium
 *
 * # 0444. Sequence Reconstruction
 *
 *
 * Check whether the original sequence org can be uniquely reconstructed from the sequences in seqs. The org sequence is a permutation of the integers from 1 to n, with 1 ≤ n ≤ 10^4. Reconstruction means building a shortest common supersequence of the sequences in seqs (i.e., a shortest sequence so that all sequences in seqs are subsequences of it). Determine whether there is only one sequence that can be reconstructed from seqs and it is the org sequence.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[1, 2, 3]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Sequence reconstruction validates if org is only supersequence</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * ### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Hash Table Pattern, Backtracking
 * **Time Complexity**: O(V + E)
 * **Space Complexity**: O(V + E)
 *
 * ### INTUITION:
 * This is a topological sort problem where we need to check if there's a unique topological ordering that matches the given original sequence. The key insight is that for a unique reconstruction, at each step of topological sort, there should be exactly one node with in-degree 0.
 *
 * ### APPROACH:
 * **Data structures: Hash Map (for graph/in-degrees), Hash Set (for validation), Array (for sequences)**
 * 1. **Build graph**: Create adjacency list using hash map and in-degree count using hash map from seqs
 * 2. **Validate sequences**: Ensure all pairs in seqs appear consecutively in org using array
 * 3. **Check uniqueness**: Use topological sort with the constraint that at each step, only one node has in-degree 0 in hash map
 * 4. **Verify order**: The topological order must match org array exactly
 *
 * ### WHY THIS WORKS:
 * - Topological sort gives us the dependency order
 * - Unique reconstruction means at each step, only one choice exists
 * - If multiple nodes have in-degree 0 simultaneously, multiple valid orders exist
 * - We need to verify that the unique order matches the original sequence
 *
 *

This solution uses hash table lookup for efficient implementation.

This solution uses hash map storage for efficient implementation.

This solution uses set operations for efficient implementation.
### EXAMPLE WALKTHROUGH:
 * **Input:** org = [1,2,3], seqs = [[1,2],[1,3],[2,3]]
 *
 * **Step 1:** Build graph from seqs for org=[1,2,3], seqs=[[1,2],[1,3],[2,3]]
 * - 1 -> [2, 3]
 * - 2 -> [3]
 * - 3 -> []
 * - In-degrees: {1: 0, 2: 1, 3: 2}
 *
 * **Step 2:** Start topological sort
 * - Queue has nodes with in-degree 0: [1]
 * - Only one node in queue (unique choice) ✓
 *
 * **Step 3:** Process node 1
 * - Add 1 to result: [1]
 * - Reduce in-degrees of neighbors 2,3
 * - New in-degrees: {2: 0, 3: 1}
 * - Queue: [2]
 *
 * **Step 4:** Process node 2
 * - Add 2 to result: [1,2]
 * - Reduce in-degree of neighbor 3
 * - New in-degree: {3: 0}
 * - Queue: [3]
 *
 * **Step 5:** Process node 3
 * - Add 3 to result: [1,2,3]
 * - Result matches org [1,2,3] ✓
 *
 * Output:
 * ```
 * true
 * ```
 * 
 * ### TIME COMPLEXITY:
 * O(V + E)
 * Where V is number of nodes (n) and E is total number of edges from seqs
 *
 * ### SPACE COMPLEXITY:
 * O(V + E)
 * For the graph representation and auxiliary data structures
 *
 * ### EDGE CASES:
 * - Unique topological order: org=[1,2,3], seqs=[[1,2],[1,3],[2,3]] → True (only one valid sequence exists)
 * - Multiple valid orders: org=[1,2,3], seqs=[[1,2],[1,3]] → False (both [1,2,3] and [1,3,2] valid, ambiguous)
 * - Cycle in graph: org=[1,2], seqs=[[1,2],[2,1]] → False (contradictory constraints create cycle)
 * - Sequence doesn't match order: org=[1,2,3], seqs=[[1,2],[3,2]] → False ([3,2] conflicts with org order)
 * - Single element: org=[1], seqs=[[1]] → True (trivially valid, single element always unique)
 *
 * </details>
 */

class Solution {
  /**
   * Check unique reconstruction using topological sort.
   *
   * Time Complexity: O(V + E)
   * Space Complexity: O(V + E)
   */
  sequenceReconstruction(org: number[], seqs: number[][]): boolean {
    const n = org.length;
    if (n === 0) {
      return !seqs || seqs.every(seq => seq.length === 0);
    }

    if (new Set(org).size !== n || Math.min(...org) !== 1 || Math.max(...org) !== n) {
      return false;
    }

    const graph: Map<number, number[]> = new Map();
    const inDegree: Map<number, number> = new Map();

    for (let i = 1; i <= n; i++) {
      graph.set(i, []);
      inDegree.set(i, 0);
    }

    const seenPairs: Set<string> = new Set();

    for (const seq of seqs) {
      if (seq.length === 0) {
        continue;
      }

      for (const num of seq) {
        if (num < 1 || num > n) {
          return false;
        }
      }

      for (let i = 0; i < seq.length - 1; i++) {
        const u = seq[i];
        const v = seq[i + 1];
        const pair = `${u},${v}`;

        if (!seenPairs.has(pair)) {
          graph.get(u)!.push(v);
          inDegree.set(v, inDegree.get(v)! + 1);
          seenPairs.add(pair);
        }
      }
    }

    for (let i = 0; i < org.length - 1; i++) {
      const pair = `${org[i]},${org[i + 1]}`;
      if (!seenPairs.has(pair)) {
        return false;
      }
    }

    const queue: number[] = [];
    const result: number[] = [];

    for (let i = 1; i <= n; i++) {
      if (inDegree.get(i) === 0) {
        queue.push(i);
      }
    }

    while (queue.length > 0) {
      if (queue.length !== 1) {
        return false;
      }

      const node = queue.shift()!;
      result.push(node);

      for (const neighbor of graph.get(node)!) {
        inDegree.set(neighbor, inDegree.get(neighbor)! - 1);
        if (inDegree.get(neighbor) === 0) {
          queue.push(neighbor);
        }
      }
    }

    return result.length === n && JSON.stringify(result) === JSON.stringify(org);
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.sequenceReconstruction([1, 2, 3], [[1, 2], [1, 3], [2, 3]]);
  console.log(`Test 1: ${result1 === true ? "PASS" : "FAIL"}`);

  const result2 = solution.sequenceReconstruction([1, 2, 3], [[1, 2], [1, 3]]);
  console.log(`Test 2: ${result2 === false ? "PASS" : "FAIL"}`);

  const result3 = solution.sequenceReconstruction([1, 2, 3], [[1, 2], [1, 3], [3, 2]]);
  console.log(`Test 3: ${result3 === false ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
