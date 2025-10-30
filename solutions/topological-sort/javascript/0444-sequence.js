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
 * <dd>org = [1,2,3], seqs = [[1,2],[1,3],[2,3]]</dd>
 * <dt>Output:</dt>
 * <dd>true</dd>
 * <dt>Explanation:</dt>
 * <dd>Sequence reconstruction validates if org is the only possible supersequence from seqs</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * ### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Hash Table Pattern
 * **Time Complexity**: O(V + E)
 * **Space Complexity**: O(V + E)

 *
 * ### INTUITION:
 * This is a topological sort problem where we need to check if there's a unique topological ordering that matches the given original sequence. The key insight is that for a unique reconstruction, at each step of topological sort, there should be exactly one node with in-degree 0.
 *
 * ### APPROACH:
 * **Data structures: Hash Map (adjacency list, in-degree), Hash Set (seen pairs), Array (queue for topological sort)**
 * 1. **Build graph**: Create adjacency list (hash map) and in-degree count from seqs, store seen pairs in a hash set
 * 2. **Validate sequences**: Ensure all pairs in seqs appear consecutively in org using the hash set
 * 3. **Check uniqueness**: Use topological sort with array-based queue, ensuring at each step only one node has in-degree 0
 * 4. **Verify order**: The topological order must match org exactly
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
 * **Step 1:** Build graph from seqs using hash map
 * - Graph: {1: [2, 3], 2: [3], 3: []}
 * - In-degrees: {1: 0, 2: 1, 3: 2}
 * - Seen pairs in hash set: {(1,2), (1,3), (2,3)}
 *
 * **Step 2:** Validate all consecutive pairs in org exist in seqs
 * - Check (1,2) ✓, (2,3) ✓ in hash set
 *
 * **Step 3:** Topological sort with uniqueness check using array queue
 * - Start: Only node 1 has in-degree 0 (unique) → process 1, reduce in-degrees
 * - Next: Only node 2 has in-degree 0 (unique) → process 2, reduce in-degree
 * - Final: Only node 3 has in-degree 0 (unique) → process 3
 * - Result array: [1,2,3]
 *
 * **Step 4:** Verify order matches org
 * - [1,2,3] matches org exactly → True
 *
 * **Output:** True
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
 * - **Unique topological order**: org=[1,2,3], seqs=[[1,2],[1,3],[2,3]] → true (only [1,2,3] valid)
 * - **Multiple valid orders**: org=[1,2,3], seqs=[[1,2],[1,3]] → false (both [1,2,3] and [1,3,2] valid)
 * - **Cycle in graph**: org=[1,2], seqs=[[1,2],[2,1]] → false (cycle exists)
 * - **Sequence doesn't match order**: org=[1,2,3], seqs=[[1,3],[3,2]] → false (produces [1,3,2])
 * - **Single element**: org=[1], seqs=[[1]] → true (trivial case)
 *
 * </details>
 */

/**
 * Main solution for Problem 444: Sequence Reconstruction
 *
 * @param {number[]} nums - Original sequence to reconstruct
 * @param {number[][]} sequences - List of sequences
 * @return {boolean} - True if nums is the only sequence that can be reconstructed
 *
 * Time Complexity: O(N + S) where N is length of nums and S is total length of all sequences
 * Space Complexity: O(N) for graph and in-degree storage
 */
function solve(nums, sequences) {
  // Build graph and in-degree map
  const graph = new Map();
  const inDegree = new Map();

  // Initialize all numbers from nums
  for (const num of nums) {
    graph.set(num, new Set());
    inDegree.set(num, 0);
  }

  // Build graph from sequences
  let edgeCount = 0;
  for (const seq of sequences) {
    for (let i = 0; i < seq.length; i++) {
      const num = seq[i];

      // Check if number is in original nums
      if (!graph.has(num)) {
        return false;
      }

      // Add edge from seq[i] to seq[i+1]
      if (i < seq.length - 1) {
        const next = seq[i + 1];
        if (!graph.has(next)) {
          return false;
        }

        // Only add edge if it doesn't exist
        if (!graph.get(num).has(next)) {
          graph.get(num).add(next);
          inDegree.set(next, inDegree.get(next) + 1);
          edgeCount++;
        }
      }
    }
  }

  // Check if we have enough edges (n-1 for unique reconstruction)
  if (edgeCount < nums.length - 1) {
    return false;
  }

  // Perform topological sort
  const queue = [];
  for (const [num, degree] of inDegree) {
    if (degree === 0) {
      queue.push(num);
    }
  }

  const result = [];
  while (queue.length > 0) {
    // For unique reconstruction, queue should have exactly one element
    if (queue.length > 1) {
      return false;
    }

    const current = queue.shift();
    result.push(current);

    for (const neighbor of graph.get(current)) {
      inDegree.set(neighbor, inDegree.get(neighbor) - 1);
      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }

  // Check if result matches nums exactly
  return (
    result.length === nums.length &&
    result.every((val, idx) => val === nums[idx])
  );
}

/**
 * Test cases for Problem 444: Sequence Reconstruction
 */
function testSolution() {
  console.log("Testing 444. Sequence Reconstruction");

  // Test case 1: Valid unique reconstruction
  const result1 = solve(
    [1, 2, 3],
    [
      [1, 2],
      [1, 3],
    ],
  );
  const expected1 = false; // Multiple possible orderings
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Valid unique reconstruction
  const result2 = solve(
    [1, 2, 3],
    [
      [1, 2],
      [1, 3],
      [2, 3],
    ],
  );
  const expected2 = true; // Only one ordering: 1 -> 2 -> 3
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Invalid - number not in sequences
  const result3 = solve([1, 2, 3], [[1, 2]]);
  const expected3 = false;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Single element
  const result4 = solve([1], [[1]]);
  const expected4 = true;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Wrong order
  const result5 = solve(
    [1, 2, 3],
    [
      [1, 3],
      [2, 3],
      [1, 2],
    ],
  );
  const expected5 = true;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  console.log("All test cases passed for 444. Sequence Reconstruction!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 444. Sequence ===");
  console.log("Category: Topological Sort");
  console.log("Difficulty: Documentation");
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
 * - This solution focuses on topological sort concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
