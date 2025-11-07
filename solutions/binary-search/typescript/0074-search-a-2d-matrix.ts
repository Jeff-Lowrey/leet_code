/**
 * ### METADATA:
 *
 *
 * ### INTUITION:
 * The key insight is that treat the 2D matrix as a flattened 1D sorted array. Use binary search on a virtual index, converting it to row/col using row = mid // n_cols and col = mid % n_cols. This achieves O(log(m*n)) time complexity.
 *
 * ### APPROACH:
 * 1. **Treat as 1D array**: Conceptualize the m×n matrix as a sorted 1D array of length m*n
 * 2. **Initialize binary search**: Set left = 0, right = m*n - 1
 * 3. **Calculate mid**: In each iteration, compute mid = (left + right) // 2
 * 4. **Convert to 2D indices**: Calculate row = mid // n, col = mid % n to access matrix[row][col]
 * 5. **Compare with target**: If matrix[row][col] == target, return True
 * 6. **Adjust search space**: If matrix[row][col] < target, set left = mid + 1; else set right = mid - 1
 * 7. **Continue until found**: Repeat steps 3-6 while left <= right
 * 8. **Return False**: If loop completes without finding target, return False
 *
 * ### WHY THIS WORKS:
 * - This ensures that treat 2D matrix as flattened 1D array for binary search
 * - This ensures that convert mid to (row, col): row = mid // n, col = mid % n
 * - This ensures that apply standard binary search: compare matrix[row][col] with target
 * - This ensures that matrix properties (sorted rows + first element of row > last of previous) enable this
 * - This ensures that o(log(m*n)) time, O(1) space
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
 * ```
 *
 * Step 1: Treat as 1D array
 * rows = 3, cols = 4, total = 12 elements
 * left = 0, right = 11
 * Step 2: Binary search
 * mid = 5: row = 5//4 = 1, col = 5%4 = 1
 *
 * Steps:
 * Step 1: matrix[1][1] = 11 > 3, right = 4
 * Step 2: mid = 2: row = 2//4 = 0, col = 2%4 = 2
 * Step 3: matrix[0][2] = 5 > 3, right = 1
 * Step 4: mid = 0: row = 0//4 = 0, col = 0%4 = 0
 * Step 5: matrix[0][0] = 1 < 3, left = 1
 * Step 6: mid = 1: row = 1//4 = 0, col = 1%4 = 1
 * Step 7: matrix[0][1] = 3 == 3 ✓
 *
 * Output:
 * ```
 * True (target found)
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
  searchMatrix(matrix: number[][], target: number): boolean {
    if (matrix.length === 0 || matrix[0].length === 0) return false;

    const m = matrix.length;
    const n = matrix[0].length;
    let left = 0;
    let right = m * n - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const row = Math.floor(mid / n);
      const col = mid % n;
      const value = matrix[row][col];

      if (value === target) {
        return true;
      } else if (value < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return false;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(
    `Test 1: ${solution.searchMatrix([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 3) === true ? "PASS" : "FAIL"}`
  );
  console.log(
    `Test 2: ${solution.searchMatrix([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 13) === false ? "PASS" : "FAIL"}`
  );
  console.log(`Test 3: ${solution.searchMatrix([[1]], 1) === true ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
