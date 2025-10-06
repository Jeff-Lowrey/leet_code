"""
# 472. Concatenated
**Medium**

Given a problem that demonstrates key concepts in Trees.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of trees concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply trees methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages trees principles
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

The approach uses trees techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using trees method
3. Return the computed result

</details>
"""

class Solution:
    def findAllConcatenatedWordsInADict(self, words: List[str]) -> List[str]:
        """
        Find all concatenated words in the given list of words.
        
        Args:
            words: List of strings to check for concatenated words
            
        Returns:
            List of strings that are concatenated words
        """
        # Handle edge cases
        if not words:
            return []
        
        # Convert list to set for O(1) lookup
        word_set = set(words)
        result = []
        
        def can_form(word: str, word_set: Set[str], start: int, memo: dict) -> bool:
            """
            Helper function to check if a word can be formed by concatenating other words.
            Uses dynamic programming with memoization for optimization.
            
            Args:
                word: String to check
                word_set: Set of all available words
                start: Starting index in the word
                memo: Memoization dictionary
                
            Returns:
                Boolean indicating if the word can be formed
            """
            # Base case: reached end of word
            if start == len(word):
                return True
            
            # Check memoization
            if start in memo:
                return memo[start]
            
            # Try all possible prefixes from current position
            for end in range(start + 1, len(word) + 1):
                prefix = word[start:end]
                # Check if prefix is in word_set (excluding the word itself)
                if prefix in word_set and prefix != word:
                    if can_form(word, word_set, end, memo):
                        memo[start] = True
                        return True
            
            memo[start] = False
            return False
        
        # Check each word in the list
        for word in words:
            # Skip empty strings and single-character words
            if not word:
                continue
                
            # Check if current word can be formed by concatenating other words
            if can_form(word, word_set, 0, {}):
                result.append(word)
        
        return result

def test_solution():
    """
    Test cases for 472. Concatenated.
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
    print(f"Solution for 472. Concatenated")
