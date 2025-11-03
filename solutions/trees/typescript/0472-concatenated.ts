/**
### INTUITION:
The key insight is that build Trie of all words. For each word, DFS from Trie root trying to match it as concatenation of words. Use memoization on position. Word is valid if complete match with 2+ words.

### APPROACH:
1. **Sort by length**: Sort words by length
2. **Build set**: Create word_set from words
3. **Define canForm**: Implement function to check if word can be formed
4. **Use DP**: For each word, use dp[i] = True if word[:i] can be segmented
5. **Check segments**: For each position, try all possible word breaks
6. **Validate**: Word is concatenated if dp[len(word)] is True
7. **Filter results**: Return words that can be formed by concatenation

### WHY THIS WORKS:
- This ensures that trie stores all words, DFS checks if word can be formed by concatenating
- This ensures that for each position, try all words that match from that position
- This ensures that word is concatenated if formed by >= 2 words (track depth)
- This ensures that memoization caches (pos, depth) to avoid recomputing subproblems
- This ensures that o(n * m * k) time: n words, m avg length, k concatenation attempts

### EXAMPLE WALKTHROUGH:
Input:
```
words = ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses"]
```

Step 1: Check each word
"catsdogcats" = "cats" + "dog" + "cats" ✓
"dogcatsdog" = "dog" + "cats" + "dog" ✓

Output:
```
["catsdogcats","dogcatsdog"]
```

### TIME COMPLEXITY:
O(n)**
- Single pass through input

### SPACE COMPLEXITY:
O(1)**
- Constant extra space

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

*/

class Solution {
  /**
   * Find all concatenated words in the given list of words.
   *
   * Time Complexity: O(n * m^2) where n is number of words, m is avg word length
   * Space Complexity: O(n * m) for memoization
   */
  findAllConcatenatedWordsInADict(words: string[]): string[] {
    if (!words) {
      return [];
    }

    // Convert list to set for O(1) lookup
    const wordSet = new Set(words);
    const result: string[] = [];

    const canForm = (word: string, wordSet: Set<string>, start: number, memo: Map<number, boolean>): boolean => {
      // Base case: reached end of word
      if (start === word.length) {
        return true;
      }

      // Check memoization
      if (memo.has(start)) {
        return memo.get(start)!;
      }

      // Try all possible prefixes from current position
      for (let end = start + 1; end <= word.length; end++) {
        const prefix = word.substring(start, end);
        // Check if prefix is in word_set (excluding the word itself)
        if (wordSet.has(prefix) && prefix !== word) {
          if (canForm(word, wordSet, end, memo)) {
            memo.set(start, true);
            return true;
          }
        }
      }

      memo.set(start, false);
      return false;
    };

    // Check each word in the list
    for (const word of words) {
      // Skip empty strings
      if (!word) {
        continue;
      }

      // Check if current word can be formed by concatenating other words
      if (canForm(word, wordSet, 0, new Map())) {
        result.push(word);
      }
    }

    return result;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.findAllConcatenatedWordsInADict([
    "cat",
    "cats",
    "catsdogcats",
    "dog",
    "dogcatsdog",
    "hippopotamuses",
    "rat",
    "ratcatdogcat",
  ]);
  const expected1 = ["catsdogcats", "dogcatsdog", "ratcatdogcat"];
  console.log(`Test 1: ${JSON.stringify(result1.sort()) === JSON.stringify(expected1.sort()) ? "PASS" : "FAIL"}`);

  const result2 = solution.findAllConcatenatedWordsInADict([]);
  console.log(`Test 2: ${result2.length === 0 ? "PASS" : "FAIL"}`);

  const result3 = solution.findAllConcatenatedWordsInADict(["a", "b", "c"]);
  console.log(`Test 3: ${result3.length === 0 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
