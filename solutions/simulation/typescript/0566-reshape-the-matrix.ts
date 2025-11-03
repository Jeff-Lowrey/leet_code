/**
### INTUITION:
The key insight is that reshape is only possible if the total number of elements remains the same.
Flatten the matrix conceptually, then redistribute elements into new dimensions.
Use division and modulo to convert between 1D and 2D indices.

### APPROACH:
1. **Validation**: Check if m × n = r × c (same total elements)
2. **If Invalid**: Return original matrix
3. **If Valid**: Map elements using index conversion
   - 1D index: idx = i * n + j
   - 2D position in new matrix: row = idx // c, col = idx % c
4. **Fill Result**: Place each element at its new position

Key Insight**: Index mapping
- Every element can be identified by a linear index (0 to total-1)
- This linear index maps to different 2D coordinates in different shapes

### WHY THIS WORKS:
- This ensures that row-major order is preserved when we use sequential indexing
- This ensures that division gives the row position in new matrix
- This ensures that modulo gives the column position in new matrix
- This ensures that this naturally handles the reshape transformation

### EXAMPLE WALKTHROUGH:
Input:
```
mat = [[1,2],[3,4]], r = 1, c = 4
```

Original shape: 2×2, New shape: 1×4
Total elements: 4 = 4 ✓ (valid)
Mapping to 1×4:

Steps:
Step 1: Linear indices: [0,1,2,3] → [1,2,3,4]
Step 2: - idx 0: row = 0//4 = 0, col = 0%4 = 0 → result[0][0] = 1
Step 3: - idx 1: row = 1//4 = 0, col = 1%4 = 1 → result[0][1] = 2
Step 4: - idx 2: row = 2//4 = 0, col = 2%4 = 2 → result[0][2] = 3
Step 5: - idx 3: row = 3//4 = 0, col = 3%4 = 3 → result[0][3] = 4
Step 6: Result: [[1,2,3,4]]

Output:
```
[[1,2,3,4]]
```

### TIME COMPLEXITY:
O(m × n)**
- Must process each element once

### SPACE COMPLEXITY:
O(r × c)**
- Need to store the reshaped matrix (same size as original)

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

*/

class Solution {
  matrixReshape(mat: number[][], r: number, c: number): number[][] {
    const m = mat.length;
    const n = mat[0].length;

    if (m * n !== r * c) {
      return mat;
    }

    const result: number[][] = Array(r)
      .fill(0)
      .map(() => Array(c).fill(0));

    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        const idx = i * n + j;
        const newRow = Math.floor(idx / c);
        const newCol = idx % c;
        result[newRow][newCol] = mat[i][j];
      }
    }

    return result;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.matrixReshape(
    [
      [1, 2],
      [3, 4],
    ],
    1,
    4
  );
  console.log(
    `Test 1: ${JSON.stringify(result1) === JSON.stringify([[1, 2, 3, 4]]) ? "PASS" : "FAIL"}`
  );

  const result2 = solution.matrixReshape(
    [
      [1, 2],
      [3, 4],
    ],
    2,
    4
  );
  console.log(
    `Test 2: ${
      JSON.stringify(result2) ===
      JSON.stringify([
        [1, 2],
        [3, 4],
      ])
        ? "PASS"
        : "FAIL"
    }`
  );

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
