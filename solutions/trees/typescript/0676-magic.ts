/**
### INTUITION:
We need to find if we can change exactly one character in a search word to match any word in the dictionary. A trie is perfect for this as it allows efficient prefix matching and we can use DFS to explore all possible single-character changes.

### APPROACH:
1. **Build Trie**: Store all dictionary words in a trie structure
2. **DFS Search**: For each search, use DFS to explore all paths with exactly one character change
3. **Track Changes**: Use a flag to track if we've used our one allowed change
4. **Exact Match**: Must reach end of both search word and trie path with exactly one change

### WHY THIS WORKS:
- This ensures that trie structure enables efficient prefix matching
- This ensures that dFS allows exploring all possible single character changes
- This ensures that by tracking changes used, we ensure exactly one modification
- This ensures that early termination when more than one change is needed

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

Output:
```
[Expected output]
```

### TIME COMPLEXITY:
- Build: **O(n × l)** where n is number of words, l is average length
- Search: **O(26 × l)** in worst case, but typically much better due to pruning

### SPACE COMPLEXITY:
O(n × l)**
For the trie structure storing all dictionary words

### EDGE CASES:
- **Exact match in dictionary**: Return False (need exactly one change)
- **Word length mismatch**: No match possible, return False
- **Multiple possible changes**: Only one change allowed, continue searching
- **Empty dictionary**: Return False for any search
- **Single character words**: Check all 26 possible substitutions

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