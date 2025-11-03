/**
### INTUITION:
This is a classic stack problem for parsing expressions with parentheses. The key insight is to use a stack to save the current state (result and sign) when entering a parenthesized subexpression, then restore it when exiting.

### APPROACH:
1. **Stack for State**: Use stack to save [result, sign] when encountering '('
2. **Parse Numbers**: Build numbers digit by digit as we scan
3. **Handle Operations**: Apply operations (+/-) when we encounter operators or ')'
4. **Parentheses Logic**: Push state on '(', pop and apply on ')'

### WHY THIS WORKS:
- Stack naturally handles nested parentheses
- We maintain running result and current sign
- When we see '(', we start a fresh calculation (subproblem)
- When we see ')', we complete the subproblem and add back to previous result
- Numbers and operators are processed left to right

### EXAMPLE WALKTHROUGH:
Input:
```
"1 + 1"
"2-(1+1)"
```

1. num=1, result=0, sign=1
2. '+': result = 0 + 1*1 = 1, sign=1
3. num=1: result = 1 + 1*1 = 2
1. num=2, result=0, sign=1
2. '-': result = 0 + 2*1 = 2, sign=-1
3. '(': push [2, -1], reset result=0, sign=1
4. num=1, result=0, sign=1
5. '+': result = 0 + 1*1 = 1, sign=1
6. num=1: result = 1 + 1*1 = 2
7. ')': pop [2, -1], result = 2 + 2*(-1) = 0

Output:
```
2
0
```

### TIME COMPLEXITY:
O(n)**
Single pass through the string

### SPACE COMPLEXITY:
O(n)**
- Additional set storage
Stack can grow up to the depth of nested parentheses

### EDGE CASES:
- **No parentheses**: Simple left-to-right evaluation
- **Nested parentheses**: Stack handles multiple levels
- **Spaces in expression**: Skip whitespace during parsing
- **Negative numbers**: Handle with sign tracking
- **Single digit**: Return the digit value

</details>

*/

class Solution {
  calculate(s: string): number {
    const stack: number[] = [];
    let result = 0;
    let num = 0;
    let sign = 1;

    for (const char of s) {
      if (char >= "0" && char <= "9") {
        num = num * 10 + parseInt(char);
      } else if (char === "+") {
        result += sign * num;
        num = 0;
        sign = 1;
      } else if (char === "-") {
        result += sign * num;
        num = 0;
        sign = -1;
      } else if (char === "(") {
        stack.push(result);
        stack.push(sign);
        result = 0;
        sign = 1;
      } else if (char === ")") {
        result += sign * num;
        num = 0;
        result *= stack.pop()!;
        result += stack.pop()!;
      }
    }

    return result + sign * num;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.calculate("1 + 1") === 2 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.calculate(" 2-1 + 2 ") === 3 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.calculate("(1+(4+5+2)-3)+(6+8)") === 23 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
