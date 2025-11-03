/**
### INTUITION:
Start from top-right (or bottom-left) corner. From top-right, we can eliminate either the current row (if target < current) or current column (if target > current). This is like a binary search tree where we can navigate efficiently.

### APPROACH:
1. **Start from top-right corner** (row=0, col=n-1)
2. **Compare target with current element**:
   - If equal: return True
   - If target < current: move left (eliminate column)
   - If target > current: move down (eliminate row)
3. **Continue** until found or out of bounds

### WHY THIS WORKS:
- This ensures that from top-right: all elements below are larger, all elements left are smaller
- This ensures that each comparison eliminates an entire row or column
- This ensures that similar to searching in a BST where current node's left < node < right

### EXAMPLE WALKTHROUGH:
Input:
```
Matrix:
```

[1,  4,  7,  11, 15]
[2,  5,  8,  12, 19]
[3,  6,  9,  16, 22]
[10, 13, 14, 17, 24]
[18, 21, 23, 26, 30]
Search for 5:
Start at (0,4)=15: 5<15, go left
At (0,3)=11: 5<11, go left
At (0,2)=7: 5<7, go left
At (0,1)=4: 5>4, go down
At (1,1)=5: Found! Return True

Output:
```
[Expected output]
```

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
O(m + n)**
At most m+n steps (eliminate one row or column per step)

### SPACE COMPLEXITY:
O(1)**
- Constant extra space
Only using constant extra space for pointers

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

*/

class Solution {
  /**
   * Search from top-right corner.
   *
   * Time Complexity: O(m + n)
   * Space Complexity: O(1)
   */
  searchMatrix(matrix: number[][], target: number): boolean {
    if (!matrix || !matrix[0]) {
      return false;
    }

    const m = matrix.length;
    const n = matrix[0].length;

    let row = 0;
    let col = n - 1;

    while (row < m && col >= 0) {
      const current = matrix[row][col];

      if (current === target) {
        return true;
      } else if (current > target) {
        col--;
      } else {
        row++;
      }
    }

    return false;
  }

  /**
   * Alternative: search from bottom-left corner.
   *
   * Time Complexity: O(m + n)
   * Space Complexity: O(1)
   */
  searchMatrixBottomLeft(matrix: number[][], target: number): boolean {
    if (!matrix || !matrix[0]) {
      return false;
    }

    const m = matrix.length;
    const n = matrix[0].length;

    let row = m - 1;
    let col = 0;

    while (row >= 0 && col < n) {
      const current = matrix[row][col];

      if (current === target) {
        return true;
      } else if (current > target) {
        row--;
      } else {
        col++;
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

  const matrix1 = [
    [1, 4, 7, 11, 15],
    [2, 5, 8, 12, 19],
    [3, 6, 9, 16, 22],
    [10, 13, 14, 17, 24],
    [18, 21, 23, 26, 30]
  ];

  console.log(`Test 1: ${solution.searchMatrix(matrix1, 5) === true ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.searchMatrix(matrix1, 20) === false ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.searchMatrixBottomLeft(matrix1, 5) === true ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
