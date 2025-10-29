/**
 * # Difficulty: Easy
 * 
 * # 1030. Matrix Cells In Distance Order
 * 
 * You are given four integers row, col, rCenter, and cCenter. There exists a rows x cols matrix
 * and you are on the cell with the coordinates (rCenter, cCenter).
 * 
 * Return the coordinates of all cells in the matrix, sorted by their distance from (rCenter, cCenter)
 * from the smallest distance to the largest distance. You may return the answer in any order that
 * satisfies this condition.
 * 
 * The distance between two cells (r1, c1) and (r2, c2) is |r1 - r2| + |c1 - c2|.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[[0, 0]]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Cells sorted by Manhattan distance from [0,0]</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
 * **Data Structures**: Hash Set, Array, Queue
 * **Patterns**: Hash Table Pattern, Greedy Algorithm
 * **Time Complexity**: O(R*C * log(R*C))
 * **Space Complexity**: O(R*C)
 * 
 * ### INTUITION:
 * We need to sort all matrix coordinates by their Manhattan distance from a given center point.
 * The key insight is to generate all coordinates and use Python's built-in sorting with a custom key.
 * 
 * ### APPROACH:
 * 1. **Generate all coordinates**: Create all (r, c) pairs for the matrix
 * 2. **Define distance function**: Manhattan distance |r - rCenter| + |c - cCenter|
 * 3. **Sort by distance**: Use sorted() with lambda key function
 * 4. **Return sorted list**: All coordinates ordered by distance
 * 
 * ### WHY THIS WORKS:
 * - Manhattan distance measures the grid distance between two points
 * - Python's stable sort maintains relative order for equal distances
 * - Custom key function allows sorting by computed distance
 * - List comprehension efficiently generates all coordinates
 * 
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * rows = 2, cols = 3, rCenter = 1, cCenter = 2
 * ```
 *
 * Matrix coordinates:
 * (0,0) (0,1) (0,2)
 * (1,0) (1,1) (1,2)  <- rCenter=1, cCenter=2
 * Distances from (1,2):
 * (0,0): |0-1| + |0-2| = 1+2 = 3
 * (0,1): |0-1| + |1-2| = 1+1 = 2
 * (0,2): |0-1| + |2-2| = 1+0 = 1
 * (1,0): |1-1| + |0-2| = 0+2 = 2
 * (1,1): |1-1| + |1-2| = 0+1 = 1
 * (1,2): |1-1| + |2-2| = 0+0 = 0
 * Sorted by distance:
 * Distance 0: (1,2)
 * Distance 1: (0,2), (1,1)
 * Distance 2: (0,1), (1,0)
 * Distance 3: (0,0)
 *
 * Output:
 * ```
 * [[1,2],[0,2],[1,1],[0,1],[1,0],[0,0]]
 * ```

 * ### TIME COMPLEXITY:
 * O(R*C * log(R*C))
 * - Generating coordinates: O(R*C)
 * - Sorting: O(R*C * log(R*C))
 * - Total: O(R*C * log(R*C))
 * 
 * ### SPACE COMPLEXITY:
 * O(R*C)
 * For storing all coordinates in the result
 * 
 * ### EDGE CASES:
 * - Single cell matrix (1x1)
 * - Center at corner vs center of matrix
 * - Large matrices (up to 100x100)
 * 
 * </details>
 */

class Solution {
  /**
   * Return all matrix cells sorted by Manhattan distance from center.
   *
   *         Args:
   *             rows: Number of rows in matrix
   *             cols: Number of columns in matrix
   *             rCenter: Row coordinate of center
   *             cCenter: Column coordinate of center
   *
   *         Returns:
   *             List of [row, col] coordinates sorted by distance from center
   *
   *         Time Complexity: O(R*C * log(R*C)) for sorting
   *         Space Complexity: O(R*C) for result list
   */
  allCellsDistOrder(rows: number, cols: number, rCenter: number, cCenter: number): number[][] {
    // Implementation
    return sorted(
    [[r, c] for r in range(rows) for c in range(cols)],
    key=lambda coord: abs(coord.get(0) - rCenter) + abs(coord.get(1) - cCenter),
    )
  }

  /**
   * BFS approach for O(R*C) time complexity.
   *
   *         Args:
   *             rows: Number of rows in matrix
   *             cols: Number of columns in matrix
   *             rCenter: Row coordinate of center
   *             cCenter: Column coordinate of center
   *
   *         Returns:
   *             List of [row, col] coordinates sorted by distance from center
   *
   *         Time Complexity: O(R*C) - BFS visits each cell once
   *         Space Complexity: O(R*C) for result and visited set
   */
  allCellsDistOrderBFS(rows: number, cols: number, rCenter: number, cCenter: number): number[][] {
    // Implementation
    result: list.set(Any, []
    visited: set.set(Any, set()
    queue = deque([(rCenter, cCenter)])
    visited.add((rCenter, cCenter))
    while queue:
    r, c = queue.popleft()
    result.append([r, c])
  }

  /**
   * Bucket sort approach for O(R*C) time complexity.
   *
   *         Groups coordinates by their distance value.
   *
   *         Time Complexity: O(R*C)
   *         Space Complexity: O(R*C)
   */
  allCellsDistOrderBucket(rows: number, cols: number, rCenter: number, cCenter: number): number[][] {
    // Implementation
    max_dist = max(rCenter, rows - 1 - rCenter) + max(cCenter, cols - 1 - cCenter)
    buckets: list.get(list[Any)] = [[] for _ in range(max_dist + 1)]
    for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
    dist = abs(r - rCenter) + abs(c - cCenter)
    buckets.get(dist).append([r, c])
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
  console.log("=== 1030. Matrix Cells In Distance Order ===")
  console.log(`allCellsDistOrder(1, 2, 0, 0) -> {solution.allCellsDistOrder(1, 2, 0, 0)}`)
  console.log(`allCellsDistOrder(2, 3, 1, 2) -> {solution.allCellsDistOrder(2, 3, 1, 2)}`)
  console.log(`allCellsDistOrder(3, 3, 1, 1) -> {solution.allCellsDistOrder(3, 3, 1, 1)}`)
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;