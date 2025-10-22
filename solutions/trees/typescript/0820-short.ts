/**
 * # Difficulty: Medium
 * 
 * # 820. Short Encoding of Words
 * 
 * A valid encoding of an array of words is any reference string s and an array of indices indices such that:
 * - words.length == indices.length
 * - The reference string s ends with the character '#'
 * - For each index indices[i], the substring of s starting at indices[i] and ending at the next '#' is equal to words[i]
 * 
 * Given an array of words, return the length of the shortest reference string s possible of any valid encoding of words.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>["time", "me", "bell"]</dd>
 * <dt>Output:</dt>
 * <dd>"minimumLengthEncoding({words1}) -> {result1}"</dd>
 * <dt>Explanation:</dt>
 * <dd>The shortest unique prefix for 'apple' is 'app'</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Two Pointers Pattern, Hash Table Pattern
 * **Time Complexity**: O(N × M)
 * **Space Complexity**: O(N × M)
 * 
 * ### INTUITION:
 * To minimize the encoding length, we want to share suffixes between words. If one word is a suffix of another, we can encode both using just the longer word. This is a classic Trie problem where we build the trie using word suffixes.
 * 
 * ### APPROACH:
 * 1. **Trie Construction**: Build a trie using the reverse of each word (to handle suffixes)
 * 2. **Deduplication**: Remove words that are suffixes of other words
 * 3. **Length Calculation**: For each unique word, add its length + 1 (for '#') to the total
 * 
 * ### WHY THIS WORKS:
 * - Trie naturally handles prefix/suffix relationships
 * - By reversing words, we can detect when one word is a suffix of another
 * - Only leaf nodes in the trie represent words that need their own encoding
 * - Each word needs one '#' delimiter, so total length = sum(word_lengths) + count
 * 
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: words = ["time", "me", "bell"]
 * 1. Build trie with reversed words: ["emit", "em", "lleb"]
 * 2. "em" is a suffix of "emit", so we can share encoding
 * 3. Result: "time#bell#" (length 10)
 *    - "time" at index 0
 *    - "me" at index 2 (suffix of "time")
 *    - "bell" at index 5
 * ```
 * 
 * ### TIME COMPLEXITY:
 * O(N × M)
 * Where N is the number of words and M is the average length of words
 * 
 * ### SPACE COMPLEXITY:
 * O(N × M)
 * For the trie structure and set storage
 * 
 * ### EDGE CASES:
 * - **Empty word list**: Return 0 (no encoding needed)
 * - **Single word**: Return word length + 1 for delimiter
 * - **All words are suffixes of one**: Only count the longest word
 * - **No suffix relationships**: Sum all word lengths plus delimiters
 * - **Duplicate words in input**: Remove duplicates first before processing
 * 
 * </details>
 */

class Solution {
  /**
   * Find the minimum length encoding using suffix trie.
   *
   *         Args:
   *             words: List of words to encode
   *
   *         Returns:
   *             Minimum length of encoded string
   *
   *         Time Complexity: O(N × M) where N = number of words, M = average length
   *         Space Complexity: O(N × M) for trie structure
   */
  minimumLengthEncoding(words: string[]): number {
    // Implementation
    unique_words = list(set(words))
    unique_words.sort(key=len, reverse=true)
    root = TrieNode()
    total_length = 0
    for word in unique_words:
    if not self._is_suffix(root, word):
  }

  /**
   * Check if word is already represented as suffix in trie.
   */
  _is_suffix(root: any, word: string): boolean {
    // Implementation
    node = root
    for char in reversed(word):
    if char not in node.children:
    return false
    node = node.children.get(char)
    return node.is_end
  }

  /**
   * Add word to suffix trie.
   */
  _add_word(root: any, word: string): null {
    // Implementation
    node = root
    for char in reversed(word):
    if char not in node.children:
    node.children.set(char, TrieNode()
    node = node.children.get(char)
    node.is_end = true
  }

  /**
   * Alternative solution using set operations.
   *
   *         Args:
   *             words: List of words to encode
   *
   *         Returns:
   *             Minimum length of encoded string
   */
  minimumLengthEncodingSet(words: string[]): number {
    // Implementation
    word_set = set(words)
    for word in words:
    for (let i = 0; i < 1, word.length; i++) {
    word_set.discard(word.get(i:))
    return sum(word.length + 1 for word in word_set)
  }

  /**
   * Pure trie solution with leaf counting.
   *
   *         Args:
   *             words: List of words to encode
   *
   *         Returns:
   *             Minimum length of encoded string
   */
  minimumLengthEncodingTrie(words: string[]): number {
    // Implementation
    trie: dict[Any, Any] = {}
    nodes: list.set(Any, []
    for word in set(words):
    node = trie
    for char in reversed(word):
    node = node.setdefault(char, {})
    nodes.append((node, word.length))
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  test_solution()
  # Example usage
  solution = Solution()
  console.log("=== 820. Short Encoding of Words ===")
  # Example 1: Basic case
  words1 = ["time", "me", "bell"]
  result1 = solution.minimumLengthEncoding(words1)
  console.log(`minimumLengthEncoding({words1}) -> {result1}`)
  console.log(`Encoding: 'time#bell#' (me is suffix of time)`)
  # Example 2: All independent
  words2 = ["t"]
  result2 = solution.minimumLengthEncoding(words2)
  console.log(`minimumLengthEncoding({words2}) -> {result2}`)
  console.log(`Encoding: 't#'`)
  # Example 3: Multiple suffixes
  words3 = ["time", "atime", "btime"]
  result3 = solution.minimumLengthEncoding(words3)
  console.log(`minimumLengthEncoding({words3}) -> {result3}`)
  console.log(`Encoding: 'atime#btime#' (time is suffix of both)`)
  console.log(`\nAlgorithm comparison:`)
  methods = [
  ("Trie-based", solution.minimumLengthEncoding),
  ("Set operations", solution.minimumLengthEncodingSet),
  ("Pure trie", solution.minimumLengthEncodingTrie),
  ]
  for name, method in methods:
  result = method(words1)
  console.log(`{name}: {result}`)
  console.log(`\nKey insights:`)
  console.log(`1. Words that are suffixes of others can share encoding`)
  console.log(`2. Trie helps identify suffix relationships efficiently`)
  console.log(`3. Only leaf nodes in suffix trie need separate encoding`)
  console.log(`4. Each word needs exactly one '#' delimiter`)
  console.log(`5. Sorting by length can optimize the process`)
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;