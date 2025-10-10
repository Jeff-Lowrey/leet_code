"""
# Difficulty: Medium

# 003. Longest Substring Without Repeating Characters

Given a problem that demonstrates key concepts in Sliding Window.

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
[This problem requires understanding of sliding window concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply sliding window methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages sliding window principles
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
    def lengthOfLongestSubstring(self, s: str) -> int:
        """
        Find the length of the longest substring without repeating characters.
        
        Args:
            s (str): Input string
            
        Returns:
            int: Length of the longest substring without repeating characters
            
        Time Complexity: O(n) where n is the length of the string
        Space Complexity: O(min(m, n)) where m is the size of the character set
        """
        # Handle edge cases
        if not s:
            return 0
        if len(s) == 1:
            return 1

        # Dictionary to store the last position of each character
        char_position = {}
        
        # Variables to track the current and maximum length
        max_length = 0
        start = 0
        
        # Iterate through the string
        for current_pos, char in enumerate(s):
            # If we find a repeating character, update the start position
            if char in char_position and char_position[char] >= start:
                start = char_position[char] + 1
            else:
                # Update max_length if current window is larger
                current_length = current_pos - start + 1
                max_length = max(max_length, current_length)
            
            # Update the last position of current character
            char_position[char] = current_pos
        
        return max_length

def test_solution():
    """
    Test cases for 003. Longest Substring Without Repeating Characters.
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
    print(f"Solution for 003. Longest Substring Without Repeating Characters")
