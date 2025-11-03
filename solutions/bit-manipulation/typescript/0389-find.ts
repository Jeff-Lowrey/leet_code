/**
### INTUITION:
The key insight is that xOR both arrays together. The result is the character that appears different number of times in s vs t, which is the added character.

### APPROACH:
1. **Initialize result**: Set result = 0 to accumulate XOR values
2. **XOR all characters in s**: Loop through each character in s and compute result ^= ord(char)
3. **XOR all characters in t**: Loop through each character in t and compute result ^= ord(char)
4. **Leverage XOR cancellation**: Matching characters from both strings cancel out (char ^ char = 0)
5. **Added character remains**: Only the extra character in t doesn't have a pair to cancel
6. **Convert to character**: Use chr(result) to convert the ASCII value back to character
7. **Return result**: Return the character that was added to t

### WHY THIS WORKS:
- This ensures that xOR all characters in both strings
- This ensures that duplicates cancel out, leaving only the added character
- This ensures that alternative: sum character codes, difference is added char
- This ensures that xOR handles any character set, sum might overflow
- This ensures that o(n) time: single pass, O(1) space

### EXAMPLE WALKTHROUGH:
Input:
```
s = "abcd", t = "abcde"
```

Step 1: XOR all characters
result = 0
XOR s: result ^= ord('a') ^= ord('b') ^= ord('c') ^= ord('d')
XOR t: result ^= ord('a') ^= ord('b') ^= ord('c') ^= ord('d') ^= ord('e')
Step 2: Duplicate characters cancel out
All characters in s cancel with t
Remaining: ord('e')
Step 3: Convert back to character

Steps:
Step 1: result = ord('e') → 'e'

Output:
```
'e' (the added character)
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
  findTheDifference(s: string, t: string): string {
    let result = 0;

    for (const char of s) {
      result ^= char.charCodeAt(0);
    }

    for (const char of t) {
      result ^= char.charCodeAt(0);
    }

    return String.fromCharCode(result);
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.findTheDifference("abcd", "abcde");
  console.log(`Test 1: ${result1 === "e" ? "PASS" : "FAIL"}`);

  const result2 = solution.findTheDifference("", "y");
  console.log(`Test 2: ${result2 === "y" ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
