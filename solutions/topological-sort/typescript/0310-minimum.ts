/**
 * # Difficulty: Medium
 * 
 * # 310. Minimum Height Trees
 * 
 * A tree is an undirected graph in which any two vertices are connected by exactly one path. In other words, any connected graph without simple cycles is a tree.
 * 
 * Given a tree of n nodes labelled from 0 to n - 1, and an array of n - 1 edges where edges[i] = [ai, bi] indicates that there is an undirected edge between the two nodes ai and bi in the tree, you can choose any node of the tree as the root. When you select a node x as the root, the result tree has height h. Among all possible rooted trees, those with minimum height (i.e. min(h)) are called minimum height trees (MHTs).
 * 
 * Return a list of all MHTs' root labels. You can return the answer in any order.
 * 
 * The height of a rooted tree is the number of edges on the longest downward path between the root and a leaf.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]</dd>
 * <dt>Output:</dt>
 * <dd>[3,4]</dd>
 * <dt>Explanation:</dt>
 * <dd>Minimum height tree roots are [0,1] for graph with edges [[0,1],[0,2],[0,3]]</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Greedy Algorithm, Graph Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 * 
 * ### INTUITION:
 * Remove leaf nodes iteratively. Leaves have degree 1. After removing, new leaves may form. Repeat until <= 2 nodes remain. These are the MHT roots (centers of tree).
 * 
 * ### APPROACH:
 * 1. **Handle edge cases**: If n <= 2, return list(range(n))
 * 2. **Build adjacency list**: Create graph with edges
 * 3. **Initialize leaves**: Find all nodes with degree 1
 * 4. **Trim leaves iteratively**: While n > 2, process current leaves
 * 5. **Remove leaves**: For each leaf, decrement neighbors' degrees
 * 6. **Find new leaves**: Add neighbors with degree 1 to new_leaves
 * 7. **Update n and leaves**: n -= len(leaves), leaves = new_leaves
 * 8. **Return result**: Return remaining nodes as MHT roots
 * 
 * ### WHY THIS WORKS:
 * - Remove leaf nodes iteratively, process like topological sort
 * - Tree's center (1 or 2 nodes) are minimum height roots
 * - BFS from leaves inward, last 1-2 nodes remaining are centers
 * - In tree, at most 2 nodes can be minimum height roots
 * - O(n) time: process each node once, O(n) space for adjacency list
 * 
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]
 * ```
 *
 * Step 1: Build adjacency list
 * Degrees: [1,1,1,4,2,1]
 * Step 2: Remove leaves layer by layer
 * Remove 0,1,2,5: leaves=[3,4]
 * These are minimum height tree roots
 *
 * Output:
 * ```
 * [3,4]
 * ```

 * ### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
 * 
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
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
   * Find the root nodes of all possible minimum height trees (MHTs).
   *
   *         Args:
   *             n: Number of nodes (0 to n-1)
   *             edges: List of undirected edges where edges[i] = [ai, bi]
   *
   *         Returns:
   *             List of root nodes that can form minimum height trees
   *
   *         Time Complexity: O(n)
   *         Space Complexity: O(n)
   */
  findMinHeightTrees(n: number, edges: any): any {
    // Implementation
    if n <= 2:
    return list(range(n))
    adj_list: dict.get(Any, set[Any)] = defaultdict(set)
    for u, v in edges:
    adj_list.get(u).add(v)
    adj_list.get(v).add(u)
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
  console.log(`Solution for 310. Minimum`)
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;