/**
### INTUITION:
The key challenge is maintaining the minimum element in O(1) time. We can use
two stacks: one for all elements and another to track minimums at each level.

### APPROACH:
1. **Two Stack Method**: Use main_stack for elements, min_stack for minimums
2. **Push Operation**: Always push to main_stack, conditionally to min_stack
3. **Pop Operation**: Pop from main_stack, conditionally from min_stack
4. **Min Tracking**: min_stack top always contains current minimum

### WHY THIS WORKS:
- Main stack handles normal stack operations
- Min stack maintains minimum for each level of main stack
- When we pop, we check if we're removing the current minimum
- This ensures O(1) access to minimum at all times

### EXAMPLE WALKTHROUGH:
Input:
```
Operations: push(-2), push(0), push(-3)
```

main_stack: [-2, 0, -3]
min_stack:  [-2, -3]
getMin() returns -3 (top of min_stack)
pop() removes -3 from both stacks
getMin() returns -2 (new top of min_stack)

Output:
```
[Expected output]
```

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
O(1)**
All operations are constant time

### SPACE COMPLEXITY:
O(n)**
In worst case, min_stack can have same size as main_stack

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

*/

class Solution {
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();
  // Add test cases here
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;