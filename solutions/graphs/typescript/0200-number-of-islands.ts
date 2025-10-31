/**
 * 0200. Number Of Islands
 *
 * Difficulty: Medium
 * 
 * Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands.
 * 
 * An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>There is 1 island (all connected 1's in top-left)</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Depth-First Search (DFS), Breadth-First Search (BFS)
 * **Data Structures**: 2D Grid (Matrix), Queue (for BFS), Visited Array (optional)
 * **Patterns**: Graph Traversal, Connected Components
 * **Time Complexity**: O(M × N)
 * **Space Complexity**: O(M × N)
 *
 * ### INTUITION:
 * This is a classic graph traversal problem where we need to find connected components. Each island is a connected component of '1's (land). We can use DFS or BFS to explore each island completely when we encounter it, then count how many separate islands we find.
 *
 * ### APPROACH:
 * **Data structures: 2D Grid (matrix) with DFS/BFS traversal**
 * 1. **Iterate through grid**: Check each cell in the 2D matrix
 * 2. **Find land**: When we find a '1' (land), it's part of an island
 * 3. **Explore island**: Use DFS recursion or BFS with queue to mark all connected land as visited
 * 4. **Count islands**: Each time we start a new DFS/BFS, we found a new island
 * 5. **Mark visited**: Change '1' to '0' in-place or use separate visited array
 *
 * ### WHY THIS WORKS:
 * - **Depth-First Search (DFS)** recursively explores all 4 directions from each land cell
 * - **Breadth-First Search (BFS)** uses a queue to explore neighbors level by level
 * - Both Graph Traversal techniques completely explore Connected Components (islands)
 * - The **2D Grid (Matrix)** structure enables efficient neighbor access
 * - Once we've explored an island, we mark it as visited to avoid double-counting
 * - Each DFS/BFS start represents discovering a new island
 * - 4-directional connectivity (up, down, left, right) defines what constitutes an island
 *
 * ### EXAMPLE WALKTHROUGH:
 * Given input Grid: [["1","1","1","1","0"],
 *        ["1","1","0","1","0"],
 *        ["1","1","0","0","0"],
 *        ["0","0","0","0","0"]]:
 *
 * Input:
 * ```
 * Grid: [["1","1","1","1","0"],
 *        ["1","1","0","1","0"],
 *        ["1","1","0","0","0"],
 *        ["0","0","0","0","0"]]
 * ```
 *
 * **Step 1**: Iterate through grid - start at (0,0)
 * **Step 2**: Find land - (0,0) is '1', increment island count to 1
 * **Step 3**: Explore island - DFS from (0,0) explores entire connected land mass
 * - Mark visited: (0,0), (0,1), (0,2), (0,3), (1,0), (1,1), (2,0), (2,1)
 * **Step 4**: Count islands - first island complete, count = 1
 *
 * Continue scanning...
 * **Step 2**: Find land - (1,3) is '1', increment island count to 2
 * **Step 3**: Explore island - DFS from (1,3) only marks (1,3) as it's isolated
 * **Step 4**: Count islands - second island complete, count = 2
 *
 * **Step 5**: Mark visited - all land cells have been explored
 *
 * Output: 2 islands

 * ### TIME COMPLEXITY:
 * O(M × N)
 * Where M and N are grid dimensions - we visit each cell at most once
 * 
 * ### SPACE COMPLEXITY:
 * O(M × N)
 * For recursion stack in worst case (entire grid is one island) or visited array
 * 
 * ### EDGE CASES:
 * - Empty grid
 * - All water ('0's)
 * - All land ('1's) - single island
 * - Single cell grid
 * - Grid with no islands
 * 
 * </details>
 */

