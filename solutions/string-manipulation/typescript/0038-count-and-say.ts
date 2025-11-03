/**
### INTUITION:
The key insight is that the count-and-say sequence is built iteratively where each term describes the previous term
by counting consecutive identical digits. We read the previous result from left to right,
counting how many times each digit appears consecutively, then building a new string.

### APPROACH:
1. **Base Case**: Start with "1" for n=1
2. **Iterative Building**: For each iteration from 2 to n:
   - Read through the previous string
   - Count consecutive occurrences of each digit
   - Build new string by appending count + digit
3. **Two-Pointer Technique**: Use two pointers to identify runs of same digits
4. **String Construction**: Use list for efficient string building

### WHY THIS WORKS:
- This ensures that each term is uniquely determined by the previous term
- This ensures that we process left to right, counting consecutive identical digits
- This ensures that the pattern is deterministic and follows a clear rule
- This ensures that building with a list and joining is efficient in Python

### EXAMPLE WALKTHROUGH:
Input:
```
n = 5:
```

1. "1"
2. "11" (one 1)
3. "21" (two 1s)
4. "1211" (one 2, one 1)
5. "111221" (one 1, one 2, two 1s)

Steps:
Step 1: For "1211" → "111221":
Step 2: - Read '1' once: "11"
Step 3: - Read '2' once: "12"
Step 4: - Read '1' twice: "21"
Step 5: - Result: "111221"

Output:
```
"111221"
```

### TIME COMPLEXITY:
O(n * m)**
- n iterations to build up to the nth term
- m is the length of the string at each iteration (grows exponentially)
- Each iteration processes the entire string once

### SPACE COMPLEXITY:
O(m)**
- m is the length of the current string
- We store the result string which grows with each iteration

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

*/

class Solution {
  /**
   * Generate the nth term of the count-and-say sequence.
   *
   * Time Complexity: O(n * m)
   * Space Complexity: O(m)
   */
  countAndSay(n: number): number {
    if (n === 1) {
      return "1";
    }

    let result = "1";
    for (let i = 1; i < n; i++) {
      result = this.sayNumber(result);
    }

    return result;
  }

  private sayNumber(s: string): string {
    if (!s) {
      return "";
    }

    const result: string[] = [];
    let i = 0;

    while (i < s.length) {
      const digit = s[i];
      let count = 1;

      // Count consecutive occurrences of the same digit
      while (i + count < s.length && s[i + count] === digit) {
        count++;
      }

      // Append count and digit
      result.push(count.toString());
      result.push(digit);

      // Move to the next different digit
      i += count;
    }

    return result.join("");
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.countAndSay(1) === "1" ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.countAndSay(2) === "11" ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.countAndSay(3) === "21" ? "PASS" : "FAIL"}`);
  console.log(`Test 4: ${solution.countAndSay(4) === "1211" ? "PASS" : "FAIL"}`);
  console.log(`Test 5: ${solution.countAndSay(5) === "111221" ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
