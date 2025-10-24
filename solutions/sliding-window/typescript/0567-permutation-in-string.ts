/**
 * # Difficulty: Medium
 *
 * # 567. Permutation In String
 *
 * Difficulty: Medium
 *
 * Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise.
 *
 * In other words, return true if one of s1's permutations is the substring of s2.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>s1 = "ab", s2 = "eidbaooo"</dd>
 * <dt>Output:</dt>
 * <dd>True</dd>
 * <dt>Explanation:</dt>
 * <dd>The permutation of s2='ab' exists in s1 starting at index 1 ('ba' is a permutation of 'ab')</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Array Traversal, Sliding Window
 * **Data Structures**: Array, String
 * **Patterns**: Sliding Window Pattern, Hash Table Pattern
 * **Time Complexity**: O(n)
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Use sliding window with character frequency. Window is valid if it contains permutation of s1 (same character counts). Check each window of size len(s1) by maintaining character counts.
 *
 * ### APPROACH:
 * 1. **Count s1 characters**: Use Counter(s1) to get character frequencies
 * 2. **Initialize window**: Create window counter for first len(s1) characters of s2
 * 3. **Check first window**: If window == s1_count, return True
 * 4. **Slide window**: For i from len(s1) to len(s2)
 * 5. **Add new character**: window[s2[i]] += 1
 * 6. **Remove old character**: window[s2[i-len(s1)]] -= 1
 * 7. **Check match**: If window == s1_count, return True
 * 8. **Return False**: If loop completes without match
 *
 * ### WHY THIS WORKS:
 * - Sliding window of length len(s1) checks if character frequencies match
 * - Track frequency differences: matches counts how many chars have correct frequency
 * - When matches == 26 (all alphabet chars match), found permutation
 * - Slide window: update frequency for outgoing and incoming characters
 * - O(n) time for s2 length n, O(1) space for fixed alphabet size
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * s1 = "ab", s2 = "eidbaooo"
 * ```
 *
 * Step 1: Check each window of size 2
 * "ei": not permutation
 * "id": not permutation
 * "db": not permutation
 * "ba": is permutation of "ab" ✓
 *
 * Output:
 * ```
 * True
 * ```

 * ### TIME COMPLEXITY:
 * O(n)
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
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
   * Check if s2 contains a permutation of s1.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  checkInclusion(s1: string, s2: string): boolean {
    if (s1.length > s2.length) {
      return false;
    }

    const s1Count: number[] = new Array(26).fill(0);
    const windowCount: number[] = new Array(26).fill(0);

    for (let i = 0; i < s1.length; i++) {
      s1Count[s1.charCodeAt(i) - 97]++;
      windowCount[s2.charCodeAt(i) - 97]++;
    }

    if (this.arraysEqual(s1Count, windowCount)) {
      return true;
    }

    for (let i = s1.length; i < s2.length; i++) {
      windowCount[s2.charCodeAt(i - s1.length) - 97]--;
      windowCount[s2.charCodeAt(i) - 97]++;

      if (this.arraysEqual(s1Count, windowCount)) {
        return true;
      }
    }

    return false;
  }

  private arraysEqual(arr1: number[], arr2: number[]): boolean {
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.checkInclusion("ab", "eidbaooo") === true ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.checkInclusion("ab", "eidboaoo") === false ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.checkInclusion("a", "ab") === true ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
