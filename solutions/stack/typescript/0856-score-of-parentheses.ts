/**
### INTUITION:
We need to calculate scores based on nesting depth and adjacency. Key insights:
- "()" = 1 point
- Adjacent groups add their scores: "()()" = 1 + 1 = 2
- Nested groups multiply by 2: "(())" = 2 * 1 = 2
- Deep nesting: "((()))" = 2 * 2 * 1 = 4

### APPROACH:
1. **Stack method**: Use stack to track scores at each nesting level
2. **Depth method**: Track current depth and count "()" pairs
3. **Each '(' opens new level**: Push 0 to stack for new score tracking
4. **Each ')' closes level**: Pop and either add 1 (for "()") or multiply by 2

### WHY THIS WORKS:
- This ensures that stack naturally handles nesting levels
- This ensures that when we see "()", we add 1 to current level
- This ensures that when we close a level, we either get 1 (empty) or double the inner score
- This ensures that adjacent groups at same level add together

### EXAMPLE WALKTHROUGH:
Input:
```
"(()(()))"
```

Stack: [0]
'(': stack = [0, 0]
'(': stack = [0, 0, 0]
')': empty level, stack = [0, 1]
'(': stack = [0, 1, 0]
'(': stack = [0, 1, 0, 0]
')': empty level, stack = [0, 1, 1]
')': inner=1, stack = [0, 1+2*1] = [0, 3]
')': inner=3, stack = [0+2*3] = [6]

Output:
```
6
```

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
O(n)**
- Single pass through input
Single pass through the string

### SPACE COMPLEXITY:
O(n)**
Stack can grow to depth of nesting

### EDGE CASES:
- **Empty string**: Return 0 (no score)
- **Single pair ()**: Return 1 (base case)
- **Nested pairs ((()))**: Doubling rule applies recursively
- **Concatenated pairs ()()**: Addition rule applies
- **Deep nesting**: Stack depth tracks nesting level

</details>

*/

class Solution {
  scoreOfParentheses(s: string): number {
    const stack: number[] = [0];

    for (const char of s) {
      if (char === "(") {
        stack.push(0);
      } else {
        const top = stack.pop()!;
        const newTop = stack.pop()!;
        stack.push(newTop + Math.max(2 * top, 1));
      }
    }

    return stack[0];
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.scoreOfParentheses("()") === 1 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.scoreOfParentheses("(())") === 2 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.scoreOfParentheses("()()") === 2 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
