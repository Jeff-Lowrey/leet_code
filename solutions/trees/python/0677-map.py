"""
# Difficulty: Medium

# 0677. Map Sum Pairs

You are asked to implement a map that supports the following two operations:

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>Operations:</dd>
<dt>Output:</dt>
<dd>insert("apple", 3)</dd>
<dt>Explanation:</dt>
<dd>The sum of all values with prefix 'ap' is 7 (apple=3 + app=4)</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup
**Data Structures**: Hash Map, Tree, Trie
**Patterns**: Iterative Solution
**Time Complexity**: - Insert: O(k) where k is key length
**Space Complexity**: O(TOTAL_KEY_LENGTH)

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
Input:
```
Operations:
```

insert("apple", 3)
insert("app", 2)
Trie structure after operations:

Steps:
Step 1: sum("ap") → 5 (apple: 3 + app: 2)
Step 2: insert("app", 4)  # Update existing key
Step 3: sum("ap") → 7 (apple: 3 + app: 4)
Step 4: root
Step 5: |
Step 6: a (sum: 7)
Step 7: |
Step 8: p (sum: 7)
Step 9: |
Step 10: p (sum: 7, has_app: 4)
Step 11: |
Step 12: l (sum: 3)
Step 13: |
Step 14: e (sum: 3, has_apple: 3)

### TIME COMPLEXITY:
- Insert: O(k) where k is key length
- Sum: O(p) where p is prefix length

### SPACE COMPLEXITY:
O(TOTAL_KEY_LENGTH)
For storing all keys in the trie structure

### EDGE CASES:
- **Empty prefix**: Return sum of all values in dictionary
- **Prefix not found**: Return 0 (no keys match prefix)
- **Updating existing key**: Adjust trie sums by difference (new - old)
- **Key is prefix of another**: Both keys contribute to prefix sum
- **Single character keys**: Handled correctly in trie structure

</details>
"""
