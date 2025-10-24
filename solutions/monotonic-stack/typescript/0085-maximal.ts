/**
 * # Difficulty: Medium
 *
 * # 0085. Maximal Rectangle
 *
 * Difficulty: Easy
 *
 * Given a rows x cols binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]</dd>
 * <dt>Output:</dt>
 * <dd>6</dd>
 * <dt>Explanation:</dt>
 * <dd>The maximal rectangle has area 6 (2 rows x 3 columns of 1's)</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Array, String
 * **Patterns**: Greedy Algorithm
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * For each row, treat it as base of histogram. Heights are consecutive 1s above in each column. Apply largest rectangle in histogram for each row. Track maximum across all rows.
 *
 * ### APPROACH:
 * 1. **Build height array**: For each row, treat as base of histogram
 * 2. **Update heights**: For each row, if cell is '1', heights[j] += 1; else heights[j] = 0
 * 3. **Apply histogram algorithm**: For each row's height array, call largestRectangleInHistogram
 * 4. **Track maximum**: Update max_area with result from histogram calculation
 * 5. **Continue for all rows**: Process entire matrix
 * 6. **Return result**: Return max_area
 *
 * ### WHY THIS WORKS:
 * - Treat each row as histogram base: heights = consecutive 1s above
 * - Apply largest rectangle in histogram algorithm to each row
 * - Update heights: if cell is 1, heights[j]++; if 0, heights[j]=0
 * - Max rectangle found by processing all rows as histograms
 * - O(m*n) time: histogram calculation O(n) per row, O(n) space for heights array
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * matrix = [["1","0","1","0","0"],["1","0","1","1","1"]]
 * ```
 *
 * Step 1: Build height array for each row
 * row 0: heights = [1,0,1,0,0]
 * row 1: heights = [2,0,2,1,1]
 * Step 2: Find max rectangle in each histogram
 * row 0: max = 1
 * row 1: max = 3
 *
 * Output:
 * ```
 * 3 (maximal rectangle)
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
   * Find the area of the largest rectangle containing only '1's in the binary matrix.
   *
   * Time Complexity: O(m * n)
   * Space Complexity: O(n)
   */
  maximalRectangle(matrix: string[][]): number {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
      return 0;
    }

    const rows = matrix.length;
    const cols = matrix[0].length;
    const heights: number[] = new Array(cols).fill(0);
    let maxArea = 0;

    for (let row = 0; row < rows; row++) {
      // Update heights for current row
      for (let col = 0; col < cols; col++) {
        if (matrix[row][col] === "1") {
          heights[col]++;
        } else {
          heights[col] = 0;
        }
      }

      // Calculate maximum rectangle area for current histogram
      maxArea = Math.max(maxArea, this.largestRectangleInHistogram(heights));
    }

    return maxArea;
  }

  /**
   * Helper method to find the largest rectangle area in a histogram.
   */
  private largestRectangleInHistogram(heights: number[]): number {
    const stack: number[] = []; // Stack to store indices
    let maxArea = 0;
    let i = 0;

    while (i < heights.length) {
      // If stack is empty or current height is larger than previous
      if (stack.length === 0 || heights[stack[stack.length - 1]] <= heights[i]) {
        stack.push(i);
        i++;
      } else {
        // Calculate area with height of popped bar as smallest height
        const currHeight = heights[stack.pop()!];
        const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
        maxArea = Math.max(maxArea, currHeight * width);
      }
    }

    // Process remaining elements in stack
    while (stack.length > 0) {
      const currHeight = heights[stack.pop()!];
      const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, currHeight * width);
    }

    return maxArea;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  // Test case 1: Example from problem
  const result1 = solution.maximalRectangle([
    ["1", "0", "1", "0", "0"],
    ["1", "0", "1", "1", "1"],
    ["1", "1", "1", "1", "1"],
    ["1", "0", "0", "1", "0"]
  ]);
  console.log(`Test 1: ${result1 === 6 ? "PASS" : "FAIL"}`);

  // Test case 2: Empty input
  console.log(`Test 2: ${solution.maximalRectangle([]) === 0 ? "PASS" : "FAIL"}`);

  // Test case 3: Single cell with 1
  console.log(`Test 3: ${solution.maximalRectangle([["1"]]) === 1 ? "PASS" : "FAIL"}`);

  // Test case 4: All zeros
  console.log(`Test 4: ${solution.maximalRectangle([["0", "0"], ["0", "0"]]) === 0 ? "PASS" : "FAIL"}`);

  // Test case 5: All ones
  console.log(`Test 5: ${solution.maximalRectangle([["1", "1"], ["1", "1"]]) === 4 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
