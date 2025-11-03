/**
### INTUITION:
The key insight is that a trie is a tree where each node represents a character and paths from root to nodes represent prefixes or complete words. Each node has children for possible next characters and a flag indicating if it's the end of a word.

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
Input:
```
Insert "app":
```

Insert "apple":

Steps:
Step 1: root → 'a' → 'p' → 'p' (end=True)
Step 2: root → 'a' → 'p' → 'p' → 'l' → 'e' (end=True)
Step 3: Search "app": root → 'a' → 'p' → 'p' (end=True) → True
Step 4: Search "appl": root → 'a' → 'p' → 'p' → 'l' (end=False) → False
Step 5: StartsWith "app": root → 'a' → 'p' → 'p' (exists) → True

Output:
```
True
```

### TIME COMPLEXITY:
O(m)**
Where m is the length of the word/prefix for all operations

### SPACE COMPLEXITY:
O(ALPHABET_SIZE × N × M)**
Where N is number of words and M is average length

### EDGE CASES:
- **Empty string insertion**: Create root-only path with end marker
- **Prefix of existing word**: Both word and prefix marked separately
- **Word is prefix search**: Only return true if end marker present
- **Non-existent prefix**: Search returns false immediately
- **Single character words**: Handled like any other word

</details>

*/

class Solution {
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();
  // Add test cases here
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;