"""
# 642. Design Search Autocomplete System
**Hard**

Design a search autocomplete system for a search engine. Users may input a sentence (at least one word and end with a special character '#').

You are given a string array sentences and an integer array times both of length n where sentences[i] is a previously typed sentence and times[i] is the corresponding number of times the sentence has been typed. For each input character except '#', return the top 3 historical hot sentences that have the same prefix as the part of the sentence already typed.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
This is an advanced autocomplete system that needs to track search frequency and return top results. We use a Trie to organize sentences by prefixes, and at each node, we maintain a list of sentences that pass through it along with their frequencies. When a character is typed, we navigate to that node and return top 3 by frequency.

### APPROACH:
1. **Build Trie with frequency**: Each node stores sentences passing through it with their counts
2. **Track current input**: Maintain current search string as user types
3. **Navigate on input**: For each character, move to corresponding child node
4. **Return top 3**: Sort sentences by frequency (descending) and lexicographically
5. **Save on '#'**: When '#' received, save current sentence and reset
6. **Update counts**: Increment count for saved sentences

### WHY THIS WORKS:
- Trie organizes sentences by prefixes efficiently
- Storing sentences at each node enables quick retrieval
- Sorting by frequency and lexicographically gives desired ranking
- Current input tracking allows stateful interaction
- Reset on '#' prepares for next query

### TIME COMPLEXITY:
- Constructor: O(N * L) where N is sentences count, L is average length
- Input: O(P * M * log M) where P is prefix length, M is matching sentences
- Sorting dominates input complexity

### SPACE COMPLEXITY: O(N * L)
For trie storage with all sentences

### EXAMPLE WALKTHROUGH:
```
sentences = ["i love you", "island", "iroman", "i love leetcode"]
times = [5, 3, 2, 2]

Build Trie:
  root -> 'i' -> sentences: [("i love you", 5), ("island", 3), ...]
       -> 'l' -> sentences: [("i love you", 5), ("i love leetcode", 2)]

Input 'i':
  Navigate to 'i' node
  Return top 3: ["i love you", "island", "i love leetcode"]

Input ' ':
  Navigate to ' ' node under 'i'
  Return: ["i love you", "i love leetcode"]

Input 'a':
  Navigate to 'a' node - doesn't exist
  Return: []

Input '#':
  Save "i a" with frequency 1
  Reset current input
```

### KEY INSIGHTS:
- Pre-storing sentences at each node trades space for query speed
- Frequency-first, lexicographic-second sorting matches requirements
- Stateful design tracks user's current input
- Hash map at nodes allows flexible sentence storage
- Reset mechanism enables continuous use

### EDGE CASES:
- Fewer than 3 matching sentences
- No matches for prefix
- Updating existing sentence frequency
- Same frequency (use lexicographic order)
- Empty initial history

</details>
"""

from collections import defaultdict


class TrieNode:
    """Node in autocomplete trie storing sentences and frequencies."""

    def __init__(self):
        self.children = {}  # character -> TrieNode
        self.sentences = {}  # sentence -> frequency


class AutocompleteSystem:
    """Search autocomplete system with frequency-based ranking."""

    def __init__(self, sentences: list[str], times: list[int]):
        """
        Initialize autocomplete system with historical data.

        Args:
            sentences: List of historical sentences
            times: Corresponding frequency counts

        Time Complexity: O(N * L) where N is sentences count, L avg length
        Space Complexity: O(N * L)
        """
        self.root = TrieNode()
        self.sentence_freq = defaultdict(int)  # Global frequency map
        self.current_input = ""  # Current search string
        self.current_node = self.root  # Current position in trie

        # Build initial trie
        for sentence, freq in zip(sentences, times, strict=False):
            self.sentence_freq[sentence] = freq
            self._add_sentence(sentence, freq)

    def _add_sentence(self, sentence: str, freq: int):
        """Add sentence to trie with frequency."""
        node = self.root

        for char in sentence:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
            node.sentences[sentence] = freq

    def _get_top_3(self, sentences_dict: dict[str, int]) -> list[str]:
        """
        Get top 3 sentences sorted by frequency (desc) then lexicographically.

        Args:
            sentences_dict: Dictionary of sentence -> frequency

        Returns:
            List of top 3 sentences
        """
        if not sentences_dict:
            return []

        # Sort by frequency (descending), then lexicographically (ascending)
        sorted_sentences = sorted(sentences_dict.items(), key=lambda x: (-x[1], x[0]))

        return [sentence for sentence, _ in sorted_sentences[:3]]

    def input(self, c: str) -> list[str]:
        """
        Process input character and return suggestions.

        Args:
            c: Input character or '#' to end input

        Returns:
            Top 3 matching sentences (empty if c is '#')

        Time Complexity: O(M * log M) where M is matching sentences
        Space Complexity: O(1)
        """
        # End of input - save sentence and reset
        if c == "#":
            sentence = self.current_input
            # Update frequency
            self.sentence_freq[sentence] += 1
            # Add to trie
            self._add_sentence(sentence, self.sentence_freq[sentence])
            # Reset for next query
            self.current_input = ""
            self.current_node = self.root
            return []

        # Add character to current input
        self.current_input += c

        # Navigate to corresponding node
        if self.current_node and c in self.current_node.children:
            self.current_node = self.current_node.children[c]
            # Return top 3 from this node
            return self._get_top_3(self.current_node.sentences)
        else:
            # No matching sentences
            self.current_node = None
            return []


