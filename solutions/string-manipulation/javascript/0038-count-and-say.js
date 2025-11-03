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

*/

/**
 * Main solution for Problem 38: Count And Say
 *
 * @param {number} n - The position in the count-and-say sequence
 * @return {string} - The nth term in the sequence
 *
 * Time Complexity: O(2^n)
 * Space Complexity: O(2^n)
 */
function solve(n) {
  // Base case
  if (n === 1) return "1";

  // Start with the first term
  let result = "1";

  // Generate each subsequent term
  for (let i = 1; i < n; i++) {
    result = getNextTerm(result);
  }

  return result;
}

/**
 * Helper function to generate the next term from the current term
 *
 * @param {string} s - Current term
 * @return {string} - Next term
 */
function getNextTerm(s) {
  let next = "";
  let i = 0;

  while (i < s.length) {
    let currentChar = s[i];
    let count = 1;

    // Count consecutive identical characters
    while (i + count < s.length && s[i + count] === currentChar) {
      count++;
    }

    // Append count + character
    next += count + currentChar;
    i += count;
  }

  return next;
}

/**
 * Test cases for Problem 38: Count And Say
 */
function testSolution() {
  console.log("Testing 38. Count And Say");

  // Test case 1: n = 1
  const result1 = solve(1);
  const expected1 = "1";
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: n = 2
  const result2 = solve(2);
  const expected2 = "11";
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: n = 3
  const result3 = solve(3);
  const expected3 = "21";
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: n = 4
  const result4 = solve(4);
  const expected4 = "1211";
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: n = 5
  const result5 = solve(5);
  const expected5 = "111221";
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  console.log("All test cases passed for 38. Count And Say!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 38. Count And Say ===");
  console.log("Category: String Manipulation");
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
 * - This solution focuses on string manipulation concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
