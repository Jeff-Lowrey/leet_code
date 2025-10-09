"""
# 745. Prefix And Suffix Search
# Difficulty: Hard
Design a special dictionary that searches the words in it by a prefix and a suffix.

Implement the WordFilter class:
- WordFilter(string[] words) Initializes the object with the words in the dictionary.
- f(string pref, string suff) Returns the index of the word in the dictionary, which has the prefix pref and the suffix suff. If there is more than one valid index, return the largest of them. If there is no such word in the dictionary, return -1.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
We need to efficiently search for words that match both a prefix and suffix. A clever trick is to create combined keys like "suffix{word}prefix" where '{' acts as a separator. We can then build a trie with all possible suffix#prefix combinations for each word. When searching, we look up "suff{pref" in the trie.

### APPROACH:
1. **Trie with combined keys**: For each word, create entries for all suffix-prefix combinations
2. **Store indices**: At each node, store the maximum word index seen so far
3. **Search**: Look up "suffix{prefix" combination in trie
4. **Return max index**: Return the index stored at the final node

Alternative approaches:
- Two tries (one for prefix, one for suffix reversed)
- Hash map with all combinations
- Brute force filtering

### WHY THIS WORKS:
- Combining suffix and prefix with separator allows single trie lookup
- Storing maximum index at each node gives us the largest valid index
- All possible suffix-prefix pairs ensure we find all matches
- Trie structure provides O(L) lookup where L is prefix+suffix length

### TIME COMPLEXITY:
- Constructor: O(N * L^3) where N is words count, L is max word length
  - For each word, we create L^2 combinations, each taking O(L) to insert
- f(): O(P + S) where P is prefix length, S is suffix length

### SPACE COMPLEXITY: O(N * L^3)
For storing all suffix-prefix combinations in trie

### EXAMPLE WALKTHROUGH:
```
words = ["apple"]

Build Trie with combinations:
  "e{a" (suffix "e", prefix "a")
  "le{a" (suffix "le", prefix "a")
  "ple{a" (suffix "ple", prefix "a")
  ...
  "e{ap" (suffix "e", prefix "ap")
  "le{ap" (suffix "le", prefix "ap")
  ...
  "apple{apple" (full word)

f("a", "e"):
  Look up "e{a" in trie
  Find index 0 stored at that node
  Return 0

words = ["apple", "apply", "application"]
indices: [0, 1, 2]

f("app", "y"):
  Look up "y{app" in trie
  Find index 1 (apply)
  Return 1

f("app", "e"):
  Look up "e{app" in trie
  Find indices 0 (apple) and 2 (application)
  Return 2 (maximum)
```

### KEY INSIGHTS:
- Separator character '{' is chosen to be lexicographically between lowercase letters
- All possible suffix-prefix pairs ensure complete coverage
- Storing max index eliminates need for sorting during query
- Space-time tradeoff: high space usage for fast queries
- Can optimize by only storing relevant combinations

### EDGE CASES:
- Multiple words with same prefix and suffix
- Word is both prefix and suffix
- Empty prefix or suffix
- No matching words
- Single character words

</details>
"""

class TrieNode:
    """Node in the trie storing word indices."""

    def __init__(self):
        self.children = {}  # character -> TrieNode
        self.index = -1  # Maximum word index at this node

class WordFilter:
    """Filter words by prefix and suffix using trie."""

    def __init__(self, words: list[str]):
        """
        Initialize filter with dictionary words.

        Args:
            words: List of words to filter

        Time Complexity: O(N * L^3) where N is words count, L is max length
        Space Complexity: O(N * L^3)
        """
        self.root = TrieNode()

        # Build trie with all suffix{prefix combinations
        for index, word in enumerate(words):
            word_len = len(word)

            # For each suffix (including empty string)
            for i in range(word_len + 1):
                suffix = word[i:]

                # For each prefix (including empty string)
                for j in range(word_len + 1):
                    prefix = word[:j]

                    # Create combined key: suffix{prefix
                    key = suffix + "{" + prefix
                    self._insert(key, index)

    def _insert(self, key: str, index: int):
        """Insert key into trie with word index."""
        node = self.root

        for char in key:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
            # Update max index seen at this node
            node.index = index

    def f(self, pref: str, suff: str) -> int:
        """
        Find word with given prefix and suffix.

        Args:
            pref: Required prefix
            suff: Required suffix

        Returns:
            Maximum index of matching word, or -1 if none

        Time Complexity: O(P + S) where P is prefix length, S is suffix length
        Space Complexity: O(1)
        """
        # Search for suffix{prefix combination
        key = suff + "{" + pref
        node = self.root

        for char in key:
            if char not in node.children:
                return -1
            node = node.children[char]

        return node.index

