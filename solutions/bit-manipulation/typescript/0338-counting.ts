/**
### INTUITION:
The key insight is that for each number, count set bits. Pattern: dp[i] = dp[i >> 1] + (i & 1). The count for i equals count for i/2 plus the last bit of i.

### APPROACH:
1. **Initialize result array**: Create result = [0] * (n + 1) to store counts for 0 to n
2. **Iterate from 1 to n**: Loop with index i from 1 to n
3. **Use recurrence relation**: Set result[i] = result[i >> 1] + (i & 1)
4. **Understand i >> 1**: Right shift removes the rightmost bit, giving count for i//2
5. **Add rightmost bit**: (i & 1) adds 1 if rightmost bit is set, 0 otherwise
6. **Build incrementally**: Each result[i] uses previously computed result[i//2]
7. **Return result**: Return complete result array with counts for all numbers 0 to n

### WHY THIS WORKS:
- This ensures that dP: count[i] = count[i >> 1] + (i & 1)
- This ensures that bit shift right removes last bit, i & 1 checks if last bit is 1
- This ensures that reuse previous results: i >> 1 is already computed
- This ensures that alternatively: count[i] = count[i & (i-1)] + 1 (remove rightmost 1)
- This ensures that o(n) time: each number processed once, O(1) space excluding output

### EXAMPLE WALKTHROUGH:
Input:
```
n = 5
```

Step 1: Count bits for each number from 0 to 5

Steps:
Step 1: 0 = 000 → 0 bits
Step 2: 1 = 001 → 1 bit
Step 3: 2 = 010 → 1 bit
Step 4: 3 = 011 → 2 bits
Step 5: 4 = 100 → 1 bit
Step 6: 5 = 101 → 2 bits
Step 7: DP relation: count[i] = count[i>>1] + (i&1)
Step 8: count[0] = 0
Step 9: count[1] = count[0] + 1 = 1
Step 10: count[2] = count[1] + 0 = 1
Step 11: count[3] = count[1] + 1 = 2
Step 12: count[4] = count[2] + 0 = 1
Step 13: count[5] = count[2] + 1 = 2

Output:
```
[0,1,1,2,1,2]
```

### TIME COMPLEXITY:
O(n)**

- Single pass through the input

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
  countBits(n: number): number[] {
    const result: number[] = new Array(n + 1).fill(0);

    for (let i = 1; i <= n; i++) {
      result[i] = result[i >> 1] + (i & 1);
    }

    return result;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.countBits(2);
  console.log(
    `Test 1: ${JSON.stringify(result1) === JSON.stringify([0, 1, 1]) ? "PASS" : "FAIL"}`
  );

  const result2 = solution.countBits(5);
  console.log(
    `Test 2: ${JSON.stringify(result2) === JSON.stringify([0, 1, 1, 2, 1, 2]) ? "PASS" : "FAIL"}`
  );

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
