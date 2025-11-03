/**
 * ### METADATA:
 *
 *
 * ### INTUITION:
 * The key insight is that for each row, treat it as base of histogram. Heights are consecutive 1s above in each column. Apply largest rectangle in histogram for each row. Track maximum across all rows.
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
 * - This ensures that treat each row as histogram base: heights = consecutive 1s above
 * - This ensures that apply largest rectangle in histogram algorithm to each row
 * - This ensures that update heights: if cell is 1, heights[j]++; if 0, heights[j]=0
 * - This ensures that max rectangle found by processing all rows as histograms
 * - This ensures that o(m*n) time: histogram calculation O(n) per row, O(n) space for heights array
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
 *
 * ### TIME COMPLEXITY:
 * O(n)**
 * - Single pass through input
 *
 * ### SPACE COMPLEXITY:
 * **O(n)** - [Explanation of why this complexity]. The algorithm [describe the operation] which takes **O(n)** space.
 *
 * ### EDGE CASES:
 * - **Empty input**: Handle when input is empty
 * - **Single element**: Handle single-element inputs
 * - **Boundary values**: Handle minimum/maximum valid values
 *
 * *
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
