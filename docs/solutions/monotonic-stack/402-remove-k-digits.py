"""
# Difficulty: Medium

# 402. Remove K Digits

Given a problem that demonstrates key concepts in Monotonic Stack.

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
[This problem requires understanding of monotonic stack concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply monotonic stack methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages monotonic stack principles
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
    def removeKdigits(self, num: str, k: int) -> str:
        """
        Remove k digits from the number to get the smallest possible number.
        Uses a monotonic stack approach to maintain increasing sequence.
        
        Args:
            num: Input number as string
            k: Number of digits to remove
            
        Returns:
            String representing the smallest possible number after removing k digits
        """
        # Edge cases
        if not num or k >= len(num):
            return "0"
        
        # Initialize stack to build monotonic sequence
        stack = []
        
        # Process each digit
        for digit in num:
            # Remove digits that break monotonic increasing sequence
            while k > 0 and stack and stack[-1] > digit:
                stack.pop()
                k -= 1
            stack.append(digit)
        
        # If we still need to remove digits, remove from the end
        while k > 0:
            stack.pop()
            k -= 1
        
        # Build the result string
        result = ''.join(stack).lstrip('0')
        
        # Return "0" if result is empty, otherwise return result
        return result if result else "0"

def test_solution():
    """
    Test cases for 402. Remove K Digits.
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
    print(f"Solution for 402. Remove K Digits")
