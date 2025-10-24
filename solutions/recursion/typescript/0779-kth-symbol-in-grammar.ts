/**
 * # 779. K-th Symbol in Grammar
 *
 * Difficulty: Medium
 *
 * # Difficulty: Medium
 *
 * We build a table of n rows (1-indexed). We start by writing 0 in the 1st row.
 * Now in every subsequent row, we look at the previous row and replace each occurrence of 0 with 01,
 * and each occurrence of 1 with 10.
 *
 * For example, for n = 3, the 1st row is 0, the 2nd row is 01, and the 3rd row is 0110.
 *
 * Given two integer n and k, return the kth (1-indexed) symbol in the nth row of a table of n rows.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>n = 2, k = 1</dd>
 * <dt>Output:</dt>
 * <dd>0</dd>
 * <dt>Explanation:</dt>
 * <dd>
 * Row 1: 0
 * Row 2: 01
 * The 1st symbol in row 2 is 0
 * </dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: Recursion, Binary Tree, Bit Manipulation
 * **Data Structures**: None (pure recursion)
 * **Patterns**: Divide and Conquer, Parent-Child Relationship
 * **Time Complexity**: O(n)
 * **Space Complexity**: O(n) for recursion stack
 *
 * ### INTUITION:
 * The rows form a binary tree pattern:
 * - Row 1: 0
 * - Row 2: 0 1 (0→01)
 * - Row 3: 0 1 1 0 (0→01, 1→10)
 * - Row 4: 0 1 1 0 1 0 0 1
 *
 * Key observation: Each symbol at position k in row n is derived from position ⌈k/2⌉ in row n-1.
 * - If k is odd (left child): same as parent
 * - If k is even (right child): flip of parent
 *
 * ### APPROACH:
 * 1. **Base case**: n = 1, return 0 (first row always starts with 0)
 * 2. **Find parent**: The parent is at position ⌈k/2⌉ in row n-1
 * 3. **Determine relationship**:
 *    - If k is odd: return parent value
 *    - If k is even: return flipped parent value (1 - parent)
 * 4. **Recursive call**: kthGrammar(n-1, (k+1)//2)
 *
 * ### WHY THIS WORKS:
 * - The pattern follows a binary tree structure
 * - Left child (odd k) inherits parent's value
 * - Right child (even k) gets flipped value
 * - We recursively trace back to row 1
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * n = 3, k = 3
 * ```
 *
 * Row 1: 0
 * Row 2: 0 1
 * Row 3: 0 1 1 0
 * ^ ^ ^ ^
 * 1 2 3 4
 * Find position 3 in row 3:
 * - Find position 2 in row 2:
 *
 * Steps:
 * Step 1: - k=3 (odd) → parent is position ⌈3/2⌉ = 2 in row 2, same value as parent
 * Step 2: - k=2 (even) → parent is position ⌈2/2⌉ = 1 in row 1, flip parent
 * Step 3: - Find position 1 in row 1: returns 0
 * Step 4: - Row 2, position 2: flip(0) = 1
 * Step 5: - Row 3, position 3: same as parent = 1
 * Step 6: Result: 1
 * 
 * Output:
 * ```
 * 1
 * ```
 * 
 * ### TIME COMPLEXITY:
 * O(n) - we recurse up to n times
 *
 * ### SPACE COMPLEXITY:
 * O(n) - recursion stack depth
 *
 * ### EDGE CASES:
 * - n = 1: always returns 0
 * - k = 1: always returns 0 (first element of any row)
 * - k = last position: depends on pattern
 *
 * </details>
 */

class Solution {
  /**
   * Find kth symbol in nth row using recursion.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  kthGrammar(n: number, k: number): number {
    // Base case: first row always starts with 0
    if (n === 1) {
      return 0;
    }

    // Find parent symbol in previous row
    const parent = this.kthGrammar(n - 1, Math.floor((k + 1) / 2));

    // If k is odd (left child), return parent value
    // If k is even (right child), return flipped parent value
    if (k % 2 === 1) {
      return parent;
    } else {
      return 1 - parent;
    }
  }

  /**
   * Alternative approach using bit counting.
   *
   * Time Complexity: O(log k)
   * Space Complexity: O(1)
   */
  kthGrammarBitCount(n: number, k: number): number {
    return (k - 1).toString(2).split("1").length % 2;
  }

  /**
   * Iterative approach working backwards.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  kthGrammarIterative(n: number, k: number): number {
    let result = 0;

    // Work backwards from row n to row 1
    while (n > 1) {
      // If k is even, we need to flip the result
      if (k % 2 === 0) {
        result = 1 - result;
      }

      // Move to parent in previous row
      k = Math.floor((k + 1) / 2);
      n -= 1;
    }

    return result;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.kthGrammar(1, 1) === 0 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.kthGrammar(2, 1) === 0 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.kthGrammar(2, 2) === 1 ? "PASS" : "FAIL"}`);
  console.log(`Test 4: ${solution.kthGrammar(3, 1) === 0 ? "PASS" : "FAIL"}`);
  console.log(`Test 5: ${solution.kthGrammar(3, 3) === 1 ? "PASS" : "FAIL"}`);
  console.log(`Test 6: ${solution.kthGrammar(4, 5) === 1 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
