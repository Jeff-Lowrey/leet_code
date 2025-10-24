"""
# Difficulty: Hard

# 745. Prefix And Suffix Search

Design a special dictionary that searches the words in it by a prefix and a suffix.

Implement the WordFilter class:
- WordFilter(string[] words) Initializes the object with the words in the dictionary.
- f(string pref, string suff) Returns the index of the word in the dictionary, which has the prefix pref and the suffix suff. If there is more than one valid index, return the largest of them. If there is no such word in the dictionary, return -1.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>words = ["apple"]</dd>
<dt>Output:</dt>
<dd>See walkthrough</dd>
<dt>Explanation:</dt>
<dd>WordFilter finds 'apple' with prefix='a' and suffix='e'</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
**Techniques**: Hash Table Lookup, Backtracking
**Data Structures**: Hash Map, Array, String
**Patterns**: Hash Table Pattern, Backtracking
**Time Complexity**: - Constructor: O(N * L^3) where N is words count, L is max word length
**Space Complexity**: O(N * L^3)

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

### EXAMPLE WALKTHROUGH:
Input:
```
words = ["apple"]
```

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

### TIME COMPLEXITY:
- Constructor: O(N * L^3) where N is words count, L is max word length
  - For each word, we create L^2 combinations, each taking O(L) to insert
- f(): O(P + S) where P is prefix length, S is suffix length

### SPACE COMPLEXITY:
O(N * L^3)
For storing all suffix-prefix combinations in trie

### EDGE CASES:
- Multiple words with same prefix and suffix
- Word is both prefix and suffix
- Empty prefix or suffix
- No matching words
- Single character words

</details>
"""
