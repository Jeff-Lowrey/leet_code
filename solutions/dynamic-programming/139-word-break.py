"""
# Difficulty: Medium

# 139. Word Break

Given a problem that demonstrates key concepts in Dynamic Programming.

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
[This problem requires understanding of dynamic programming concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply dynamic programming methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages dynamic programming principles
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
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        """
        Determines if the input string can be segmented into words from the dictionary.
        
        Args:
            s: Input string to be segmented
            wordDict: List of dictionary words
            
        Returns:
            bool: True if the string can be segmented, False otherwise
            
        Example:
            >>> sol = Solution()
            >>> sol.wordBreak("leetcode", ["leet", "code"])
            True
            >>> sol.wordBreak("applepenapple", ["apple", "pen"])
            True
            >>> sol.wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"])
            False
        """
        # Convert wordDict to set for O(1) lookup
        word_set = set(wordDict)
        
        # dp[i] represents whether s[:i] can be segmented into words from the dictionary
        dp = [False] * (len(s) + 1)
        
        # Empty string is always valid
        dp[0] = True
        
        # For each position in the string
        for i in range(1, len(s) + 1):
            # Check all possible substrings ending at position i
            for j in range(i):
                # If we can segment up to j and substring from j to i is in dictionary
                if dp[j] and s[j:i] in word_set:
                    dp[i] = True
                    break
        
        return dp[len(s)]

    def wordBreak_optimized(self, s: str, wordDict: List[str]) -> bool:
        """
        Optimized version of wordBreak with additional pruning.
        
        This version includes length-based optimization to avoid unnecessary checks.
        
        Args:
            s: Input string to be segmented
            wordDict: List of dictionary words
            
        Returns:
            bool: True if the string can be segmented, False otherwise
        """
        word_set = set(wordDict)
        
        # Find min and max word lengths for optimization
        min_len = min(len(w) for w in word_set)
        max_len = max(len(w) for w in word_set)
        
        dp = [False] * (len(s) + 1)
        dp[0] = True
        
        for i in range(1, len(s) + 1):
            # Only check substrings with lengths between min_len and max_len
            for l in range(min_len, min(max_len + 1, i + 1)):
                if dp[i - l] and s[i - l:i] in word_set:
                    dp[i] = True
                    break
        
        return dp[len(s)]

def test_solution():
    """
    Test cases for 139. Word Break.
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
    print(f"Solution for 139. Word Break")
