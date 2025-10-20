"""
# Difficulty: Medium

# 139. Word Break

Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the segmentation.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>["leet","code"]</dd>
<dt>Output:</dt>
<dd>"Expected {expected}, got {result}"</dd>
<dt>Explanation:</dt>
<dd>String 'leetcode' can be segmented using dictionary ['leet','code']</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>


### METADATA:
**Techniques**: TBD
**Data Structures**: TBD
**Patterns**: TBD
**Time Complexity**: O(n)
**Space Complexity**: O(1)

### INTUITION:
dp[i] = whether s[0:i] can be segmented. For each position, check all possible last words ending at i. If s[j:i] is in dict and dp[j] is true, then dp[i] is true.

### APPROACH:
1. **Convert to set**: Create word_set = set(wordDict) for O(1) word lookup
2. **Initialize DP array**: Create dp = [False] * (len(s) + 1) where dp[i] = can segment s[:i]
3. **Set base case**: dp[0] = True (empty string can be segmented)
4. **Iterate positions**: For each end position i from 1 to len(s)+1
5. **Try all splits**: For each start position j from 0 to i, check if dp[j] and s[j:i] in word_set
6. **Mark segmentable**: If valid split found, set dp[i] = True and break inner loop
7. **Return result**: Return dp[len(s)] indicating if entire string can be segmented

### WHY THIS WORKS:
- DP: dp[i] = true if s[0:i] can be segmented
- For each position i, check all words: if word matches s[i-len:i] and dp[i-len] true
- Trie optimization: faster word matching than set lookup
- Bottom-up: dp[0] = true (empty string), build up to dp[n]
- O(n^2 * m) time: n positions, n substrings, m avg word length

### EXAMPLE WALKTHROUGH:
```
Input: s = "leetcode", wordDict = ["leet","code"]
Step 1: Initialize DP
  dp = [True, False, False, False, False, False, False, False, False]
  dp[0] = True (empty string)

Step 2: Check each position
  i=4: s[0:4]="leet" in wordDict, dp[4] = True
  i=8: s[4:8]="code" in wordDict and dp[4]=True, dp[8] = True

Step 3: Verify segmentation
  "leet" + "code" = "leetcode" ✓

Output: True (can be segmented)
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
                if dp[i - l] and s[i - l : i] in word_set:
                    dp[i] = True
                    break

        return dp[len(s)]


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem (can be segmented)
    result = solution.wordBreak("leetcode", ["leet", "code"])
    expected = True
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Cannot be segmented
    result = solution.wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"])
    expected = False
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: Can use word multiple times
    result = solution.wordBreak("applepenapple", ["apple", "pen"])
    expected = True
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 4: Empty string
    result = solution.wordBreak("", ["leet"])
    expected = True
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 5: Optimized version
    result = solution.wordBreak_optimized("leetcode", ["leet", "code"])
    expected = True
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 139. Word Break")
