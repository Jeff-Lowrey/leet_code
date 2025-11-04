/**
 * ### METADATA:
 * **Techniques**: Backtracking, String Building
 * **Data Structures**: Hash Map (digit to letters mapping), Array, String
 * **Time Complexity**: O(3^N × 4^M) where N is digits with 3 letters, M is digits with 4 letters
 * **Space Complexity**: O(3^N × 4^M)
 *
 * ### INTUITION:
 * The key insight is that this is a classic backtracking problem where we need to generate all possible
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
 * - This ensures that backtracking explores all possible paths systematically
 * - This ensures that we build combinations incrementally and backtrack when needed
 * - This ensures that each recursive call handles one digit at a time
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
 *
 * Output:
 * ```
 * ["ad","ae","af","bd","be","bf","cd","ce","cf"]
 * ```
 *
 * ### TIME COMPLEXITY:
 * **O(3^N × 4^M)** - where N is the number of digits mapping to 3 letters (digits 2-6, 8) and M is the number of digits mapping to 4 letters (digits 7, 9). We generate all possible combinations by exploring every path in the decision tree. Each digit can map to 3 or 4 letters, creating a tree where each node branches into 3 or 4 children. The total number of combinations is the product of the number of letters each digit maps to. For example, "23" gives 3 × 3 = 9 combinations. The time to generate each combination is proportional to its length (the number of digits), so total time is **O(3^N × 4^M)** × **O(N+M)** ≈ **O(3^N × 4^M)** since the exponential term dominates.
 *
 * ### SPACE COMPLEXITY:
 * **O(3^N × 4^M)** - We store all generated combinations in the result list. Each combination is a string of length (N+M) where N is the count of digits mapping to 3 letters and M is the count of digits mapping to 4 letters. The total number of combinations is 3^N × 4^M, and each combination takes **O(N+M)** space. Therefore, the total space complexity is **O(3^N × 4^M)** × **O(N+M)**. Additionally, the recursion call stack can go as deep as the number of digits, which is **O(N+M)**, but this is dominated by the space needed to store all combinations.
 *
 * ### EDGE CASES:
 * - **Empty input**: Handle when input is empty
 * - **Single element**: Handle single-element inputs
 * - **Boundary values**: Handle minimum/maximum valid values
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
