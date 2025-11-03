/**
### INTUITION:
The key insight is that use prefix sum with modulo arithmetic. If two prefix sums have the same remainder
when divided by k, the subarray between them is divisible by k. Track remainders
in a hash map with their earliest index to ensure subarray length ≥ 2.

### APPROACH:
1. **Hash Map**: Store (remainder → earliest_index) pairs
2. **Prefix Sum**: Calculate cumulative sum modulo k
3. **Check**: If same remainder seen before and distance ≥ 2, return true
4. **Edge Cases**: Handle k=0, negative remainders with modulo normalization

### WHY THIS WORKS:
If prefix_sum[i] % k == prefix_sum[j] % k, then sum(nums[i+1:j+1]) % k == 0.
By storing earliest occurrence of each remainder, we maximize subarray length.

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [23,2,4,6,7], k = 6
```

Prefix sums: [23, 25, 29, 35, 42]
Modulos: [5, 1, 5, 5, 0]
At index 0: remainder 5, store {5: 0}
At index 1: remainder 1, store {5: 0, 1: 1}

Steps:
Step 1: At index 2: remainder 5, seen at index 0, distance = 2 → return true

Output:
```
return true
```

### TIME COMPLEXITY:
O(n)**
- Single pass through input

### SPACE COMPLEXITY:
O(min(n, k)**) - hash map storage

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

*/

class Solution {
  /**
   * Prefix sum with hash map tracking remainders.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(min(n, k))
   */
  checkSubarraySum(nums: number[], k: number): boolean {
    const remainderMap: Map<number, number> = new Map([[0, -1]]);
    let prefixSum = 0;

    for (let i = 0; i < nums.length; i++) {
      prefixSum += nums[i];

      const remainder = k !== 0 ? prefixSum % k : prefixSum;

      if (remainderMap.has(remainder)) {
        if (i - remainderMap.get(remainder)! >= 2) {
          return true;
        }
      } else {
        remainderMap.set(remainder, i);
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

  console.log(`Test 1: ${solution.checkSubarraySum([23, 2, 4, 6, 7], 6) === true ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.checkSubarraySum([23, 2, 6, 4, 7], 6) === true ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.checkSubarraySum([23, 2, 6, 4, 7], 13) === false ? "PASS" : "FAIL"}`);
  console.log(`Test 4: ${solution.checkSubarraySum([1, 2, 3], 6) === true ? "PASS" : "FAIL"}`);
  console.log(`Test 5: ${solution.checkSubarraySum([5, 0, 0, 0], 3) === true ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
