/**
### INTUITION:
The key insight is that at each house, choose to rob it (take current + best from i-2) or skip it (take best from i-1). dp[i] = max(dp[i-1], nums[i] + dp[i-2]).

### APPROACH:
1. **Handle edge cases**: If empty array return 0, if single house return nums[0]
2. **Initialize variables**: Set prev2 = 0 (two houses back), prev1 = 0 (one house back)
3. **Iterate through houses**: For each house value in nums
4. **Calculate max at current**: temp = max(prev1, prev2 + current_house)
5. **Decide rob or skip**: Either skip current (keep prev1) or rob current (prev2 + current)
6. **Update variables**: Set prev2 = prev1, prev1 = temp for next iteration
7. **Return result**: Return prev1 as maximum money that can be robbed

### WHY THIS WORKS:
- This ensures that dP recurrence: max(rob current + best from i-2, skip current and take best from i-1)
- This ensures that can't rob adjacent houses, so robbing house i means using result from i-2
- This ensures that optimal substructure: solution to i depends only on i-1 and i-2
- This ensures that space optimization: only need last two values, not entire DP array
- This ensures that o(n) time single pass, O(1) space with two variables instead of array

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [2,7,9,3,1]
```

Step 1: Build DP table
dp[0] = 2 (rob house 0)
dp[1] = max(2, 7) = 7 (rob house 1)
dp[2] = max(7, 2+9) = 11 (rob houses 0,2)
dp[3] = max(11, 7+3) = 11 (keep houses 0,2)
dp[4] = max(11, 11+1) = 12 (rob houses 0,2,4)
Step 2: Optimal solution
Rob houses at indices 0, 2, 4
Total: 2 + 9 + 1 = 12

Output:
```
12 (maximum money)
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
  rob(nums: number[]): number {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];

    let prev = 0;
    let curr = 0;

    for (const num of nums) {
      const temp = curr;
      curr = Math.max(curr, prev + num);
      prev = temp;
    }

    return curr;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.rob([1, 2, 3, 1]) === 4 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.rob([2, 7, 9, 3, 1]) === 12 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.rob([2, 1, 1, 2]) === 4 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
