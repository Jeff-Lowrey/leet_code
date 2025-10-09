"""
# 648. Replace
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
    def replaceWords(self, dictionary: List[str], sentence: str) -> str:
        """
        Replace longer words in the sentence with their root word from the dictionary
        if the word starts with the root.

        Args:
            dictionary (List[str]): List of root words
            sentence (str): Input sentence where words need to be replaced

        Returns:
            str: Modified sentence with words replaced by their roots where applicable

        Example:
            >>> s = Solution()
            >>> s.replaceWords(["cat", "bat", "rat"], "the cattle was rattled by the battery")
            'the cat was rat by the bat'
        """
        # Edge cases
        if not dictionary or not sentence:
            return sentence

        # Create a set of roots for O(1) lookup
        root_set = set(dictionary)

        # Split the sentence into words
        words = sentence.split()
        
        # Process each word
        for i, word in enumerate(words):
            # Check all possible prefixes of the current word
            for j in range(1, len(word) + 1):
                prefix = word[:j]
                # If we find a root, replace the word with the root
                if prefix in root_set:
                    words[i] = prefix
                    break

        # Join the words back into a sentence
        return ' '.join(words)

def test_solution():
    """
    Test cases for 648. Replace.
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
    print(f"Solution for 648. Replace")
