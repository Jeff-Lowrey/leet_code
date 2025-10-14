"""
# Difficulty: Medium

# 211. Design Add and Search Words Data Structure

Design a data structure that supports adding new words and finding if a string matches any previously added string.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>
["WordDictionary","addWord","addWord","addWord","search","search","search","search"]<br>
[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
</dd>
<dt>Output:</dt>
<dd>[null,null,null,null,false,true,true,true]</dd>
<dt>Explanation:</dt>
<dd>
WordDictionary wordDictionary = new WordDictionary();<br>
wordDictionary.addWord("bad");<br>
wordDictionary.addWord("dad");<br>
wordDictionary.addWord("mad");<br>
wordDictionary.search("pad"); // return False<br>
wordDictionary.search("bad"); // return True<br>
wordDictionary.search(".ad"); // return True<br>
wordDictionary.search("b.."); // return True
</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
We need a data structure that can efficiently store words and support wildcard searches.
A Trie (prefix tree) is perfect for this - it allows efficient storage and search with wildcard support.

### APPROACH:
1. **Trie Structure**: Each node has a dictionary of children and a boolean flag for word end
2. **addWord**: Insert word character by character into the trie
3. **search**: Use DFS/recursion to handle wildcards ('.')
   - Regular character: follow that specific path
   - Wildcard '.': try all possible children paths

### WHY THIS WORKS:
- Trie provides efficient prefix-based storage
- DFS naturally handles the branching required by wildcards
- Each node maintains children references and word-end markers
- Time complexity is optimal for both operations

### EXAMPLE WALKTHROUGH:
```
addWord("bad")
addWord("dad")
addWord("mad")
search("pad") -> false
search(".ad") -> true (matches "bad", "dad", "mad")
search("b..") -> true (matches "bad")
```

### TIME COMPLEXITY:
- addWord: O(n) where n is word length
- search: O(26^m) worst case where m is number of wildcards, O(n) average

### SPACE COMPLEXITY:
O(total characters in all words)

### EDGE CASES:
- Empty string
- All wildcards
- No matches
- Single character words

</details>
"""


