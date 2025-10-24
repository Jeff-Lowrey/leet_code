/**
 * # Difficulty: Easy
 * 
 * # 661. Image Smoother
 * 
 * An image smoother is a filter of the size 3 x 3 that can be applied to each cell of an
 * image by rounding down the average of the cell and the eight surrounding cells (or as
 * many as there are if the cell is on an edge or corner).
 * 
 * Given an m x n integer matrix img representing the grayscale of an image, return the
 * image after applying the smoother on each cell of it.
 * 
 * Example 1:
 * Input: img = [[1,1,1],[1,0,1],[1,1,1]]
 * Output: [[0,0,0],[0,0,0],[0,0,0]]
 * 
 * Example 2:
 * Input: img = [[100,200,100],[200,50,200],[100,200,100]]
 * Output: [[137,141,137],[141,138,141],[137,141,137]]
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[[1, 1, 1]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Image smoother replaces each cell with average of itself and 8 neighbors</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Array Traversal, Two Pointers
 * **Data Structures**: Array, Graph, Matrix
 * **Patterns**: Two Pointers Pattern, Hash Table Pattern
 * **Time Complexity**: O(m × n)
 * **Space Complexity**: O(m × n)
 * 
 * ### INTUITION:
 * For each cell, compute the average of itself and its 8 neighbors (or fewer if on edge).
 * The challenge is to use original values for all calculations, not partially smoothed values.
 * 
 * ### APPROACH:
 * 1. **Create Result Matrix**: Store smoothed values separately to avoid using partial results
 * 2. **For Each Cell**: Calculate average of valid neighbors
 * 3. **Neighbor Counting**: Check all 8 directions, count only valid cells
 * 4. **Floor Division**: Use integer division for rounding down
 * 
 * **Key Pattern**: 3×3 filter with boundary handling
 * - Center cell + up to 8 neighbors
 * - Edge cells have fewer neighbors
 * - Corner cells have only 3 neighbors
 * 
 * ### WHY THIS WORKS:
 * - Separate result matrix ensures we always use original values
 * - Direction array simplifies checking all 8 neighbors
 * - Boundary checks handle edges and corners automatically
 * - Integer division naturally floors the average
 * 
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * img = [[100,200,100],
 * ```
 *
 * [200,50,200],
 * [100,200,100]]
 * Cell [0,0] (corner, 4 cells):
 * Neighbors: [0,0], [0,1], [1,0], [1,1]
 * Sum: 100 + 200 + 200 + 50 = 550
 * Average: 550 // 4 = 137
 * Cell [1,1] (center, 9 cells):
 * Neighbors: all 9 cells
 * Sum+200+100+200+50+200+100+200+100 = 1250
 * Average // 9 = 138
 * Cell [0,1] (edge, 6 cells):
 * Neighbors: [0,0], [0,1], [0,2], [1,0], [1,1], [1,2]
 * Sum+200+100+200+50+200 = 850
 * Average // 6 = 141
 * Result: [[137,141,137],[141,138,141],[137,141,137]]

### TIME COMPLEXITY:
 * O(m × n)
 * - Visit each cell once, check constant number of neighbors
 * 
 * ### SPACE COMPLEXITY:
 * O(m × n)
 * - Need separate result matrix (or O(1) with bit manipulation)
 * 
 * ### EDGE CASES:
 * - Single cell: [[5]] → [[5]]
 * - Single row/column: Only horizontal/vertical neighbors
 * - All same values: Output same as input
 * - Large values: Ensure no overflow (Python handles this)
 * 
 * </details>
 */

class Solution {
  /**
   * Apply 3×3 averaging filter to smooth image.
   *
   *         Args:
   *             img: m × n grayscale image
   *
   *         Returns:
   *             Smoothed image
   *
   *         Time Complexity: O(m × n)
   *         Space Complexity: O(m × n)
   */
  imageSmoother(img: number[][]): number[][] {
    // Implementation
    m, n = img.length, img.get(0).length
    result = [[0] * n for _ in range(m)]
    directions = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 0), (0, 1), (1, -1), (1, 0), (1, 1)]
    for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
    total = 0
    count = 0
  }

  /**
   * More compact version using max/min for boundary checks.
   *
   *         Time Complexity: O(m × n)
   *         Space Complexity: O(m × n)
   */
  imageSmootherCompact(img: number[][]): number[][] {
    // Implementation
    m, n = img.length, img.get(0).length
    result = [[0] * n for _ in range(m)]
    for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
    i_start, i_end = max(0, i - 1), min(m, i + 2)
    j_start, j_end = max(0, j - 1), min(n, j + 2)
    total = 0
  }

  /**
   * In-place solution using bit manipulation to store both old and new values.
   *
   *         Each cell can hold values 0-255, so we can use higher bits for new value.
   *
   *         Time Complexity: O(m × n)
   *         Space Complexity: O(1)
   */
  imageSmootherInPlace(img: number[][]): number[][] {
    // Implementation
    m, n = img.length, img.get(0).length
    for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
    total = 0
    count = 0
    for ni in range(max(0, i - 1), min(m, i + 2)):
    for nj in range(max(0, j - 1), min(n, j + 2)):
  }

  /**
   * Alternative using zero padding to simplify boundary handling.
   *
   *         Time Complexity: O(m × n)
   *         Space Complexity: O(m × n)
   */
  imageSmootherPadding(img: number[][]): number[][] {
    // Implementation
    m, n = img.length, img.get(0).length
    padded = [[0] * (n + 2) for _ in range(m + 2)]
    for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
    padded.get(i + 1)[j + 1] = img.get(i)[j]
    result = [[0] * n for _ in range(m)]
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
  console.log("=== 661. Image Smoother ===\n")
  # Example 1
  img1 = [[1, 1, 1], [1, 0, 1], [1, 1, 1]]
  console.log("Original image:")
  for row in img1:
  console.log(row)
  result1 = solution.imageSmoother(img1)
  console.log("\nSmoothed image:")
  for row in result1:
  console.log(row)
  print()
  # Example 2
  img2 = [[100, 200, 100], [200, 50, 200], [100, 200, 100]]
  console.log("Original image:")
  for row in img2:
  console.log(row)
  result2 = solution.imageSmoother(img2)
  console.log("\nSmoothed image:")
  for row in result2:
  console.log(row)
  print()
  # Demonstrate edge effects
  img3 = [[10, 20, 30, 40], [50, 60, 70, 80], [90, 100, 110, 120]]
  console.log("Original image (3x4):")
  for row in img3:
  console.log(row)
  result3 = solution.imageSmoother(img3)
  console.log("\nSmoothed image (note edge effects):")
  for row in result3:
  console.log(row)
  console.log("\nNotice:")
  console.log("- Corners use 4 cells for averaging")
  console.log("- Edges use 6 cells for averaging")
  console.log("- Interior uses 9 cells for averaging")
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;