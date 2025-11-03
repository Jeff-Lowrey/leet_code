/**
### INTUITION:
Adding binary numbers is similar to adding decimal numbers, but we work with base 2
instead of base 10. We process digits from right to left, maintaining a carry bit.
When two 1s are added, the result is 0 with a carry of 1. This is a classic simulation
problem that mimics manual binary addition.

### APPROACH:
1. **Initialize Pointers**: Start from the end of both strings (rightmost digits)
2. **Track Carry**: Initialize carry to 0
3. **Process Digits Right to Left**:
   - Get current digit from each string (0 if exhausted)
   - Calculate sum = digit_a + digit_b + carry
   - Current bit = sum % 2
   - New carry = sum // 2
4. **Build Result**: Prepend each bit to result string
5. **Handle Final Carry**: Add carry if non-zero after all digits processed

### WHY THIS WORKS:
- Binary addition follows same principle as decimal: digit-by-digit with carry
- Processing right to left handles varying string lengths naturally
- Using modulo and division correctly splits sum into bit and carry
- Building result from right to left matches addition order

### EXAMPLE WALKTHROUGH:
Input:
```
a = "1010", b = "1011"
```

Process from right to left:
Position 3: 0 + 1 + carry(0) = 1, carry = 0
Result: "1"
Position 2: 1 + 1 + carry(0) = 2 (10 in binary)
Bit: 2 % 2 = 0, carry = 2 // 2 = 1
Result: "01"
Position 1: 0 + 0 + carry(1) = 1, carry = 0
Result: "101"
Position 0: 1 + 1 + carry(0) = 2 (10 in binary)
Bit: 2 % 2 = 0, carry = 2 // 2 = 1
Result: "0101"
Final carry: 1
Result: "10101"

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
O(max(m, n)**)
- m and n are lengths of input strings
- Process each digit once
- Building result string is **O(max(m, n)**)

### SPACE COMPLEXITY:
O(max(m, n)**)
- Result string length is at most max(m, n) + 1
- Additional variables use **O(1)** space

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

*/

/**
 * Main solution for Problem 67: Add Binary
 *
 * @param {string} a - First binary string
 * @param {string} b - Second binary string
 * @return {string} - Sum as binary string
 *
 * Time Complexity: O(max(m, n))
 * Space Complexity: O(max(m, n))
 */
function solve(a, b) {
  let result = "";
  let carry = 0;
  let i = a.length - 1;
  let j = b.length - 1;

  // Process both strings from right to left
  while (i >= 0 || j >= 0 || carry > 0) {
    // Get current digits (0 if we've exhausted the string)
    const digitA = i >= 0 ? parseInt(a[i]) : 0;
    const digitB = j >= 0 ? parseInt(b[j]) : 0;

    // Calculate sum and new carry
    const sum = digitA + digitB + carry;
    result = (sum % 2) + result;
    carry = Math.floor(sum / 2);

    i--;
    j--;
  }

  return result;
}

/**
 * Test cases for Problem 67: Add Binary
 */
function testSolution() {
  console.log("Testing 67. Add Binary");

  // Test case 1: Basic addition
  const result1 = solve("11", "1");
  const expected1 = "100";
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Equal length strings
  const result2 = solve("1010", "1011");
  const expected2 = "10101";
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Adding zeros
  const result3 = solve("0", "0");
  const expected3 = "0";
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Different lengths
  const result4 = solve("1111", "1");
  const expected4 = "10000";
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Single digits
  const result5 = solve("1", "1");
  const expected5 = "10";
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  console.log("All test cases passed for 67. Add Binary!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 67. Add Binary ===");
  console.log("Category: String Manipulation");
  console.log("Difficulty: Easy");
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
 * - This solution focuses on string manipulation concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