class Solution {
  /**
   * Count islands using DFS approach with in-place modification.
   *
   *         Args:
   *             grid: 2D grid of '1' (land) and '0' (water)
   *
   *         Returns:
   *             Number of islands (connected components of land)
   *
   *         Time Complexity: O(M × N) where M, N are grid dimensions
   *         Space Complexity: O(M × N) for recursion stack in worst case
   */
  numIslands(grid: string[][]): number {
    if (!grid || grid.length === 0) {
      return 0;
    }

    const rows = grid.length;
    const cols = grid[0].length;
    let islands = 0;

    const dfs = (r: number, c: number): void => {
      // Base case: out of bounds or water
      if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === "0") {
        return;
      }

      // Mark as visited
      grid[r][c] = "0";

      // Explore all 4 directions
      dfs(r + 1, c); // Down
      dfs(r - 1, c); // Up
      dfs(r, c + 1); // Right
      dfs(r, c - 1); // Left
    };

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c] === "1") {
          islands++;
          dfs(r, c);
        }
      }
    }

    return islands;
  }

  /**
   * Count islands using BFS approach to avoid recursion stack overflow.
   *
   *         Args:
   *             grid: 2D grid of '1' (land) and '0' (water)
   *
   *         Returns:
   *             Number of islands
   *
   *         Time Complexity: O(M × N)
   *         Space Complexity: O(min(M, N)) for queue in worst case
   */
  numIslandsBFS(grid: string[][]): number {
    if (!grid || grid.length === 0) {
      return 0;
    }

    const rows = grid.length;
    const cols = grid[0].length;
    let islands = 0;
    const directions = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c] === "1") {
          islands++;
          const queue: [number, number][] = [[r, c]];
          grid[r][c] = "0"; // Mark as visited

          while (queue.length > 0) {
            const [row, col] = queue.shift()!;

            for (const [dr, dc] of directions) {
              const newR = row + dr;
              const newC = col + dc;

              if (newR >= 0 && newR < rows && newC >= 0 && newC < cols && grid[newR][newC] === "1") {
                queue.push([newR, newC]);
                grid[newR][newC] = "0"; // Mark as visited
              }
            }
          }
        }
      }
    }

    return islands;
  }

  /**
   * Count islands using separate visited array (preserves original grid).
   *
   *         Args:
   *             grid: 2D grid of '1' (land) and '0' (water)
   *
   *         Returns:
   *             Number of islands
   *
   *         Time Complexity: O(M × N)
   *         Space Complexity: O(M × N) for visited array + recursion stack
   */
  numIslandsWithVisited(grid: string[][]): number {
    if (!grid || grid.length === 0) {
      return 0;
    }

    const rows = grid.length;
    const cols = grid[0].length;
    const visited: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));
    let islands = 0;

    const dfs = (r: number, c: number): void => {
      if (r < 0 || r >= rows || c < 0 || c >= cols || visited[r][c] || grid[r][c] === "0") {
        return;
      }

      visited[r][c] = true;
      dfs(r + 1, c);
      dfs(r - 1, c);
      dfs(r, c + 1);
      dfs(r, c - 1);
    };

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c] === "1" && !visited[r][c]) {
          islands++;
          dfs(r, c);
        }
      }
    }

    return islands;
  }

  /**
   * Count islands using Union-Find data structure.
   *
   *         Args:
   *             grid: 2D grid of '1' (land) and '0' (water)
   *
   *         Returns:
   *             Number of islands
   *
   *         Time Complexity: O(M × N × α(M × N)) where α is inverse Ackermann
   *         Space Complexity: O(M × N) for Union-Find structure
   */
  numIslandsUnionFind(grid: string[][]): number {
    if (!grid || grid.length === 0) {
      return 0;
    }

    const rows = grid.length;
    const cols = grid[0].length;

    class UnionFind {
      parent: number[];
      rank: number[];
      count: number;

      constructor(n: number) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.rank = Array(n).fill(0);
        this.count = 0;
      }

      find(x: number): number {
        if (this.parent[x] !== x) {
          this.parent[x] = this.find(this.parent[x]); // Path compression
        }
        return this.parent[x];
      }

      union(x: number, y: number): void {
        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX !== rootY) {
          if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
          } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
          } else {
            this.parent[rootY] = rootX;
            this.rank[rootX]++;
          }
          this.count--;
        }
      }
    }

    const uf = new UnionFind(rows * cols);

    // Count land cells
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c] === "1") {
          uf.count++;
        }
      }
    }

    // Union adjacent land cells
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c] === "1") {
          const idx = r * cols + c;

          // Check right neighbor
          if (c + 1 < cols && grid[r][c + 1] === "1") {
            uf.union(idx, idx + 1);
          }

          // Check bottom neighbor
          if (r + 1 < rows && grid[r + 1][c] === "1") {
            uf.union(idx, idx + cols);
          }
        }
      }
    }

    return uf.count;
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  // Quick example
  const grid = [
    ["1", "1", "0"],
    ["0", "1", "0"],
    ["0", "0", "1"],
  ];

  console.log("Grid:", JSON.stringify(grid));

  // Deep copy for preserving original
  const gridCopy = grid.map((row) => [...row]);
  console.log("Islands (with visited):", solution.numIslandsWithVisited(gridCopy));

  // Test Union-Find approach
  const gridCopy2 = grid.map((row) => [...row]);
  console.log("Islands (Union-Find):", solution.numIslandsUnionFind(gridCopy2));
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;