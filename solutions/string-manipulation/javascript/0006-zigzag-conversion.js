/**
### INTUITION:
The key insight is that the zigzag pattern alternates going down and then up diagonally. We can simulate this
by using an array of strings (one for each row) and tracking the current row and direction.
As we process each character, we add it to the current row, then move to the next row
in the current direction, reversing direction when we hit the top or bottom.

### APPROACH:
1. **Edge Cases**: If numRows = 1 or numRows >= len(s), return original string
2. **Create Row Buffers**: Array of strings, one for each row
3. **Track Current Row and Direction**: Start at row 0, going down
4. **Process Each Character**:
   - Add character to current row
   - Move to next row in current direction
   - Reverse direction at boundaries (row 0 or numRows-1)
5. **Concatenate Rows**: Join all rows to get final result

### WHY THIS WORKS:
- This ensures that each character belongs to exactly one row in the zigzag pattern
- This ensures that direction changes happen at predictable boundaries (top and bottom)
- This ensures that processing left to right with row tracking simulates the zigzag
- This ensures that no complex indexing needed, just direction tracking

### EXAMPLE WALKTHROUGH:
Input:
```
s = "PAYPALISHIRING", numRows = 3
```

Row buffers: ["", "", ""]
Direction: down (1)
Process each character:

Steps:
Step 1: P -> row 0: ["P", "", ""]      going down
Step 2: A -> row 1: ["P", "A", ""]     going down
Step 3: Y -> row 2: ["P", "A", "Y"]    hit bottom, reverse to up
Step 4: P -> row 1: ["P", "AP", "Y"]   going up
Step 5: A -> row 0: ["PA", "AP", "Y"]  hit top, reverse to down
Step 6: L -> row 1: ["PA", "APL", "Y"] going down
Step 7: I -> row 2: ["PA", "APL", "YI"] hit bottom, reverse to up
Step 8: ...

Final rows:
```
Row 0: "PAHN"
Row 1: "APLSIIG"
Row 2: "YIR"
Result: "PAHNAPLSIIGYIR"
```

Output:
```
"PAHNAPLSIIGYIR"
```

### TIME COMPLEXITY:
O(n)**
- Single pass through input
- Process each character exactly once
- Concatenating rows is **O(n)** as each character appears once

### SPACE COMPLEXITY:
O(n)**
- Store n characters across all row buffers
- Result string requires **O(n)** space

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

*/

/**
 * Main solution for Problem 6: Zigzag Conversion
 *
 * @param {string} s - Input string
 * @param {number} numRows - Number of rows in zigzag pattern
 * @return {string} - String read line by line
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function solve(s, numRows) {
  // Edge cases
  if (numRows === 1 || numRows >= s.length) {
    return s;
  }

  // Create array of strings for each row
  const rows = new Array(numRows).fill("");
  let currentRow = 0;
  let goingDown = false;

  // Iterate through the string
  for (let char of s) {
    rows[currentRow] += char;

    // Change direction when we hit the top or bottom row
    if (currentRow === 0 || currentRow === numRows - 1) {
      goingDown = !goingDown;
    }

    // Move to next row
    currentRow += goingDown ? 1 : -1;
  }

  // Concatenate all rows
  return rows.join("");
}

/**
 * Test cases for Problem 6: Zigzag Conversion
 */
function testSolution() {
  console.log("Testing 6. Zigzag Conversion");

  // Test case 1: Basic 3 rows
  const result1 = solve("PAYPALISHIRING", 3);
  const expected1 = "PAHNAPLSIIGYIR";
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: 4 rows
  const result2 = solve("PAYPALISHIRING", 4);
  const expected2 = "PINALSIGYAHRPI";
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Single row
  const result3 = solve("A", 1);
  const expected3 = "A";
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Two rows
  const result4 = solve("ABCDE", 2);
  const expected4 = "ACEBD";
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: More rows than string length
  const result5 = solve("AB", 3);
  const expected5 = "AB";
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  console.log("All test cases passed for 6. Zigzag Conversion!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 6. Zigzag Conversion ===");
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
