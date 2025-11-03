/**
### INTUITION:
The key insight is that this is a classic Union-Find cycle detection problem. In a tree with n nodes, there should be exactly n-1 edges. When we add one extra edge, it creates a cycle. We need to find the edge that completes this cycle.

### APPROACH:
1. **Use Union-Find**: Track connected components as we process edges
2. **Cycle detection**: If two nodes are already connected and we try to add an edge between them, that edge creates a cycle
3. **Return last occurrence**: The problem asks for the edge that occurs last in input if multiple answers exist

### WHY THIS WORKS:
- This ensures that union-Find efficiently tracks connected components
- This ensures that when we encounter an edge between two nodes already in the same component, that edge creates a cycle
- This ensures that the first such edge we encounter (processing left to right) is the redundant one
- This ensures that this edge can be removed while keeping the graph connected

### EXAMPLE WALKTHROUGH:
Input:
```
edges = [[1,2],[1,3],[2,3]]
```

Steps:
Step 1: Process edge [1,2]: 1 and 2 not connected → union them
Step 2: Process edge [1,3]: 1 and 3 not connected → union them
Step 3: Process edge [2,3]: 2 and 3 are already connected through 1 → redundant!
Step 4: Return [2,3]

Output:
```
[Expected output]
```

### TIME COMPLEXITY:
O(n × α(n)**)
Where α is the inverse Ackermann function (nearly constant for practical purposes)

### SPACE COMPLEXITY:
O(n)**
- Additional hash map storage
For the Union-Find parent array

### EDGE CASES:
- **Simple triangle**: Return last edge that completes the cycle
- **Large cycle**: Union-find detects first edge connecting already-connected nodes
- **Multiple possible answers**: Return edge that occurs last in input
- **Linear chain with one extra**: The extra edge creates the cycle
- **Self-loop edge**: Detected immediately by union-find

*/

class UnionFind {
  private parent: number[];
  private rank: number[];

  constructor(n: number) {
    this.parent = Array.from({ length: n + 1 }, (_, i) => i);
    this.rank = Array(n + 1).fill(0);
  }

  find(x: number): number {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // Path compression
    }
    return this.parent[x];
  }

  union(x: number, y: number): boolean {
    const px = this.find(x);
    const py = this.find(y);

    if (px === py) {
      return false; // Already connected
    }

    // Union by rank
    if (this.rank[px] < this.rank[py]) {
      this.parent[px] = py;
    } else if (this.rank[px] > this.rank[py]) {
      this.parent[py] = px;
    } else {
      this.parent[py] = px;
      this.rank[px]++;
    }

    return true;
  }
}

class Solution {
  /**
   * Find redundant edge using Union-Find cycle detection.
   *
   * Time Complexity: O(n × α(n))
   * Space Complexity: O(n)
   */
  findRedundantConnection(edges: number[][]): number[] {
    const n = edges.length;
    const uf = new UnionFind(n);

    for (const edge of edges) {
      const [u, v] = edge;

      // If nodes are already connected, this edge creates a cycle
      if (!uf.union(u, v)) {
        return edge;
      }
    }

    return [];
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.findRedundantConnection([[1, 2], [1, 3], [2, 3]]);
  console.log(`Test 1: ${JSON.stringify(result1) === JSON.stringify([2, 3]) ? "PASS" : "FAIL"}`);

  const result2 = solution.findRedundantConnection([[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]]);
  console.log(`Test 2: ${JSON.stringify(result2) === JSON.stringify([1, 4]) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
