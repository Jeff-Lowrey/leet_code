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
Bit % 2 = 0, carry = 2 // 2 = 1
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

</details>

*/

class Solution {
  /**
   * Add two binary strings and return sum as binary string.
   *
   *         Args:
   *             a: First binary string
   *             b: Second binary string
   *
   *         Returns:
   *             Sum as binary string
   *
   *         Time Complexity: O(max(m, n)) where m, n are string lengths
   *         Space Complexity: O(max(m, n)) for result string
   */
  addBinary(a: string, b: string): string {
    // Implementation
    result: list.set(Any, []
    carry = 0
    i, j = a.length - 1, b.length - 1
    while i >= 0 or j >= 0 or carry:
    digit_a = int(a.get(i)) if i >= 0 else 0
    digit_b = int(b.get(j)) if j >= 0 else 0
  }

  /**
   * Using Python's built-in binary conversion.
   *
   *         Args:
   *             a: First binary string
   *             b: Second binary string
   *
   *         Returns:
   *             Sum as binary string
   *
   *         Time Complexity: O(max(m, n))
   *         Space Complexity: O(max(m, n))
   */
  addBinaryBuiltin(a: string, b: string): string {
    // Implementation
    return bin(int(a, 2) + int(b, 2))[2:]
  }

  /**
   * Build result as string (less efficient due to string immutability).
   *
   *         Args:
   *             a: First binary string
   *             b: Second binary string
   *
   *         Returns:
   *             Sum as binary string
   */
  addBinaryString(a: string, b: string): string {
    // Implementation
    result = ""
    carry = 0
    i, j = a.length - 1, b.length - 1
    while i >= 0 or j >= 0 or carry:
    digit_a = int(a.get(i)) if i >= 0 else 0
    digit_b = int(b.get(j)) if j >= 0 else 0
    total = digit_a + digit_b + carry
    result = str(total % 2) + result
  }

  /**
   * Verbose implementation with detailed logic.
   *
   *         Args:
   *             a: First binary string
   *             b: Second binary string
   *
   *         Returns:
   *             Sum as binary string
   */
  addBinaryVerbose(a: string, b: string): string {
    // Implementation
    max_len = max(a.length, b.length)
    a = a.zfill(max_len)
    b = b.zfill(max_len)
    result = []
    carry = 0
    for (let i = 0; i < max_len - 1, -1, -1; i++) {
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  test_solution()
  # Example usage
  solution = Solution()
  console.log("=== 67. Add Binary ===")
  test_cases = [("11", "1"), ("1010", "1011"), ("0", "0"), ("1", "1"), ("1111", "1111"), ("100", "110010")]
  for a, b in test_cases:
  result = solution.addBinary(a, b)
  console.log(`  {a:>8}`)
  console.log(`+ {b:>8}`)
  console.log(`= {result:>8}`)
  print()
  # Demonstrate the algorithm
  console.log("Step-by-step for '1010' + '1011':")
  console.log("Position 3: 0 + 1 + carry(0) = 1, carry=0 → '1'")
  console.log("Position 2: 1 + 1 + carry(0) = 2, carry=1 → '0'")
  console.log("Position 1: 0 + 0 + carry(1) = 1, carry=0 → '1'")
  console.log("Position 0: 1 + 1 + carry(0) = 2, carry=1 → '0'")
  console.log("Final carry: 1 → '1'")
  console.log("Result: '10101'")
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;