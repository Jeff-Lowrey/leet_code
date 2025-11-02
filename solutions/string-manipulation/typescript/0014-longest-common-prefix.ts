/**
 * # 0014. Longest Common Prefix
 * 
 * # Difficulty: Easy
 * 
 * Write a function to find the longest common prefix string amongst an array of strings.
 * If there is no common prefix, return an empty string "".
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>strs = ["flower","flow","flight"]</dd>
 * <dt>Output:</dt>
 * <dd>fl"</dd>
 * <dt>Explanation:</dt>
 * <dd>Longest common prefix of ['flower','flow','flight'] is 'fl'</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Array, String
 * **Patterns**: Two Pointers Pattern, Sliding Window Pattern
 * **Time Complexity**: O(S)
 * **Space Complexity**: O(1) - Constant extra space
 * 
 * ### INTUITION:
 * The longest common prefix is the sequence of characters that all strings share from the beginning. We can find this by comparing characters at each position across all strings until we find a mismatch.
 * 
 * ### APPROACH:
 * 1. **Vertical Scanning**: Compare characters at the same position across all strings
 * 2. Start from position 0 and check if all strings have the same character at that position
 * 3. Continue until we find a mismatch or reach the end of any string
 * 4. Return the prefix found so far
 * 
 * ### WHY THIS WORKS:
 * Since we're looking for a common prefix, all strings must have identical characters at each position from the start. The moment any string differs or ends, we've found the longest possible common prefix.
 * 
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * strs = ["flower","flow","flight"]
 * ```
 *
 * Steps:
 * Step 1: Position 0 → compare 'f', 'f', 'f' → all match
 * Step 2: Position 1 → compare 'l', 'l', 'l' → all match
 * Step 3: Position 2 → compare 'o', 'o', 'i' → mismatch found
 * Step 4: Return prefix up to position 2 → "fl"
 *
 * Output:
 * ```
 * "fl"
 * ```
 * 
 * ### TIME COMPLEXITY:
 * O(S)
 * - S is the sum of all characters in all strings
 * - In worst case, we examine every character once
 * 
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
 * - Only using constant extra space for variables
 * 
 * ### EDGE CASES:
 * - Empty array: return ""
 * - Empty string in array: return ""
 * - Single string: return the string itself
 * - No common prefix: return ""
 * 
 * </details>
 */

class Solution {
  /**
   * Approach: Vertical scanning
   *         Time Complexity: O(S) where S is sum of all characters
   *         Space Complexity: O(1)
   */
  longestCommonPrefix(strs: string[]): string {
    // Implementation
    if not strs:
    return ""
    for (let i = 0; i < strs.get(0).length; i++) {
    char = strs.get(0)[i]
    for (let j = 0; j < 1, strs.length; j++) {
    if i >= strs.get(j).length or strs.get(j)[i] != char:
    return strs.get(0)[:i]
    return strs.get(0)
  }

  /**
   * Approach: Sort and compare first and last
   *         Time Complexity: O(n log n * m) where m is average string length
   *         Space Complexity: O(1)
   */
  longestCommonPrefixSort(strs: string[]): string {
    // Implementation
    if not strs:
    return ""
    strs.sort()
    first = strs.get(0)
    last = strs.get(-1)
    i = 0
    while i < first.length and i < last.length and first.set(i, = last.get(i):
    i += 1
  }

  /**
   * Approach: Build trie and find common path
   *         Time Complexity: O(S)
   *         Space Complexity: O(S)
   */
  longestCommonPrefixTrie(strs: string[]): string {
    // Implementation
    if not strs:
    return ""
    class TrieNode:
    def __init__(self: Any) -> null:
    self.children: dict[str, Any] = {}
    self.is_end = false
    root = TrieNode()
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  # Test Longest Common Prefix
  solution = Solution()
  console.log("Longest Common Prefix:")
  test_cases = [["flower", "flow", "flight"], ["dog", "racecar", "car"], [""], ["a"], ["ab", "a"]]
  for strs in test_cases:
  result = solution.longestCommonPrefix(strs)
  console.log(`Input: {strs}`)
  console.log(`Prefix: 'result'\n`)
  # Test strStr
  solution_str = SolutionStrStr()
  console.log("Find First Occurrence:")
  str_cases = [("sadbutsad", "sad"), ("leetcode", "leeto"), ("hello", "ll"), ("aaaaa", "bba")]
  for haystack, needle in str_cases:
  index: int = solution_str.strStr(haystack, needle)
  console.log(`Haystack: '{haystack}', Needle: '{needle}'`)
  console.log(`Index: {index}\n`)
  # Test Repeated Substring
  solution_repeated = SolutionRepeated()
  console.log("Repeated Substring Pattern:")
  repeated_cases = ["abab", "aba", "abcabcabcabc", "a", "aa"]
  for s in repeated_cases:
  is_repeated: bool = solution_repeated.repeatedSubstringPattern(s)
  console.log(`String: '{s}'`)
  console.log(`Is repeated: {is_repeated}\n`)
  # Test Repeated String Match
  solution_match = SolutionRepeatedMatch()
  console.log("Repeated String Match:")
  match_cases = [("abcd", "cdabcdab"), ("a", "aa"), ("a", "a"), ("abc", "cabcabca")]
  for a, b in match_cases:
  repetitions: int = solution_match.repeatedStringMatch(a, b)
  console.log(`a: '{a}', b: '{b}'`)
  console.log(`Repetitions: {repetitions}\n`)
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;