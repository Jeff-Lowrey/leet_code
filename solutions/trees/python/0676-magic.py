"""
# Difficulty: Medium

# 0676. Implement Magic Dictionary

Design a data structure that is initialized with a list of different words. Provided a string, you should determine if you can change exactly one character in this string to match any word in the data structure.

Implement the MagicDictionary class:
- MagicDictionary() Initializes the object.
- void buildDict(String[] dictionary) Sets the data structure with an array of distinct strings dictionary.
- bool search(String searchWord) Returns true if you can change exactly one character in searchWord to match any string in the data structure, otherwise returns false.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>Dictionary: ["hello", "leetcode"]</dd>
<dt>Output:</dt>
<dd>Search: "hhllo"</dd>
<dt>Explanation:</dt>
<dd>The magic dictionary finds 'hello' matches 'hallo' with one character different</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Depth-First Search
**Data Structures**: Hash Map, Array, String
**Patterns**: Graph Pattern
**Time Complexity**: - Build: O(n × l) where n is number of words, l is average length
**Space Complexity**: O(n × l)

### INTUITION:
We need to find if we can change exactly one character in a search word to match any word in the dictionary. A trie is perfect for this as it allows efficient prefix matching and we can use DFS to explore all possible single-character changes.

### APPROACH:
1. **Build Trie**: Store all dictionary words in a trie structure
2. **DFS Search**: For each search, use DFS to explore all paths with exactly one character change
3. **Track Changes**: Use a flag to track if we've used our one allowed change
4. **Exact Match**: Must reach end of both search word and trie path with exactly one change

### WHY THIS WORKS:
- Trie structure enables efficient prefix matching
- DFS allows exploring all possible single character changes
- By tracking changes used, we ensure exactly one modification
- Early termination when more than one change is needed

### EXAMPLE WALKTHROUGH:
Input:
```
Dictionary: ["hello", "leetcode"]
```

Search: "hhllo"
DFS Process:
1. Start at root, search word "hhllo"

Steps:
Step 1: At position 0: 'h' matches 'h' in "hello" path → continue
Step 2: At position 1: 'h' doesn't match 'e' in "hello" → use one change, continue
Step 3: At position 2: 'l' matches 'l' → continue
Step 4: At position 3: 'l' matches 'l' → continue
Step 5: At position 4: 'o' matches 'o' → continue
Step 6: Reached end with exactly one change → return True

### TIME COMPLEXITY:
- Build: O(n × l) where n is number of words, l is average length
- Search: O(26 × l) in worst case, but typically much better due to pruning

### SPACE COMPLEXITY:
O(n × l)
For the trie structure storing all dictionary words

### EDGE CASES:
- **Exact match in dictionary**: Return False (need exactly one change)
- **Word length mismatch**: No match possible, return False
- **Multiple possible changes**: Only one change allowed, continue searching
- **Empty dictionary**: Return False for any search
- **Single character words**: Check all 26 possible substitutions

</details>
"""

import re
