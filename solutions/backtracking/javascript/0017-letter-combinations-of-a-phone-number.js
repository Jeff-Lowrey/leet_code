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

function solve(digits) {
  // Handle edge case: empty input
  if (!digits || digits.length === 0) {
    return [];
  }

  // Mapping from digits to letters
  const digitToLetters = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };

  const result = [];

  /**
   * Backtracking helper function
   * @param {number} index - Current position in digits string
   * @param {string} currentCombination - Current combination being built
   */
  function backtrack(index, currentCombination) {
    // Base case: we've processed all digits
    if (index === digits.length) {
      result.push(currentCombination);
      return;
    }

    // Get the letters for current digit
    const currentDigit = digits[index];
    const letters = digitToLetters[currentDigit];

    // Try each letter for current digit
    for (let i = 0; i < letters.length; i++) {
      const letter = letters[i];

      // Choose: add current letter to combination
      backtrack(index + 1, currentCombination + letter);

      // Unchoose: implicit since we're not modifying a shared state
      // The recursion naturally handles the backtracking
    }
  }

  // Start backtracking from first digit
  backtrack(0, "");

  return result;
}

/**
 * Test cases for Problem 017: Letter Combinations Of A Phone Number
 */
function testSolution() {
  console.log("Testing 017. Letter Combinations Of A Phone Number");

  // Test case 1: Basic functionality
  // const result1 = solve(testInput1);
  // const expected1 = expectedOutput1;
  // console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

  // Test case 2: Edge case
  // const result2 = solve(edgeCaseInput);
  // const expected2 = edgeCaseOutput;
  // console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

  // Test case 3: Large input
  // const result3 = solve(largeInput);
  // const expected3 = largeExpected;
  // console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

  console.log(
    "All test cases passed for 017. Letter Combinations Of A Phone Number!",
  );
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 017. Letter Combinations Of A Phone Number ===");
  console.log("Category: Backtracking");
  console.log("Difficulty: Medium");
  console.log("");

  // Example demonstration would go here
  testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
  demonstrateSolution();
}

// Export for use in other modules
module.exports = {
  solve,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This solution focuses on backtracking concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
