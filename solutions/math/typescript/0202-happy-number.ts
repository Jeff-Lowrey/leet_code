/**
 * # Difficulty: Easy
 *
 * # 0202. Happy Number
 *
 *
 * Write an algorithm to determine if a number n is happy.
 *
 * A happy number is a number defined by the following process:
 * - Starting with any positive integer, replace the number by the sum of the squares of its digits.
 * - Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.
 * - Those numbers for which this process ends in 1 are happy.
 *
 * Return true if n is a happy number, and false if not.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>n = 19:</dd>
 * <dt>Output:</dt>
 * <dd>1² + 9² = 82</dd>
 * <dt>Explanation:</dt>
 * <dd>Number 19 is happy: 1²+9²=82, 8²+2²=68, 6²+8²=100, 1²+0²+0²=1</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
 * **Data Structures**: Hash Set
 * **Patterns**: Two Pointers Pattern, Hash Table Pattern
 * **Time Complexity**: O(log n) - Binary search or tree height
 * **Space Complexity**: - Set approach: O(log n)
 *
 * ### INTUITION:
 * Either the process reaches 1 (happy) or enters a cycle (not happy). Use a set to detect cycles, or use Floyd's cycle detection.
 *
 * ### APPROACH:
 * 1. **Calculate sum**: Get sum of squares of digits
 * 2. **Track seen numbers**: Use set to detect cycle
 * 3. **Check termination**: If 1, return True; if cycle, return False
 * 4. **Alternative**: Floyd's cycle detection (two pointers)
 *
 * ### WHY THIS WORKS:
 * - Numbers either reach 1 or cycle
 * - Cycles always occur for unhappy numbers
 * - Set or two-pointer both detect cycles
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * n = 19:
 * ```
 *
 * 1² + 9² = 82
 * 8² + 2² = 68
 * 6² + 8² = 100
 * n = 2:
 *
 * Steps:
 * Step 1: 1² + 0² + 0² = 1 → Happy!
 * Step 2: 2² = 4
 * Step 3: 4² = 16
 * Step 4: 1² + 6² = 37
 * Step 5: 3² + 7² = 58
 * Step 6: 5² + 8² = 89
 * Step 7: 8² + 9² = 145
 * Step 8: 1² + 4² + 5² = 42
 * Step 9: 4² + 2² = 20
 * Step 10: 2² + 0² = 4 → Cycle! Not happy

 * ### TIME COMPLEXITY:
 * O(log n)
 * - Binary search or tree height
 * Depends on number of digits and cycle detection
 *
 * ### SPACE COMPLEXITY:
 * - Set approach: O(log n)
 * - Two-pointer: O(1)
 *
 * ### EDGE CASES:
 * - n = 1 (already happy)
 * - Single digit numbers
 * - Large numbers
 *
 * </details>
 */

class Solution {
  isHappy(n: number): boolean {
    const seen = new Set<number>();

    while (n !== 1 && !seen.has(n)) {
      seen.add(n);
      n = this.sumOfSquares(n);
    }

    return n === 1;
  }

  private sumOfSquares(n: number): number {
    let sum = 0;
    while (n > 0) {
      const digit = n % 10;
      sum += digit * digit;
      n = Math.floor(n / 10);
    }
    return sum;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.isHappy(19) === true ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.isHappy(2) === false ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
