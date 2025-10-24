/**
 * # 0344. Reverse String
 *
 * Difficulty: Medium
 *
 * # Difficulty: Easy
 *
 * Write a function that reverses a string. The input string is given as an array of characters s.
 *
 * You must do this by modifying the input array in-place with O(1) extra memory.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>s = ["h","e","l","l","o"]</dd>
 * <dt>Output:</dt>
 * <dd>["o","l","l","e","h"]</dd>
 * <dt>Explanation:</dt>
 * <dd>The string "hello" is reversed to "olleh"</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: Recursion, Two Pointers
 * **Data Structures**: Array
 * **Patterns**: In-place Modification, Divide and Conquer
 * **Time Complexity**: O(n)
 * **Space Complexity**: O(n) for recursion stack (or O(1) for iterative)
 *
 * ### INTUITION:
 * Reversing a string recursively involves swapping characters at opposite ends and recursively
 * reversing the middle portion. The base case is when pointers meet or cross.
 *
 * ### APPROACH:
 * 1. **Base case**: When left >= right, return (pointers have met/crossed)
 * 2. **Swap**: Exchange characters at left and right indices
 * 3. **Recurse**: Move pointers inward and recurse on remaining substring
 * 4. **In-place**: Modify array directly without extra space
 *
 * ### WHY THIS WORKS:
 * - Swapping opposite-end characters and moving inward eventually reverses entire string
 * - Recursion naturally divides problem into smaller subproblems
 * - Base case ensures recursion terminates
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * ["h","e","l","l","o"]
 * ```
 *
 * Step 1: Swap s[0] and s[4]: ["o","e","l","l","h"]
 * Step 2: Swap s[1] and s[3]: ["o","l","l","e","h"]
 *
 * Steps:
 * Step 1: left=2, right=2 (meet) -> stop
 *
 * Output:
 * ```
 * ["o","l","l","e","h"]
 * ```

 * ### TIME COMPLEXITY:
 * O(n)
 *
 * ### SPACE COMPLEXITY:
 * O(n) for recursion stack (or O(1) for iterative)
 *
 * ### EDGE CASES:
 * - Empty array: no change
 * - Single character: no change
 * - Two characters: swap them
 *
 * </details>
 */

class Solution {
  /**
   * Reverse string using recursion (in-place).
   *
   * Time Complexity: O(n)
   * Space Complexity: O(n) - recursion stack
   */
  reverseString(s: string[]): void {
    const helper = (left: number, right: number): void => {
      // Base case: pointers meet or cross
      if (left >= right) {
        return;
      }

      // Swap characters
      [s[left], s[right]] = [s[right], s[left]];

      // Recurse on remaining substring
      helper(left + 1, right - 1);
    };

    helper(0, s.length - 1);
  }

  /**
   * Reverse string iteratively (more space efficient).
   *
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  reverseStringIterative(s: string[]): void {
    let left = 0;
    let right = s.length - 1;

    while (left < right) {
      [s[left], s[right]] = [s[right], s[left]];
      left++;
      right--;
    }
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  // Test case 1
  const s1 = ["h", "e", "l", "l", "o"];
  solution.reverseString(s1);
  console.log(
    `Test 1: ${JSON.stringify(s1) === JSON.stringify(["o", "l", "l", "e", "h"]) ? "PASS" : "FAIL"}`,
  );

  // Test case 2
  const s2 = ["H", "a", "n", "n", "a", "h"];
  solution.reverseString(s2);
  console.log(
    `Test 2: ${JSON.stringify(s2) === JSON.stringify(["h", "a", "n", "n", "a", "H"]) ? "PASS" : "FAIL"}`,
  );

  // Test case 3: Single character
  const s3 = ["A"];
  solution.reverseString(s3);
  console.log(`Test 3: ${JSON.stringify(s3) === JSON.stringify(["A"]) ? "PASS" : "FAIL"}`);

  // Test case 4: Two characters
  const s4 = ["A", "B"];
  solution.reverseString(s4);
  console.log(`Test 4: ${JSON.stringify(s4) === JSON.stringify(["B", "A"]) ? "PASS" : "FAIL"}`);

  // Test iterative
  const s5 = ["t", "e", "s", "t"];
  solution.reverseStringIterative(s5);
  console.log(
    `Test 5 (Iterative): ${JSON.stringify(s5) === JSON.stringify(["t", "s", "e", "t"]) ? "PASS" : "FAIL"}`,
  );

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
