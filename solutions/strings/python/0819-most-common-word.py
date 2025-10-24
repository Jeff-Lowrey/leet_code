"""
# 0819. Most Common Word

# Difficulty: Easy

Given a string paragraph and a string array of the banned words banned, return
the most frequent word that is not banned. It is guaranteed there is at least
one word that is not banned, and that the answer is unique.

The words in paragraph are case-insensitive and the answer should be returned
in lowercase.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>paragraph = "Bob hit a ball, the hit BALL flew far after it was hit.", banned = ["hit"]</dd>
<dt>Output:</dt>
<dd>"ball"</dd>
<dt>Explanation:</dt>
<dd>"hit" occurs 3 times, but is banned. "ball" occurs twice and is not banned</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### METADATA:
**Techniques**: String Processing, Frequency Counting, Hash Table
**Data Structures**: Hash Map, Set
**Patterns**: Frequency Counter Pattern
**Time Complexity**: O(n + m) - Process paragraph (n) and banned list (m)
**Space Complexity**: O(n + m) - Store word frequencies and banned set

### INTUITION:
Parse the paragraph into words, count their frequencies while ignoring banned
words, then return the word with the highest frequency. Use a set for O(1)
banned word lookups.

### APPROACH:
1. **Convert banned to set**: Enable O(1) lookups for banned words
2. **Parse paragraph**: Extract words, convert to lowercase, remove punctuation
3. **Count frequencies**: Use hash map to count non-banned words
4. **Find maximum**: Return word with highest frequency

### WHY THIS WORKS:
- Set lookup for banned words is O(1) vs O(m) for list
- Hash map efficiently tracks word frequencies
- Single pass through paragraph is optimal
- Case-insensitive comparison ensures correct matching

### EXAMPLE WALKTHROUGH:
Input:
```
paragraph = "Bob hit a ball, the hit BALL flew far after it was hit."
```

banned = ["hit"]
Step 1: Convert banned to set
banned_set = {"hit"}
Step 2: Parse and count words (lowercase)
"bob": 1
"hit": 3 (banned - skip)
"a": 1
"ball": 2 ✓
"the": 1
"flew": 1
"far": 1
"after": 1
"it": 1
"was": 1
Step 3: Find maximum non-banned word
max_word = "ball" (count = 2)

Output:
```
"ball"
```

### TIME COMPLEXITY:
O(n + m) where n = paragraph length, m = banned list length

### SPACE COMPLEXITY:
O(n + m) for word frequencies and banned set

### EDGE CASES:
- **Single word**: Return that word if not banned
- **All words banned except one**: Return the one non-banned word
- **Punctuation**: Remove all punctuation correctly
- **Case sensitivity**: Handle mixed case properly

</details>
"""

from typing import List
from collections import Counter
import re


class Solution:
    def mostCommonWord(self, paragraph: str, banned: List[str]) -> str:
        """
        Find the most frequent non-banned word in paragraph.

        Time Complexity: O(n + m)
        Space Complexity: O(n + m)
        """
        # Convert banned to set for O(1) lookup
        banned_set = set(banned)

        # Parse paragraph: extract words, lowercase, remove punctuation
        words = re.findall(r'\w+', paragraph.lower())

        # Count non-banned words
        word_count = Counter(word for word in words if word not in banned_set)

        # Return most common word
        return word_count.most_common(1)[0][0]

    def mostCommonWordManual(self, paragraph: str, banned: List[str]) -> str:
        """
        Alternative: Manual parsing without regex.

        Time Complexity: O(n + m)
        Space Complexity: O(n + m)
        """
        banned_set = set(banned)
        word_count = {}

        # Parse manually
        word = []
        for char in paragraph.lower() + ' ':
            if char.isalnum():
                word.append(char)
            elif word:
                current_word = ''.join(word)
                if current_word not in banned_set:
                    word_count[current_word] = word_count.get(current_word, 0) + 1
                word = []

        # Find maximum
        max_word = ""
        max_count = 0
        for w, count in word_count.items():
            if count > max_count:
                max_count = count
                max_word = w

        return max_word


if __name__ == "__main__":
    solution = Solution()

    # Test case 1
    paragraph = "Bob hit a ball, the hit BALL flew far after it was hit."
    banned = ["hit"]
    print(f"Test 1: {solution.mostCommonWord(paragraph, banned)}")  # Expected: "ball"

    # Test case 2
    paragraph = "a."
    banned = []
    print(f"Test 2: {solution.mostCommonWord(paragraph, banned)}")  # Expected: "a"

    # Test case 3
    paragraph = "a, a, a, a, b,b,b,c, c"
    banned = ["a"]
    print(f"Test 3: {solution.mostCommonWord(paragraph, banned)}")  # Expected: "b"

    print("\nAll test cases completed!")
