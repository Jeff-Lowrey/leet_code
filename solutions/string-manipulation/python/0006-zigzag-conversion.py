"""
# Difficulty: Medium

The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows
like this:

P   A   H   N
A P L S I I G
Y   I   R

And then read line by line: "PAHNAPLSIIGYIR"

Write the code that will take a string and make this conversion given a number of rows.

Example:
Input: s = "PAYPALISHIRING", numRows = 3
Output: "PAHNAPLSIIGYIR"

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>s = "PAYPALISHIRING", numRows = 3</dd>
<dt>Output:</dt>
<dd>PAHNAPLSIIGYIR"</dd>
<dt>Explanation:</dt>
<dd>Zigzag pattern 'PAYPALISHIRING' with 3 rows reads 'PAHNAPLSIIGYIR'</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>


### METADATA:
**Techniques**: TBD
**Data Structures**: TBD
**Patterns**: TBD
**Time Complexity**: O(n)
**Space Complexity**: O(n)

### INTUITION:
The zigzag pattern alternates going down and then up diagonally. We can simulate this
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
- Each character belongs to exactly one row in the zigzag pattern
- Direction changes happen at predictable boundaries (top and bottom)
- Processing left to right with row tracking simulates the zigzag
- No complex indexing needed, just direction tracking

### EXAMPLE WALKTHROUGH:
```
Input: s = "PAYPALISHIRING", numRows = 3

Row buffers: ["", "", ""]
Direction: down (1)

Process each character:
P -> row 0: ["P", "", ""]      going down
A -> row 1: ["P", "A", ""]     going down
Y -> row 2: ["P", "A", "Y"]    hit bottom, reverse to up
P -> row 1: ["P", "AP", "Y"]   going up
A -> row 0: ["PA", "AP", "Y"]  hit top, reverse to down
L -> row 1: ["PA", "APL", "Y"] going down
I -> row 2: ["PA", "APL", "YI"] hit bottom, reverse to up
...

Final rows:
Row 0: "PAHN"
Row 1: "APLSIIG"
Row 2: "YIR"

Result: "PAHNAPLSIIGYIR"
```

### TIME COMPLEXITY:
O(n)
- Process each character exactly once
- Concatenating rows is O(n) as each character appears once

### SPACE COMPLEXITY:
O(n)
- Store n characters across all row buffers
- Result string requires O(n) space

### EDGE CASES:
- numRows = 1: Return original string (no zigzag possible)
- numRows >= len(s): Each character on its own row, return original
- Empty string: Return empty
- numRows = 2: Simple alternating pattern

</details>
"""


from typing import Any

