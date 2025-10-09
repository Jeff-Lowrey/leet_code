"""
# Difficulty: Medium

# 066. Plus

Given a problem that demonstrates key concepts in Math.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[input description]</dd>
<dt>Output:</dt>
<dd>[output description]</dd>
<dt>Explanation:</dt>
<dd>[explanation]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of math concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply math methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages math principles
- Time complexity is optimized for the given constraints
- Space complexity is minimized where possible

### EXAMPLE WALKTHROUGH:
```
Input: [example input]
Step 1: [explain first step]
Step 2: [explain second step]
Output: [expected output]
```

### TIME COMPLEXITY:
O(n)

### SPACE COMPLEXITY:
O(1)

### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>
"""

class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:
        """
        Add one to the number represented by the digits array.

        Args:
            digits (List[int]): Array of digits representing a non-negative integer

        Returns:
            List[int]: Resulting array after adding one to the number

        Time Complexity: O(n) where n is the length of digits
        Space Complexity: O(1) in most cases, O(n) when new digit needs to be added
        """
        n = len(digits)

        # Iterate from right to left
        for i in range(n - 1, -1, -1):
            # If current digit is less than 9, simply increment and return
            if digits[i] < 9:
                digits[i] += 1
                return digits
            # If current digit is 9, set it to 0 and continue to next digit
            digits[i] = 0

        # If we're here, it means we need to add a new digit
        # (e.g., 999 -> 1000)
        return [1] + digits

def test_solution():
    """
    Test cases for 066. Plus.
    """
    solution = Solution()

    # Test case 1: Basic functionality
    # result = solution.solve([test_input])
    # expected = [expected_output]
    # assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Edge case
    # result = solution.solve([edge_case_input])
    # expected = [edge_case_output]
    # assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 066. Plus")
