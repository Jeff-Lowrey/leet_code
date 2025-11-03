/**
### INTUITION:
The key insight is that xOR all numbers - pairs cancel leaving x^y. Find any set bit in x^y to distinguish them. Partition numbers by this bit and XOR each partition separately to get x and y.

### APPROACH:
1. **XOR all numbers**: Compute xor_all = 0, then xor_all ^= num for each num (pairs cancel, leaving two singles XORed)
2. **Find differentiating bit**: Find rightmost set bit in xor_all using rightmost_bit = xor_all & (-xor_all)
3. **Partition into groups**: This bit is 1 in one single number and 0 in the other
4. **Initialize two results**: Set num1 = 0, num2 = 0 to accumulate XORs for each group
5. **Separate by bit**: For each num, if (num & rightmost_bit), add to num1 group, else num2 group
6. **XOR within groups**: XOR all numbers in each group separately (pairs cancel within groups)
7. **Return both singles**: Return [num1, num2] as the two numbers appearing once

### WHY THIS WORKS:
- This ensures that xOR all numbers: duplicates cancel, left with xor = a ^ b
- This ensures that find any set bit in xor (rightmost set bit: xor & -xor)
- This ensures that split numbers into two groups by this bit (one has a, other has b)
- This ensures that xOR each group separately to find a and b
- This ensures that o(n) time: two passes, O(1) space

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [1,2,1,3,2,5]
```

Step 1: XOR all numbers
xor = 1^2^1^3^2^5 = 3^5 = 6 (binary: 110)
Step 2: Find rightmost set bit
rightmost_bit = xor & -xor = 110 & 010 = 010 (bit 1)
Step 3: Partition numbers by rightmost bit

Steps:
Step 1: Group 1 (bit 1 is 0): [1,1,5] → XOR = 5
Step 2: Group 2 (bit 1 is 1): [2,3,2] → XOR = 3

Output:
```
[3, 5] (two single numbers)
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
  singleNumber(nums: number[]): number[] {
    let xorAll = 0;
    for (const num of nums) {
      xorAll ^= num;
    }

    const rightmostBit = xorAll & -xorAll;

    let num1 = 0;
    let num2 = 0;

    for (const num of nums) {
      if (num & rightmostBit) {
        num1 ^= num;
      } else {
        num2 ^= num;
      }
    }

    return [num1, num2];
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.singleNumber([1, 2, 1, 3, 2, 5]);
  const sorted1 = result1.sort((a, b) => a - b);
  console.log(`Test 1: ${JSON.stringify(sorted1) === JSON.stringify([3, 5]) ? "PASS" : "FAIL"}`);

  const result2 = solution.singleNumber([-1, 0]);
  const sorted2 = result2.sort((a, b) => a - b);
  console.log(`Test 2: ${JSON.stringify(sorted2) === JSON.stringify([-1, 0]) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
