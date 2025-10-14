"""
# Difficulty: Medium

# 648. Replace

In English, we have a concept called root, which can be followed by some other word to form another longer word - let's call this word derivative. For example, when the root "help" is followed by the word "ful", we can form a derivative "helpful".

Given a dictionary consisting of many roots and a sentence consisting of words separated by spaces, replace all the derivatives in the sentence with the root forming it. If a derivative can be replaced by more than one root, replace it with the root that has the shortest length.

Return the sentence after the replacement.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by the battery"</dd>
<dt>Output:</dt>
<dd>"the cat was rat by the bat"</dd>
<dt>Explanation:</dt>
<dd>Words are replaced by their shortest root: 'cattle' becomes 'cat', 'ratt' becomes 'rat'</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Build Trie of dictionary words. For each word in sentence, find shortest prefix in Trie. If found, replace with shortest; otherwise keep original word.

### APPROACH:
1. **Build trie**: Insert all dictionary words into trie
2. **Define findRoot**: Implement function to find shortest root for a word
3. **Traverse trie**: For each character in word, follow trie path
4. **Found root**: If reach end of word in trie, return prefix
5. **No root**: If path breaks or no root found, return original word
6. **Process sentence**: Split sentence, replace each word using findRoot
7. **Return result**: Join replaced words with spaces

### WHY THIS WORKS:
- Trie stores dictionary roots, replace words with shortest matching root
- For each word in sentence, search trie while traversing characters
- Stop at first matching root (shortest prefix that's a complete word)
- If no root found, keep original word
- O(m + n*k) time: m total dict length, n words in sentence, k avg word length

### EXAMPLE WALKTHROUGH:
```
Input: dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by the battery"
Step 1: Build trie from dictionary
  Insert: cat, bat, rat

Step 2: Replace each word with shortest root
  "cattle" → "cat"
  "rattled" → "rat"
  "battery" → "bat"

Output: "the cat was rat by the bat"
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

from typing import List, Optional, Dict, Tuple

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
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.replaceWords(["cat", "bat", "rat"], "the cattle was rattled by the battery")
    expected = "the cat was rat by the bat"
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Empty dictionary
    result = solution.replaceWords([], "hello world")
    expected = "hello world"
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 648. Replace")
