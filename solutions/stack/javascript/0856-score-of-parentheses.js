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

/**
 * Main solution for Problem 856: Score Of Parentheses
 *
 * @param {string} s - Balanced parentheses string
 * @return {number} - Calculated score
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function solve(s) {
  const stack = [0]; // Initialize with 0 for the base level

  for (const char of s) {
    if (char === "(") {
      // Start a new nesting level
      stack.push(0);
    } else {
      // Close current level
      const current = stack.pop();
      const score = current === 0 ? 1 : 2 * current;

      // Add score to the new top (parent level)
      stack[stack.length - 1] += score;
    }
  }

  return stack[0];
}

/**
 * Test cases for Problem 856: Score Of Parentheses
 */
function testSolution() {
  console.log("Testing 856. Score Of Parentheses");

  // Test case 1: Single pair
  const result1 = solve("()");
  const expected1 = 1;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Nested pair
  const result2 = solve("(())");
  const expected2 = 2;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Adjacent pairs
  const result3 = solve("()()");
  const expected3 = 2;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Complex nesting
  const result4 = solve("(()(()))");
  const expected4 = 6;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  console.log("All test cases passed for 856. Score Of Parentheses!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 856. Score Of Parentheses ===");
  console.log("Category: Stack");
  console.log("Difficulty: Medium");
  console.log("");

  // Example demonstration would go here
  testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
  demonstrateSolution();
}

// Export for use in other modules
module.exports = {
  solve,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This solution focuses on stack concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
