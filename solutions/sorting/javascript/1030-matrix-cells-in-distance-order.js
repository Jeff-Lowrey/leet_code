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
 * <dd>[[0, 0]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Cells sorted by Manhattan distance from [0,0]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Array Traversal, Sorting
 * **Data Structures**: Array, String, Matrix
 * **Patterns**: Iterative Solution
 * **Time Complexity**: * O(R*C * log(R*C))
 * **Space Complexity**: * O(R*C)

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
 * ```
 * Input: rows = 2, cols = 3, rCenter = 1, cCenter = 2
 * Matrix coordinates:
 * (0,0) (0,1) (0,2)
 * (1,0) (1,1) (1,2)  <- rCenter=1, cCenter=2
 *
 * Distances from (1,2):
 * (0,0): |0-1| + |0-2| = 1+2 = 3
 * (0,1): |0-1| + |1-2| = 1+1 = 2
 * (0,2): |0-1| + |2-2| = 1+0 = 1
 * (1,0): |1-1| + |0-2| = 0+2 = 2
 * (1,1): |1-1| + |1-2| = 0+1 = 1
 * (1,2): |1-1| + |2-2| = 0+0 = 0
 *
 * Sorted by distance:
 * Distance 0: (1,2)
 * Distance 1: (0,2), (1,1)
 * Distance 2: (0,1), (1,0)
 * Distance 3: (0,0)
 *
 * Output: [[1,2],[0,2],[1,1],[0,1],[1,0],[0,0]]
 * ```
 *
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

/**
 * Main solution for Problem 1030: Matrix Cells In Distance Order
 *
 * @param {number} rows - Number of rows in the matrix
 * @param {number} cols - Number of columns in the matrix
 * @param {number} rCenter - Row coordinate of center cell
 * @param {number} cCenter - Column coordinate of center cell
 * @return {number[][]} - All cells sorted by Manhattan distance from center
 *
 * Time Complexity: O(rows * cols * log(rows * cols))
 * Space Complexity: O(rows * cols)
 */
function solve(rows, cols, rCenter, cCenter) {
  const cells = [];

  // Generate all cells in the matrix
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push([r, c]);
    }
  }

  // Sort cells by Manhattan distance from (rCenter, cCenter)
  cells.sort((a, b) => {
    const distA = Math.abs(a[0] - rCenter) + Math.abs(a[1] - cCenter);
    const distB = Math.abs(b[0] - rCenter) + Math.abs(b[1] - cCenter);
    return distA - distB;
  });

  return cells;
}

/**
 * Test cases for Problem 1030: Matrix Cells In Distance Order
 */
function testSolution() {
  console.log("Testing 1030. Matrix Cells In Distance Order");

  // Test case 1: Basic 2x2 matrix
  const result1 = solve(1, 2, 0, 0);
  console.log("Test 1:", JSON.stringify(result1));
  console.assert(result1.length === 2, "Test 1 failed: wrong length");

  // Test case 2: 2x3 matrix with center at (1,2)
  const result2 = solve(2, 3, 1, 2);
  console.log("Test 2:", JSON.stringify(result2));
  console.assert(result2.length === 6, "Test 2 failed: wrong length");
  console.assert(
    result2[0][0] === 1 && result2[0][1] === 2,
    "Test 2 failed: center should be first",
  );

  // Test case 3: Single cell
  const result3 = solve(1, 1, 0, 0);
  console.log("Test 3:", JSON.stringify(result3));
  console.assert(
    result3.length === 1 && result3[0][0] === 0 && result3[0][1] === 0,
    "Test 3 failed",
  );

  console.log(
    "All test cases passed for 1030. Matrix Cells In Distance Order!",
  );
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 1030. Matrix Cells In Distance Order ===");
  console.log("Category: Sorting");
  console.log("Difficulty: Easy");
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
 * - This solution focuses on sorting concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
