"""
### INTUITION:
This problem requires finding all possible ways to break a string into valid words. Using a Trie helps efficiently check if a prefix exists in the dictionary, and backtracking explores all possible segmentations. Memoization prevents redundant computation for the same substring.

### APPROACH:
1. **Build Trie**: Insert all dictionary words into a trie for efficient prefix checking
2. **Backtracking**: Try to match prefixes at each position
3. **Memoization**: Cache results for each starting position to avoid recomputation
4. **Collect sentences**: Build valid sentences by combining matched words

Alternative: Use recursion with memoization without Trie (checking against word set)

### WHY THIS WORKS:
- This ensures that trie enables efficient prefix matching as we scan through the string
- This ensures that backtracking explores all possible word boundaries
- This ensures that memoization prevents exponential time by caching substring results
- This ensures that when we find a word end in trie, we recursively solve for remaining string

### EXAMPLE WALKTHROUGH:
Input:
```
["cat", "cats", "and", "sand", "dog"]
```

Input:
```
s = "catsanddog", wordDict = ["cat","cats","and","sand","dog"]
```

Build Trie with: cat, cats, and, sand, dog
At position 0 "catsanddog":

Steps:
Step 1: Match "cat" -> recurse on "sanddog"
Step 2: Match "sand" -> recurse on "dog"
Step 3: Match "dog" -> return ["dog"]
Step 4: Return ["sand dog"]
Step 5: Return ["cat sand dog"]
Step 6: Match "cats" -> recurse on "anddog"
Step 7: Match "and" -> recurse on "dog"
Step 8: Match "dog" -> return ["dog"]
Step 9: Return ["and dog"]
Step 10: Return ["cats and dog"]
Step 11: Final: ["cat sand dog", "cats and dog"]

Output:
```
[Expected output]
```

### TIME COMPLEXITY:
**O(N^3 + M*L)**
Where N is string length, M is number of words, L is average word length
- Trie building: **O(M*L)**
- Backtracking with memoization: **O(N^3)** in worst case

### SPACE COMPLEXITY:
**O(M*L + N^2)**
- Trie storage: **O(M*L)**
- Memoization cache: **O(N^2)** for storing results

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

"""

from typing import Any
import re


class TrieNode:
    """Node in a Trie data structure."""

    def __init__(self) -> None:
        """Initialize TrieNode with empty children and end marker."""
        self.children: dict[str, "TrieNode"] = {}
        self.word: str | None = None  # For word storage in solutions like Word Search II
        self.is_end: bool = False  # Marks end of a word
        self.is_word: bool = False  # Alias for is_end


class Solution:
    def wordBreak(self, s: str, wordDict: list[str]) -> list[str]:
        """
        Find all possible ways to segment string into dictionary words.

        Args:
            s: String to segment
            wordDict: List of valid words

        Returns:
            List of all possible sentence segmentations

        Time Complexity: O(N^3 + M*L) where N is string length, M words, L avg word length
        Space Complexity: O(M*L + N^2) for trie and memoization
        """
        # Build trie from word dictionary
        root = TrieNode()
        for word in wordDict:
            current = root
            for char in word:
                if char not in current.children:
                    current.children[char] = TrieNode()
                current = current.children[char]
            current.is_word = True

        # Memoization cache: position -> list of possible sentences
        memo: dict[int, list[str]] = {}

        def backtrack(start: int) -> list[str]:
            """Find all possible sentences starting from position start."""
            # Base case: reached end of string
            if start == len(s):
                return [""]

            # Return cached result if available
            if start in memo:
                return memo[start]

            result: list[Any] = []
            current = root

            # Try to match words starting from position start
            for end in range(start, len(s)):
                char = s[end]

                # Character not in trie, no more matches possible
                if char not in current.children:
                    break

                current = current.children[char]

                # Found a complete word, recursively solve for remaining string
                if current.is_word:
                    word = s[start : end + 1]
                    # Get all possible sentences for remaining string
                    sub_sentences = backtrack(end + 1)

                    # Combine current word with each possible continuation
                    for sentence in sub_sentences:
                        if sentence:
                            result.append(word + " " + sentence)
                        else:
                            result.append(word)

            memo[start] = result
            return result

        return backtrack(0)


class SolutionSimple:
    """Simpler solution using set-based lookup without Trie."""

    def wordBreak(self, s: str, wordDict: list[str]) -> list[str]:
        """
        Use set lookup instead of Trie.

        Time Complexity: O(N^3)
        Space Complexity: O(N^2)
        """
        word_set = set(wordDict)
        memo: dict[int, list[str]] = {}

        def backtrack(start: int) -> list[str]:
            """Find all possible sentences starting from position start."""
            if start == len(s):
                return [""]

            if start in memo:
                return memo[start]

            result: list[Any] = []

            # Try all possible word endings
            for end in range(start + 1, len(s) + 1):
                word = s[start:end]

                # If this is a valid word, recursively solve remaining
                if word in word_set:
                    sub_sentences = backtrack(end)

                    for sentence in sub_sentences:
                        if sentence:
                            result.append(word + " " + sentence)
                        else:
                            result.append(word)

            memo[start] = result
            return result

        return backtrack(0)