class WordFilterHashMap:
    """Alternative implementation using hash map."""

    def __init__(self, words: list[str]):
        """
        Initialize using hash map for all combinations.

        Time Complexity: O(N * L^2)
        Space Complexity: O(N * L^2)
        """
        self.map = {}

        for index, word in enumerate(words):
            word_len = len(word)

            # Store all suffix#prefix combinations
            for i in range(word_len + 1):
                for j in range(word_len + 1):
                    key = word[i:] + "#" + word[:j]
                    # Later indices override earlier ones (we want max)
                    self.map[key] = index

    def f(self, pref: str, suff: str) -> int:
        """Find word with given prefix and suffix."""
        key = suff + "#" + pref
        return self.map.get(key, -1)

class WordFilterBruteForce:
    """Brute force solution for comparison."""

    def __init__(self, words: list[str]):
        """Store words list."""
        self.words = words

    def f(self, pref: str, suff: str) -> int:
        """
        Brute force search through all words.

        Time Complexity: O(N * (P + S))
        Space Complexity: O(1)
        """
        result = -1

        for index, word in enumerate(self.words):
            if word.startswith(pref) and word.endswith(suff):
                result = index  # Keep updating to get maximum

        return result

def test_solution():
    """Test cases for 745. Prefix And Suffix Search."""

    # Test case 1: Standard case
    words1 = ["apple"]
    filter1 = WordFilter(words1)
    assert filter1.f("a", "e") == 0
    assert filter1.f("b", "e") == -1

    filter1_hm = WordFilterHashMap(words1)
    assert filter1_hm.f("a", "e") == 0
    assert filter1_hm.f("b", "e") == -1

    # Test case 2: Multiple words
    words2 = ["apple", "apply", "application"]
    filter2 = WordFilter(words2)
    assert filter2.f("app", "e") == 0  # apple
    assert filter2.f("app", "y") == 1  # apply
    assert filter2.f("a", "e") == 0  # apple (index 0)

    filter2_hm = WordFilterHashMap(words2)
    assert filter2_hm.f("app", "e") == 0
    assert filter2_hm.f("app", "y") == 1

    # Test case 3: Return maximum index
    words3 = ["test", "test"]  # Same word twice
    filter3 = WordFilter(words3)
    assert filter3.f("test", "test") == 1  # Should return 1 (max index)

    filter3_hm = WordFilterHashMap(words3)
    assert filter3_hm.f("test", "test") == 1

    # Test case 4: No match
    words4 = ["hello", "world"]
    filter4 = WordFilter(words4)
    assert filter4.f("h", "d") == -1  # No word starts with 'h' and ends with 'd'
    assert filter4.f("w", "o") == -1  # "world" doesn't end with 'o'

    # Test case 5: Empty prefix/suffix
    words5 = ["test"]
    filter5 = WordFilter(words5)
    assert filter5.f("", "test") == 0  # Empty prefix, full suffix
    assert filter5.f("test", "") == 0  # Full prefix, empty suffix
    assert filter5.f("", "") == 0  # Both empty

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    print("=== 745. Prefix And Suffix Search ===")

    words = ["apple", "apply", "application", "appreciate"]
    filter_system = WordFilter(words)

    print(f"Dictionary: {words}")
    print("\nSearching for words:")

    queries = [("app", "e"), ("app", "y"), ("a", "e"), ("ap", "ion"), ("x", "y")]

    for prefix, suffix in queries:
        result = filter_system.f(prefix, suffix)
        if result != -1:
            print(f"  f('{prefix}', '{suffix}') = {result} (word: '{words[result]}')")
        else:
            print(f"  f('{prefix}', '{suffix}') = {result} (no match)")

    print("\nDemonstrating maximum index behavior:")
    words2 = ["apple", "banana", "apple", "cherry", "apple"]
    filter2 = WordFilter(words2)
    print(f"Dictionary: {words2}")
    result = filter2.f("app", "e")
    print(f"f('app', 'e') = {result} (returns maximum index)")

    print("\nComparing with HashMap implementation:")
    filter_hm = WordFilterHashMap(words)
    print(f"HashMap f('app', 'y') = {filter_hm.f('app', 'y')}")
    print(f"HashMap f('a', 'e') = {filter_hm.f('a', 'e')}")

    print("\nPrefix and suffix search with trie completed successfully!")
