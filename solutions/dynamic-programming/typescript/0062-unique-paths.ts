/**
### INTUITION:
The key insight is that paths to cell (i,j) = paths to (i-1,j) + paths to (i,j-1). Build bottom-up from top-left. Base case: first row and column each have only 1 path.

### APPROACH:
1. **Initialize DP table**: Create 2D array dp[m][n] where dp[i][j] = number of paths to cell (i,j)
2. **Set base cases**: Fill first row and first column with 1 (only one way to reach each)
3. **Apply recurrence relation**: For each cell dp[i][j] = dp[i-1][j] + dp[i][j-1]
4. **Build bottom-up**: Iterate through rows and columns, computing paths from top-left
5. **Sum incoming paths**: Each cell's count equals sum of paths from cell above and cell to left
6. **Continue to bottom-right**: Fill entire table until reaching dp[m-1][n-1]
7. **Return result**: Return dp[m-1][n-1] as total unique paths to bottom-right corner

### WHY THIS WORKS:
- This ensures that dP: paths to (i,j) = paths to (i-1,j) + paths to (i,j-1)
- This ensures that base case: dp[0][j] = dp[i][0] = 1 (only one path along edges)
- This ensures that space optimization: only need previous row, not entire 2D array
- This ensures that combinatorics alternative: C(m+n-2, m-1) paths total
- This ensures that o(m*n) time, O(n) space with optimized 1D DP

### EXAMPLE WALKTHROUGH:
Input:
```
m = 3, n = 2 (3 rows, 2 columns)
```

Step 1: Create DP table
dp[i][j] = number of paths to reach cell (i,j)
dp = [[1, 1],
[1, 2],
[1, 3]]
Step 2: Fill table using dp[i][j] = dp[i-1][j] + dp[i][j-1]
dp[0][0] = 1 (starting point)
dp[0][1] = 1 (can only go right)
dp[1][0] = 1 (can only go down)
dp[1][1] = dp[0][1] + dp[1][0] = 1 + 1 = 2
dp[2][0] = 1
dp[2][1] = dp[1][1] + dp[2][0] = 2 + 1 = 3

Output:
```
3 (number of unique paths)
```

### TIME COMPLEXITY:
O(n)**
- Single pass through input

### SPACE COMPLEXITY:
O(1)**
- Constant extra space

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

*/

class Solution {
  uniquePaths(m: number, n: number): number {
    const dp = Array(m)
      .fill(0)
      .map(() => Array(n).fill(1));

    for (let i = 1; i < m; i++) {
      for (let j = 1; j < n; j++) {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      }
    }

    return dp[m - 1][n - 1];
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.uniquePaths(3, 7) === 28 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.uniquePaths(3, 2) === 3 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.uniquePaths(7, 3) === 28 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
