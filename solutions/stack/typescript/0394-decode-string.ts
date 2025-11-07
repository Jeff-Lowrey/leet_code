/**
### INTUITION:
The key insight is that this is a classic stack problem where we need to process nested brackets. When we encounter a number followed by '[', we need to remember what to repeat and how many times. When we hit ']', we decode the current segment and multiply it by the count.

### APPROACH:
1. **Use two stacks**: One for counts, one for strings
2. **Parse number**: When we see a digit, build the complete number
3. **Push on '['**: Save current count and string, reset for new level
4. **Pop on ']'**: Multiply current string by count and append to previous level
5. **Build result**: Characters are added to current string

### WHY THIS WORKS:
- Stack naturally handles nested structures
- We process from inside out, which is correct for nested encoding
- Each '[' starts a new encoding level, ']' completes it
- Numbers are always followed by '[', so we can parse them together

### EXAMPLE WALKTHROUGH:
Input:
```
"3[a2[c]]"
```

1. '3': count = 3
2. '[': push count=3, string="", reset current
3. 'a': current_string = "a"
4. '2': count = 2
5. '[': push count=2, string="a", reset current
6. 'c': current_string = "c"
7. ']': current = "c" * 2 = "cc", pop: current = "a" + "cc" = "acc"
8. ']': current = "acc" * 3 = "accaccacc"

Output:
```
"accaccacc"
```

### TIME COMPLEXITY:
O(n × m)**
Where n is length of input, m is maximum decoded length

### SPACE COMPLEXITY:
O(n)**
- Additional set storage
For the stacks and intermediate strings

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

*/

class Solution {
  decodeString(s: string): string {
    const numStack: number[] = [];
    const strStack: string[] = [];
    let currentNum = 0;
    let currentStr = "";

    for (const char of s) {
      if (char >= "0" && char <= "9") {
        currentNum = currentNum * 10 + parseInt(char);
      } else if (char === "[") {
        numStack.push(currentNum);
        strStack.push(currentStr);
        currentNum = 0;
        currentStr = "";
      } else if (char === "]") {
        const repeatTimes = numStack.pop()!;
        const prevStr = strStack.pop()!;
        currentStr = prevStr + currentStr.repeat(repeatTimes);
      } else {
        currentStr += char;
      }
    }

    return currentStr;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.decodeString("3[a]2[bc]");
  console.log(`Test 1: ${result1 === "aaabcbc" ? "PASS" : "FAIL"}`);

  const result2 = solution.decodeString("3[a2[c]]");
  console.log(`Test 2: ${result2 === "accaccacc" ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
