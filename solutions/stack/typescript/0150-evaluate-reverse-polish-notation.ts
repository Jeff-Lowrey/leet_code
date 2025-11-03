/**
### INTUITION:
The key insight is that reverse Polish Notation (RPN) is perfect for stack-based evaluation. In RPN,
operators come after their operands, so we can process left-to-right:
push numbers onto stack, and when we see an operator, pop two operands,
compute, and push result back.

### APPROACH:
1. **Initialize stack**: Empty stack to store operands
2. **Process tokens**: Iterate through each token
3. **Handle numbers**: Push numbers onto stack
4. **Handle operators**: Pop two operands, compute, push result
5. **Return result**: Final stack should have one element (the answer)

### WHY THIS WORKS:
- RPN guarantees operators have their operands available on stack
- Stack's LIFO property matches RPN's evaluation order
- Each operator consumes exactly two operands and produces one result

### EXAMPLE WALKTHROUGH:
Input:
```
["2","1","+","3","*"]
```

Stack operations:

Steps:
Step 1: "2" -> [2]
Step 2: "1" -> [2,1]
Step 3: "+" -> [3]        (pop 1,2; compute 2+1=3; push 3)
Step 4: "3" -> [3,3]
Step 5: "*" -> [9]        (pop 3,3; compute 3*3=9; push 9)

Output:
```
9
```

### TIME COMPLEXITY:
O(n)**
- Single pass with **O(1)** hash lookups
Where n is the number of tokens - process each token once

### SPACE COMPLEXITY:
O(n)**
- Additional hash map storage
Stack can hold up to n/2 operands in worst case

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

*/

class Solution {
  evalRPN(tokens: string[]): number {
    const stack: number[] = [];
    const operators = new Set(["+", "-", "*", "/"]);

    for (const token of tokens) {
      if (operators.has(token)) {
        const b = stack.pop()!;
        const a = stack.pop()!;

        switch (token) {
          case "+":
            stack.push(a + b);
            break;
          case "-":
            stack.push(a - b);
            break;
          case "*":
            stack.push(a * b);
            break;
          case "/":
            stack.push(Math.trunc(a / b));
            break;
        }
      } else {
        stack.push(parseInt(token));
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

  const result1 = solution.evalRPN(["2", "1", "+", "3", "*"]);
  console.log(`Test 1: ${result1 === 9 ? "PASS" : "FAIL"}`);

  const result2 = solution.evalRPN(["4", "13", "5", "/", "+"]);
  console.log(`Test 2: ${result2 === 6 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
