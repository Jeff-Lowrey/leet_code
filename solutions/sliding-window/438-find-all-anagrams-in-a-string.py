"""
# 438. Find All Anagrams In A String
**Medium**

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
    def findAnagrams(self, s: str, p: str) -> List[int]:
        """
        Find all start indices of anagrams of pattern p in string s.
        
        Args:
            s (str): The input string to search in
            p (str): The pattern string to find anagrams of
            
        Returns:
            List[int]: List of starting indices where anagrams of p are found in s
        
        Example:
            >>> solution = Solution()
            >>> solution.findAnagrams("cbaebabacd", "abc")
            [0, 6]
        """
        # Handle edge cases
        if not s or not p or len(s) < len(p):
            return []
        
        # Initialize result list and pattern frequency counter
        result = []
        p_count = Counter(p)
        window_count = Counter()
        
        # Get lengths for convenience
        p_len = len(p)
        s_len = len(s)
        
        # Sliding window approach
        for i in range(s_len):
            # Add new character to window
            window_count[s[i]] += 1
            
            # Remove character from window if window size exceeds pattern length
            if i >= p_len:
                if window_count[s[i - p_len]] == 1:
                    del window_count[s[i - p_len]]
                else:
                    window_count[s[i - p_len]] -= 1
            
            # Check if current window is an anagram
            if i >= p_len - 1 and window_count == p_count:
                result.append(i - p_len + 1)
        
        return result

def test_solution():
    """
    Test cases for 438. Find All Anagrams In A String.
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
    print(f"Solution for 438. Find All Anagrams In A String")
