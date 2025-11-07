/**
### INTUITION:
In a Toeplitz matrix, each diagonal going from top-left to bottom-right contains
identical elements. A key observation: element at (i,j) should equal element at (i+1,j+1).
We can check this property for all valid positions.

### APPROACH:
1. **Simple Check**: For each cell (i,j), compare with (i+1,j+1)
2. **Skip Last Row and Column**: They have no cells to compare with
3. **Early Exit**: Return false as soon as mismatch found
4. **Return True**: If all checks pass

Key Insight**: Diagonal property
- All elements on same diagonal have property: row - col = constant
- Simpler: matrix[i][j] == matrix[i+1][j+1] for all valid (i,j)

### WHY THIS WORKS:
- If (i,j) == (i+1,j+1) for all cells, then entire diagonals match
- Transitive property: if a==b and b==c, then a==c
- Checking adjacent cells on diagonal ensures entire diagonal is same

### EXAMPLE WALKTHROUGH:
Input:
```
matrix = [[1,2,3,4],
```

[5,1,2,3],
[9,5,1,2]]
Check (0,0)==(1,1): 1==1 ✓
Check (0,1)==(1,2): 2==2 ✓
Check (0,2)==(1,3): 3==3 ✓
Check (1,0)==(2,1): 5==5 ✓
Check (1,1)==(2,2): 1==1 ✓
Check (1,2)==(2,3): 2==2 ✓

Steps:
Step 1: All checks pass → True

Output:
```
True
```

### TIME COMPLEXITY:
O(m × n)**
- Check each cell once (except last row and column)

### SPACE COMPLEXITY:
O(1)**
- Constant extra space
- Only use constant extra space

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

*/

class Solution {
  isToeplitzMatrix(matrix: number[][]): boolean {
    const m = matrix.length;
    const n = matrix[0].length;

    for (let i = 0; i < m - 1; i++) {
      for (let j = 0; j < n - 1; j++) {
        if (matrix[i][j] !== matrix[i + 1][j + 1]) {
          return false;
        }
      }
    }

    return true;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.isToeplitzMatrix([
    [1, 2, 3, 4],
    [5, 1, 2, 3],
    [9, 5, 1, 2],
  ]);
  console.log(`Test 1: ${result1 === true ? "PASS" : "FAIL"}`);

  const result2 = solution.isToeplitzMatrix([
    [1, 2],
    [2, 2],
  ]);
  console.log(`Test 2: ${result2 === false ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
