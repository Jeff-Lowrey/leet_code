/**
### INTUITION:
The key insight is that use a stack to maintain the record of scores. Process each operation and modify the stack accordingly.

### APPROACH:
1. We iterate through each operation in the list.
2. For integer strings, we parse them and push onto the stack.
3. For '+', we add the sum of the top two elements.
4. For 'D', we double the top element.
5. For 'C', we pop the last element.
6. After processing all operations, we return the sum of all elements in the stack.

### WHY THIS WORKS:
- This ensures that stack provides LIFO access to the most recent scores
- This ensures that operations only depend on the most recent 1-2 scores
- This ensures that stack naturally handles the 'C' operation (remove previous score)

### EXAMPLE WALKTHROUGH:
Input:
```
ops = ["5","2","C","D","+"]
```

Steps:
Step 1: "5" → Push 5 → stack = [5]
Step 2: "2" → Push 2 → stack = [5, 2]
Step 3: "C" → Pop previous score → stack = [5]
Step 4: "D" → Double last score (5 * 2 = 10) → stack = [5, 10]
Step 5: "+" → Sum last two (5 + 10 = 15) → stack = [5, 10, 15]

Final stack:
```
[5, 10, 15]
```

Output:
```
30
```

### TIME COMPLEXITY:
O(n)** - Process each of n operations once with **O(1)** stack operations

### SPACE COMPLEXITY:
O(n)** - Stack can grow to size n in worst case (all integer operations)

### EDGE CASES:
- **Negative numbers:** Handle "-2" by parsing as integer
- **Multiple 'C' operations:** Stack correctly removes most recent scores
- **Empty stack after 'C':** Problem guarantees valid operations

@param {string[]} operations
@return {number}

*/

class Solution {
  /**
   * Calculate final score after applying baseball game operations.
   *
   * Approach: Stack-based operation processing
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  calPoints(operations) {
    const stack = [];

    for (const op of operations) {
      if (op === "+") {
        // Add sum of last two scores
        stack.push(stack[stack.length - 1] + stack[stack.length - 2]);
      } else if (op === "D") {
        // Double the last score
        stack.push(2 * stack[stack.length - 1]);
      } else if (op === "C") {
        // Remove the last score
        stack.pop();
      } else {
        // It's an integer, add it to the stack
        stack.push(parseInt(op));
      }
    }

    return stack.reduce((sum, score) => sum + score, 0);
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests() {
  const solution = new Solution();

  // Test case 1
  const ops1 = ["5", "2", "C", "D", "+"];
  console.log(`Test 1: ${solution.calPoints(ops1)}`);
  console.log(`Expected: 30\n`);

  // Test case 2
  const ops2 = ["5", "-2", "4", "C", "D", "9", "+", "+"];
  console.log(`Test 2: ${solution.calPoints(ops2)}`);
  console.log(`Expected: 27\n`);

  // Test case 3
  const ops3 = ["1", "C"];
  console.log(`Test 3: ${solution.calPoints(ops3)}`);
  console.log(`Expected: 0\n`);
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}
