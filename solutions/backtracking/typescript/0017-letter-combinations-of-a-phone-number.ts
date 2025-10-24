/**
 * # Difficulty: Medium
 *
 * # 017. Letter Combinations Of A Phone Number
 *
 * Given a string containing digits from 2-9 inclusive, return all possible letter
 * combinations that the number could represent. Return the answer in any order.
 *
 * A mapping of digit to letters (just like on the telephone buttons) is given below:
 * 2: ABC, 3: DEF, 4: GHI, 5: JKL, 6: MNO, 7: PQRS, 8: TUV, 9: WXYZ
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>"23"</dd>
 * <dt>Output:</dt>
 * <dd>{solution.letterCombinations('23')}")</dd>
 * <dt>Explanation:</dt>
 * <dd>All letter combinations of '23' map to ['ad','ae','af','bd','be','bf','cd','ce','cf']</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Array, String
 * **Patterns**: Backtracking
 * **Time Complexity**: O(3^N × 4^M)
 * **Space Complexity**: O(3^N × 4^M)
 *
 * ### INTUITION:
 * This is a classic backtracking problem where we need to generate all possible
 * combinations. Each digit maps to multiple letters, creating a decision tree
 * where we explore all paths.
 *
 * ### APPROACH:
 * 1. **Map digits to letters**: Create a lookup table for phone mappings
 * 2. **Use backtracking**: Build combinations character by character
 * 3. **Recursive exploration**: For each digit, try all possible letters
 * 4. **Base case**: When we've processed all digits, add the combination
 *
 * ### WHY THIS WORKS:
 * - Backtracking explores all possible paths systematically
 * - We build combinations incrementally and backtrack when needed
 * - Each recursive call handles one digit at a time
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * "23"
 * ```
 *
 * Steps:
 * Step 1: digit '2' -> try 'a', 'b', 'c'
 * Step 2: For each letter from '2', try letters from '3' -> 'd', 'e', 'f'
 * Step 3: Result: ["ad","ae","af","bd","be","bf","cd","ce","cf"]

### TIME COMPLEXITY:
 * O(3^N × 4^M)
 * Where N is number of digits mapping to 3 letters, M is digits mapping to 4 letters
 *
 * ### SPACE COMPLEXITY:
 * O(3^N × 4^M)
 * For storing all possible combinations
 *
 * ### EDGE CASES:
 * - Empty string returns empty list
 * - Single digit returns all its mapped letters
 * - Invalid digits (0, 1) are ignored
 *
 * </details>
 */

class Solution {
  /**
   * Generate all possible letter combinations for given phone digits.
   *
   * Time Complexity: O(3^N × 4^M)
   * Space Complexity: O(3^N × 4^M)
   */
  letterCombinations(digits: string): string[] {
    if (!digits || digits.length === 0) {
      return [];
    }

    // Phone digit to letters mapping
    const phoneMap: { [key: string]: string } = {
      "2": "abc",
      "3": "def",
      "4": "ghi",
      "5": "jkl",
      "6": "mno",
      "7": "pqrs",
      "8": "tuv",
      "9": "wxyz",
    };

    const result: string[] = [];

    const backtrack = (index: number, currentCombination: string): void => {
      // Base case: processed all digits
      if (index === digits.length) {
        result.push(currentCombination);
        return;
      }

      // Get current digit and its possible letters
      const currentDigit = digits[index];
      const letters = phoneMap[currentDigit];

      // Try each letter for current digit
      for (const letter of letters) {
        // Choose: add letter to combination
        backtrack(index + 1, currentCombination + letter);
        // Backtrack happens automatically when recursion returns
      }
    };

    backtrack(0, "");
    return result;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.letterCombinations("23");
  const expected1 = ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"];
  console.log(`Test 1: ${JSON.stringify(result1) === JSON.stringify(expected1) ? "PASS" : "FAIL"}`);

  const result2 = solution.letterCombinations("");
  console.log(`Test 2: ${JSON.stringify(result2) === JSON.stringify([]) ? "PASS" : "FAIL"}`);

  const result3 = solution.letterCombinations("2");
  console.log(`Test 3: ${JSON.stringify(result3) === JSON.stringify(["a", "b", "c"]) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
