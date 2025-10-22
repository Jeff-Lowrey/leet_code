/**
 * # Difficulty: Medium
 *
 * # 131. Palindrome Partitioning
 *
 * Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[["a","a","b"]</dd>
 * <dt>Output:</dt>
 * <dd>"Expected {expected}, got {result}"</dd>
 * <dt>Explanation:</dt>
 * <dd>All palindrome partitions of 'aab' are [['a','a','b'], ['aa','b']]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Array, String
 * **Patterns**: Two Pointers Pattern, Dynamic Programming
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * At each position, try all possible substrings starting from that position. If a substring is a palindrome, add it to the current partition and recursively partition the remaining string. Backtrack by removing the last substring. This explores all valid palindrome partitions.
 *
 * ### APPROACH:
 * 1. **Define isPalindrome helper**: Create function to check if substring s[left:right+1] is a palindrome
 * 2. **Initialize result**: Create empty result list and current partition list
 * 3. **Define backtrack function**: Create recursive function with parameter start (current position in string)
 * # 4. **Base case**: If start == len(s), add copy of current partition to result and return  # Result undefined
 * 5. **Try all substrings**: Loop from start to end of string with end index
 * 6. **Check palindrome**: If s[start:end+1] is palindrome, add it to current partition
 * 7. **Recurse**: Call backtrack(end+1) to partition remaining string
 * 8. **Backtrack**: Remove last substring from current partition to try other partitions
 *
 * ### WHY THIS WORKS:
 * - Backtracking tries all possible partition points
 * - At each position, try cutting at every valid palindrome ending
 * - Precompute palindrome DP table: O(n^2) preprocessing for O(1) checks
 * - When reaching end, found valid partitioning
 * - O(n * 2^n) time: 2^n partitions, O(n) to check/copy each
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: s = "aab"
 * Step 1: Start backtracking from index 0
 *   Try substring "a" (palindrome) → recurse from index 1
 *     Try substring "a" (palindrome) → recurse from index 2
 *       Try substring "b" (palindrome) → end of string
 *       Found partition: ["a", "a", "b"]
 *     Try substring "ab" (not palindrome) → skip
 *   Try substring "aa" (palindrome) → recurse from index 2
 *     Try substring "b" (palindrome) → end of string
 *     Found partition: ["aa", "b"]
 *   Try substring "aab" (not palindrome) → skip
 *
 * Output: [["a","a","b"],["aa","b"]]
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 *
 * ### EDGE CASES:
 * - Empty input handling
 * - Single element cases
 * - Large input considerations
 *
 * </details>
 */

class Solution {
  /**
   * Finds all possible palindrome partitions of the input string.
   *
   * Time Complexity: O(n * 2^n)
   * Space Complexity: O(n) for recursion depth
   */
  partition(s: string): string[][] {
    const result: string[][] = [];

    const isPalindrome = (start: number, end: number): boolean => {
      while (start < end) {
        if (s[start] !== s[end]) {
          return false;
        }
        start++;
        end--;
      }
      return true;
    };

    const backtrack = (start: number, currentPartition: string[]): void => {
      // If we've reached the end of the string, we've found a valid partition
      if (start >= s.length) {
        result.push([...currentPartition]);
        return;
      }

      // Try all possible substrings starting from current position
      for (let end = start; end < s.length; end++) {
        // If current substring is palindrome, include it and recurse
        if (isPalindrome(start, end)) {
          currentPartition.push(s.substring(start, end + 1));
          backtrack(end + 1, currentPartition);
          currentPartition.pop(); // Backtrack
        }
      }
    };

    backtrack(0, []);
    return result;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.partition("aab");
  const expected1 = [["a", "a", "b"], ["aa", "b"]];
  console.log(`Test 1: ${JSON.stringify(result1) === JSON.stringify(expected1) ? "PASS" : "FAIL"}`);

  const result2 = solution.partition("a");
  console.log(`Test 2: ${JSON.stringify(result2) === JSON.stringify([["a"]]) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
