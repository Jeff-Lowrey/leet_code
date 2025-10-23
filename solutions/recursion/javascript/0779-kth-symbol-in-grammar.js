/**
 * # 779. Kth Symbol In Grammar
 *
 * # 779. K-th Symbol in Grammar
 *
 * # Difficulty: Medium
 *
 * We build a table of n rows (1-indexed). We start by writing 0 in the 1st row.
 * Now in every subsequent row, we look at the previous row and replace each occurrence
 * of 0 with 01, and each occurrence of 1 with 10.
 *
 * Given two integer n and k, return the kth (1-indexed) symbol in the nth row.
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: Recursion, Binary Tree Traversal, Bit Manipulation
 * **Data Structures**: Binary Tree (implicit), Call Stack
 * **Patterns**: Divide and Conquer, Parent-Child Relationship
 * **Time Complexity**: **O(n)** - Recursively navigate n levels
 * **Space Complexity**: **O(n)** - Recursion call stack depth
 *
 * ### INTUITION:
 * Each row forms a binary tree. Find parent symbol recursively and apply transformation rule.
 *
 * ### APPROACH:
 * Recursively find parent position in previous row and determine if k is left or right child.
 *
 * ### TIME COMPLEXITY:
 * **O(n)** - Recurse through n rows
 *
 * ### SPACE COMPLEXITY:
 * **O(n)** - Recursion depth
 *
 * </details>
 *
 * @param {number} n
 * @param {number} k
 * @return {number}
 */

class Solution {
  /**
   * Find kth symbol in nth row using recursion.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  kthGrammar(n, k) {
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
  kthGrammarBitCount(n, k) {
    return (k - 1).toString(2).split("1").length % 2;
  }

  /**
   * Iterative approach working backwards.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  kthGrammarIterative(n, k) {
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

function runTests() {
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