class AutocompleteSystemSimple:
    """Simpler implementation without trie - filters all sentences."""

    def __init__(self, sentences: list[str], times: list[int]):
        """Initialize with sentence frequencies."""
        self.sentence_freq = {}
        for sentence, freq in zip(sentences, times, strict=False):
            self.sentence_freq[sentence] = freq
        self.current_input = ""

    def input(self, c: str) -> list[str]:
        """Process input and return top 3 matches."""
        if c == "#":
            sentence = self.current_input
            self.sentence_freq[sentence] = self.sentence_freq.get(sentence, 0) + 1
            self.current_input = ""
            return []

        self.current_input += c

        # Filter sentences with matching prefix
        matches = {
            sentence: freq for sentence, freq in self.sentence_freq.items() if sentence.startswith(self.current_input)
        }

        # Sort and return top 3
        sorted_matches = sorted(matches.items(), key=lambda x: (-x[1], x[0]))

        return [sentence for sentence, _ in sorted_matches[:3]]


def test_solution():
    """Test cases for 642. Design Search Autocomplete System."""

    # Test case 1: Standard usage
    sentences1 = ["i love you", "island", "iroman", "i love leetcode"]
    times1 = [5, 3, 2, 2]
    system1 = AutocompleteSystem(sentences1, times1)

    result = []
    result.append(system1.input("i"))  # ["i love you", "island", "i love leetcode"]
    result.append(system1.input(" "))  # ["i love you", "i love leetcode"]
    result.append(system1.input("a"))  # []
    result.append(system1.input("#"))  # []

    assert "i love you" in result[0]
    assert "island" in result[0]
    assert len(result[1]) <= 3
    assert result[2] == []
    assert result[3] == []

    # Test case 2: Building new sentence
    sentences2 = ["abc", "abcd", "abcde"]
    times2 = [3, 2, 1]
    system2 = AutocompleteSystem(sentences2, times2)

    assert system2.input("a") == ["abc", "abcd", "abcde"]
    assert system2.input("b") == ["abc", "abcd", "abcde"]
    assert system2.input("c") == ["abc", "abcd", "abcde"]

    # Test case 3: No matches
    sentences3 = ["hello"]
    times3 = [1]
    system3 = AutocompleteSystem(sentences3, times3)

    assert system3.input("w") == []
    assert system3.input("o") == []

    # Test case 4: Frequency update
    sentences4 = ["test"]
    times4 = [1]
    system4 = AutocompleteSystem(sentences4, times4)

    system4.input("t")
    system4.input("e")
    system4.input("s")
    system4.input("t")
    system4.input("#")  # Now "test" has frequency 2

    result4 = system4.input("t")
    assert "test" in result4

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    print("=== 642. Design Search Autocomplete System ===")

    sentences = ["i love you", "island", "iroman", "i love leetcode"]
    times = [5, 3, 2, 2]

    system = AutocompleteSystem(sentences, times)

    print("Initial sentences and frequencies:")
    for s, t in zip(sentences, times, strict=False):
        print(f"  '{s}': {t}")

    print("\nSimulating user typing 'i love you#':")

    inputs = ["i", " ", "l", "o", "v", "e", " ", "y", "o", "u", "#"]
    current = ""

    for char in inputs:
        if char != "#":
            current += char
        suggestions = system.input(char)

        if char == "#":
            print(f"  Input: '{current}' (saved)")
            current = ""
        else:
            print(f"  Typed: '{current}' -> Suggestions: {suggestions}")

    print("\nNow typing 'i love' again - 'i love you' should have higher frequency:")
    current = ""
    for char in ["i", " ", "l"]:
        current += char
        suggestions = system.input(char)
        print(f"  Typed: '{current}' -> Suggestions: {suggestions}")

    print("\nAutocomplete system with frequency-based ranking working!")
