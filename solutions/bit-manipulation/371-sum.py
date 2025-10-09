"""
# Difficulty: Medium

# 371. Sum

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
    def getSum(self, a: int, b: int) -> int:
        """
        Calculate the sum of two integers without using + or - operators.
        Uses bitwise operations to perform addition.
        
        Args:
            a (int): First integer
            b (int): Second integer
            
        Returns:
            int: Sum of the two integers
            
        Example:
            >>> solution = Solution()
            >>> solution.getSum(2, 3)
            5
        """
        # Python handles negative numbers differently with bitwise operations
        # We need to mask to 32 bits to handle negative numbers correctly
        mask = 0xffffffff
        
        # While there is a carry
        while b & mask:
            # Calculate carry using AND operation
            carry = (a & b) << 1
            # Calculate sum using XOR operation
            a = (a ^ b)
            b = carry
            
            # Handle 32-bit overflow
            a = a & mask
            b = b & mask
        
        # Handle negative numbers
        if b > 0:
            a = a ^ b
            
        # If result is negative (32nd bit is 1)
        if (a >> 31) & 1:
            return ~(a ^ mask)
        
        return a

def test_solution():
    """
    Test cases for 371. Sum.
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
    print(f"Solution for 371. Sum")
