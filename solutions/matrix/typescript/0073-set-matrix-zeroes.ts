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

</details>

*/

class Solution {
  /**
   * Set matrix zeroes using O(1) space.
   *
   * Time Complexity: O(m × n)
   * Space Complexity: O(1)
   */
  setZeroes(matrix: number[][]): void {
    if (!matrix || !matrix[0]) {
      return;
    }

    const m = matrix.length;
    const n = matrix[0].length;

    let firstRowZero = false;
    let firstColZero = false;

    for (let j = 0; j < n; j++) {
      if (matrix[0][j] === 0) {
        firstRowZero = true;
        break;
      }
    }

    for (let i = 0; i < m; i++) {
      if (matrix[i][0] === 0) {
        firstColZero = true;
        break;
      }
    }

    for (let i = 1; i < m; i++) {
      for (let j = 1; j < n; j++) {
        if (matrix[i][j] === 0) {
          matrix[i][0] = 0;
          matrix[0][j] = 0;
        }
      }
    }

    for (let i = 1; i < m; i++) {
      for (let j = 1; j < n; j++) {
        if (matrix[i][0] === 0 || matrix[0][j] === 0) {
          matrix[i][j] = 0;
        }
      }
    }

    if (firstRowZero) {
      for (let j = 0; j < n; j++) {
        matrix[0][j] = 0;
      }
    }

    if (firstColZero) {
      for (let i = 0; i < m; i++) {
        matrix[i][0] = 0;
      }
    }
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const matrix1 = [[1, 1, 1], [1, 0, 1], [1, 1, 1]];
  solution.setZeroes(matrix1);
  const expected1 = [[1, 0, 1], [0, 0, 0], [1, 0, 1]];
  console.log(`Test 1: ${JSON.stringify(matrix1) === JSON.stringify(expected1) ? "PASS" : "FAIL"}`);

  const matrix2 = [[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]];
  solution.setZeroes(matrix2);
  const expected2 = [[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]];
  console.log(`Test 2: ${JSON.stringify(matrix2) === JSON.stringify(expected2) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
