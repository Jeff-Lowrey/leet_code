/**
 * # Difficulty: Medium
 * 
 * # 0451. Sort Characters By Frequency
 * 
 * Given a string s, sort it in decreasing order based on the frequency of the characters.
 * The frequency of a character is the number of times it appears in the string.
 * 
 * Return the sorted string. If there are multiple answers, return any of them.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>Input: s = "tree"</dd>
 * <dt>Output:</dt>
 * <dd>Step 1: Count frequencies: {'t': 1, 'r': 1, 'e': 2}</dd>
 * <dt>Explanation:</dt>
 * <dd>Characters sorted by frequency: 'tree' becomes 'eetr' or 'eert'</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Array, String
 * **Patterns**: Hash Table Pattern
 * **Time Complexity**: O(n log k)
 * **Space Complexity**: O(k)
 * 
 * ### INTUITION:
 * We need to count character frequencies and then sort characters by their frequency
 * in descending order. This is a classic use case for heaps/priority queues combined
 * with hash maps for counting.
 * 
 * ### APPROACH:
 * 1. **Count frequencies**: Use hash map to count each character
 * 2. **Sort by frequency**: Use heap or simple sorting to order by frequency
 * 3. **Build result**: Reconstruct string with characters in frequency order
 * 
 * ### WHY THIS WORKS:
 * - Hash map provides O(1) character frequency counting
 * - Heap/sorting organizes characters by frequency efficiently
 * - Multiple characters can appear in any order at same frequency
 * 
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * s = "tree"
 * ```
 *
 * Step 1: Count frequencies: {'t': 1, 'r': 1, 'e': 2}
 * Step 2: Sort by frequency: [('e', 2), ('t', 1), ('r', 1)]
 * Step 3: Build result: "eert" (or "eetr")
 * 
 * Output:
 * ```
 * "eert"
 * ```
 * 
 * ### TIME COMPLEXITY:
 * O(n log k)
 * Where n is string length, k is number of unique characters
 * 
 * ### SPACE COMPLEXITY:
 * O(k)
 * For storing character frequencies and heap
 * 
 * ### EDGE CASES:
 * - Empty string: return empty
 * - Single character: return as-is
 * - All characters same frequency: any order valid
 * 
 * </details>
 */

class Solution {
  /**
   * Sort characters by frequency using heap approach.
   *
   *         Args:
   *             s: Input string
   *
   *         Returns:
   *             String sorted by character frequency (descending)
   *
   *         Time Complexity: O(n log k) where k is unique characters
   *         Space Complexity: O(k) for frequency map and heap
   */
  frequencySort(s: string): string {
    // Implementation
    if not s:
    return ""
    freq_map = Counter(s)
    max_heap = [(-freq, char) for char, freq in freq_map.items()]
    heapq.heapify(max_heap)
  }

  /**
   * Alternative solution using simple sorting.
   *
   *         Args:
   *             s: Input string
   *
   *         Returns:
   *             String sorted by character frequency (descending)
   *
   *         Time Complexity: O(n + k log k) where k is unique characters
   *         Space Complexity: O(k) for frequency map
   */
  frequencySortSimple(s: string): string {
    // Implementation
    if not s:
    return ""
    freq_map = Counter(s)
    sorted_chars = sorted(freq_map.items(), key=lambda x: x.get(1), reverse=true)
  }

  /**
   * Bucket sort approach for O(n) time complexity.
   *
   *         Args:
   *             s: Input string
   *
   *         Returns:
   *             String sorted by character frequency (descending)
   *
   *         Time Complexity: O(n)
   *         Space Complexity: O(n) for buckets
   */
  frequencySortBucket(s: string): string {
    // Implementation
    if not s:
    return ""
    freq_map = Counter(s)
    buckets: list.get(list[Any)] = [[] for _ in range(s.length + 1)]
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
  console.log("=== 451. Sort Characters By Frequency ===")
  console.log(`frequencySort('tree') -> {solution.frequencySort('tree')}`)
  console.log(`frequencySort('cccaaa') -> {solution.frequencySort('cccaaa')}`)
  console.log(`frequencySort('Aabb') -> {solution.frequencySort('Aabb')}`)
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;