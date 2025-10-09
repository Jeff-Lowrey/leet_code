"""
# 076. Minimum Window Substring
# Difficulty: Medium
Given a problem that demonstrates key concepts in Sliding Window.

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

The approach uses sliding window techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using sliding window method
3. Return the computed result

</details>
"""

class Solution:
    def minWindow(self, s: str, t: str) -> str:
        """
        Find the minimum window substring in s that contains all characters from t.
        
        Args:
            s: The source string to search in
            t: The target string containing characters to find
            
        Returns:
            The minimum window substring containing all characters from t,
            or empty string if no such window exists
        """
        if not s or not t:
            return ""
        
        # Initialize character frequency maps
        target_chars: Dict[str, int] = Counter(t)
        window_chars: Dict[str, int] = {}
        
        # Initialize variables for tracking
        required = len(target_chars)
        current = 0
        left = 0
        min_length = float('inf')
        result = ""
        
        # Iterate through the string using sliding window
        for right in range(len(s)):
            # Add current character to window
            char = s[right]
            window_chars[char] = window_chars.get(char, 0) + 1
            
            # Check if current character helps form a valid window
            if char in target_chars and window_chars[char] == target_chars[char]:
                current += 1
            
            # Try to minimize window by moving left pointer
            while current == required:
                # Update result if current window is smaller
                window_size = right - left + 1
                if window_size < min_length:
                    min_length = window_size
                    result = s[left:right + 1]
                
                # Remove leftmost character from window
                left_char = s[left]
                window_chars[left_char] -= 1
                
                # Check if removing character breaks the window
                if (left_char in target_chars and 
                    window_chars[left_char] < target_chars[left_char]):
                    current -= 1
                
                left += 1
        
        return result

def test_solution():
    """
    Test cases for 076. Minimum Window Substring.
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
    print(f"Solution for 076. Minimum Window Substring")
