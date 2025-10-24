/**
 * # Difficulty: Medium
 * 
 * # 692. Top K Frequent Words
 * 
 * Given an array of strings words and an integer k, return the k most frequent strings.
 * 
 * Return the answer sorted by the frequency from highest to lowest. Sort the words with the same frequency by their lexicographical order.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>words = ["i","love","leetcode","i","love","coding"], k = 2</dd>
 * <dt>Output:</dt>
 * <dd>["i", "love"] (after reversing)</dd>
 * <dt>Explanation:</dt>
 * <dd>Top k=2 frequent words in ['i','love','leetcode','i','love','coding'] are ['i','love']</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Array, String
 * **Patterns**: Hash Table Pattern
 * **Time Complexity**: O(N log k)
 * **Space Complexity**: O(N + k)
 * 
 * ### INTUITION:
 * This problem combines frequency counting with sorting. We need to find the k most frequent words, but with a twist: when frequencies are equal, we sort lexicographically. A heap is perfect for this because we can maintain the top k elements efficiently while respecting both frequency and lexicographical ordering.
 * 
 * ### APPROACH:
 * 1. **Count frequencies**: Use HashMap to count word frequencies
 * 2. **Use min-heap**: Maintain heap of size k with custom comparator
 * 3. **Custom comparator**: Less frequent words first, then reverse lexicographical order
 * 4. **Build result**: Extract from heap and reverse to get correct order
 * 
 * ### WHY THIS WORKS:
 * - Min-heap keeps smallest elements at root, so we keep the k largest
 * - Custom comparator: (-frequency, word) ensures frequent words stay in heap
 * - For equal frequencies, lexicographically smaller words are "larger" in our heap
 * - Final result needs reversal because heap gives us reverse order
 * 
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * words = ["i","love","leetcode","i","love","coding"], k = 2
 * ```
 *
 * Frequencies: {"i": 2, "love": 2, "leetcode": 1, "coding": 1}
 * Heap process:
 * - Add ("i", 2): heap = [(-2, "i")]
 * - Add ("love", 2): heap = [(-2, "love"), (-2, "i")] (love > i lexicographically)
 * - Add ("leetcode", 1): heap = [(-1, "leetcode"), (-2, "i"), (-2, "love")]
 * - Remove leetcode: heap = [(-2, "love"), (-2, "i")]
 * - Add ("coding", 1): heap = [(-1, "coding"), (-2, "i"), (-2, "love")]
 * - Remove coding: heap = [(-2, "love"), (-2, "i")]
 * Result: ["i", "love"] (after reversing)

 * ### TIME COMPLEXITY:
 * O(N log k)
 * Where N is number of words, k is the result size. Heap operations are O(log k).
 * 
 * ### SPACE COMPLEXITY:
 * O(N + k)
 * O(N) for frequency map, O(k) for heap
 * 
 * ### EDGE CASES:
 * - k equals number of unique words
 * - All words have same frequency (pure lexicographical sort)
 * - Single word repeated
 * - k = 1 with multiple candidates
 * 
 * </details>
 */

class Solution {
  /**
   * Find top k frequent words using min-heap approach.
   *
   *         Args:
   *             words: List of strings
   *             k: Number of top frequent words to return
   *
   *         Returns:
   *             List of k most frequent words sorted by frequency (desc) then lexicographically
   *
   *         Time Complexity: O(N log k) where N is number of words
   *         Space Complexity: O(N + k) for frequency map and heap
   */
  topKFrequent(words: string[], k: number): string[] {
    // Implementation
    freq_map = Counter(words)
    heap: list.set(Any, []
    for word, freq in freq_map.items():
  }

  /**
   * Optimal solution using heap with proper comparator.
   *
   *         Args:
   *             words: List of strings
   *             k: Number of top frequent words to return
   *
   *         Returns:
   *             List of k most frequent words
   */
  topKFrequentOptimal(words: string[], k: number): string[] {
    // Implementation
    freq_map = Counter(words)
    heap: list.get(tuple[int, str)] = []
    for word, freq in freq_map.items():
    heapq.heappush(heap, (-freq, word))
  }

  /**
   * Alternative solution using sorting.
   *
   *         Args:
   *             words: List of strings
   *             k: Number of top frequent words
   *
   *         Returns:
   *             List of k most frequent words
   *
   *         Time Complexity: O(N log N) where N is unique words
   *         Space Complexity: O(N) for frequency map
   */
  topKFrequentAlternative(words: string[], k: number): string[] {
    // Implementation
    freq_map = Counter(words)
    sorted_words = sorted(freq_map.items(), key=lambda x: (-x.get(1), x.get(0)))
    return [word for word, freq in sorted_words.get(:k)]
  }

  /**
   * Solution maintaining heap of exactly size k.
   *
   *         Args:
   *             words: List of strings
   *             k: Number of top frequent words
   *
   *         Returns:
   *             List of k most frequent words
   */
  topKFrequentHeapSize(words: string[], k: number): string[] {
    // Implementation
    freq_map = Counter(words)
    heap: list.get(tuple[int, str)] = []
    for word, freq in freq_map.items():
    if heap.length < k:
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
  console.log("=== 692. Top K Frequent Words ===")
  # Demonstrate various approaches
  test_cases = [
  (["i", "love", "leetcode", "i", "love", "coding"], 2),
  (["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], 4),
  (["a", "b", "c"], 2),
  ]
  for words, k in test_cases:
  console.log(`\nInput: words={words}, k={k}`)
  result1 = solution.topKFrequent(words, k)
  result2 = solution.topKFrequentOptimal(words, k)
  result3 = solution.topKFrequentAlternative(words, k)
  console.log(`Heap approach:    {result1}`)
  console.log(`Optimal heap:     {result2}`)
  console.log(`Sorting approach: {result3}`)
  # Show detailed example
  console.log(`\nDetailed example:`)
  words = ["i", "love", "leetcode", "i", "love", "coding"]
  k = 2
  console.log(`Words: {words}`)
  console.log(`Frequencies: i:2, love:2, leetcode:1, coding:1`)
  console.log(`Top {k} frequent: {solution.topKFrequent(words, k)}`)
  console.log(`Reasoning: 'i' and 'love' both have frequency 2 (highest)`)
  console.log(`'i' comes before 'love' lexicographically`)
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;