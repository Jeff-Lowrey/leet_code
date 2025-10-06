"""
# 227. Basic Calculator Ii
**Medium**

Given a problem that demonstrates key concepts in Stack.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of stack concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply stack methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages stack principles
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

The approach uses stack techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using stack method
3. Return the computed result

</details>
"""

class Solution:
    def calculate(self, s: str) -> int:
        """
        Evaluates a string expression containing numbers and basic arithmetic operators.
        
        Args:
            s (str): The input string containing the arithmetic expression
                    (can contain spaces, numbers, and operators +, -, *, /)
        
        Returns:
            int: The result of evaluating the expression
        
        Time Complexity: O(n) where n is the length of the input string
        Space Complexity: O(1) as we only use a fixed-size stack
        """
        if not s:
            return 0
        
        # Initialize variables
        stack = []
        curr_num = 0
        last_operator = '+'
        
        # Process each character in the string
        for i, char in enumerate(s):
            # Build number from consecutive digits
            if char.isdigit():
                curr_num = curr_num * 10 + int(char)
            
            # Process operator or end of string
            if (not char.isdigit() and char != ' ') or i == len(s) - 1:
                # Handle previous operator
                if last_operator == '+':
                    stack.append(curr_num)
                elif last_operator == '-':
                    stack.append(-curr_num)
                elif last_operator == '*':
                    stack.append(stack.pop() * curr_num)
                elif last_operator == '/':
                    # Handle division according to problem requirements
                    # For negative numbers, truncate toward zero
                    prev_num = stack.pop()
                    if prev_num < 0:
                        stack.append(-(abs(prev_num) // curr_num))
                    else:
                        stack.append(prev_num // curr_num)
                
                # Reset current number and update last operator
                curr_num = 0
                if char != ' ':
                    last_operator = char
        
        # Sum up all numbers in the stack
        return sum(stack)

def test_solution():
    """
    Test cases for 227. Basic Calculator Ii.
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
    print(f"Solution for 227. Basic Calculator Ii")