class Solution:
    def convert(self, s: str, numRows: int) -> str:
        """
        Convert string to zigzag pattern and read line by line.

        Args:
            s: Input string
            numRows: Number of rows for zigzag pattern

        Returns:
            String read line by line from zigzag pattern

        Time Complexity: O(n) where n is length of string
        Space Complexity: O(n) for storing row buffers
        """
        # Edge cases
        if numRows == 1 or numRows >= len(s):
            return s

        # Create row buffers
        rows = [""] * numRows
        current_row = 0
        going_down = False

        # Process each character
        for char in s:
            rows[current_row] += char

            # Change direction at top and bottom rows
            if current_row == 0 or current_row == numRows - 1:
                going_down = not going_down

            # Move to next row
            current_row += 1 if going_down else -1

        # Concatenate all rows
        return "".join(rows)

    def convertList(self, s: str, numRows: int) -> str:
        """
        Alternative using lists for row buffers.

        Args:
            s: Input string
            numRows: Number of rows

        Returns:
            Zigzag converted string

        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        if numRows == 1 or numRows >= len(s):
            return s

        # Use lists instead of strings for each row
        rows: list[list[str]] = [[] for _ in range(numRows)]
        current_row = 0
        direction = 1  # 1 for down, -1 for up

        for char in s:
            rows[current_row].append(char)

            # Reverse direction at boundaries
            if current_row == 0:
                direction = 1
            elif current_row == numRows - 1:
                direction = -1

            current_row += direction

        # Join all rows
        return "".join("".join(row) for row in rows)

    def convertMathematical(self, s: str, numRows: int) -> str:
        """
        Mathematical approach using cycle pattern.

        Args:
            s: Input string
            numRows: Number of rows

        Returns:
            Zigzag converted string

        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        if numRows == 1 or numRows >= len(s):
            return s

        result: list[Any] = []
        cycle_len = 2 * numRows - 2  # Length of one complete cycle

        for row in range(numRows):
            for i in range(row, len(s), cycle_len):
                result.append(s[i])

                # Add middle characters (not in first or last row)
                if row != 0 and row != numRows - 1:
                    middle_idx = i + cycle_len - 2 * row
                    if middle_idx < len(s):
                        result.append(s[middle_idx])

        return "".join(result)

    def convertVerbose(self, s: str, numRows: int) -> str:
        """
        Verbose implementation with detailed comments.

        Args:
            s: Input string
            numRows: Number of rows

        Returns:
            Zigzag converted string
        """
        # Handle edge cases
        if not s:
            return ""
        if numRows <= 1 or numRows >= len(s):
            return s

        # Initialize row storage
        rows = ["" for _ in range(numRows)]
        current_row = 0
        direction = -1  # Start with -1, will flip to 1 immediately

        # Process each character in the string
        for char in s:
            # Add character to current row
            rows[current_row] += char

            # Check if we need to change direction
            if current_row == 0 or current_row == numRows - 1:
                direction = -direction

            # Move to next row
            current_row += direction

        # Combine all rows into final result
        result = ""
        for row in rows:
            result += row

        return result


def test_solution() -> None:
    """Test cases for Problem 6."""
    solution = Solution()

    # Test case 1: Standard case
    result1 = solution.convert("PAYPALISHIRING", 3)
    expected1 = "PAHNAPLSIIGYIR"
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Two rows
    result2 = solution.convert("PAYPALISHIRING", 4)
    expected2 = "PINALSIGYAHRPI"
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Single row
    result3 = solution.convert("A", 1)
    expected3 = "A"
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Two rows simple
    result4 = solution.convert("AB", 1)
    expected4 = "AB"
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: NumRows >= string length
    result5 = solution.convert("ABC", 5)
    expected5 = "ABC"
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test case 6: Two rows pattern
    result6 = solution.convert("ABCD", 2)
    expected6 = "ACBD"
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test list solution
    result7 = solution.convertList("PAYPALISHIRING", 3)
    expected7 = "PAHNAPLSIIGYIR"
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    # Test mathematical solution
    result8 = solution.convertMathematical("PAYPALISHIRING", 3)
    expected8 = "PAHNAPLSIIGYIR"
    assert result8 == expected8, f"Expected {expected8}, got {result8}"

    # Test verbose solution
    result9 = solution.convertVerbose("PAYPALISHIRING", 4)
    expected9 = "PINALSIGYAHRPI"
    assert result9 == expected9, f"Expected {expected9}, got {result9}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 6. Zigzag Conversion ===")

    test_cases = [("PAYPALISHIRING", 3), ("PAYPALISHIRING", 4), ("ABCD", 2), ("A", 1)]

    for s, numRows in test_cases:
        result = solution.convert(s, numRows)
        print(f"convert('{s}', {numRows}) = '{result}'")

    # Demonstrate the zigzag pattern
    print("\nZigzag pattern for 'PAYPALISHIRING' with numRows=3:")
    print("P   A   H   N")
    print("A P L S I I G")
    print("Y   I   R")
    print("Reading line by line: PAHNAPLSIIGYIR")

    print("\nZigzag pattern for 'PAYPALISHIRING' with numRows=4:")
    print("P     I     N")
    print("A   L S   I G")
    print("Y A   H R")
    print("P     I")
    print("Reading line by line: PINALSIGYAHRPI")
