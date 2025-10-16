"""
# Difficulty: Hard

# 642. Design Search Autocomplete System

Design a search autocomplete system for a search engine. Users may input a sentence (at least one word and end with a special character '#').

You are given a string array sentences and an integer array times both of length n where sentences[i] is a previously typed sentence and times[i] is the corresponding number of times the sentence has been typed. For each input character except '#', return the top 3 historical hot sentences that have the same prefix as the part of the sentence already typed.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>sentences = ["i love you", "island", "iroman", "i love leetcode"]</dd>
<dt>Output:</dt>
<dd>times = [5, 3, 2, 2]</dd>
<dt>Explanation:</dt>
<dd>AutocompleteSystem returns top 3 sentences by frequency</dd>
</dl>

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

### TIME COMPLEXITY:
- Constructor: O(N * L) where N is sentences count, L is average length
- Input: O(P * M * log M) where P is prefix length, M is matching sentences
- Sorting dominates input complexity

### SPACE COMPLEXITY:
O(N * L)
For trie storage with all sentences

### EDGE CASES:
- Fewer than 3 matching sentences
- No matches for prefix
- Updating existing sentence frequency
- Same frequency (use lexicographic order)
- Empty initial history

</details>
"""
