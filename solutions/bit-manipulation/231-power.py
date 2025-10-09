"""
# Difficulty: Medium

# 231. Power

Given a problem that demonstrates key concepts in Bit Manipulation.

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
[This problem requires understanding of bit manipulation concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply bit manipulation methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages bit manipulation principles
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
    def isPowerOfTwo(self, n: int) -> bool:
        """
        Check if a number is a power of two using bit manipulation.

        Args:
            n: Integer to check

        Returns:
            True if n is a power of 2, False otherwise

        Time Complexity: O(1) - constant time bit operations
        Space Complexity: O(1) - no extra space needed
        """
        # Power of 2 has exactly one bit set
        # n & (n-1) removes the rightmost set bit
        # For power of 2, this should result in 0
        return n > 0 and (n & (n - 1)) == 0

    def solve(self, n: int) -> bool:
        """Wrapper method for consistency with template."""
        return self.isPowerOfTwo(n)

def test_solution():
    """
    Test cases for 231. Power of Two.
    """
    solution = Solution()

    # Test case 1: Power of 2 - 1
    result = solution.solve(1)
    expected = True
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Power of 2 - 16
    result = solution.solve(16)
    expected = True
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: Not power of 2 - 3
    result = solution.solve(3)
    expected = False
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 4: Power of 2 - 4
    result = solution.solve(4)
    expected = True
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 5: Not power of 2 - 5
    result = solution.solve(5)
    expected = False
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 6: Power of 2 - 1024
    result = solution.solve(1024)
    expected = True
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 7: Negative number
    result = solution.solve(-16)
    expected = False
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 8: Zero
    result = solution.solve(0)
    expected = False
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 9: Power of 2 - 2
    result = solution.solve(2)
    expected = True
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    test_values = [1, 2, 3, 4, 16, 17, 1024]
    print(f"Solution for 231. Power of Two:")
    for val in test_values:
        result = solution.solve(val)
        print(f"{val}: {result}")
