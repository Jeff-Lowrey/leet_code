/**
### INTUITION:
The key insight is that this is a classic stack problem. When we encounter an opening bracket, we push it onto the stack.
When we encounter a closing bracket, we check if it matches the most recent opening bracket (top of stack).
If all brackets are properly matched, the stack will be empty at the end.

### APPROACH:
1. **Use a stack** to track opening brackets
2. **Push opening brackets** onto the stack
3. **Pop and check** when encountering closing brackets
4. **Validate matching** bracket types
5. **Check empty stack** at the end

### WHY THIS WORKS:
- This ensures that stack follows LIFO (Last In, First Out) principle
- This ensures that this naturally handles the "most recent unmatched opening bracket" requirement
- This ensures that each closing bracket must match the most recent opening bracket
- This ensures that empty stack at the end means all brackets were properly matched

### EXAMPLE WALKTHROUGH:
Input:
```
s = "([{}])"
```

Steps:
Step 1: '(' → push to stack: ['(']
Step 2: '[' → push to stack: ['(', '[']
Step 3: '{' → push to stack: ['(', '[', '{']
Step 4: '}' → pop '{', matches ✓, stack: ['(', '[']
Step 5: ']' → pop '[', matches ✓, stack: ['(']
Step 6: ')' → pop '(', matches ✓, stack: []
Step 7: Result: Empty stack → True

Output:
```
Empty stack → True
```

### TIME COMPLEXITY:
O(n)**
- Single pass with **O(1)** hash lookups
Single pass through the string

### SPACE COMPLEXITY:
O(n)**
- Additional hash map storage
Stack can contain up to n/2 opening brackets in worst case

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

*/

class Solution {
  isValid(s: string): boolean {
    const stack: string[] = [];
    const map: Record<string, string> = {
      ")": "(",
      "}": "{",
      "]": "[",
    };

    for (const char of s) {
      if (char in map) {
        if (stack.pop() !== map[char]) {
          return false;
        }
      } else {
        stack.push(char);
      }
    }

    return stack.length === 0;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.isValid("()") === true ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.isValid("()[]{}") === true ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.isValid("(]") === false ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
