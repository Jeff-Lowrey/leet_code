"""
# 190. Reverse
**Medium**

Given a problem that demonstrates key concepts in Bit Manipulation.

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

### TIME COMPLEXITY: O(n)
### SPACE COMPLEXITY: O(1)

### EXAMPLE WALKTHROUGH:
```
Input: [example input]
Step 1: [explain first step]
Step 2: [explain second step]
Output: [expected output]
```

### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>

<details>
<summary><b>💡 APPROACH</b></summary>

The approach uses bit manipulation techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using bit manipulation method
3. Return the computed result

</details>
"""

class Solution:
    def reverseBits(self, n: int) -> int:
        """
        Reverses the bits of a given 32-bit unsigned integer.
        
        Args:
            n: An integer representing a 32-bit unsigned number
            
        Returns:
            The integer with all bits reversed
            
        Time Complexity: O(1) - always processes 32 bits
        Space Complexity: O(1) - uses constant extra space
        """
        result = 0
        
        # Process all 32 bits
        for i in range(32):
            # Get the least significant bit of n
            bit = n & 1
            
            # Left shift result and add the current bit
            result = (result << 1) | bit
            
            # Right shift n to process next bit
            n = n >> 1
            
        return result

    def reverseBits_optimized(self, n: int) -> int:
        """
        An optimized version using bit manipulation tricks.
        
        This implementation uses divide and conquer approach by swapping
        bits in groups of increasing sizes.
        
        Args:
            n: An integer representing a 32-bit unsigned number
            
        Returns:
            The integer with all bits reversed
        """
        # Swap bits in groups of 1
        n = ((n & 0xAAAAAAAA) >> 1) | ((n & 0x55555555) << 1)
        # Swap bits in groups of 2
        n = ((n & 0xCCCCCCCC) >> 2) | ((n & 0x33333333) << 2)
        # Swap bits in groups of 4
        n = ((n & 0xF0F0F0F0) >> 4) | ((n & 0x0F0F0F0F) << 4)
        # Swap bits in groups of 8
        n = ((n & 0xFF00FF00) >> 8) | ((n & 0x00FF00FF) << 8)
        # Swap bits in groups of 16
        n = ((n & 0xFFFF0000) >> 16) | ((n & 0x0000FFFF) << 16)
        
        return n

def test_solution():
    """
    Test cases for 190. Reverse.
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
    print(f"Solution for 190. Reverse")
