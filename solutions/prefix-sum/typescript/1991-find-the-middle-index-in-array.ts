/**
### INTUITION:
The key insight is that this is a classic prefix sum problem. For any index to be the middle index, the sum of all elements to its left must equal the sum of all elements to its right. We can calculate the total sum first, then iterate through the array tracking the left sum. At each position, we can calculate the right sum as (total - left_sum - current_element).

### APPROACH:
1. **Calculate total sum**: Get sum of entire array
2. **Initialize left sum**: Start with 0 (no elements to the left initially)
3. **Iterate through array**: For each index i:
   - Calculate right sum = total - left_sum - nums[i]
   - If left_sum == right_sum, return i
   - Add nums[i] to left_sum for next iteration
4. **Return -1**: If no middle index found

### WHY THIS WORKS:
- At any index i: total_sum = left_sum + nums[i] + right_sum
- We want: left_sum = right_sum
- Therefore: right_sum = total_sum - left_sum - nums[i]
- By maintaining running left_sum, we can check each position in O(1)
- Single pass solution after calculating total sum

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [2,3,-1,8,4]
```

Total sum = 16
Index 0: left=0, right=16-0-2=14, not equal
Index 1: left=2, right=16-2-3=11, not equal
Index 2: left=5, right=16-5-(-1)=12, not equal
Index 3: left=4, right=16-4-8=4, equal! Return 3

Output:
```
[Expected output]
```

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
O(n)**
Two passes: one to calculate total sum, one to find middle index

### SPACE COMPLEXITY:
O(1)**
- Constant extra space
Only using constant extra space for variables

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

*/

class Solution {
  /**
   * Find the leftmost middle index where left sum equals right sum.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  findMiddleIndex(nums: number[]): number {
    const totalSum = nums.reduce((a, b) => a + b, 0);
    let leftSum = 0;

    for (let i = 0; i < nums.length; i++) {
      const rightSum = totalSum - leftSum - nums[i];

      if (leftSum === rightSum) {
        return i;
      }

      leftSum += nums[i];
    }

    return -1;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.findMiddleIndex([2, 3, -1, 8, 4]) === 3 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.findMiddleIndex([1, -1, 4]) === 2 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.findMiddleIndex([2, 5]) === -1 ? "PASS" : "FAIL"}`);
  console.log(`Test 4: ${solution.findMiddleIndex([1]) === 0 ? "PASS" : "FAIL"}`);
  console.log(`Test 5: ${solution.findMiddleIndex([0, 0, 0]) === 0 ? "PASS" : "FAIL"}`);
  console.log(`Test 6: ${solution.findMiddleIndex([1, 2, 1]) === 1 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
