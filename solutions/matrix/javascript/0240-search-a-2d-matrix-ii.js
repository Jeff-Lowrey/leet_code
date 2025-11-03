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

*/

/**
 * Main solution for Problem 240: Search a 2D Matrix II
 *
 * @param {number[][]} matrix - m x n matrix sorted in ascending order (rows and columns)
 * @param {number} target - Target value to search for
 * @return {boolean} - True if target is found
 *
 * Time Complexity: O(m + n) - worst case eliminate one row or column per iteration
 * Space Complexity: O(1) - constant space
 */
function solve(matrix, target) {
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
    return false;
  }

  const m = matrix.length;
  const n = matrix[0].length;

  // Start from top-right corner
  let row = 0;
  let col = n - 1;

  while (row < m && col >= 0) {
    const current = matrix[row][col];

    if (current === target) {
      return true;
    } else if (current > target) {
      // Current value is too large, move left (eliminate column)
      col--;
    } else {
      // Current value is too small, move down (eliminate row)
      row++;
    }
  }

  return false;
}

/**
 * Test cases for Problem 240: Search a 2D Matrix II
 */
function testSolution() {
  console.log("Testing 240. Search a 2D Matrix II");

  // Test case 1: Target exists in matrix
  const matrix1 = [
    [1, 4, 7, 11, 15],
    [2, 5, 8, 12, 19],
    [3, 6, 9, 16, 22],
    [10, 13, 14, 17, 24],
    [18, 21, 23, 26, 30],
  ];
  console.assert(
    solve(matrix1, 5) === true,
    "Test 1 failed: 5 should be found",
  );
  console.assert(
    solve(matrix1, 20) === false,
    "Test 2 failed: 20 should not be found",
  );

  // Test case 2: Target at corners
  console.assert(
    solve(matrix1, 1) === true,
    "Test 3 failed: 1 (top-left) should be found",
  );
  console.assert(
    solve(matrix1, 30) === true,
    "Test 4 failed: 30 (bottom-right) should be found",
  );
  console.assert(
    solve(matrix1, 15) === true,
    "Test 5 failed: 15 (top-right) should be found",
  );
  console.assert(
    solve(matrix1, 18) === true,
    "Test 6 failed: 18 (bottom-left) should be found",
  );

  // Test case 3: Single element matrix
  const matrix2 = [[5]];
  console.assert(
    solve(matrix2, 5) === true,
    "Test 7 failed: single element match",
  );
  console.assert(
    solve(matrix2, 1) === false,
    "Test 8 failed: single element no match",
  );

  // Test case 4: Single row
  const matrix3 = [[1, 3, 5, 7, 9]];
  console.assert(solve(matrix3, 3) === true, "Test 9 failed: single row match");
  console.assert(
    solve(matrix3, 4) === false,
    "Test 10 failed: single row no match",
  );

  // Test case 5: Single column
  const matrix4 = [[2], [4], [6], [8]];
  console.assert(
    solve(matrix4, 6) === true,
    "Test 11 failed: single column match",
  );
  console.assert(
    solve(matrix4, 5) === false,
    "Test 12 failed: single column no match",
  );

  // Test case 6: Empty matrix
  console.assert(solve([], 1) === false, "Test 13 failed: empty matrix");

  console.log("All test cases passed for 240. Search a 2D Matrix II!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 240. Search A 2D Matrix Ii ===");
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
