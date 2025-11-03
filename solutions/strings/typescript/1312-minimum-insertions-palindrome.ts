/**
### INTUITION:
To make a string palindromic with minimum insertions, we need to find the longest palindromic subsequence (LPS) first. The minimum insertions needed equals the string length minus the LPS length, because we only need to insert characters to match the "missing" ones.

### APPROACH:
1. **Find Longest Palindromic Subsequence**: Use DP to find the longest subsequence that reads the same forwards and backwards
2. **Calculate Insertions**: minimum insertions = string length - LPS length
3. **DP Recurrence**:
   - If characters match: `dp[i][j] = dp[i+1][j-1] + 2`
   - If not: `dp[i][j] = max(dp[i+1][j], dp[i][j-1])`

### WHY THIS WORKS:
The LPS represents the "skeleton" of characters we can keep without insertion. All other characters need to be "mirrored" by insertions. For example, in "mbadm", LPS is "mam" (length 3), so we need 5-3=2 insertions.

### EXAMPLE WALKTHROUGH:
Input:
```
s = "mbadm"
```

Steps:
Step 1: Find longest palindromic subsequence (LPS) using DP
Step 2: LPS of "mbadm" → "mam" (length 3)
Step 3: Minimum insertions = length of string - LPS length
Step 4: Result → 5 - 3 = 2 insertions needed

Output:
```
2
```

### TIME COMPLEXITY:
O(n²)**
- Nested iteration through input
- Filling n×n DP table with constant work per cell

### SPACE COMPLEXITY:
O(n²)**
- DP table storage, can be optimized to **O(n)**

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

*/

class Solution {
  /**
   * Find minimum insertions using Dynamic Programming.
   *
   * Time Complexity: O(n²)
   * Space Complexity: O(n²)
   */
  minInsertions(s: string): number {
    const n = s.length;
    const dp: number[][] = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
      dp[i][i] = 1;
    }

    for (let length = 2; length <= n; length++) {
      for (let i = 0; i <= n - length; i++) {
        const j = i + length - 1;

        if (s[i] === s[j]) {
          dp[i][j] = dp[i + 1][j - 1] + 2;
        } else {
          dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
        }
      }
    }

    return n - dp[0][n - 1];
  }

  /**
   * Alternative direct DP approach.
   *
   * Time Complexity: O(n²)
   * Space Complexity: O(n²)
   */
  minInsertionsDirect(s: string): number {
    const n = s.length;
    const dp: number[][] = Array.from({ length: n }, () => Array(n).fill(0));

    for (let length = 2; length <= n; length++) {
      for (let i = 0; i <= n - length; i++) {
        const j = i + length - 1;

        if (s[i] === s[j]) {
          dp[i][j] = dp[i + 1][j - 1];
        } else {
          dp[i][j] = 1 + Math.min(dp[i + 1][j], dp[i][j - 1]);
        }
      }
    }

    return dp[0][n - 1];
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.minInsertions("zzazz") === 0 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.minInsertions("mbadm") === 2 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.minInsertions("leetcode") === 5 ? "PASS" : "FAIL"}`);
  console.log(`Test 4: ${solution.minInsertions("a") === 0 ? "PASS" : "FAIL"}`);
  console.log(`Test 5: ${solution.minInsertions("ab") === 1 ? "PASS" : "FAIL"}`);
  console.log(`Test 6: ${solution.minInsertionsDirect("mbadm") === 2 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
