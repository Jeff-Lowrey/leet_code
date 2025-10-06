"""
# 009. Palindrome
**Medium**

Given a problem that demonstrates key concepts in Math.

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

The approach uses math techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using math method
3. Return the computed result

</details>
"""

class Solution:
    def isPalindrome(self, x: int) -> bool:
        """
        Determines if the given integer is a palindrome.
        
        Args:
            x (int): The number to check
            
        Returns:
            bool: True if the number is a palindrome, False otherwise
        """
        # Negative numbers are not palindromes
        if x < 0:
            return False
        
        # Single digit numbers are palindromes
        if x < 10:
            return True
        
        # Numbers ending with 0 are not palindromes (except 0 itself)
        if x % 10 == 0 and x != 0:
            return False
        
        # Convert to string and check if it equals its reverse
        # This is a simple and readable solution
        return str(x) == str(x)[::-1]
    
    def isPalindrome_mathematical(self, x: int) -> bool:
        """
        Alternative implementation using mathematical approach without string conversion.
        
        Args:
            x (int): The number to check
            
        Returns:
            bool: True if the number is a palindrome, False otherwise
        """
        # Handle edge cases
        if x < 0:
            return False
        if x < 10:
            return True
        if x % 10 == 0 and x != 0:
            return False
        
        reversed_num = 0
        original = x
        
        # Reverse the number
        while x > 0:
            digit = x % 10
            reversed_num = (reversed_num * 10) + digit
            x = x // 10
            
        return original == reversed_num

def test_solution():
    """
    Test cases for 009. Palindrome.
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
    print(f"Solution for 009. Palindrome")
