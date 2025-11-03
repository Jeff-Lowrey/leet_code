/**
 * # Difficulty: Easy
 *
 * # 1221. Split A String In Balanced Strings
 *
 *
 * Balanced strings are those that have an equal quantity of 'L' and 'R' characters.
 *
 * Given a balanced string s, split it into some number of substrings such that:
 * - Each substring is balanced.
 *
 * Return the maximum number of balanced strings you can obtain.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>"RLRRLLRLRL"</dd>
 * <dt>Output:</dt>
 * <dd>4</dd>
 * <dt>Explanation:</dt>
 * <dd>String 'RLRRLLRLRL' can be split into 4 balanced substrings</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Array, String
 * **Patterns**: Hash Table Pattern, Greedy Algorithm
 * **Time Complexity**: O(n)
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * The key insight is to use a greedy approach: whenever we find a balanced substring
 * (where count of 'L' equals count of 'R'), we should immediately split it off. This
 * maximizes the number of splits because splitting early gives us more opportunities
 * for future splits.
 *
 * ### APPROACH:
1. **Use a counter**: Track the balance between 'L' and 'R' characters
2. **Increment/decrement**: +1 for 'L', -1 for 'R' (or vice versa)
3. **Split when balanced**: When counter reaches 0, we have a balanced substring
4. **Count splits**: Increment split counter each time balance reaches 0

### WHY THIS WORKS:
 * The algorithm correctly solves the problem by systematically exploring all valid states while maintaining necessary invariants. Each step preserves correctness through careful state management, and the base cases handle edge conditions properly. The approach guarantees finding the solution (if one exists) by examining all possibilities or efficiently pruning invalid paths.
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * s = "RLRRLLRLRL"
 * ```
 *
 * Steps:
 * Step 1: i=0: 'R' → balance = -1
 * Step 2: i=1: 'L' → balance = 0 → SPLIT! count = 1 → "RL"
 * Step 3: i=2: 'R' → balance = -1
 * Step 4: i=3: 'R' → balance = -2
 * Step 5: i=4: 'L' → balance = -1
 * Step 6: i=5: 'L' → balance = 0 → SPLIT! count = 2 → "RRLL"
 * Step 7: i=6: 'R' → balance = -1
 * Step 8: i=7: 'L' → balance = 0 → SPLIT! count = 3 → "RL"
 * Step 9: i=8: 'R' → balance = -1
 * Step 10: i=9: 'L' → balance = 0 → SPLIT! count = 4 → "RL"
 *
 * Output:
 * ```
 * 4
 * Substrings: "RL", "RRLL", "RL", "RL"
 * ```

 * ### TIME COMPLEXITY:
 * O(n)
 * Single pass through the string
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
 * Only using counter and result variables
 *
 * ### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>
 */

class Solution {
  balancedStringSplit(s: string): number {
    let balance = 0;
    let count = 0;

    for (const char of s) {
      if (char === "L") {
        balance++;
      } else {
        balance--;
      }

      if (balance === 0) {
        count++;
      }
    }

    return count;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.balancedStringSplit("RLRRLLRLRL") === 4 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.balancedStringSplit("RLLLLRRRLR") === 3 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.balancedStringSplit("LLLLRRRR") === 1 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
