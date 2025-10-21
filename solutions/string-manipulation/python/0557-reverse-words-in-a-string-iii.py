"""
# 557. Reverse Words In A String Iii

# Difficulty: Easy

Given a string s, reverse the order of characters in each word within a sentence
while still preserving whitespace and initial word order.

Example:
Input: s = "Let's take LeetCode contest"
Output: "s'teL ekat edoCteeL tsetnoc"

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>s = "Let's take LeetCode contest"</dd>
<dt>Output:</dt>
<dd>s'teL ekat edoCteeL tsetnoc"</dd>
<dt>Explanation:</dt>
<dd>Reverse each word: 'Let's take LeetCode contest' becomes 's'teL ekat edoCteeL tsetnoc'</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>


### METADATA:
**Techniques**: TBD
**Data Structures**: TBD
**Patterns**: TBD
**Time Complexity**: O(n)
**Space Complexity**: O(n)

### INTUITION:
We need to reverse each word individually while keeping the words in the same order
and preserving spaces. This is straightforward: split the string by spaces, reverse
each word, and join them back together with spaces.

### APPROACH:
1. **Split by Spaces**: Divide string into individual words
2. **Reverse Each Word**: Apply string reversal to each word independently
3. **Join with Spaces**: Combine reversed words back with spaces

Alternative approaches:
- **Two-pointer method**: Find word boundaries and reverse in-place
- **List comprehension**: Concise Python-style solution
- **Manual iteration**: Process character by character

### WHY THIS WORKS:
- Splitting by spaces naturally identifies word boundaries
- Python's string slicing [::-1] efficiently reverses strings
- Joining preserves the original spacing structure
- Each word is processed independently

### EXAMPLE WALKTHROUGH:
```
Input: "Let's take LeetCode contest"

Split: ["Let's", "take", "LeetCode", "contest"]

Reverse each:
- "Let's" -> "s'teL"
- "take" -> "ekat"
- "LeetCode" -> "edoCteeL"
- "contest" -> "tsetnoc"

Join: "s'teL ekat edoCteeL tsetnoc"
```

### TIME COMPLEXITY:
O(n)
- Splitting the string: O(n)
- Reversing each word: O(n) total for all words
- Joining: O(n)
- Overall: O(n) where n is length of string

### SPACE COMPLEXITY:
O(n)
- Storing split words: O(n)
- Creating result string: O(n)
- Overall: O(n)

### EDGE CASES:
- Empty string: Return empty
- Single word: Return reversed word
- Single character words: Return unchanged
- Multiple spaces: Handled by split() method
- Leading/trailing spaces: Preserved if using split(' ') vs split()

</details>
"""


from typing import Any

class Solution:
    def reverseWords(self, s: str) -> str:
        """
        Reverse characters in each word while preserving word order.

        Args:
            s: Input string with words separated by spaces

        Returns:
            String with each word reversed

        Time Complexity: O(n) where n is length of string
        Space Complexity: O(n) for storing words and result
        """
        # Split by spaces, reverse each word, join back
        return " ".join(word[::-1] for word in s.split())

    def reverseWordsExplicit(self, s: str) -> str:
        """
        More explicit implementation showing each step.

        Args:
            s: Input string

        Returns:
            String with each word reversed
        """
        # Split into words
        words = s.split()

        # Reverse each word
        reversed_words: list[Any] = []
        for word in words:
            reversed_word = word[::-1]
            reversed_words.append(reversed_word)

        # Join back with spaces
        return " ".join(reversed_words)

    def reverseWordsTwoPointer(self, s: str) -> str:
        """
        Two-pointer approach working with character array.

        Args:
            s: Input string

        Returns:
            String with each word reversed

        Time Complexity: O(n)
        Space Complexity: O(n) for character list
        """
        chars = list(s)
        n = len(chars)
        i = 0

        while i < n:
            # Skip spaces
            if chars[i] == " ":
                i += 1
                continue

            # Find the end of current word
            j = i
            while j < n and chars[j] != " ":
                j += 1

            # Reverse the word from i to j-1
            left, right = i, j - 1
            while left < right:
                chars[left], chars[right] = chars[right], chars[left]
                left += 1
                right -= 1

            # Move to next word
            i = j

        return "".join(chars)

    def reverseWordsManual(self, s: str) -> str:
        """
        Manual implementation without using split/join.

        Args:
            s: Input string

        Returns:
            String with each word reversed
        """
        result: list[Any] = []
        current_word: list[Any] = []

        for char in s:
            if char == " ":
                # End of word - add reversed word to result
                if current_word:
                    result.extend(current_word[::-1])
                    current_word = []
                result.append(" ")
            else:
                current_word.append(char)

        # Don't forget the last word
        if current_word:
            result.extend(current_word[::-1])

        return "".join(result)

    def reverseWordsStack(self, s: str) -> str:
        """
        Using stack-based approach for each word.

        Args:
            s: Input string

        Returns:
            String with each word reversed
        """
        result = []
        stack: list[Any] = []

        for char in s:
            if char == " ":
                # Pop all characters from stack to get reversed word
                while stack:
                    result.append(stack.pop())
                result.append(" ")
            else:
                stack.append(char)

        # Process remaining characters in stack
        while stack:
            result.append(stack.pop())

        return "".join(result)


def test_solution() -> None:
    """Test cases for Problem 557."""
    solution = Solution()

    # Test case 1: Standard case
    result1 = solution.reverseWords("Let's take LeetCode contest")
    expected1 = "s'teL ekat edoCteeL tsetnoc"
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Single word
    result2 = solution.reverseWords("God")
    expected2 = "doG"
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Empty string
    result3 = solution.reverseWords("")
    expected3 = ""
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Single character
    result4 = solution.reverseWords("a")
    expected4 = "a"
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Multiple single-character words
    result5 = solution.reverseWords("a b c")
    expected5 = "a b c"
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test case 6: Words with punctuation
    result6 = solution.reverseWords("Hello, World!")
    expected6 = ",olleH !dlroW"
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test explicit solution
    result7 = solution.reverseWordsExplicit("Let's take LeetCode contest")
    expected7 = "s'teL ekat edoCteeL tsetnoc"
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    # Test two-pointer solution
    result8 = solution.reverseWordsTwoPointer("God")
    expected8 = "doG"
    assert result8 == expected8, f"Expected {expected8}, got {result8}"

    # Test manual solution
    result9 = solution.reverseWordsManual("Let's take LeetCode contest")
    expected9 = "s'teL ekat edoCteeL tsetnoc"
    assert result9 == expected9, f"Expected {expected9}, got {result9}"

    # Test stack solution
    result10 = solution.reverseWordsStack("Hello World")
    expected10 = "olleH dlroW"
    assert result10 == expected10, f"Expected {expected10}, got {result10}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 557. Reverse Words in a String III ===")

    test_cases = ["Let's take LeetCode contest", "God", "Hello World", "a b c d e", "Python is awesome"]

    for test in test_cases:
        result = solution.reverseWords(test)
        print(f"Input:  '{test}'")
        print(f"Output: '{result}'")
        print()

    # Demonstrate the logic
    print("Step-by-step for 'Let's take LeetCode contest':")
    s = "Let's take LeetCode contest"
    words = s.split()
    print(f"1. Split: {words}")
    print("2. Reverse each:")
    for word in words:
        print(f"   '{word}' -> '{word[::-1]}'")
    print(f"3. Join: '{solution.reverseWords(s)}'")
