"""
# Difficulty: Medium

# 677. Map Sum Pairs

You are asked to implement a map that supports the following two operations:

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
This is a perfect Trie (prefix tree) problem. We need to store key-value pairs and efficiently compute sums for all keys with a given prefix. A trie naturally groups keys by their prefixes, making prefix sum queries efficient.

### APPROACH:
1. **Trie Structure**: Use a trie where each node stores the sum of all values in its subtree
2. **Insert Operation**: Add/update key in trie and propagate value changes up to root
3. **Sum Operation**: Navigate to prefix node and return its accumulated sum
4. **Value Updates**: Handle key updates by adjusting differences in trie nodes

### WHY THIS WORKS:
- Trie groups keys by common prefixes naturally
- Each node stores sum of all keys in its subtree
- Insert/update operations maintain these sums correctly
- Sum queries are just lookups at the prefix node
- Time complexity is optimal for prefix-based operations

### EXAMPLE WALKTHROUGH:
```
Operations:
insert("apple", 3)
insert("app", 2)
sum("ap") → 5 (apple: 3 + app: 2)
insert("app", 4)  # Update existing key
sum("ap") → 7 (apple: 3 + app: 4)

Trie structure after operations:
    root
     |
     a (sum: 7)
     |
     p (sum: 7)
     |
     p (sum: 7, has_app: 4)
     |
     l (sum: 3)
     |
     e (sum: 3, has_apple: 3)
```

### TIME COMPLEXITY:
- Insert: O(k) where k is key length
- Sum: O(p) where p is prefix length

### SPACE COMPLEXITY:
O(TOTAL_KEY_LENGTH)
For storing all keys in the trie structure

### EDGE CASES:
- **[Edge case 1]:** [how it's handled]
- **[Edge case 2]:** [how it's handled]

</details>
"""


