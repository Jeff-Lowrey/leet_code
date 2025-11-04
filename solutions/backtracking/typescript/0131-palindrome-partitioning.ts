/**
 * ### METADATA:
 * **Techniques**: Backtracking, Dynamic Programming (palindrome check)
 * **Data Structures**: Array, List, String
 * **Time Complexity**: O(n × 2^n)
 * **Space Complexity**: O(n)
 *
 * ### INTUITION:
 * The key insight is that at each position, try all possible substrings starting from that position. If a substring is a palindrome, add it to the current partition and recursively partition the remaining string. Backtrack by removing the last substring. This explores all valid palindrome partitions.
 *
 * ### APPROACH:
 * 1. **Define isPalindrome helper**: Create function to check if substring s[left:right+1] is a palindrome
 * 2. **Initialize result**: Create empty result list and current partition list
 * 3. **Define backtrack function**: Create recursive function with parameter start (current position in string)
 * 4. **Base case**: If start == len(s), add copy of current partition to result and return
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
 * Input:
 * ```
 * s = "aab"
 * ```
 *
 * Step 1: Start backtracking from index 0
 *
 * Steps:
 * Step 1: Try substring "a" (palindrome) → recurse from index 1
 * Step 2: Try substring "a" (palindrome) → recurse from index 2
 * Step 3: Try substring "b" (palindrome) → end of string
 * Step 4: Found partition: ["a", "a", "b"]
 * Step 5: Try substring "ab" (not palindrome) → skip
 * Step 6: Try substring "aa" (palindrome) → recurse from index 2
 * Step 7: Try substring "b" (palindrome) → end of string
 * Step 8: Found partition: ["aa", "b"]
 * Step 9: Try substring "aab" (not palindrome) → skip
 *
 * Output:
 * ```
 * [["a","a","b"],["aa","b"]]
 * ```
 *
 * ### TIME COMPLEXITY:
 * **O(n × 2^n)** - where n is the length of the string. In the worst case (when all characters are the same, like "aaa"), we generate 2^(n-1) different partitions (at each gap between characters, we can choose to partition or not). For each partition, we perform palindrome checks that take **O(n)** time in total across all substrings. Checking each substring for being a palindrome takes **O(substring_length)**, and copying valid partitions takes **O(n)**. Total: **O(2^n)** partitions × **O(n)** work per partition = **O(n × 2^n)**.
 *
 * ### SPACE COMPLEXITY:
 * **O(n)** - where n is the length of the string. The recursion call stack can go as deep as n levels (when we partition the string into individual characters). The current partition list can contain at most n substrings (when every character is a separate partition). The result list is not counted as it's required output. Total auxiliary space: **O(n)** for recursion stack + **O(n)** for current partition = **O(n)**.
 *
 * ### EDGE CASES:
 * - **Empty input**: Handle when input is empty
 * - **Single element**: Handle single-element inputs
 * - **Boundary values**: Handle minimum/maximum valid values
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
