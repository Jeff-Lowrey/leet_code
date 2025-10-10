"""
# Difficulty: Medium

# 208. Implement Trie

A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

Implement the Trie class:
- Trie() Initializes the trie object.
- void insert(String word) Inserts the string word into the trie.
- boolean search(String word) Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.
- boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[input description]</dd>
<dt>Output:</dt>
<dd>[output description]</dd>
<dt>Explanation:</dt>
<dd>[explanation]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
A trie is a tree where each node represents a character and paths from root to nodes represent prefixes or complete words. Each node has children for possible next characters and a flag indicating if it's the end of a word.

### APPROACH:
1. **Node structure**: Each node has a dictionary of children and a boolean end flag
2. **Insert**: Follow/create path for each character, mark end node
3. **Search**: Follow path, return true only if path exists and ends at marked node
4. **StartsWith**: Follow path, return true if path exists regardless of end flag

### WHY THIS WORKS:
- Tree structure naturally represents prefix relationships
- Each level represents position in word/prefix
- End flags distinguish complete words from partial prefixes
- Dictionary children allow efficient character lookup

### EXAMPLE WALKTHROUGH:
```
Insert "app":
root → 'a' → 'p' → 'p' (end=True)

Insert "apple":
root → 'a' → 'p' → 'p' → 'l' → 'e' (end=True)

Search "app": root → 'a' → 'p' → 'p' (end=True) → True
Search "appl": root → 'a' → 'p' → 'p' → 'l' (end=False) → False
StartsWith "app": root → 'a' → 'p' → 'p' (exists) → True
```

### TIME COMPLEXITY:
O(m)
Where m is the length of the word/prefix for all operations

### SPACE COMPLEXITY:
O(ALPHABET_SIZE × N × M)
Where N is number of words and M is average length

### EDGE CASES:
- **[Edge case 1]:** [how it's handled]
- **[Edge case 2]:** [how it's handled]

</details>
"""


