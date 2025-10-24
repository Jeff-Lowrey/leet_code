/**
 * # Difficulty: Medium
 *
 * # 216. Combination Sum III
 *
 * Difficulty: Medium
 *
 * This problem demonstrates key concepts in Recursion.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>k = 3, n = 7</dd>
 * <dt>Output:</dt>
 * <dd>[[1,2,4]]</dd>
 * <dt>Explanation:</dt>
 * <dd>All 3-number combinations from 1-9 that sum to 7 are [[1,2,4]]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Map Storage, Array Traversal, Sorting
 * **Data Structures**: Array, Linked List
 * **Patterns**: Complement Search, Hash Table Pattern
 * **Time Complexity**: O(C(9,k)) - choosing k numbers from 9 options
 * **Space Complexity**: O(k) - recursion depth and combination size
 *
 * ### INTUITION:
 * Find all valid combinations of k numbers that sum to n, using only numbers 1-9,
 * where each number can be used at most once. This is a backtracking problem with
 * multiple constraints: combination size and target sum.
 *
 * ### APPROACH:
 * 1. **Backtracking with constraints**:
 *    - Start from number 1 and try each number up to 9
 *    - For each number, decide to include it or skip it
 *    - Track current sum and count of numbers used
 *    - Base cases: reached k numbers (check if sum equals n), or exceeded constraints
 * 2. **Pruning optimizations**:
 *    - Stop if current sum exceeds target
 *    - Stop if remaining numbers can't possibly reach target
 *    - Early exit when constraints violated
 * 3. **Edge cases**: k > 9, n too large, n too small
 *
 * ### WHY THIS WORKS:
 * - Backtracking systematically explores all valid combinations
 * - Pruning reduces unnecessary exploration
 * - Starting number parameter prevents duplicate combinations
 * - Multiple constraints (count and sum) guide the search
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * k = 3, n = 7
 * ```
 *
 * Try combinations of 3 numbers from 1-9 that sum to 7:
 *
 * Steps:
 * Step 1: [1,2,3] -> sum = 6 (not valid)
 * Step 2: [1,2,4] -> sum = 7 (valid!)
 * Step 3: [1,3,3] -> can't reuse 3
 * Step 4: [2,2,3] -> can't reuse 2
 * Step 5: Other combinations either don't sum to 7 or don't have exactly 3 numbers
 *
 * Output:
 * ```
 * [[1,2,4]]
 * ```

 * ### TIME COMPLEXITY:
 * O(C(9,k))
 * - choosing k numbers from 9 options
 *
 * ### SPACE COMPLEXITY:
 * O(k)
 * - recursion depth and combination size
 *
 * ### EDGE CASES:
 * - k > 9 (impossible - return empty array)
 * - n > 45 (sum of 1-9, impossible - return empty array)
 * - k = 1 (return [n] if 1 <= n <= 9)
 * - Minimum sum for k numbers: 1+2+...+k = k(k+1)/2
 *
 * </details>
 */

class Solution {
  /**
   * Find all valid combinations of k numbers that sum to n.
   *
   * Time Complexity: O(C(9,k)) - choosing k numbers from 9 options
   * Space Complexity: O(k) - recursion depth and combination size
   */
  combinationSum3(k: number, n: number): number[][] {
    const result: number[][] = [];

    // Edge cases
    if (k > 9 || n > 45 || n < 1) {
      return result;
    }

    // Minimum sum for k numbers: 1+2+...+k = k(k+1)/2
    const minSum = (k * (k + 1)) / 2;
    if (n < minSum) {
      return result;
    }

    // Maximum sum for k numbers: (10-k)+...+9 = k*(19-k)/2
    const maxSum = (k * (19 - k)) / 2;
    if (n > maxSum) {
      return result;
    }

    /**
     * Backtracking helper to build combinations.
     */
    const backtrack = (
      start: number,
      currentSum: number,
      combination: number[]
    ): void => {
      // Base case: found valid combination
      if (combination.length === k) {
        if (currentSum === n) {
          result.push([...combination]);
        }
        return;
      }

      // Pruning: if current sum already exceeds target, stop
      if (currentSum > n) {
        return;
      }

      // Try each number from start to 9
      for (let num = start; num <= 9; num++) {
        // Pruning: if adding minimum remaining numbers exceeds target, stop
        const remainingCount = k - combination.length - 1;
        if (remainingCount > 0) {
          // Minimum sum if we add this number and fill rest with consecutive numbers
          let minRemainingSum = 0;
          for (let i = num + 1; i < num + 1 + remainingCount; i++) {
            minRemainingSum += i;
          }
          if (currentSum + num + minRemainingSum > n) {
            break;
          }
        }

        // Choose: add number to combination
        combination.push(num);

        // Explore: recurse with next number
        backtrack(num + 1, currentSum + num, combination);

        // Unchoose: backtrack
        combination.pop();
      }
    };

    // Start backtracking from number 1
    backtrack(1, 0, []);

    return result;
  }

  /**
   * Main solution for Problem 216.
   *
   * Time Complexity: O(C(9,k))
   * Space Complexity: O(k)
   */
  solve(k: number, n: number): number[][] {
    return this.combinationSum3(k, n);
  }
}

/**
 * Helper function to compare 2D arrays (order doesn't matter).
 */
function arraysEqual(a: number[][], b: number[][]): boolean {
  if (a.length !== b.length) {
    return false;
  }
  const sortedA = a.map((arr) => arr.join(",")).sort();
  const sortedB = b.map((arr) => arr.join(",")).sort();
  return sortedA.every((val, idx) => val === sortedB[idx]);
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  // Test case 1: k = 3, n = 7
  const result1 = solution.solve(3, 7);
  const expected1 = [[1, 2, 4]];
  console.log(`Test 1: ${arraysEqual(result1, expected1) ? "PASS" : "FAIL"}`);

  // Test case 2: k = 3, n = 9
  const result2 = solution.solve(3, 9);
  const expected2 = [[1, 2, 6], [1, 3, 5], [2, 3, 4]];
  console.log(`Test 2: ${arraysEqual(result2, expected2) ? "PASS" : "FAIL"}`);

  // Test case 3: k = 4, n = 1 (impossible)
  const result3 = solution.solve(4, 1);
  const expected3: number[][] = [];
  console.log(`Test 3: ${arraysEqual(result3, expected3) ? "PASS" : "FAIL"}`);

  // Test case 4: k = 9, n = 45 (all numbers)
  const result4 = solution.solve(9, 45);
  const expected4 = [[1, 2, 3, 4, 5, 6, 7, 8, 9]];
  console.log(`Test 4: ${arraysEqual(result4, expected4) ? "PASS" : "FAIL"}`);

  // Test case 5: k = 2, n = 18
  const result5 = solution.solve(2, 18);
  const expected5: number[][] = [];
  console.log(`Test 5: ${result5.length === 0 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
