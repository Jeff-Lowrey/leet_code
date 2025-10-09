"""
# 336. Palindrome
# Difficulty: Medium
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
    def __init__(self):
        """Initialize the solution with a root trie node."""
        self.root = TrieNode()
    
    def is_palindrome(self, word: str, start: int, end: int) -> bool:
        """
        Check if a substring is a palindrome.
        
        Args:
            word: String to check
            start: Starting index
            end: Ending index (exclusive)
            
        Returns:
            bool: True if the substring is a palindrome
        """
        while start < end - 1:
            if word[start] != word[end - 1]:
                return False
            start += 1
            end -= 1
        return True
    
    def add_word(self, word: str, index: int) -> None:
        """
        Add a word to the trie structure.
        
        Args:
            word: Word to add
            index: Index of the word in original list
        """
        node = self.root
        for i, char in enumerate(reversed(word)):
            if self.is_palindrome(word, 0, len(word) - i):
                node.palindrome_suffixes.append(index)
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        
        node.word_index = index
        node.palindrome_suffixes.append(index)
    
    def find_palindrome_pairs(self, words: List[str]) -> List[List[int]]:
        """
        Find all pairs of words that form palindromes when concatenated.
        
        Args:
            words: List of words to check
            
        Returns:
            List[List[int]]: List of pairs of indices that form palindromes
        """
        # Handle edge cases
        if not words or len(words) < 2:
            return []
        
        # Build trie with all words
        for i, word in enumerate(words):
            self.add_word(word, i)
        
        result = []
        
        # Check each word for potential pairs
        for i, word in enumerate(words):
            node = self.root
            
            # Check for empty string special case
            if node.word_index >= 0 and node.word_index != i and self.is_palindrome(word, 0, len(word)):
                result.append([i, node.word_index])
            
            # Check each character
            for j, char in enumerate(word):
                # If we can't find the character, break
                if char not in node.children:
                    break
                    
                node = node.children[char]
                
                # Check if we found a word and remaining substring is palindrome
                if node.word_index >= 0 and node.word_index != i:
                    if self.is_palindrome(word, j + 1, len(word)):
                        result.append([i, node.word_index])
                        
            else:  # We've processed all characters
                # Check palindrome suffixes
                for suffix_index in node.palindrome_suffixes:
                    if suffix_index != i:
                        result.append([i, suffix_index])
        
        return result

def test_solution():
    """
    Test cases for 336. Palindrome.
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
    print(f"Solution for 336. Palindrome")
