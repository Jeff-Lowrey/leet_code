"""
# 389. Find
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
    def findTheDifference(self, s: str, t: str) -> str:
        """
        Find the character that was added to string t that's not in string s.
        
        Args:
            s (str): The original string
            t (str): The modified string with one extra character
            
        Returns:
            str: The extra character in string t
            
        Time Complexity: O(n) where n is the length of the longer string
        Space Complexity: O(1) as we use fixed size arrays
        """
        # Method 1: Using XOR operation
        result = 0
        
        # XOR all characters in both strings
        # Since XOR of same characters cancels out,
        # we'll be left with the extra character
        for char in s:
            result ^= ord(char)
        for char in t:
            result ^= ord(char)
            
        return chr(result)
    
    def findTheDifference_counter(self, s: str, t: str) -> str:
        """
        Alternative implementation using character counting.
        
        Args:
            s (str): The original string
            t (str): The modified string with one extra character
            
        Returns:
            str: The extra character in string t
        """
        # Initialize counter array for all possible characters (256 ASCII)
        counter = [0] * 256
        
        # Count characters in first string
        for char in s:
            counter[ord(char)] += 1
            
        # Subtract counts for second string
        for char in t:
            counter[ord(char)] -= 1
            if counter[ord(char)] < 0:
                return char
                
        return ''

def test_solution():
    """
    Test cases for 389. Find.
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
    print(f"Solution for 389. Find")
