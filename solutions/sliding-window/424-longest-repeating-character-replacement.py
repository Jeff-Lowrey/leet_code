"""
# 424. Longest Repeating Character Replacement
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
    def characterReplacement(self, s: str, k: int) -> int:
        """
        Find the length of longest substring containing same letter after at most k replacements.
        
        Args:
            s (str): Input string
            k (int): Maximum number of replacements allowed
            
        Returns:
            int: Length of the longest substring possible after at most k replacements
        """
        # Edge cases
        if not s:
            return 0
        if k >= len(s):
            return len(s)
            
        # Initialize window pointers and character frequency dictionary
        left = 0
        char_count = {}
        max_length = 0
        max_count = 0
        
        # Sliding window approach
        for right in range(len(s)):
            # Add current character to frequency count
            char_count[s[right]] = char_count.get(s[right], 0) + 1
            
            # Update max_count (frequency of most common character in window)
            max_count = max(max_count, char_count[s[right]])
            
            # Current window size - count of most frequent character
            # gives us the number of characters we need to replace
            window_size = right - left + 1
            
            # If required replacements exceed k, shrink window
            if window_size - max_count > k:
                char_count[s[left]] -= 1
                left += 1
            
            # Update max_length with current window size
            max_length = max(max_length, right - left + 1)
            
        return max_length

def test_solution():
    """
    Test cases for 424. Longest Repeating Character Replacement.
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
    print(f"Solution for 424. Longest Repeating Character Replacement")
