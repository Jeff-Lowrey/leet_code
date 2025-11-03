/**
### INTUITION:
This is a classic bit manipulation problem. The key insight is that XOR has special properties:
- a ^ a = 0 (any number XORed with itself is 0)
- a ^ 0 = a (any number XORed with 0 is itself)
- XOR is commutative and associative

So if we XOR all numbers together, the duplicates cancel out, leaving only the single number.

### APPROACH:
1. **Initialize result**: Start with 0
2. **XOR all elements**: XOR each number with the result
3. **Return result**: The final value is the single number

### WHY THIS WORKS:
- Duplicate numbers cancel out: a ^ a = 0
- XOR with 0 preserves the value: a ^ 0 = a
- Order doesn't matter due to commutativity
- All duplicates disappear, leaving only the single number

### EXAMPLE WALKTHROUGH:
Input:
```
[2,2,1]
```

Step 1: result = 0
Step 2: result = 0 ^ 2 = 2
Step 3: result = 2 ^ 2 = 0 (duplicate cancels out)
Step 4: result = 0 ^ 1 = 1

Output:
```
1 (the single number)
```

### TIME COMPLEXITY:
O(n)**
- Single pass with **O(1)** hash lookups
Single pass through the array

### SPACE COMPLEXITY:
O(1)**
- Constant extra space
Only using constant extra space

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

*/

class Solution {
  singleNumber(nums: number[]): number {
    let result = 0;
    for (const num of nums) {
      result ^= num;
    }
    return result;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.singleNumber([2, 2, 1]);
  console.log(`Test 1: ${result1 === 1 ? "PASS" : "FAIL"}`);

  const result2 = solution.singleNumber([4, 1, 2, 1, 2]);
  console.log(`Test 2: ${result2 === 4 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
