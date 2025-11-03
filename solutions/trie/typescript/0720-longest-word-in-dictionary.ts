/**
### INTUITION:
We need to find the longest word where all its prefixes exist as words in the dictionary. A Trie is perfect for this because we can check if a word can be built character by character by verifying that each intermediate node represents a complete word. DFS or BFS through the trie helps us find the longest buildable word.

### APPROACH:
1. **Build Trie**: Insert all words, marking word ends
2. **DFS/BFS traversal**: Explore trie paths where every node is a word end
3. **Track longest**: Keep track of longest word found
4. **Lexicographic order**: When same length, choose lexicographically smaller
5. **Validate path**: Only continue if current node is a word end

### WHY THIS WORKS:
- Trie naturally represents prefix relationships
- Word end markers indicate which prefixes are valid words
- DFS/BFS explores all buildable words systematically
- Path validation ensures all prefixes exist
- Lexicographic ordering handled by trie structure (or sorting)

### EXAMPLE WALKTHROUGH:
Input:
```
words = ["w","wo","wor","worl","world"]
```

Build Trie:
DFS from root:
Build Trie:

Steps:
Step 1: root -> 'w' (word end)
Step 2: -> 'o' (word end)
Step 3: -> 'r' (word end)
Step 4: -> 'l' (word end)
Step 5: -> 'd' (word end)
Step 6: Visit 'w' (is word) -> can continue
Step 7: Visit 'wo' (is word) -> can continue
Step 8: Visit 'wor' (is word) -> can continue
Step 9: Visit 'worl' (is word) -> can continue
Step 10: Visit 'world' (is word) -> found! length=5
Step 11: Result: "world" (all prefixes are words)
Step 12: words = ["a","banana","app","appl","ap","apply","apple"]
Step 13: root -> 'a' (word end)
Step 14: -> 'p' (word end)
Step 15: -> 'p' (NOT word end) -> can't continue
Step 16: -> 'l' (word end)
Step 17: -> 'e' (word end) -> "apple" ✓
Step 18: -> 'y' (word end) -> "apply" ✓
Step 19: Result: "apple" (lexicographically smaller than "apply")

Output:
```
"world"
```

### TIME COMPLEXITY:
O(N * L)**
Where N is number of words, L is average word length
- Building trie: **O(N * L)**
- DFS traversal: **O(N * L)**

### SPACE COMPLEXITY:
O(N * L)** - Trie storage for all words, where N is number of words and L is average word length

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

*/

class Solution {
  longestWord(words: string[]): string {
    words.sort((a, b) => a.length - b.length || a.localeCompare(b));

    const wordSet = new Set<string>([""]);
    let longest = "";

    for (const word of words) {
      if (wordSet.has(word.substring(0, word.length - 1))) {
        wordSet.add(word);
        if (word.length > longest.length) {
          longest = word;
        }
      }
    }

    return longest;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.longestWord(["w", "wo", "wor", "worl", "world"]);
  console.log(`Test 1: ${result1 === "world" ? "PASS" : "FAIL"}`);

  const result2 = solution.longestWord(["a", "banana", "app", "appl", "ap", "apply", "apple"]);
  console.log(`Test 2: ${result2 === "apple" ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
