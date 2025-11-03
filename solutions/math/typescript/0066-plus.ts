/**
### INTUITION:
The key insight is that start from rightmost digit. Add 1 to it. Handle carry by propagating to next digit. If all digits are 9, result will need an extra digit at the front.

### APPROACH:
1. **Initialize carry**: Set carry = 1 (we're adding 1)
2. **Iterate from right**: Loop through digits from right to left
3. **Add carry to digit**: digit = digits[i] + carry
4. **Update digit and carry**: digits[i] = digit % 10, carry = digit // 10
5. **Handle carry**: If carry is 0, break early
6. **Handle leading carry**: If carry still 1 after loop, insert 1 at beginning
7. **Return result**: Return modified digits array

### WHY THIS WORKS:
- This ensures that iterate from right to left adding 1, track carry
- This ensures that if digit < 9, increment and return (no carry propagation)
- This ensures that if digit == 9, set to 0 and continue (carry propagates)
- This ensures that if carry after loop, prepend 1 to result (e.g., 99 + 1 = 100)
- This ensures that o(n) time single pass, O(n) space for result array

### EXAMPLE WALKTHROUGH:
Input:
```
digits = [1,2,3]
```

Step 1: Add 1 from rightmost
digits[2] = 3+1 = 4, no carry
Example with carry: [9,9,9]

Steps:
Step 1: digits[2] = 9+1 = 10 → 0, carry=1
Step 2: digits[1] = 9+1 = 10 → 0, carry=1
Step 3: digits[0] = 9+1 = 10 → 0, carry=1
Step 4: Insert 1 at front

Output:
```
[1,2,4]
[1,0,0,0]
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
  plusOne(digits: number[]): number[] {
    for (let i = digits.length - 1; i >= 0; i--) {
      if (digits[i] < 9) {
        digits[i]++;
        return digits;
      }
      digits[i] = 0;
    }

    return [1, ...digits];
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.plusOne([1, 2, 3]);
  console.log(`Test 1: ${JSON.stringify(result1) === JSON.stringify([1, 2, 4]) ? "PASS" : "FAIL"}`);

  const result2 = solution.plusOne([9, 9, 9]);
  console.log(`Test 2: ${JSON.stringify(result2) === JSON.stringify([1, 0, 0, 0]) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
