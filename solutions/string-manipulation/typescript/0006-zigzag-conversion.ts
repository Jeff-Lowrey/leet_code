/**
 * # 0006. Zigzag Conversion
 * 
 * # Difficulty: Medium
 * 
 * The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows
 * like this:
 * 
 * P   A   H   N
 * A P L S I I G
 * Y   I   R
 * 
 * And then read line by line: "PAHNAPLSIIGYIR"
 * 
 * Write the code that will take a string and make this conversion given a number of rows.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>s = "PAYPALISHIRING", numRows = 3</dd>
 * <dt>Output:</dt>
 * <dd>PAHNAPLSIIGYIR"</dd>
 * <dt>Explanation:</dt>
 * <dd>Zigzag pattern 'PAYPALISHIRING' with 3 rows reads 'PAHNAPLSIIGYIR'</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Array, String, Tree
 * **Patterns**: Two Pointers Pattern
 * **Time Complexity**: O(n)
 * **Space Complexity**: O(n) - Additional hash map storage
 * 
 * ### INTUITION:
The key insight is that the zigzag pattern alternates going down and then up diagonally. We can simulate this
by using an array of strings (one for each row) and tracking the current row and direction.
As we process each character, we add it to the current row, then move to the next row
in the current direction, reversing direction when we hit the top or bottom.

### APPROACH:
 * 1. **Edge Cases**: If numRows = 1 or numRows >= len(s), return original string
 * 2. **Create Row Buffers**: Array of strings, one for each row
 * 3. **Track Current Row and Direction**: Start at row 0, going down
 * 4. **Process Each Character**:
 *    - Add character to current row
 *    - Move to next row in current direction
 *    - Reverse direction at boundaries (row 0 or numRows-1)
 * 5. **Concatenate Rows**: Join all rows to get final result
 * 
 * ### WHY THIS WORKS:
- This ensures that each character belongs to exactly one row in the zigzag pattern
- This ensures that direction changes happen at predictable boundaries (top and bottom)
- This ensures that processing left to right with row tracking simulates the zigzag
- This ensures that no complex indexing needed, just direction tracking

### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * s = "PAYPALISHIRING", numRows = 3
 * ```
 *
 * Row buffers: ["", "", ""]
 * Direction: down (1)
 * Process each character:
 *
 * Steps:
 * Step 1: P -> row 0: ["P", "", ""]      going down
 * Step 2: A -> row 1: ["P", "A", ""]     going down
 * Step 3: Y -> row 2: ["P", "A", "Y"]    hit bottom, reverse to up
 * Step 4: P -> row 1: ["P", "AP", "Y"]   going up
 * Step 5: A -> row 0: ["PA", "AP", "Y"]  hit top, reverse to down
 * Step 6: L -> row 1: ["PA", "APL", "Y"] going down
 * Step 7: I -> row 2: ["PA", "APL", "YI"] hit bottom, reverse to up
 * Step 8: ...
 *
 * Final rows:
 * ```
 * Row 0: "PAHN"
 * Row 1: "APLSIIG"
 * Row 2: "YIR"
 * Result: "PAHNAPLSIIGYIR"
 * ```
 * 
 * Output:
 * ```
 * "PAHNAPLSIIGYIR"
 * ```
 * 
 * ### TIME COMPLEXITY:
 * O(n)
 * - Process each character exactly once
 * - Concatenating rows is O(n) as each character appears once
 * 
 * ### SPACE COMPLEXITY:
 * O(n)
 * - Additional hash map storage
 * - Store n characters across all row buffers
 * - Result string requires O(n) space
 * 
 * ### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>
 */

class Solution {
  /**
   * Convert string to zigzag pattern and read line by line.
   *
   *         Args:
   *             s: Input string
   *             numRows: Number of rows for zigzag pattern
   *
   *         Returns:
   *             String read line by line from zigzag pattern
   *
   *         Time Complexity: O(n) where n is length of string
   *         Space Complexity: O(n) for storing row buffers
   */
  convert(s: string, numRows: number): string {
    // Implementation
    if numRows == 1 or numRows >= s.length:
    return s
    rows = [""] * numRows
    current_row = 0
    going_down = false
  }

  /**
   * Alternative using lists for row buffers.
   *
   *         Args:
   *             s: Input string
   *             numRows: Number of rows
   *
   *         Returns:
   *             Zigzag converted string
   *
   *         Time Complexity: O(n)
   *         Space Complexity: O(n)
   */
  convertList(s: string, numRows: number): string {
    // Implementation
    if numRows == 1 or numRows >= s.length:
    return s
    rows: list.get(list[str)] = [[] for _ in range(numRows)]
    current_row = 0
    direction = 1  // 1 for down, -1 for up
    for char in s:
    rows.get(current_row).append(char)
  }

  /**
   * Mathematical approach using cycle pattern.
   *
   *         Args:
   *             s: Input string
   *             numRows: Number of rows
   *
   *         Returns:
   *             Zigzag converted string
   *
   *         Time Complexity: O(n)
   *         Space Complexity: O(n)
   */
  convertMathematical(s: string, numRows: number): string {
    // Implementation
    if numRows == 1 or numRows >= s.length:
    return s
    result: list.set(Any, []
    cycle_len = 2 * numRows - 2  // Length of one complete cycle
    for (let row = 0; row < numRows; row++) {
    for (let i = 0; i < row, s.length, cycle_len; i++) {
    result.append(s.get(i))
  }

  /**
   * Verbose implementation with detailed comments.
   *
   *         Args:
   *             s: Input string
   *             numRows: Number of rows
   *
   *         Returns:
   *             Zigzag converted string
   */
  convertVerbose(s: string, numRows: number): string {
    // Implementation
    if not s:
    return ""
    if numRows <= 1 or numRows >= s.length:
    return s
    rows = ["" for _ in range(numRows)]
    current_row = 0
    direction = -1  // Start with -1, will flip to 1 immediately
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  test_solution()
  # Example usage
  solution = Solution()
  console.log("=== 6. Zigzag Conversion ===")
  test_cases = [("PAYPALISHIRING", 3), ("PAYPALISHIRING", 4), ("ABCD", 2), ("A", 1)]
  for s, numRows in test_cases:
  result = solution.convert(s, numRows)
  console.log(`convert('{s}', {numRows}) = 'result'`)
  # Demonstrate the zigzag pattern
  console.log("\nZigzag pattern for 'PAYPALISHIRING' with numRows=3:")
  console.log("P   A   H   N")
  console.log("A P L S I I G")
  console.log("Y   I   R")
  console.log("Reading line by line: PAHNAPLSIIGYIR")
  console.log("\nZigzag pattern for 'PAYPALISHIRING' with numRows=4:")
  console.log("P     I     N")
  console.log("A   L S   I G")
  console.log("Y A   H R")
  console.log("P     I")
  console.log("Reading line by line: PINALSIGYAHRPI")
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;