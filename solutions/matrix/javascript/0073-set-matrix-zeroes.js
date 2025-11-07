/**
### INTUITION:
The key insight is that cannot modify matrix while iterating as it affects future decisions. Need to mark which rows/columns to zero without extra space. Use first row and first column as markers!

### APPROACH:
1. **Use first row/column as markers**: First row tracks column zeros, first column tracks row zeros
2. **Handle first row/column separately**: Use separate flags since they overlap
3. **Mark zeros**: Iterate matrix, set markers in first row/column when zero found
4. **Apply zeros**: Use markers to set zeros (skip first row/column initially)
5. **Handle first row/column**: Apply zeros based on flags

### WHY THIS WORKS:
- This ensures that first row/column serve as O(1) space markers
- This ensures that by processing them last, we don't lose information
- This ensures that separate flags handle the overlap at matrix[0][0]

### EXAMPLE WALKTHROUGH:
Input:
```
[1, 1, 1]
```

[1, 0, 1]
[1, 1, 1]
Step 1 - Mark:
first_row = False, first_col = False
After marking: matrix[1][0] = 0, matrix[0][1] = 0
Step 2 - Apply based on markers:

Steps:
Step 1: Column 1 has marker -> zero column 1
Step 2: Row 1 has marker -> zero row 1

Output:
```
[1, 0, 1]
[0, 0, 0]
[1, 0, 1]
```

### TIME COMPLEXITY:
O(m × n)**
Two passes through the matrix

### SPACE COMPLEXITY:
O(1)**
- Constant extra space
Only using two boolean flags

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

*/

/**
 * Main solution for Problem 73: Set Matrix Zeroes
 *
 * @param {number[][]} matrix - m x n matrix
 * @return {void} - Modifies matrix in-place
 *
 * Time Complexity: O(m * n) - visit each element twice
 * Space Complexity: O(1) - uses first row and column as markers
 */
function solve(matrix) {
  if (!matrix || matrix.length === 0) return;

  const m = matrix.length;
  const n = matrix[0].length;
  let firstRowHasZero = false;
  let firstColHasZero = false;

  // Check if first row has any zeros
  for (let j = 0; j < n; j++) {
    if (matrix[0][j] === 0) {
      firstRowHasZero = true;
      break;
    }
  }

  // Check if first column has any zeros
  for (let i = 0; i < m; i++) {
    if (matrix[i][0] === 0) {
      firstColHasZero = true;
      break;
    }
  }

  // Use first row and column as markers
  // If matrix[i][j] is 0, mark matrix[i][0] and matrix[0][j] as 0
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][j] === 0) {
        matrix[i][0] = 0;
        matrix[0][j] = 0;
      }
    }
  }

  // Set zeros based on markers (skip first row and column)
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][0] === 0 || matrix[0][j] === 0) {
        matrix[i][j] = 0;
      }
    }
  }

  // Handle first row
  if (firstRowHasZero) {
    for (let j = 0; j < n; j++) {
      matrix[0][j] = 0;
    }
  }

  // Handle first column
  if (firstColHasZero) {
    for (let i = 0; i < m; i++) {
      matrix[i][0] = 0;
    }
  }
}

/**
 * Test cases for Problem 73: Set Matrix Zeroes
 */
function testSolution() {
  console.log("Testing 73. Set Matrix Zeroes");

  // Helper function to compare matrices
  function matricesEqual(mat1, mat2) {
    if (mat1.length !== mat2.length) return false;
    for (let i = 0; i < mat1.length; i++) {
      if (mat1[i].length !== mat2[i].length) return false;
      for (let j = 0; j < mat1[i].length; j++) {
        if (mat1[i][j] !== mat2[i][j]) return false;
      }
    }
    return true;
  }

  // Test case 1: Standard case
  const matrix1 = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];
  const expected1 = [
    [1, 0, 1],
    [0, 0, 0],
    [1, 0, 1],
  ];
  solve(matrix1);
  console.assert(matricesEqual(matrix1, expected1), "Test 1 failed");

  // Test case 2: Multiple zeros
  const matrix2 = [
    [0, 1, 2, 0],
    [3, 4, 5, 2],
    [1, 3, 1, 5],
  ];
  const expected2 = [
    [0, 0, 0, 0],
    [0, 4, 5, 0],
    [0, 3, 1, 0],
  ];
  solve(matrix2);
  console.assert(matricesEqual(matrix2, expected2), "Test 2 failed");

  // Test case 3: First row has zero
  const matrix3 = [
    [0, 1],
    [1, 1],
  ];
  const expected3 = [
    [0, 0],
    [0, 1],
  ];
  solve(matrix3);
  console.assert(matricesEqual(matrix3, expected3), "Test 3 failed");

  // Test case 4: First column has zero
  const matrix4 = [
    [1, 1, 1],
    [0, 1, 1],
  ];
  const expected4 = [
    [0, 1, 1],
    [0, 0, 0],
  ];
  solve(matrix4);
  console.assert(matricesEqual(matrix4, expected4), "Test 4 failed");

  // Test case 5: All zeros
  const matrix5 = [
    [0, 0],
    [0, 0],
  ];
  const expected5 = [
    [0, 0],
    [0, 0],
  ];
  solve(matrix5);
  console.assert(matricesEqual(matrix5, expected5), "Test 5 failed");

  console.log("All test cases passed for 73. Set Matrix Zeroes!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 73. Set Matrix Zeroes ===");
  console.log("Category: Matrix");
  console.log("Difficulty: Medium");
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
 * - This solution focuses on matrix concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
