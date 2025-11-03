/**
 * # 1202. Smallest String With Swaps
 * 
 * # Difficulty: Medium
 * 
 * You are given a string s, and an array of pairs where pairs[i] = [a, b] indicates 2 indices
 * (0-indexed) that can be swapped. You can swap indices multiple times. Return the lexicographically
 * smallest string that s can be transformed to after using the swaps.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>s = "dcab", pairs = [[0,3],[1,2]]</dd>
 * <dt>Output:</dt>
 * <dd>bacd"</dd>
 * <dt>Explanation:</dt>
 * <dd>Smallest string after swapping characters in connected components</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Union-Find (Disjoint Set Union), Sorting, Graph Connected Components
 * **Data Structures**: Union-Find, Hash Map, Array
 * **Patterns**: Union-Find Pattern, Connected Components
 * **Time Complexity**: **O(n log n + m × α(n))** where n is string length, m is pairs count, α is inverse Ackermann
 * **Space Complexity**: **O(n)** - Union-Find parent/rank arrays plus component grouping
 * 
 * ### INTUITION:
The key insight is that pairs form connected components via union-find. Within each component, indices can be
rearranged freely. Sort characters in each component and assign to sorted indices.

### APPROACH:
1. **Union-Find**: Group indices into connected components
2. **Collect**: For each component, gather indices and characters
3. **Sort**: Sort both indices and characters
4. **Assign**: Place sorted characters at sorted indices

### WHY THIS WORKS:
If indices are transitively swappable, they form a connected component where any
permutation is achievable. Lexicographically smallest = sort characters ascending.

### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * s = "dcab", pairs = [[0,3],[1,2]]
 * ```
 *
 * Step 1: Union-find to group connected indices
 * Groups: {0,3}, {1,2}
 * Step 2: Sort characters within each group
 *
 * Steps:
 * Step 1: Group {0,3}: 'd','b' → 'b','d'
 * Step 2: Group {1,2}: 'c','a' → 'a','c'
 *
 * Output:
 * ```
 * "bacd"
 * ```

 * ### TIME COMPLEXITY:
 * **O(n log n + m × α(n))** where n is string length, m is number of pairs, and α is the inverse Ackermann function (nearly constant). The union-find operations for m pairs take O(m × α(n)). Grouping characters by component takes O(n). Sorting characters within each component takes O(n log n) in the worst case (if all indices form one component). Building the result string takes O(n). Total: O(n log n + m × α(n)).
 *
 * ### SPACE COMPLEXITY:
 * **O(n)** - We allocate parent and rank arrays of size n for the Union-Find structure (2n space). We also use a hash map to group indices by their root parent, which in the worst case stores all n indices (O(n) space). Character arrays for sorting also use O(n) space. Total space is O(n) + O(n) + O(n) = O(n).
 * 
 * ### EDGE CASES:
 * - **No pairs given**: Return original string unchanged
 * - **Single character string**: Return as-is (no swaps possible)
 * - **All indices connected**: Sort entire string lexicographically
 * - **Multiple disconnected components**: Sort each component independently
 * - **Duplicate characters**: Sorting naturally handles duplicates correctly
 * 
 * </details>
 */

class UnionFind {
  private parent: number[];
  private rank: number[];

  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = Array(n).fill(0);
  }

  find(x: number): number {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // Path compression
    }
    return this.parent[x];
  }

  union(x: number, y: number): void {
    const px = this.find(x);
    const py = this.find(y);

    if (px === py) return;

    // Union by rank
    if (this.rank[px] < this.rank[py]) {
      this.parent[px] = py;
    } else if (this.rank[px] > this.rank[py]) {
      this.parent[py] = px;
    } else {
      this.parent[py] = px;
      this.rank[px]++;
    }
  }
}

class Solution {
  /**
   * Find lexicographically smallest string by swapping characters at given index pairs.
   * Uses Union-Find to group swappable indices into connected components.
   *
   * Approach: Union-Find with sorting
   *         Time Complexity: O(n log n + m α(n))
   *         Space Complexity: O(n)
   */
  smallestStringWithSwaps(s: string, pairs: number[][]): string {
    const n = s.length;
    const uf = new UnionFind(n);

    // Union all pairs - indices in same component can be rearranged freely
    for (const [a, b] of pairs) {
      uf.union(a, b);
    }

    // Group indices by their root parent (connected component)
    const components = new Map<number, number[]>();
    for (let i = 0; i < n; i++) {
      const root = uf.find(i);
      if (!components.has(root)) {
        components.set(root, []);
      }
      components.get(root)!.push(i);
    }

    // Build result: sort characters within each component and assign to sorted indices
    const result = s.split('');
    for (const indices of components.values()) {
      // Get characters at these indices and sort them
      const chars = indices.map(i => s[i]).sort();
      // Sort the indices themselves
      indices.sort((a, b) => a - b);
      // Assign sorted characters to sorted indices
      for (let i = 0; i < indices.length; i++) {
        result[indices[i]] = chars[i];
      }
    }

    return result.join('');
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  // Test case 1: Basic swap
  const result1 = solution.smallestStringWithSwaps("dcab", [[0,3],[1,2]]);
  console.log(`smallestStringWithSwaps("dcab", [[0,3],[1,2]]) = ${result1}`);
  console.log(`Expected: "bacd"`);

  // Test case 2: All connected
  const result2 = solution.smallestStringWithSwaps("dcba", [[0,3],[1,2],[0,2]]);
  console.log(`\nsmallestStringWithSwaps("dcba", [[0,3],[1,2],[0,2]]) = ${result2}`);
  console.log(`Expected: "abcd"`);

  // Test case 3: No pairs
  const result3 = solution.smallestStringWithSwaps("abc", []);
  console.log(`\nsmallestStringWithSwaps("abc", []) = ${result3}`);
  console.log(`Expected: "abc"`);
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;