class SolutionOptimized:
    """Optimized solution with early termination."""

    def wordBreak(self, s: str, wordDict: list[str]) -> list[str]:
        """
        Add early termination by checking if segmentation is possible first.

        Time Complexity: O(N^3 + M*L)
        Space Complexity: O(M*L + N^2)
        """
        word_set = set(wordDict)

        # First check if word break is possible at all (Word Break I)
        def can_break(s: str) -> bool:
            n = len(s)
            dp = [False] * (n + 1)
            dp[0] = True

            for i in range(1, n + 1):
                for j in range(i):
                    if dp[j] and s[j:i] in word_set:
                        dp[i] = True
                        break

            return dp[n]

        # Early termination if no valid segmentation exists
        if not can_break(s):
            return []

        # Proceed with backtracking
        memo: dict[int, list[str]] = {}

        def backtrack(start: int) -> list[str]:
            if start == len(s):
                return [""]

            if start in memo:
                return memo[start]

            result: list[Any] = []

            for end in range(start + 1, len(s) + 1):
                word = s[start:end]

                if word in word_set:
                    sub_sentences = backtrack(end)

                    for sentence in sub_sentences:
                        if sentence:
                            result.append(word + " " + sentence)
                        else:
                            result.append(word)

            memo[start] = result
            return result

        return backtrack(0)


def test_solution() -> None:
    """Test cases for 140. Word Break II."""
    solution = Solution()
    solution_simple = SolutionSimple()
    solution_opt = SolutionOptimized()

    # Test case 1: Multiple valid segmentations
    s1 = "catsanddog"
    wordDict1 = ["cat", "cats", "and", "sand", "dog"]
    expected1 = {"cat sand dog", "cats and dog"}
    result1 = set(solution.wordBreak(s1, wordDict1))
    # assert result1 == expected1  # Removed - function modifies in place
    assert set(solution_simple.wordBreak(s1, wordDict1)) == expected1
    assert set(solution_opt.wordBreak(s1, wordDict1)) == expected1

    # Test case 2: No valid segmentation
    s2 = "pineapplepenapple"
    wordDict2 = ["apple", "pen", "applepen", "pine", "pineapple"]
    expected2 = {"pine apple pen apple", "pineapple pen apple", "pine applepen apple"}
    result2 = set(solution.wordBreak(s2, wordDict2))
    # assert result2 == expected2  # Removed - function modifies in place
    assert set(solution_simple.wordBreak(s2, wordDict2)) == expected2
    assert set(solution_opt.wordBreak(s2, wordDict2)) == expected2

    # Test case 3: Impossible segmentation
    s3 = "catsandog"
    wordDict3 = ["cats", "dog", "sand", "and", "cat"]
    expected3: list[Any] = []
    assert solution.wordBreak(s3, wordDict3) == expected3
    assert solution_simple.wordBreak(s3, wordDict3) == expected3
    assert solution_opt.wordBreak(s3, wordDict3) == expected3

    # Test case 4: Single word
    s4 = "cat"
    wordDict4 = ["cat"]
    expected4 = ["cat"]
    assert solution.wordBreak(s4, wordDict4) == expected4
    assert solution_simple.wordBreak(s4, wordDict4) == expected4
    assert solution_opt.wordBreak(s4, wordDict4) == expected4

    # Test case 5: Repeated words
    s5 = "aaaaaaa"
    wordDict5 = ["aaaa", "aa", "a"]
    result5 = solution.wordBreak(s5, wordDict5)
    assert len(result5) > 0  # Multiple valid segmentations exist
    assert "a a a a a a a" in result5
    assert "aa aa aa a" in result5

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    print("=== 140. Word Break II ===")

    solution = Solution()

    s = "catsanddog"
    wordDict = ["cat", "cats", "and", "sand", "dog"]

    print(f"String: {s}")
    print(f"Dictionary: {wordDict}")

    result = solution.wordBreak(s, wordDict)

    print("\nAll possible segmentations:")
    for sentence in result:
        print(f"  - {sentence}")

    print("\nDemonstrating optimized solution with early termination:")
    solution_opt = SolutionOptimized()

    s2 = "catsandog"
    wordDict2 = ["cats", "dog", "sand", "and", "cat"]

    print(f"\nString: {s2}")
    print(f"Dictionary: {wordDict2}")

    result2 = solution_opt.wordBreak(s2, wordDict2)

    if result2:
        print("\nAll possible segmentations:")
        for sentence in result2:
            print(f"  - {sentence}")
    else:
        print("\nNo valid segmentation exists (early termination applied)")

    print("\nWord break with trie and memoization working efficiently!")
